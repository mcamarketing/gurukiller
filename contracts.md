# API Contracts - Guru Killer Platform

## Overview
This document outlines the API contracts for the Guru Killer platform, defining the integration between frontend React app and FastAPI backend with Stripe payment processing.

## Payment Packages

### Main Package - £20
- **ID**: `guru_killer_main`
- **Price**: £20.00 GBP
- **Contents**: 4 AI automation workflows + implementation guides
- **Delivery**: Instant download links via email

### Safety Net Consulting - £125
- **ID**: `guru_killer_consulting` 
- **Price**: £125.00 GBP (75% off £500)
- **Contents**: 1-on-1 implementation session
- **Availability**: Only for main package buyers
- **Delivery**: Booking link + calendar integration

## Frontend Mock Data Integration Points

### Current Mock Data (to be replaced):
```javascript
// mock.js - Remove these and integrate with real APIs
- mockData.testimonials -> Real testimonials from database
- mockData.workflows -> Static content (keep as-is)
- mockData.stats -> Real analytics from payment_transactions
- mockPurchase.processPayment() -> Real Stripe checkout API
- mockPurchase.checkPaymentStatus() -> Real payment status API
```

### API Endpoints to Implement:

#### 1. Create Checkout Session
```
POST /api/checkout/session
Body: {
  package_id: "guru_killer_main" | "guru_killer_consulting",
  origin_url: string (from window.location.origin)
}
Response: {
  url: string (Stripe checkout URL),
  session_id: string
}
```

#### 2. Check Payment Status
```
GET /api/checkout/status/{session_id}
Response: {
  status: "pending" | "complete" | "expired",
  payment_status: "unpaid" | "paid" | "failed",
  amount_total: number,
  currency: string,
  metadata: object
}
```

#### 3. Webhook Handler
```
POST /api/webhook/stripe
Headers: Stripe-Signature
Body: Raw webhook payload
Response: 200 OK
```

#### 4. Generate Download Links
```
POST /api/downloads/generate
Body: {
  email: string,
  session_id: string,
  package_type: "main" | "consulting"
}
Response: {
  download_links: [
    { name: string, url: string, size: string }
  ]
}
```

#### 5. Analytics Stats
```
GET /api/stats/public
Response: {
  total_revenue: string,
  total_customers: number,
  success_rate: string,
  customers_saved: string
}
```

## Database Collections

### payment_transactions
```
{
  _id: ObjectId,
  session_id: string,
  payment_id: string,
  package_id: string,
  amount: float,
  currency: string,
  email: string,
  payment_status: "initiated" | "pending" | "paid" | "failed" | "expired",
  metadata: object,
  created_at: datetime,
  updated_at: datetime
}
```

### downloads
```
{
  _id: ObjectId,
  email: string,
  session_id: string,
  package_type: string,
  download_links: array,
  generated_at: datetime,
  access_expires: datetime
}
```

### testimonials (optional - can start with static)
```
{
  _id: ObjectId,
  name: string,
  role: string,
  avatar_url: string,
  content: string,
  revenue: string,
  timeframe: string,
  is_featured: boolean,
  created_at: datetime
}
```

## Frontend Integration Changes

### 1. Replace Mock Payment Flow
- Remove mockPurchase imports
- Add real API calls to checkout endpoints
- Implement proper error handling
- Add loading states during payment processing

### 2. Update CheckoutModal.jsx
- Add package selection (main vs consulting)
- Implement real Stripe checkout redirect
- Add email validation
- Handle payment processing states

### 3. Update SuccessPage.jsx
- Poll real payment status API
- Generate real download links
- Handle consulting package confirmation
- Add email delivery confirmation

### 4. Add Safety Net Consulting Flow
- Consulting package only available post-main-purchase
- Add "I Got You" guarantee section to landing page
- Implement consulting booking flow
- Calendar integration for session scheduling

## Security Considerations

### Price Protection
- All package prices defined server-side only
- Frontend cannot manipulate amounts
- Package validation on all payment requests

### Email Verification
- Validate email format on both ends
- Store normalized email addresses
- Prevent duplicate session processing

### Download Security
- Time-limited download links (24-48 hours)
- Email-based access verification
- Prevent unauthorized link sharing

## Error Handling

### Payment Failures
- Graceful error messages
- Retry mechanisms
- Support contact information
- Refund process clarity

### API Rate Limiting
- Checkout session creation limits
- Status check polling limits
- Download generation limits

## Success Metrics to Track

### Conversion Funnel
- Landing page views
- Checkout modal opens
- Payment completions
- Download generations
- Consulting upsells

### Revenue Analytics
- Total revenue by package
- Average order value
- Refund rates
- Consulting conversion rates

This contract ensures seamless integration while maintaining the "anti-guru" narrative and premium user experience.