import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
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
  Timer,
  Lock,
  ChevronDown,
  Play,
  X
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
  const [showStickyButton, setShowStickyButton] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [currentTicker, setCurrentTicker] = useState(0);

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  // Load real stats from API
  useEffect(() => {
    const loadStats = async () => {
      try {
        const realStats = await paymentAPI.getPublicStats();
        setStats(realStats);
      } catch (error) {
        console.error('Failed to load stats:', error);
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

  // Sticky button visibility
  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = heroRef.current?.offsetHeight || 0;
      setShowStickyButton(window.scrollY > heroHeight);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Social proof ticker rotation
  useEffect(() => {
    const tickerTimer = setInterval(() => {
      setCurrentTicker(prev => (prev + 1) % socialProofTicker.length);
    }, 3000);

    return () => clearInterval(tickerTimer);
  }, []);

  const socialProofTicker = [
    "Just Unlocked: The Platform Destroyer — London, 3:17AM",
    "New Purchase: Agency Killer Workflow — Manchester, 2:43AM", 
    "Download Complete: £47K Product Engine — Birmingham, 1:22AM",
    "Access Granted: Forbidden VSL Machine — Edinburgh, 4:15AM",
    "Workflow Activated: Reality Bender — Cardiff, 2:58AM"
  ];

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
      them: "£5,000+ for basic video automation",
      us: "£20 for 10 advanced workflows"
    },
    {
      category: "Content Strategy",
      them: "£3,000 courses on 'content strategy'",
      us: "Actual content-generating systems"
    },
    {
      category: "Video Consultation",
      them: "£500/hour for 'video consultation'",
      us: "Everything you need, ready to run"
    },
    {
      category: "Learning Time",
      them: "Months to learn video editing",
      us: "Automated video creation in minutes"
    },
    {
      category: "Software & Team",
      them: "Still need expensive software/team",
      us: "Works with free and low-cost tools"
    },
    {
      category: "Templates",
      them: "Generic templates everyone uses",
      us: "Custom, algorithm-optimized content"
    }
  ];

  const faqData = [
    {
      question: "Are these actually working workflows or just theory?",
      answer: "These are complete, working automation systems. Each workflow includes the exact prompts, tools, and step-by-step processes I use. One user generated £47,000 in 7 days using workflow #3. These aren't concepts - they're battle-tested systems."
    },
    {
      question: "Do I need technical skills to implement these?",
      answer: "No. These workflows are designed for non-technical users. If you can copy and paste, you can implement them. Each comes with detailed guides, screenshots, and video walkthroughs. Most take 15-45 minutes to set up."
    },
    {
      question: "What if I can't get them working?",
      answer: "That's what the 'I Got You' guarantee is for. If you genuinely can't implement these despite the guides, you can book a 1-on-1 session with me for £125 (75% off my normal £500 rate). I'll personally help you get them running."
    },
    {
      question: "Why only £20 if these are worth thousands?",
      answer: "I'm not trying to maximize profit - I'm trying to maximize damage to the guru industry. Every person who gets real automation for £20 becomes proof that you don't need £3,000 courses. This is economic warfare against overpriced education."
    },
    {
      question: "Will these work in my industry/niche?",
      answer: "Yes. These workflows are designed to be adaptable across industries. The core automation principles work whether you're in fitness, business, e-commerce, or any other niche. The guides show you how to customize them for your specific market."
    },
    {
      question: "What happens after July 31st?",
      answer: "This offer disappears forever. Not fake scarcity - real scarcity. Once enough people have these workflows, the mission is complete. The market will never be the same, and there's no reason to keep selling them at this price."
    }
  ];

  const valueStackItems = [
    { name: "10 Complete VEO Workflows", value: 5000 },
    { name: "Step-by-Step Implementation Guides", value: 1500 },
    { name: "Video Walkthrough Series", value: 2000 },
    { name: "Troubleshooting Documentation", value: 800 },
    { name: "Lifetime Updates", value: 1200 },
    { name: "30-Day Money Back Guarantee", value: 500 }
  ];

  const totalValue = valueStackItems.reduce((sum, item) => sum + item.value, 0);

  const FlipDigit = ({ digit }) => (
    <motion.div
      key={digit}
      initial={{ rotateX: -90 }}
      animate={{ rotateX: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-gray-900 text-white rounded-lg px-3 py-2 text-2xl font-bold min-w-[3rem] text-center border border-gray-700"
    >
      {digit.toString().padStart(2, '0')}
    </motion.div>
  );

  const WorkflowCard = ({ workflow, index }) => {
    const [ref, inView] = useInView({
      threshold: 0.1,
      triggerOnce: true
    });

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        whileHover={{ 
          y: -10,
          transition: { duration: 0.3 }
        }}
        className="group"
      >
        <Card className={`h-full p-6 hover:shadow-2xl transition-all duration-500 border-2 relative overflow-hidden ${
          workflow.highlight ? 'border-emerald-300 bg-emerald-50' :
          workflow.forbidden ? 'border-red-300 bg-red-50' :
          workflow.secret ? 'border-purple-300 bg-purple-50' :
          'hover:border-emerald-200 border-gray-200'
        }`}>
          {(workflow.forbidden || workflow.secret) && (
            <motion.div
              animate={{ 
                boxShadow: [
                  '0 0 0 rgba(239, 68, 68, 0.4)',
                  '0 0 20px rgba(239, 68, 68, 0.6)',
                  '0 0 0 rgba(239, 68, 68, 0.4)'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute top-4 right-4"
            >
              <Lock className={`h-6 w-6 ${workflow.forbidden ? 'text-red-600' : 'text-purple-600'}`} />
            </motion.div>
          )}
          
          <CardHeader className="p-0 mb-6">
            <div className="flex items-center justify-between mb-4">
              <Badge className={`
                ${workflow.complexity === 'Beginner' ? 'bg-green-100 text-green-700' : 
                  workflow.complexity === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                  workflow.complexity === 'Advanced' ? 'bg-red-100 text-red-700' :
                  workflow.complexity === 'CLASSIFIED' ? 'bg-red-200 text-red-800' :
                  'bg-purple-200 text-purple-800'}
              `}>
                {workflow.complexity}
              </Badge>
              <motion.div 
                className={`text-2xl font-bold ${
                  workflow.highlight ? 'text-emerald-600' :
                  workflow.forbidden ? 'text-red-600' :
                  workflow.secret ? 'text-purple-600' :
                  'text-emerald-600'
                }`}
                whileHover={{ scale: 1.1 }}
              >
                {workflow.revenue}
              </motion.div>
            </div>
            
            <motion.h3 
              className="text-xl font-bold text-gray-900 mb-2"
              whileHover={{ x: 5 }}
            >
              {workflow.title}
            </motion.h3>
            
            {workflow.highlight && (
              <motion.div 
                className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-medium inline-block"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ⭐ The £47K Workflow
              </motion.div>
            )}
            {workflow.forbidden && (
              <div className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium inline-block">
                ⚠️ Cease & Desist Received
              </div>
            )}
            {workflow.secret && (
              <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium inline-block">
                🔒 Only 3 People Have Seen This
              </div>
            )}
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
          
          {/* Hover overlay with demo preview */}
          <motion.div
            className="absolute inset-0 bg-black bg-opacity-90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
          >
            <div className="text-center text-white">
              <Play className="h-12 w-12 mx-auto mb-2" />
              <p className="text-sm">Preview Demo</p>
            </div>
          </motion.div>
        </Card>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Animated Background */}
      <motion.div
        className="fixed inset-0 opacity-10"
        style={{ y: backgroundY }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-transparent to-purple-500/20" />
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(circle at 20% 50%, rgba(16, 185, 129, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 50%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)',
              'radial-gradient(circle at 40% 80%, rgba(16, 185, 129, 0.1) 0%, transparent 50%)',
            ]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-xl border-b border-gray-800 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-purple-400 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
            >
              GuruKiller
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                onClick={onPurchaseClick}
                className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-8 py-2 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-emerald-500/25"
              >
                Get Workflows £20
              </Button>
            </motion.div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="pt-32 pb-20 px-6 max-w-4xl mx-auto relative">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <Badge className="bg-red-500/20 text-red-400 border-red-500/30 px-4 py-2 text-sm font-medium">
              ⚡ Ending July 31st - Then Gone Forever
            </Badge>
          </motion.div>
          
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Here's how over{' '}
            <motion.span 
              className="bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent"
              animate={{ 
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              five hundred creators
            </motion.span>{' '}
            are making a killing on social media every week
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            And how you can do it too without wasting thousands on agencies, learning complex tech, or gambling on luck.
          </motion.p>
          
          <motion.div 
            className="bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-2xl p-6 mb-8 border border-emerald-500/30"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.p 
              className="text-2xl font-bold text-emerald-400 mb-4"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              One user made £47,000 in just seven days using workflow three.
            </motion.p>
            
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div className="bg-black/50 rounded-lg p-4 border border-gray-700">
                <div className="text-lg font-bold text-white">Video agencies charge</div>
                <div className="text-2xl font-bold text-red-400">£5,000+</div>
                <div className="text-sm text-gray-400">for this level of automation</div>
              </div>
              <div className="bg-black/50 rounded-lg p-4 border border-gray-700">
                <div className="text-lg font-bold text-white">Social media gurus sell</div>
                <div className="text-2xl font-bold text-red-400">£3,000</div>
                <div className="text-sm text-gray-400">courses on "content creation"</div>
              </div>
              <div className="bg-black/50 rounded-lg p-4 border border-gray-700">
                <div className="text-lg font-bold text-white">You get the actual</div>
                <div className="text-2xl font-bold text-emerald-400">£20</div>
                <div className="text-sm text-gray-400">working systems (this week only)</div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="flex flex-col md:flex-row items-center justify-center gap-6 mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                onClick={onPurchaseClick}
                size="lg" 
                className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-12 py-4 text-xl font-bold rounded-full transition-all duration-300 shadow-2xl hover:shadow-emerald-500/25 relative overflow-hidden group"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  whileHover={{
                    background: [
                      'linear-gradient(45deg, rgba(16, 185, 129, 0.8), rgba(5, 150, 105, 0.8))',
                      'linear-gradient(45deg, rgba(5, 150, 105, 0.8), rgba(16, 185, 129, 0.8))'
                    ]
                  }}
                  transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                />
                <span className="relative z-10 flex items-center">
                  Get All 10 VEO Workflows — £20
                  <ArrowRight className="ml-2 h-5 w-5" />
                </span>
              </Button>
            </motion.div>
            
            <div className="flex items-center gap-2 text-gray-400">
              <Shield className="h-5 w-5" />
              <span>30-day money-back guarantee</span>
            </div>
          </motion.div>

          {/* Countdown Timer */}
          <motion.div 
            className="bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-2xl p-6 border border-red-500/30"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <h3 className="text-2xl font-bold text-white mb-4">This offer expires in:</h3>
            <div className="flex justify-center gap-4">
              {Object.entries(timeLeft).map(([unit, value]) => (
                <div key={unit} className="text-center">
                  <FlipDigit digit={value} />
                  <div className="text-sm text-gray-400 capitalize mt-2">{unit}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Social Proof Ticker */}
      <section className="py-8 border-y border-gray-800 bg-gray-900/50">
        <div className="overflow-hidden">
          <motion.div
            className="flex items-center justify-center"
            key={currentTicker}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 text-emerald-400">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="font-mono text-sm">
                {socialProofTicker[currentTicker]}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-900/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: "Generated by Users", value: stats.total_revenue },
              { label: "Happy Customers", value: typeof stats.total_customers === 'number' ? stats.total_customers.toLocaleString() : stats.total_customers },
              { label: "Success Rate", value: stats.success_rate },
              { label: "Saved from Gurus", value: stats.customers_saved }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className={`text-4xl font-bold text-emerald-400 mb-2 ${isLoadingStats ? 'animate-pulse' : ''}`}>
                  {stat.value}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow Previews */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            The 10 VEO & AI Video Workflows
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Not theory. Not courses. Not "frameworks." Real, working video automation systems 
            that generate viral content and convert viewers into buyers immediately.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {workflows.map((workflow, index) => (
            <WorkflowCard key={workflow.id} workflow={workflow} index={index} />
          ))}
        </div>
      </section>

      {/* Value Stack Section */}
      <section className="py-20 bg-gray-900/30">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-white mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            What You're Actually Getting
          </motion.h2>
          
          <div className="space-y-4 mb-8">
            {valueStackItems.map((item, index) => (
              <motion.div
                key={index}
                className="flex items-center justify-between p-4 bg-black/50 rounded-lg border border-gray-700"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <span className="text-white font-medium">{item.name}</span>
                <span className="text-emerald-400 font-bold">
                  £<CountUp end={item.value} duration={2} delay={index * 0.1} />
                </span>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            className="bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-2xl p-8 border border-emerald-500/30"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="text-2xl text-gray-300 mb-2">Total Value:</div>
            <div className="text-5xl font-bold text-white mb-2">
              £<CountUp end={totalValue} duration={3} separator="," />
            </div>
            <div className="text-xl text-gray-300 mb-4">Your Price Today:</div>
            <div className="text-6xl font-bold text-emerald-400">£20</div>
            <div className="text-lg text-emerald-300 mt-2">
              You Save: £{(totalValue - 20).toLocaleString()}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Real Results, Real People
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Not staged testimonials. Not theoretical case studies. Real users, real revenue.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <Card className="p-8 hover:shadow-2xl transition-all duration-300 bg-gray-900/50 border-gray-700 h-full">
                <CardContent className="p-0">
                  <div className="flex items-center gap-4 mb-6">
                    <Avatar className="h-12 w-12 ring-2 ring-emerald-500/30">
                      <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                      <AvatarFallback>{testimonial.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-bold text-white">{testimonial.name}</div>
                      <div className="text-sm text-gray-400">{testimonial.role}</div>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-gray-300 leading-relaxed italic">"{testimonial.content}"</p>
                  </div>
                  
                  <div className="bg-emerald-500/20 rounded-lg p-4 border border-emerald-500/30">
                    <div className="text-2xl font-bold text-emerald-400">{testimonial.revenue}</div>
                    <div className="text-sm text-emerald-300">Generated in {testimonial.timeframe}</div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Guru Comparison */}
      <section className="py-20 bg-gray-900/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              The Video Content Creation Scam
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-300 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              This isn't competition. This is disruption.
            </motion.p>
          </div>

          <motion.div 
            className="bg-black/50 rounded-2xl p-8 border border-gray-700"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div className="text-center">
                <div className="text-sm font-medium text-gray-400 mb-2">THEM (The Gurus)</div>
                <div className="h-1 bg-red-500/30 rounded mb-4"></div>
              </div>
              <div className="text-center">
                <div className="text-sm font-medium text-gray-400 mb-2">COMPARISON</div>
                <div className="h-1 bg-gray-600 rounded mb-4"></div>
              </div>
              <div className="text-center">
                <div className="text-sm font-medium text-gray-400 mb-2">ME (Real Value)</div>
                <div className="h-1 bg-emerald-500/30 rounded mb-4"></div>
              </div>
            </div>

            {guruComparison.map((item, index) => (
              <motion.div 
                key={index} 
                className="grid grid-cols-1 md:grid-cols-3 gap-8 py-6 border-b border-gray-700 last:border-b-0"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-center md:text-left">
                  <div className="text-red-400 font-medium">{item.them}</div>
                </div>
                <div className="text-center">
                  <div className="font-bold text-white">{item.category}</div>
                </div>
                <div className="text-center md:text-right">
                  <div className="text-emerald-400 font-medium">{item.us}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Frequently Asked Questions
          </motion.h2>
        </div>

        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <motion.div
              key={index}
              className="bg-gray-900/50 rounded-lg border border-gray-700 overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <button
                className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-800/50 transition-colors"
                onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
              >
                <span className="font-semibold text-white text-lg">{faq.question}</span>
                <motion.div
                  animate={{ rotate: expandedFaq === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                </motion.div>
              </button>
              
              <AnimatePresence>
                {expandedFaq === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 pt-0 text-gray-300 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <motion.div 
          className="bg-gradient-to-r from-gray-900 to-black rounded-2xl p-12 text-center border border-gray-700"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="max-w-3xl mx-auto">
            <AlertTriangle className="h-16 w-16 text-yellow-400 mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
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
            <p className="text-2xl font-bold mb-8 text-white">
              Either way, the game is changing. You can be part of the change, or you can keep paying the guru tax.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                onClick={onPurchaseClick}
                size="lg" 
                className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-12 py-4 text-xl font-bold rounded-full transition-all duration-300 shadow-2xl hover:shadow-emerald-500/25"
              >
                Your Choice - Get Workflows Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900/50 py-12 px-6 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-purple-400 bg-clip-text text-transparent mb-4">
              GuruKiller
            </div>
            <p className="text-gray-400 mb-8">Real automation. Real results. Real prices.</p>
            
            <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-400" />
                <span>No upsells to £10K masterminds</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-400" />
                <span>No recurring monthly fees</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-400" />
                <span>No "implementation calls" at £500/hour</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-400" />
                <span>Just workflows that work, priced honestly</span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Sticky Floating CTA */}
      <AnimatePresence>
        {showStickyButton && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                onClick={onPurchaseClick}
                className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-8 py-3 rounded-full font-bold shadow-2xl hover:shadow-emerald-500/25 flex items-center gap-2"
              >
                <Zap className="h-4 w-4" />
                Get All 10 Workflows - £20
                <ArrowRight className="h-4 w-4" />
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LandingPage;