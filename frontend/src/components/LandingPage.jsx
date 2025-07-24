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
import { mockData } from '../mock';

const LandingPage = ({ onPurchaseClick }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 6,
    hours: 23,
    minutes: 45,
    seconds: 30
  });

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
            I spent{' '}
            <span className="bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
              £15,000
            </span>{' '}
            learning what you'll get for{' '}
            <span className="bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent">
              £20
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed max-w-3xl mx-auto">
            The AI automation gurus are charging thousands for basic workflows you can implement in minutes. 
            They've turned simple tools into complex courses, created artificial barriers around public information, 
            and built empires selling dreams instead of systems.
          </p>
          
          <div className="bg-gray-50 rounded-2xl p-8 mb-12 border-2 border-gray-100">
            <p className="text-2xl font-bold text-gray-900 mb-4">I'm done with it.</p>
            <p className="text-lg text-gray-700 leading-relaxed">
              These are the exact workflows I use. The ones that generated{' '}
              <span className="font-bold text-emerald-600">£47K for one user in 7 days</span>. 
              The ones that save hundreds of hours. The ones they'd charge you £3,000 to learn about.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-16">
            <Button 
              onClick={onPurchaseClick}
              size="lg" 
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-12 py-4 text-xl font-bold rounded-full transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl"
            >
              Get All Workflows for £20
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
              <div className="text-4xl font-bold text-gray-900 mb-2">{mockData.stats.totalRevenue}</div>
              <div className="text-gray-600">Generated by Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gray-900 mb-2">{mockData.stats.averageImplementation}</div>
              <div className="text-gray-600">Avg Implementation</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gray-900 mb-2">{mockData.stats.successRate}</div>
              <div className="text-gray-600">Success Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gray-900 mb-2">{mockData.stats.customersSaved}</div>
              <div className="text-gray-600">Saved from Gurus</div>
            </div>
          </div>
        </div>
      </section>

      {/* Workflow Previews */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            What You Actually Get
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Not theory. Not courses. Not "frameworks." Real, working automation systems 
            that you can implement in minutes and start generating revenue immediately.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {mockData.workflows.map((workflow) => (
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

            {mockData.guruComparison.map((item, index) => (
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
          {mockData.testimonials.map((testimonial) => (
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