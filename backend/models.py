from pydantic import BaseModel, Field, EmailStr
from typing import Optional, Dict, List, Any
from datetime import datetime
import uuid

# Payment Transaction Models
class PaymentTransaction(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    session_id: str
    payment_id: Optional[str] = None
    package_id: str
    amount: float
    currency: str = "gbp"
    email: str
    payment_status: str = "initiated"  # initiated, pending, paid, failed, expired
    metadata: Optional[Dict[str, Any]] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class PaymentTransactionCreate(BaseModel):
    session_id: str
    package_id: str
    amount: float
    currency: str = "gbp"
    email: str
    metadata: Optional[Dict[str, Any]] = None

# Checkout Models
class CheckoutRequest(BaseModel):
    package_id: str
    origin_url: str

class CheckoutResponse(BaseModel):
    url: str
    session_id: str

# Download Models
class DownloadLink(BaseModel):
    name: str
    url: str
    size: str

class DownloadRequest(BaseModel):
    email: str
    session_id: str
    package_type: str

class DownloadResponse(BaseModel):
    download_links: List[DownloadLink]

# Analytics Models
class PublicStats(BaseModel):
    total_revenue: str
    total_customers: int
    success_rate: str
    customers_saved: str

# Package Configuration
class PackageConfig(BaseModel):
    id: str
    name: str
    price: float
    currency: str
    description: str
    contents: List[str]
    available_to: Optional[str] = None  # None for all, "main_buyers" for consulting

# Define available packages
PACKAGES = {
    "guru_killer_main": PackageConfig(
        id="guru_killer_main",
        name="Guru Killer Automation Workflows",
        price=20.00,
        currency="gbp",
        description="4 complete AI automation workflows + implementation guides",
        contents=[
            "AI Lead Generation System",
            "Content Creation Automation", 
            "Customer Support AI Agent",
            "Sales Funnel Optimizer",
            "Step-by-step Implementation Guides",
            "Video Walkthroughs",
            "Troubleshooting Documentation"
        ]
    ),
    "guru_killer_consulting": PackageConfig(
        id="guru_killer_consulting", 
        name="I Got You Implementation Session",
        price=125.00,
        currency="gbp",
        description="1-on-1 implementation session (75% off £500)",
        contents=[
            "1-hour screen-share implementation",
            "Custom troubleshooting",
            "Personal guidance until it works",
            "Direct access via calendar booking"
        ],
        available_to="main_buyers"
    )
}