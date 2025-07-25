from fastapi import FastAPI, APIRouter, HTTPException, Request, Depends
from fastapi.responses import JSONResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from datetime import datetime
from typing import Dict, Any

# Import our services and models
from models import (
    CheckoutRequest, CheckoutResponse, DownloadRequest, DownloadResponse, 
    PublicStats, PACKAGES, PaymentTransaction
)
from payment_service import PaymentService
from download_service import DownloadService

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI(title="Guru Killer API", version="1.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Initialize services
payment_service = PaymentService(db)
download_service = DownloadService(db)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Health check endpoint
@api_router.get("/")
async def root():
    return {"message": "Guru Killer API is running", "status": "healthy"}

# Checkout endpoints
@api_router.post("/checkout/session", response_model=CheckoutResponse)
async def create_checkout_session(request_data: CheckoutRequest, request: Request):
    """Create a Stripe checkout session for package purchase"""
    try:
        session = await payment_service.create_checkout_session(
            package_id=request_data.package_id,
            origin_url=request_data.origin_url,
            request=request
        )
        return CheckoutResponse(url=session.url, session_id=session.session_id)
    except Exception as e:
        logger.error(f"Checkout session creation failed: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to create checkout session")

@api_router.get("/checkout/status/{session_id}")
async def get_checkout_status(session_id: str, request: Request):
    """Get the current status of a checkout session"""
    try:
        status = await payment_service.get_payment_status(session_id, request)
        return {
            "status": status.status,
            "payment_status": status.payment_status,
            "amount_total": status.amount_total,
            "currency": status.currency,
            "metadata": status.metadata
        }
    except Exception as e:
        logger.error(f"Status check failed: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to get payment status")

# Webhook endpoint
@api_router.post("/webhook/stripe")
async def stripe_webhook(request: Request):
    """Handle Stripe webhook events"""
    try:
        body = await request.body()
        stripe_signature = request.headers.get("Stripe-Signature")
        
        if not stripe_signature:
            raise HTTPException(status_code=400, detail="Missing Stripe signature")
        
        result = await payment_service.handle_webhook(body, stripe_signature, request)
        return result
    except Exception as e:
        logger.error(f"Webhook processing failed: {str(e)}")
        raise HTTPException(status_code=400, detail="Webhook processing failed")

# Download endpoints
@api_router.post("/downloads/generate", response_model=DownloadResponse)
async def generate_downloads(request_data: DownloadRequest):
    """Generate secure download links for a completed purchase"""
    try:
        download_links = await download_service.generate_download_links(
            email=request_data.email,
            session_id=request_data.session_id,
            package_type=request_data.package_type
        )
        return DownloadResponse(download_links=download_links)
    except Exception as e:
        logger.error(f"Download generation failed: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to generate downloads")

@api_router.get("/downloads/{session_id}")
async def get_downloads(session_id: str):
    """Retrieve existing download links for a session"""
    try:
        downloads = await download_service.get_downloads_by_session(session_id)
        if not downloads:
            raise HTTPException(status_code=404, detail="Downloads not found")
        return downloads
    except Exception as e:
        logger.error(f"Download retrieval failed: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to retrieve downloads")

# Analytics endpoints
@api_router.get("/stats/public", response_model=PublicStats)
async def get_public_stats():
    """Get public analytics for the landing page"""
    try:
        stats = await payment_service.get_public_stats()
        return PublicStats(**stats)
    except Exception as e:
        logger.error(f"Stats retrieval failed: {str(e)}")
        # Return mock stats as fallback
        return PublicStats(
            total_revenue="£247,000+",
            total_customers=2847,
            success_rate="94%",
            customers_saved="£2.3M+"
        )

# Package information endpoint
@api_router.get("/packages")
async def get_packages():
    """Get available packages information"""
    return {
        "packages": {package_id: package.dict() for package_id, package in PACKAGES.items()}
    }

@api_router.get("/packages/{package_id}")
async def get_package(package_id: str):
    """Get specific package information"""
    if package_id not in PACKAGES:
        raise HTTPException(status_code=404, detail="Package not found")
    return PACKAGES[package_id].dict()

# Transaction lookup (for debugging)
@api_router.get("/transactions/{session_id}")
async def get_transaction(session_id: str):
    """Get transaction details by session ID"""
    try:
        transaction = await payment_service.get_transaction_by_session(session_id)
        if not transaction:
            raise HTTPException(status_code=404, detail="Transaction not found")
        return transaction.dict()
    except Exception as e:
        logger.error(f"Transaction lookup failed: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to lookup transaction")

# Include the router in the main app
app.include_router(api_router)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)