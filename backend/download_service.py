import os
import logging
from typing import List, Optional
from fastapi import HTTPException
from motor.motor_asyncio import AsyncIOMotorClient
from models import DownloadLink, PACKAGES
from datetime import datetime, timedelta
import uuid

logger = logging.getLogger(__name__)

class DownloadService:
    def __init__(self, db: AsyncIOMotorClient):
        self.db = db
    
    async def generate_download_links(self, email: str, session_id: str, package_type: str) -> List[DownloadLink]:
        """Generate secure download links for a completed purchase"""
        try:
            # Verify the purchase exists and is paid
            transaction = await self.db.payment_transactions.find_one({
                "session_id": session_id,
                "payment_status": "paid"
            })
            
            if not transaction:
                raise HTTPException(status_code=404, detail="Payment not found or not completed")
            
            # Verify package exists
            if package_type not in PACKAGES:
                raise HTTPException(status_code=400, detail="Invalid package type")
            
            package = PACKAGES[package_type]
            
            # Generate download links based on package type
            download_links = []
            
            if package_type == "guru_killer_main":
                download_links = [
                    DownloadLink(
                        name="AI Lead Generation System",
                        url=self._generate_secure_url("ai-lead-generation.zip"),
                        size="15 MB"
                    ),
                    DownloadLink(
                        name="Content Creation Automation", 
                        url=self._generate_secure_url("content-automation.zip"),
                        size="12 MB"
                    ),
                    DownloadLink(
                        name="Customer Support AI Agent",
                        url=self._generate_secure_url("support-agent.zip"), 
                        size="18 MB"
                    ),
                    DownloadLink(
                        name="Sales Funnel Optimizer",
                        url=self._generate_secure_url("funnel-optimizer.zip"),
                        size="8 MB"
                    ),
                    DownloadLink(
                        name="Complete Implementation Guide",
                        url=self._generate_secure_url("implementation-guide.pdf"),
                        size="5 MB"
                    ),
                    DownloadLink(
                        name="Video Walkthrough Series",
                        url=self._generate_secure_url("video-walkthroughs.zip"),
                        size="156 MB"
                    )
                ]
            
            elif package_type == "guru_killer_consulting":
                download_links = [
                    DownloadLink(
                        name="Consultation Booking Link",
                        url=self._generate_booking_url(session_id),
                        size="N/A"
                    ),
                    DownloadLink(
                        name="Pre-Session Preparation Guide",
                        url=self._generate_secure_url("pre-session-guide.pdf"),
                        size="2 MB"
                    )
                ]
            
            # Store the generated downloads in database
            download_record = {
                "id": str(uuid.uuid4()),
                "email": email,
                "session_id": session_id,
                "package_type": package_type,
                "download_links": [link.dict() for link in download_links],
                "generated_at": datetime.utcnow(),
                "access_expires": datetime.utcnow() + timedelta(days=30)  # 30-day access
            }
            
            await self.db.downloads.insert_one(download_record)
            
            logger.info(f"Generated download links for session: {session_id}, package: {package_type}")
            
            return download_links
            
        except HTTPException:
            raise
        except Exception as e:
            logger.error(f"Error generating download links: {str(e)}")
            raise HTTPException(status_code=500, detail="Failed to generate download links")
    
    def _generate_secure_url(self, filename: str) -> str:
        """Generate a secure, time-limited download URL"""
        # In production, this would be a signed URL to cloud storage
        # For now, we'll use a mock URL structure
        token = str(uuid.uuid4())
        return f"https://secure-downloads.gurukiller.com/{token}/{filename}?expires={int((datetime.utcnow() + timedelta(hours=48)).timestamp())}"
    
    def _generate_booking_url(self, session_id: str) -> str:
        """Generate a calendar booking URL for consulting sessions"""
        # This would integrate with Calendly, Cal.com, or similar
        return f"https://calendly.com/gurukiller-consulting?session_id={session_id}"
    
    async def get_downloads_by_session(self, session_id: str) -> Optional[dict]:
        """Retrieve existing download record by session ID"""
        try:
            download_record = await self.db.downloads.find_one({"session_id": session_id})
            return download_record
        except Exception as e:
            logger.error(f"Error retrieving downloads: {str(e)}")
            return None
    
    async def verify_download_access(self, email: str, session_id: str) -> bool:
        """Verify user has access to downloads"""
        try:
            # Check if transaction exists and is paid
            transaction = await self.db.payment_transactions.find_one({
                "session_id": session_id,
                "email": email,
                "payment_status": "paid"
            })
            
            if not transaction:
                return False
            
            # Check if downloads haven't expired
            download_record = await self.db.downloads.find_one({"session_id": session_id})
            if download_record and download_record["access_expires"] > datetime.utcnow():
                return True
            
            return bool(transaction)  # Allow re-generation if paid but expired
            
        except Exception as e:
            logger.error(f"Error verifying download access: {str(e)}")
            return False