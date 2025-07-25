import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Separator } from './ui/separator';
import { 
  Clock, 
  Users, 
  TrendingUp, 
  Shield, 
  CheckCircle, 
  AlertTriangle,
  Zap,
  Target,
  ArrowRight,
  Star,
  Timer
} from 'lucide-react';
import { paymentAPI } from '../services/api';

const LandingPage = ({ onPurchaseClick }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 6,
    hours: 23,
    minutes: 45,
    seconds: 30
  });
  const [stats, setStats] = useState({
    total_revenue: "£247,000+",
    total_customers: 2847,
    success_rate: "94%",
    customers_saved: "£2.3M+"
  });
  const [isLoadingStats, setIsLoadingStats] = useState(true);

  // Load real stats from API
  useEffect(() => {
    const loadStats = async () => {
      try {
        const realStats = await paymentAPI.getPublicStats();
        setStats(realStats);
      } catch (error) {
        console.error('Failed to load stats:', error);
        // Keep mock stats as fallback
      } finally {
        setIsLoadingStats(false);
      }
    };

    loadStats();
  }, []);

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Static data that doesn't change
  const testimonials = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Digital Marketing Agency Owner",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
      content: "Finally, someone who gives you the actual tools instead of selling you the dream of tools. I wasted £5K on courses. This £20 pack taught me more than all of them combined.",
      revenue: "£47,000",
      timeframe: "7 days"
    },
    {
      id: 2,
      name: "Marcus Rodriguez",
      role: "Freelance Consultant",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      content: "The gurus should be worried. This is what real value looks like. No 12-week courses, no £500/hour calls. Just systems that actually work.",
      revenue: "£23,500",
      timeframe: "14 days"
    },
    {
      id: 3,
      name: "Emma Thompson",
      role: "E-commerce Entrepreneur",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      content: "I've bought every guru course out there. This £20 package has more actionable content than courses I paid £3,000 for. It's not even close.",
      revenue: "£31,200",
      timeframe: "10 days"
    }
  ];

  const workflows = [
    {
      id: 1,
      title: "🎯 The Hypnotic VSL Machine",
      description: "Creates high-converting video sales letters automatically. Input your offer, get a professional VSL in minutes.",
      revenue: "£15,000+",
      timeToImplement: "20 minutes",
      complexity: "Beginner"
    },
    {
      id: 2,
      title: "💰 The £47K Product Showcase Engine", 
      description: "Turns boring product descriptions into cinematic showcases. This is the workflow that generated £47K in one week.",
      revenue: "£47,000+",
      timeToImplement: "25 minutes",
      complexity: "Beginner",
      highlight: true
    },
    {
      id: 3,
      title: "⚡ The Authority Quote Weaponizer",
      description: "Transforms quotes into shareable, branded video content. Perfect for thought leadership and social proof.",
      revenue: "£8,500+",
      timeToImplement: "15 minutes",
      complexity: "Beginner"
    },
    {
      id: 4,
      title: "🌀 The Reality Bender Storyteller",
      description: "Creates engaging 'what if' content that hooks audiences. Builds emotional connection through alternate narratives.",
      revenue: "£12,300+",
      timeToImplement: "30 minutes",
      complexity: "Intermediate"
    },
    {
      id: 5,
      title: "🎭 The Mind-Hook Mystery Generator",
      description: "Creates conspiracy-style documentary content that goes viral. Drives massive engagement through intrigue.",
      revenue: "£18,200+",
      timeToImplement: "35 minutes",
      complexity: "Intermediate"
    },
    {
      id: 6,
      title: "🚀 The Local Empire Builder",
      description: "Automated commercial creation for local businesses. Perfect for agency services or your own ventures.",
      revenue: "£22,000+",
      timeToImplement: "40 minutes",
      complexity: "Advanced"
    },
    {
      id: 7,
      title: "🔥 The Algorithm Hijacker",
      description: "Mass-produces trending, platform-optimized content. Hooks, storytelling, and CTAs all automated for virality.",
      revenue: "£25,000+",
      timeToImplement: "45 minutes",
      complexity: "Advanced"
    },
    {
      id: 8,
      title: "🎬 The Hollywood B-Roll Thief",
      description: "Automatically sources and edits cinematic footage. Professional video production without the costs.",
      revenue: "£16,500+",
      timeToImplement: "50 minutes",
      complexity: "Advanced"
    },
    {
      id: 9,
      title: "🚫 The Platform Destroyer (FORBIDDEN)",
      description: "The workflow that got me a cease & desist letter. Automates something platforms explicitly prohibit. Use at your own risk.",
      revenue: "???",
      timeToImplement: "Unknown",
      complexity: "CLASSIFIED",
      forbidden: true
    },
    {
      id: 10,
      title: "💀 The Agency Killer (ULTRA SECRET)",
      description: "So powerful, agencies offered me £10K to bury it. Only 3 people have ever seen this workflow. Changes everything forever.",
      revenue: "CLASSIFIED",
      timeToImplement: "CLASSIFIED",
      complexity: "ULTRA SECRET",
      secret: true
    }
  ];

  const guruComparison = [
    {
      category: "Price",
      them: "£3,000 - £5,000",
      us: "£20 (83x cheaper)"
    },
    {
      category: "Time to Value",
      them: "12 weeks of theory",
      us: "Instant implementation"
    },
    {
      category: "Ongoing Costs",
      them: "Monthly mastermind fees",
      us: "Pay once, own forever"
    },
    {
      category: "Support",
      them: "£500/hour consultation",
      us: "Complete documentation included"
    },
    {
      category: "Results",
      them: "Maybe you'll figure it out",
      us: "Proven £47K+ results"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-xl border-b border-gray-100 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              GuruKiller
            </div>
            <Button 
              onClick={onPurchaseClick}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-2 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Get Workflows £20
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-4xl mx-auto">
          <Badge className="mb-8 bg-red-50 text-red-700 border-red-200 px-4 py-2 text-sm font-medium">
            ⚡ Ending July 31st - Then Gone Forever
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-8">
            I'm Putting{' '}
            <span className="bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
              £5,000
            </span>{' '}
            Video Agency "Gurus" Out of Business
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed max-w-3xl mx-auto">
            Stop paying thousands for "video marketing courses." Get the exact VEO + AI workflows that generate viral content and convert viewers into buyers — for just £20.
          </p>
          
          <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl p-8 mb-12 border-2 border-emerald-200">
            <p className="text-2xl font-bold text-emerald-800 mb-4">One user made £47,000 in 7 days using workflow #3.</p>
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div className="bg-white rounded-lg p-4 border border-emerald-200">
                <div className="text-lg font-bold text-gray-900">Video agencies charge</div>
                <div className="text-2xl font-bold text-red-600">£5,000+</div>
                <div className="text-sm text-gray-600">for this level of automation</div>
              </div>
              <div className="bg-white rounded-lg p-4 border border-emerald-200">
                <div className="text-lg font-bold text-gray-900">Social media gurus sell</div>
                <div className="text-2xl font-bold text-red-600">£3,000</div>
                <div className="text-sm text-gray-600">courses on "content creation"</div>
              </div>
              <div className="bg-white rounded-lg p-4 border border-emerald-200">
                <div className="text-lg font-bold text-gray-900">You get the actual</div>
                <div className="text-2xl font-bold text-emerald-600">£20</div>
                <div className="text-sm text-gray-600">working systems (this week only)</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-16">
            <Button 
              onClick={onPurchaseClick}
              size="lg" 
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-12 py-4 text-xl font-bold rounded-full transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl"
            >
              Get All 10 VEO Workflows - £20
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <div className="flex items-center gap-2 text-gray-600">
              <Shield className="h-5 w-5" />
              <span>30-day money-back guarantee</span>
            </div>
          </div>

          {/* Countdown Timer */}
          <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-8 border border-red-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">This offer expires in:</h3>
            <div className="flex justify-center gap-6">
              {Object.entries(timeLeft).map(([unit, value]) => (
                <div key={unit} className="text-center">
                  <div className="bg-white rounded-lg px-4 py-3 shadow-lg border border-red-100">
                    <div className="text-3xl font-bold text-red-600">{value.toString().padStart(2, '0')}</div>
                    <div className="text-sm text-gray-600 capitalize">{unit}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className={`text-4xl font-bold text-gray-900 mb-2 ${isLoadingStats ? 'animate-pulse' : ''}`}>
                {stats.total_revenue}
              </div>
              <div className="text-gray-600">Generated by Users</div>
            </div>
            <div>
              <div className={`text-4xl font-bold text-gray-900 mb-2 ${isLoadingStats ? 'animate-pulse' : ''}`}>
                {typeof stats.total_customers === 'number' ? stats.total_customers.toLocaleString() : stats.total_customers}
              </div>
              <div className="text-gray-600">Happy Customers</div>
            </div>
            <div>
              <div className={`text-4xl font-bold text-gray-900 mb-2 ${isLoadingStats ? 'animate-pulse' : ''}`}>
                {stats.success_rate}
              </div>
              <div className="text-gray-600">Success Rate</div>
            </div>
            <div>
              <div className={`text-4xl font-bold text-gray-900 mb-2 ${isLoadingStats ? 'animate-pulse' : ''}`}>
                {stats.customers_saved}
              </div>
              <div className="text-gray-600">Saved from Gurus</div>
            </div>
          </div>
        </div>
      </section>

      {/* Workflow Previews */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            The 10 VEO & AI Video Workflows
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Not theory. Not courses. Not "frameworks." Real, working video automation systems 
            that generate viral content and convert viewers into buyers immediately.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {workflows.map((workflow) => (
            <Card key={workflow.id} className="p-8 hover:shadow-xl transition-all duration-300 border-2 hover:border-emerald-200">
              <CardHeader className="p-0 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <Badge className={`
                    ${workflow.complexity === 'Beginner' ? 'bg-green-100 text-green-700' : 
                      workflow.complexity === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' : 
                      'bg-red-100 text-red-700'}
                  `}>
                    {workflow.complexity}
                  </Badge>
                  <div className="text-2xl font-bold text-emerald-600">{workflow.revenue}</div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{workflow.title}</h3>
              </CardHeader>
              <CardContent className="p-0">
                <p className="text-gray-600 mb-6 leading-relaxed">{workflow.description}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <Timer className="h-4 w-4" />
                    <span>{workflow.timeToImplement}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    <span>Revenue Potential</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Guru Comparison */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Here's What's Really Happening
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              This isn't competition. This is disruption.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg border">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-sm font-medium text-gray-500 mb-2">THEM (The Gurus)</div>
                <div className="h-1 bg-red-200 rounded mb-4"></div>
              </div>
              <div className="text-center">
                <div className="text-sm font-medium text-gray-500 mb-2">COMPARISON</div>
                <div className="h-1 bg-gray-200 rounded mb-4"></div>
              </div>
              <div className="text-center">
                <div className="text-sm font-medium text-gray-500 mb-2">ME (Real Value)</div>
                <div className="h-1 bg-emerald-200 rounded mb-4"></div>
              </div>
            </div>

            {guruComparison.map((item, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-8 py-6 border-b border-gray-100 last:border-b-0">
                <div className="text-center md:text-left">
                  <div className="text-red-600 font-medium">{item.them}</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-gray-900">{item.category}</div>
                </div>
                <div className="text-center md:text-right">
                  <div className="text-emerald-600 font-medium">{item.us}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Real Results, Real People
          </h2>
          <p className="text-xl text-gray-600">
            Not staged testimonials. Not theoretical case studies. Real users, real revenue.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="p-8 hover:shadow-xl transition-all duration-300">
              <CardContent className="p-0">
                <div className="flex items-center gap-4 mb-6">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-bold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 leading-relaxed italic">"{testimonial.content}"</p>
                </div>
                
                <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-200">
                  <div className="text-2xl font-bold text-emerald-600">{testimonial.revenue}</div>
                  <div className="text-sm text-emerald-700">Generated in {testimonial.timeframe}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Why £20 Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
            "If these are worth £5,000+, why sell for £20?"
          </h2>
          
          <div className="bg-white rounded-2xl p-8 shadow-lg border mb-8">
            <p className="text-2xl font-bold text-gray-900 mb-4">Simple.</p>
            <p className="text-xl text-gray-700 leading-relaxed mb-6">
              I'm not trying to maximize profit. I'm trying to maximize damage to an industry built on artificial scarcity.
            </p>
            
            <div className="bg-emerald-50 rounded-lg p-6 border border-emerald-200">
              <p className="text-lg text-gray-800 leading-relaxed">
                Every person who gets real automation for £20 becomes proof that you don't need £3,000 courses. 
                Results matter more than marketing. <strong>The emperor has no clothes.</strong>
              </p>
            </div>
          </div>
          
          <p className="text-xl text-gray-600 mb-8">
            This is economic warfare against overpriced education. You're not just buying workflows — you're joining a movement.
          </p>
          
          <Button 
            onClick={onPurchaseClick}
            size="lg" 
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-12 py-4 text-xl font-bold rounded-full transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl"
          >
            Join the Revolution - £20
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* I Got You Safety Net Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-12 border border-blue-200">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <Shield className="h-16 w-16 text-blue-600 mx-auto mb-4" />
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                "I Know What You're Thinking..."
              </h2>
              <p className="text-xl text-gray-600 italic mb-6">
                'What if I can't figure this out? What if I'm not technical enough?'
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 mb-8 text-left">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Here's the thing - I've made this as simple as humanly possible. But I also know the gurus are counting on you to fail with DIY solutions. They <strong>WANT</strong> you to struggle so you come crawling back to their £3,000 courses.
              </p>
              
              <p className="text-2xl font-bold text-gray-900 mb-4 text-center">
                I refuse to let that happen.
              </p>
              
              <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200 mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">🛡️ "I Got You" Guarantee</h3>
                <p className="text-gray-700 mb-4">
                  If you truly can't implement these workflows despite all the guides, videos, and documentation... I got you.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6 text-center">
                  <div>
                    <div className="text-lg text-gray-600 line-through">My normal consulting: £500/hour</div>
                    <div className="text-3xl font-bold text-emerald-600">Your price: £125</div>
                    <div className="text-sm text-emerald-700">(75% off - workflow buyers only)</div>
                  </div>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-emerald-600" />
                      <span>Screen-share setup session</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-emerald-600" />
                      <span>Custom troubleshooting</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-emerald-600" />
                      <span>Personal guidance until it works</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <p className="text-center text-gray-600 italic">
                That's 75% off because I'd rather lose money helping you win than let the gurus profit from your struggle.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-12 text-center text-white">
          <div className="max-w-3xl mx-auto">
            <AlertTriangle className="h-16 w-16 text-yellow-400 mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              After July 31, this goes away forever.
            </h2>
            <p className="text-xl mb-8 text-gray-300 leading-relaxed">
              Not because of fake scarcity, but because the mission will be complete. 
              Enough people will know what real automation actually costs. The market will never be the same.
            </p>
            <p className="text-lg mb-8 text-gray-400">
              The gurus know this is coming. They're probably watching this page, figuring out their response. 
              Some will lower their prices. Others will double down on the hype.
            </p>
            <p className="text-2xl font-bold mb-8">
              Either way, the game is changing. You can be part of the change, or you can keep paying the guru tax.
            </p>
            <Button 
              onClick={onPurchaseClick}
              size="lg" 
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-12 py-4 text-xl font-bold rounded-full transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl"
            >
              Your Choice - Get Workflows Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-4">
              GuruKiller
            </div>
            <p className="text-gray-600 mb-8">Real automation. Real results. Real prices.</p>
            
            <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-600" />
                <span>No upsells to £10K masterminds</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-600" />
                <span>No recurring monthly fees</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-600" />
                <span>No "implementation calls" at £500/hour</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-600" />
                <span>Just workflows that work, priced honestly</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;