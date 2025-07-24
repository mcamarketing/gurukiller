import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { CheckCircle, Download, Mail, ArrowRight, Star, Zap } from 'lucide-react';
import { mockPurchase } from '../mock';

const SuccessPage = ({ email, hasUpsell }) => {
  const [paymentStatus, setPaymentStatus] = useState('checking');
  const [downloadLinks, setDownloadLinks] = useState([]);

  useEffect(() => {
    // Simulate payment status check
    const checkPayment = async () => {
      const sessionId = new URLSearchParams(window.location.search).get('session_id');
      if (sessionId) {
        try {
          const status = await mockPurchase.checkPaymentStatus(sessionId);
          if (status.paymentStatus === 'paid') {
            setPaymentStatus('confirmed');
            // Simulate download links generation
            setTimeout(() => {
              setDownloadLinks([
                { name: 'AI Lead Generation System', url: '#', size: '15 MB' },
                { name: 'Content Creation Automation', url: '#', size: '12 MB' },
                { name: 'Customer Support AI Agent', url: '#', size: '18 MB' },
                { name: 'Sales Funnel Optimizer', url: '#', size: '8 MB' },
                ...(hasUpsell ? [
                  { name: 'Premium Implementation Guide', url: '#', size: '25 MB' },
                  { name: 'Advanced Workflow Templates', url: '#', size: '22 MB' }
                ] : [])
              ]);
            }, 2000);
          }
        } catch (error) {
          setPaymentStatus('error');
        }
      }
    };

    checkPayment();
  }, [hasUpsell]);

  if (paymentStatus === 'checking') {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Confirming your payment...</h2>
          <p className="text-gray-600">This will only take a moment</p>
        </div>
      </div>
    );
  }

  if (paymentStatus === 'error') {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-red-600 mb-4">
            <CheckCircle className="h-16 w-16 mx-auto" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment verification failed</h2>
          <p className="text-gray-600 mb-6">Please contact support if this persists.</p>
          <Button onClick={() => window.location.href = '/'}>
            Return to Homepage
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-emerald-50 border-b border-emerald-200">
        <div className="max-w-4xl mx-auto px-6 py-12 text-center">
          <CheckCircle className="h-20 w-20 text-emerald-600 mx-auto mb-6" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🎉 Welcome to the Revolution!
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            You've just joined thousands of others who refuse to pay the guru tax.
          </p>
          
          {hasUpsell && (
            <div className="bg-white rounded-lg p-4 border border-emerald-200 inline-block">
              <div className="flex items-center gap-2 text-emerald-700">
                <Star className="h-5 w-5" />
                <span className="font-semibold">Premium Package Included</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Downloads */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="h-5 w-5 text-emerald-600" />
                Your Workflows Are Ready
              </CardTitle>
            </CardHeader>
            <CardContent>
              {downloadLinks.length === 0 ? (
                <div className="text-center py-8">
                  <div className="animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
                  </div>
                  <p className="text-gray-600 mt-4">Preparing your downloads...</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {downloadLinks.map((link, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div>
                        <div className="font-medium text-gray-900">{link.name}</div>
                        <div className="text-sm text-gray-500">{link.size}</div>
                      </div>
                      <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-600" />
                What Happens Next
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Check Your Email</div>
                    <div className="text-sm text-gray-600">
                      Download links and setup instructions sent to {email}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Start with Lead Generation</div>
                    <div className="text-sm text-gray-600">
                      Most users see results within 24 hours with this workflow
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-sm font-bold">
                    3
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Track Your Results</div>
                    <div className="text-sm text-gray-600">
                      Share your success story and help others escape the guru tax
                    </div>
                  </div>
                </div>

                {hasUpsell && (
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-yellow-100 text-yellow-700 rounded-full flex items-center justify-center text-sm font-bold">
                      ⭐
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">Premium Support</div>
                      <div className="text-sm text-gray-600">
                        Schedule your 1-on-1 call within 7 days for best results
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Social Proof */}
        <div className="mt-12 bg-gray-50 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            You're Now Part of Something Bigger
          </h3>
          <p className="text-lg text-gray-600 mb-6">
            Join thousands who've already broken free from overpriced guru courses
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-emerald-600">£247K+</div>
              <div className="text-gray-600">Generated by users</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-emerald-600">2,847</div>
              <div className="text-gray-600">People liberated</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-emerald-600">£2.3M</div>
              <div className="text-gray-600">Saved from gurus</div>
            </div>
          </div>
          
          <div className="mt-8">
            <p className="text-gray-700 italic">
              "Every person who gets real automation for £20 becomes proof that you don't need £3,000 courses."
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Ready to implement your first workflow?
          </h3>
          <Button 
            size="lg" 
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3"
            onClick={() => window.scrollTo(0, 0)}
          >
            Start with AI Lead Generation
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;