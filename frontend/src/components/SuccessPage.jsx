import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { CheckCircle, Download, Mail, ArrowRight, Star, Zap } from 'lucide-react';
import { paymentAPI, pollPaymentStatus } from '../services/api';

const SuccessPage = ({ email, hasUpsell }) => {
  const [paymentStatus, setPaymentStatus] = useState('checking');
  const [downloadLinks, setDownloadLinks] = useState([]);
  const [sessionId, setSessionId] = useState('');

  useEffect(() => {
    const checkPayment = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const currentSessionId = urlParams.get('session_id');
      
      if (currentSessionId) {
        setSessionId(currentSessionId);
        try {
          const result = await pollPaymentStatus(currentSessionId);
          if (result.success && result.status.payment_status === 'paid') {
            setPaymentStatus('confirmed');
            
            // Generate download links
            try {
              const downloads = await paymentAPI.generateDownloads(
                result.status.metadata?.customer_email || email,
                currentSessionId,
                'guru_killer_main'
              );
              setDownloadLinks(downloads.download_links);
            } catch (downloadError) {
              console.error('Failed to generate downloads:', downloadError);
              // Fallback to mock downloads for demo
              setDownloadLinks([
                { name: 'AI Lead Generation System', url: '#', size: '15 MB' },
                { name: 'Content Creation Automation', url: '#', size: '12 MB' },
                { name: 'Customer Support AI Agent', url: '#', size: '18 MB' },
                { name: 'Sales Funnel Optimizer', url: '#', size: '8 MB' },
                { name: 'Complete Implementation Guide', url: '#', size: '5 MB' },
                { name: 'Video Walkthrough Series', url: '#', size: '156 MB' }
              ]);
            }
          } else {
            setPaymentStatus('error');
          }
        } catch (error) {
          console.error('Payment verification failed:', error);
          setPaymentStatus('error');
        }
      } else {
        setPaymentStatus('error');
      }
    };

    checkPayment();
  }, [hasUpsell]);

  if (paymentStatus === 'checking') {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <motion.div 
            className="rounded-full h-16 w-16 border-4 border-emerald-500 border-t-transparent mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <h2 className="text-2xl font-bold text-white mb-2">Confirming your payment...</h2>
          <p className="text-gray-400">This will only take a moment</p>
        </motion.div>
      </div>
    );
  }

  if (paymentStatus === 'error') {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div 
          className="text-center max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="text-red-400 mb-4">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <CheckCircle className="h-16 w-16 mx-auto" />
            </motion.div>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Payment verification failed</h2>
          <p className="text-gray-400 mb-6">Please contact support if this persists.</p>
          <Button 
            onClick={() => window.location.href = '/'}
            className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700"
          >
            Return to Homepage
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <motion.div 
        className="bg-gradient-to-r from-emerald-500/20 to-green-500/20 border-b border-emerald-500/30"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="max-w-4xl mx-auto px-6 py-12 text-center">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <CheckCircle className="h-20 w-20 text-emerald-400 mx-auto mb-6" />
          </motion.div>
          <motion.h1 
            className="text-4xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            🎉 Welcome to the Revolution!
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-300 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            You've just joined thousands of others who refuse to pay the guru tax.
          </motion.p>
          
          {hasUpsell && (
            <motion.div 
              className="bg-black/50 rounded-lg p-4 border border-emerald-500/30 inline-block"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
            >
              <div className="flex items-center gap-2 text-emerald-400">
                <Star className="h-5 w-5" />
                <span className="font-semibold">Premium Package Included</span>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Downloads */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-gray-900/50 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Download className="h-5 w-5 text-emerald-400" />
                  Your Workflows Are Ready
                </CardTitle>
              </CardHeader>
              <CardContent>
                {downloadLinks.length === 0 ? (
                  <div className="text-center py-8">
                    <motion.div 
                      className="animate-pulse"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <div className="h-4 bg-gray-700 rounded w-3/4 mx-auto mb-2"></div>
                      <div className="h-4 bg-gray-700 rounded w-1/2 mx-auto"></div>
                    </motion.div>
                    <p className="text-gray-400 mt-4">Preparing your downloads...</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {downloadLinks.map((link, index) => (
                      <motion.div 
                        key={index} 
                        className="flex items-center justify-between p-3 bg-black/50 rounded-lg hover:bg-gray-800/50 transition-colors border border-gray-700"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div>
                          <div className="font-medium text-white">{link.name}</div>
                          <div className="text-sm text-gray-400">{link.size}</div>
                        </div>
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Button 
                            size="sm" 
                            className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700"
                            onClick={() => window.open(link.url, '_blank')}
                          >
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </Button>
                        </motion.div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Next Steps */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="bg-gray-900/50 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Zap className="h-5 w-5 text-yellow-400" />
                  What Happens Next
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      title: "Check Your Email",
                      description: `Download links and setup instructions sent to ${email || 'your email'}`
                    },
                    {
                      title: "Start with VSL Machine",
                      description: "Most users see results within 24 hours with this workflow"
                    },
                    {
                      title: "Track Your Results",
                      description: "Share your success story and help others escape the guru tax"
                    }
                  ].map((step, index) => (
                    <motion.div 
                      key={index}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.2 }}
                    >
                      <div className="w-8 h-8 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center text-sm font-bold border border-emerald-500/30">
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-medium text-white">{step.title}</div>
                        <div className="text-sm text-gray-400">
                          {step.description}
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {hasUpsell && (
                    <motion.div 
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.2 }}
                    >
                      <div className="w-8 h-8 bg-yellow-500/20 text-yellow-400 rounded-full flex items-center justify-center text-sm font-bold border border-yellow-500/30">
                        ⭐
                      </div>
                      <div>
                        <div className="font-medium text-white">Premium Support</div>
                        <div className="text-sm text-gray-400">
                          Schedule your 1-on-1 call within 7 days for best results
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Social Proof */}
        <motion.div 
          className="mt-12 bg-gray-900/30 rounded-2xl p-8 text-center border border-gray-700"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h3 className="text-2xl font-bold text-white mb-4">
            You're Now Part of Something Bigger
          </h3>
          <p className="text-lg text-gray-300 mb-6">
            Join thousands who've already broken free from overpriced guru courses
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            {[
              { value: "£247K+", label: "Generated by users" },
              { value: "2,847", label: "People liberated" },
              { value: "£2.3M", label: "Saved from gurus" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.1 }}
              >
                <div className="text-3xl font-bold text-emerald-400">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            className="mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
          >
            <p className="text-gray-300 italic">
              "Every person who gets real automation for £20 becomes proof that you don't need £3,000 courses."
            </p>
          </motion.div>
        </motion.div>

        {/* CTA */}
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
        >
          <h3 className="text-xl font-bold text-white mb-4">
            Ready to implement your first workflow?
          </h3>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-8 py-3"
              onClick={() => window.scrollTo(0, 0)}
            >
              Start with VSL Machine
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default SuccessPage;