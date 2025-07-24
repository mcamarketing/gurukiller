import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { CheckCircle, Lock, ArrowRight, Zap, Clock, Shield } from 'lucide-react';
import { mockPurchase } from '../mock';

const CheckoutModal = ({ isOpen, onClose, onSuccess }) => {
  const [email, setEmail] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showUpsell, setShowUpsell] = useState(false);

  const handleMainPurchase = async () => {
    if (!email) return;
    
    setIsProcessing(true);
    
    try {
      const result = await mockPurchase.processPayment(email, 'main');
      if (result.success) {
        setShowUpsell(true);
      }
    } catch (error) {
      console.error('Payment failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleUpsellAccept = async () => {
    setIsProcessing(true);
    try {
      const result = await mockPurchase.processPayment(email, 'upsell');
      if (result.success) {
        onSuccess(email, true); // true indicates upsell accepted
        onClose();
      }
    } catch (error) {
      console.error('Upsell payment failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleUpsellDecline = () => {
    onSuccess(email, false); // false indicates upsell declined
    onClose();
  };

  if (showUpsell) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center text-gray-900">
              🎉 Payment Successful!
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            <div className="text-center">
              <CheckCircle className="h-16 w-16 text-emerald-600 mx-auto mb-4" />
              <p className="text-lg text-gray-600">
                Your workflows are being prepared. Check your email in 2 minutes.
              </p>
            </div>

            <Separator />

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  🚀 Special One-Time Offer
                </h3>
                <p className="text-gray-600">
                  Since you just proved you're serious about real automation...
                </p>
              </div>

              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Premium Implementation Package</span>
                    <Badge className="bg-red-100 text-red-700">85% OFF</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-emerald-600" />
                      <span>1-on-1 implementation call (£500 value)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-emerald-600" />
                      <span>Custom workflow modifications (£800 value)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-emerald-600" />
                      <span>6 months of direct support (£1,200 value)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-emerald-600" />
                      <span>Exclusive advanced workflows (£700 value)</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-white rounded-lg border">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-gray-500 line-through">Regular: £3,200</div>
                        <div className="text-2xl font-bold text-emerald-600">Today: £497</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-500">You save</div>
                        <div className="text-xl font-bold text-red-600">£2,703</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-4">
                <Button 
                  onClick={handleUpsellAccept}
                  disabled={isProcessing}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-3 text-lg font-semibold"
                >
                  {isProcessing ? 'Processing...' : 'Yes, Add Premium Package'}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  onClick={handleUpsellDecline}
                  variant="outline"
                  className="px-8 py-3"
                >
                  No Thanks
                </Button>
              </div>

              <p className="text-xs text-gray-500 text-center mt-4">
                This offer expires when you close this window
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-gray-900">
            Get All Workflows
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <Card className="border-emerald-200 bg-emerald-50">
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-600 mb-2">£20</div>
                <div className="text-sm text-emerald-700">One-time payment</div>
              </div>
              
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-emerald-600" />
                  <span>4 Complete Automation Workflows</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-emerald-600" />
                  <span>Step-by-step Implementation Guides</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-emerald-600" />
                  <span>Instant Download Access</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-emerald-600" />
                  <span>30-Day Money Back Guarantee</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="mt-1"
                required
              />
            </div>

            <Button 
              onClick={handleMainPurchase}
              disabled={!email || isProcessing}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 text-lg font-semibold"
            >
              {isProcessing ? 'Processing...' : 'Complete Purchase - £20'}
              <Lock className="ml-2 h-4 w-4" />
            </Button>

            <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
              <div className="flex items-center gap-1">
                <Shield className="h-3 w-3" />
                <span>Secure Payment</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                <span>Instant Access</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutModal;