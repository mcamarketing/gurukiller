import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { CheckCircle, Lock, ArrowRight, Zap, Clock, Shield } from 'lucide-react';
import { paymentAPI } from '../services/api';

const CheckoutModal = ({ isOpen, onClose, onSuccess }) => {
  const [email, setEmail] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showUpsell, setShowUpsell] = useState(false);
  const [error, setError] = useState('');

  const handleMainPurchase = async () => {
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    setError('');
    setIsProcessing(true);
    
    try {
      const result = await paymentAPI.createCheckoutSession('guru_killer_main');
      if (result.url) {
        // Redirect to Stripe checkout
        window.location.href = result.url;
      } else {
        setError('Failed to create checkout session. Please try again.');
      }
    } catch (error) {
      console.error('Payment failed:', error);
      setError('Payment processing failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleUpsellAccept = async () => {
    setIsProcessing(true);
    try {
      const result = await paymentAPI.createCheckoutSession('guru_killer_consulting');
      if (result.url) {
        window.location.href = result.url;
      } else {
        setError('Failed to create consulting checkout. Please try again.');
      }
    } catch (error) {
      console.error('Upsell payment failed:', error);
      setError('Consulting checkout failed. Please try again.');
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
      <AnimatePresence>
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent className="max-w-2xl bg-black border-gray-700">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-center text-white">
                  🎉 Payment Successful!
                </DialogTitle>
              </DialogHeader>
              
              <div className="space-y-6">
                <div className="text-center">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <CheckCircle className="h-16 w-16 text-emerald-400 mx-auto mb-4" />
                  </motion.div>
                  <p className="text-lg text-gray-300">
                    Your workflows are being prepared. Check your email in 2 minutes.
                  </p>
                </div>

                <Separator className="bg-gray-700" />

                <motion.div 
                  className="bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-lg p-6 border border-blue-500/30"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      🚀 Special One-Time Offer
                    </h3>
                    <p className="text-gray-300">
                      Since you just proved you're serious about real automation...
                    </p>
                  </div>

                  <Card className="mb-6 bg-gray-900/50 border-gray-600">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between text-white">
                        <span>Premium Implementation Package</span>
                        <Badge className="bg-red-500/20 text-red-400 border-red-500/30">85% OFF</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <CheckCircle className="h-5 w-5 text-emerald-400" />
                          <span className="text-gray-300">1-on-1 implementation call (£500 value)</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <CheckCircle className="h-5 w-5 text-emerald-400" />
                          <span className="text-gray-300">Custom workflow modifications (£800 value)</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <CheckCircle className="h-5 w-5 text-emerald-400" />
                          <span className="text-gray-300">6 months of direct support (£1,200 value)</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <CheckCircle className="h-5 w-5 text-emerald-400" />
                          <span className="text-gray-300">Exclusive advanced workflows (£700 value)</span>
                        </div>
                      </div>
                      
                      <div className="mt-6 p-4 bg-black/50 rounded-lg border border-gray-700">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-sm text-gray-400 line-through">Regular: £3,200</div>
                            <div className="text-2xl font-bold text-emerald-400">Today: £125</div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-gray-400">You save</div>
                            <div className="text-xl font-bold text-red-400">£3,075</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="flex gap-4">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1"
                    >
                      <Button 
                        onClick={handleUpsellAccept}
                        disabled={isProcessing}
                        className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white py-3 text-lg font-semibold"
                      >
                        {isProcessing ? 'Processing...' : 'Yes, Add Premium Package'}
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </motion.div>
                    <Button 
                      onClick={handleUpsellDecline}
                      variant="outline"
                      className="px-8 py-3 border-gray-600 text-gray-300 hover:bg-gray-800"
                    >
                      No Thanks
                    </Button>
                  </div>

                  {error && (
                    <motion.p 
                      className="text-red-400 text-center text-sm"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      {error}
                    </motion.p>
                  )}

                  <p className="text-xs text-gray-400 text-center mt-4">
                    This offer expires when you close this window
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </DialogContent>
        </Dialog>
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md bg-black border-gray-700">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-center text-white">
                Get All Workflows
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6">
              <Card className="border-emerald-500/30 bg-emerald-500/10">
                <CardContent className="p-6">
                  <div className="text-center">
                    <motion.div 
                      className="text-3xl font-bold text-emerald-400 mb-2"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      £20
                    </motion.div>
                    <div className="text-sm text-emerald-300">One-time payment</div>
                  </div>
                  
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-emerald-400" />
                      <span className="text-gray-300">10 Complete VEO Workflows</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-emerald-400" />
                      <span className="text-gray-300">Step-by-step Implementation Guides</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-emerald-400" />
                      <span className="text-gray-300">Video Walkthrough Series</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-emerald-400" />
                      <span className="text-gray-300">30-Day Money Back Guarantee</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="email" className="text-sm font-medium text-gray-300">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError('');
                    }}
                    placeholder="your@email.com"
                    className="mt-1 bg-gray-900 border-gray-600 text-white placeholder-gray-400"
                    required
                  />
                  {error && (
                    <motion.p 
                      className="text-red-400 text-sm mt-1"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      {error}
                    </motion.p>
                  )}
                </div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button 
                    onClick={handleMainPurchase}
                    disabled={!email || isProcessing}
                    className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white py-3 text-lg font-semibold disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="mr-2"
                      >
                        <Zap className="h-4 w-4" />
                      </motion.div>
                    ) : null}
                    {isProcessing ? 'Processing...' : 'Complete Purchase - £20'}
                    {!isProcessing && <Lock className="ml-2 h-4 w-4" />}
                  </Button>
                </motion.div>

                <div className="flex items-center justify-center gap-4 text-xs text-gray-400">
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
          </motion.div>
        </DialogContent>
      </Dialog>
    </AnimatePresence>
  );
};

export default CheckoutModal;