// Mock data for Guru Killer landing page

export const mockData = {
  testimonials: [
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
  ],
  workflows: [
    {
      id: 1,
      title: "AI Lead Generation System",
      description: "Automatically find, qualify, and reach out to prospects using AI-powered research and personalized messaging",
      revenue: "£15,000+",
      timeToImplement: "30 minutes",
      complexity: "Beginner"
    },
    {
      id: 2,
      title: "Content Creation Automation",
      description: "Generate, optimize, and distribute content across 12 platforms with zero manual work",
      revenue: "£8,500+",
      timeToImplement: "45 minutes",
      complexity: "Intermediate"
    },
    {
      id: 3,
      title: "Customer Support AI Agent",
      description: "Handle 90% of customer inquiries automatically while maintaining personal touch",
      revenue: "£12,300+",
      timeToImplement: "1 hour",
      complexity: "Advanced"
    },
    {
      id: 4,
      title: "Sales Funnel Optimizer",
      description: "Automatically A/B test and optimize every element of your sales process",
      revenue: "£22,000+",
      timeToImplement: "20 minutes",
      complexity: "Beginner"
    }
  ],
  guruComparison: [
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
  ],
  stats: {
    totalRevenue: "£247,000+",
    averageImplementation: "45 minutes",
    successRate: "94%",
    customersSaved: "£2.3M+"
  }
};

export const mockPurchase = {
  processPayment: (email, packageType = 'main') => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          sessionId: 'mock_session_' + Date.now(),
          redirectUrl: '/success?session_id=mock_session_' + Date.now()
        });
      }, 2000);
    });
  },
  
  checkPaymentStatus: (sessionId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          status: 'complete',
          paymentStatus: 'paid',
          email: 'user@example.com'
        });
      }, 1000);
    });
  }
};