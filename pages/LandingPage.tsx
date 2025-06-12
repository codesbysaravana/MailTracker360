"use client"
import { useState, useEffect } from 'react';
import { 
  Mail, 
  BarChart3, 
  Users, 
  Zap, 
  Shield, 
  Target, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  ArrowRight, 
  Menu, 
  X, 
  Star,
  Play,
  Eye
} from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <Mail className="w-8 h-8" />,
      title: "Advanced Email Campaigns",
      description: "Create and send beautiful, responsive email campaigns with our intuitive drag-and-drop editor.",
      color: "from-blue-500 to-indigo-600"
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: "Real-time Tracking",
      description: "Monitor opens, clicks, and engagement in real-time with detailed analytics and insights.",
      color: "from-purple-500 to-pink-600"
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Advanced Analytics",
      description: "Get deep insights into your email performance with comprehensive reporting and analytics.",
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Smart Segmentation",
      description: "Target the right audience with intelligent segmentation and personalization features.",
      color: "from-orange-500 to-red-600"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Automation Workflows",
      description: "Set up automated email sequences that nurture leads and convert customers effortlessly.",
      color: "from-yellow-500 to-orange-600"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Enterprise Security",
      description: "Bank-level security with encryption, compliance, and data protection you can trust.",
      color: "from-gray-500 to-slate-600"
    }
  ];

  const stats = [
    { number: "99.9%", label: "Uptime Guarantee", icon: <Clock className="w-6 h-6" /> },
    { number: "10M+", label: "Emails Delivered", icon: <Mail className="w-6 h-6" /> },
    { number: "50K+", label: "Active Users", icon: <Users className="w-6 h-6" /> },
    { number: "35%", label: "Avg. Open Rate Increase", icon: <TrendingUp className="w-6 h-6" /> }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Marketing Director at TechCorp",
      content: "MailTracker 360 transformed our email marketing. Our open rates increased by 45% and conversions doubled within 3 months.",
      rating: 5,
      avatar: "SC"
    },
    {
      name: "Michael Rodriguez",
      role: "CEO at StartupFlow",
      content: "The analytics are incredible. We finally understand our audience and can optimize our campaigns in real-time.",
      rating: 5,
      avatar: "MR"
    },
    {
      name: "Emily Johnson",
      role: "Growth Manager at ScaleUp",
      content: "Best email marketing platform we've used. The automation features saved us 20 hours per week.",
      rating: 5,
      avatar: "EJ"
    }
  ];

  const pricingPlans = [
    {
      name: "Starter",
      price: "29",
      period: "month",
      description: "Perfect for small businesses getting started",
      features: [
        "Up to 10,000 emails/month",
        "Basic analytics",
        "Email templates",
        "24/7 support"
      ],
      popular: false,
      color: "from-blue-500 to-indigo-600"
    },
    {
      name: "Professional",
      price: "79",
      period: "month",
      description: "Ideal for growing businesses",
      features: [
        "Up to 50,000 emails/month",
        "Advanced analytics",
        "A/B testing",
        "Automation workflows",
        "Priority support"
      ],
      popular: true,
      color: "from-purple-500 to-pink-600"
    },
    {
      name: "Enterprise",
      price: "199",
      period: "month",
      description: "For large organizations",
      features: [
        "Unlimited emails",
        "Custom integrations",
        "Dedicated account manager",
        "White-label options",
        "SLA guarantee"
      ],
      popular: false,
      color: "from-green-500 to-emerald-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrollY > 50 ? 'bg-white/90 backdrop-blur-lg shadow-lg' : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                MailTracker 360
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Features</a>
              <a href="#analytics" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Analytics</a>
              <a href="#pricing" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Pricing</a>
              <Link href="/dashboard" className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                Dashboard
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-white/80 backdrop-blur-sm shadow-lg"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 p-6 bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl">
              <div className="flex flex-col gap-4">
                <a href="#features" className="text-gray-700 hover:text-blue-600 font-medium py-2">Features</a>
                <a href="#analytics" className="text-gray-700 hover:text-blue-600 font-medium py-2">Analytics</a>
                <a href="#pricing" className="text-gray-700 hover:text-blue-600 font-medium py-2">Pricing</a>
                <Link href="/dashboard" className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium text-center">
                  Dashboard
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-8">
              <Zap className="w-4 h-4" />
              New: AI-Powered Email Optimization
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-gray-800 via-blue-800 to-indigo-800 bg-clip-text text-transparent mb-8 leading-tight">
              Email Marketing
              <br />
              <span className="text-blue-600">Redefined</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Track, analyze, and optimize your email campaigns with the most advanced email marketing platform. 
              Get 360° insights into your email performance and boost your ROI.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link href="/dashboard" className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold text-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3">
                Start Free Trial
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <button className="group px-8 py-4 bg-white/80 backdrop-blur-sm text-gray-800 rounded-xl font-semibold text-lg border-2 border-gray-200 hover:border-blue-300 hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3">
                <Play className="w-5 h-5" />
                Watch Demo
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/40 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center justify-center mb-3 text-blue-600">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold text-gray-800 mb-2">{stat.number}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Powerful Features for
              <span className="text-blue-600"> Modern Marketers</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to create, send, and track email campaigns that convert. 
              Built for teams who demand results.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group p-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 hover:shadow-2xl transform hover:scale-105 transition-all duration-500">
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Analytics Preview Section */}
      <section id="analytics" className="py-20 px-6 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Analytics That
                <br />
                Drive Results
              </h2>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                Get deep insights into your email performance with real-time tracking, 
                advanced segmentation, and predictive analytics powered by AI.
              </p>
              
              <div className="space-y-4 mb-8">
                {[
                  "Real-time open and click tracking",
                  "Advanced audience segmentation",
                  "A/B testing with statistical significance",
                  "Predictive analytics and recommendations"
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6 text-green-300" />
                    <span className="text-lg">{item}</span>
                  </div>
                ))}
              </div>

              <Link href="/analytics" className="inline-flex items-center gap-3 px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold text-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                <BarChart3 className="w-5 h-5" />
                View Analytics Demo
              </Link>
            </div>

            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { label: "Open Rate", value: "68.5%", change: "+12%" },
                    { label: "Click Rate", value: "24.8%", change: "+8%" },
                    { label: "Conversion", value: "12.3%", change: "+15%" },
                    { label: "Revenue", value: "$45.2K", change: "+23%" }
                  ].map((metric, index) => (
                    <div key={index} className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-center">
                      <div className="text-3xl font-bold text-white mb-2">{metric.value}</div>
                      <div className="text-blue-100 text-sm mb-2">{metric.label}</div>
                      <div className="text-green-300 text-sm font-medium">{metric.change}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Trusted by <span className="text-blue-600">50,000+</span> Marketers
            </h2>
            <p className="text-xl text-gray-600">See what our customers say about MailTracker 360</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 md:p-12">
              <div className="text-center">
                <div className="flex justify-center mb-6">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <blockquote className="text-2xl md:text-3xl text-gray-800 font-medium mb-8 leading-relaxed">
                  {testimonials[currentTestimonial].content}
                </blockquote>
                
                <div className="flex items-center justify-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonials[currentTestimonial].avatar}
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-gray-800">{testimonials[currentTestimonial].name}</div>
                    <div className="text-gray-600">{testimonials[currentTestimonial].role}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial Indicators */}
            <div className="flex justify-center gap-3 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial ? 'bg-blue-600 w-8' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-6 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Simple, Transparent <span className="text-blue-600">Pricing</span>
            </h2>
            <p className="text-xl text-gray-600">Choose the perfect plan for your business needs</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <div key={index} className={`relative p-8 bg-white rounded-3xl shadow-xl border transition-all duration-300 hover:shadow-2xl transform hover:scale-105 ${
                plan.popular ? 'border-blue-500 ring-4 ring-blue-500/20' : 'border-gray-200'
              }`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-6">{plan.description}</p>
                  <div className="flex items-baseline justify-center gap-2">
                    <span className="text-5xl font-bold text-gray-800">${plan.price}</span>
                    <span className="text-gray-600">/{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 ${
                  plan.popular
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-xl'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}>
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Email Marketing?
          </h2>
          <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto">
            Join thousands of successful marketers who trust MailTracker 360 to deliver results. 
            Start your free trial today and see the difference.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard" className="group px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold text-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3">
              Start Free Trial
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link href="/analytics" className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white rounded-xl font-semibold text-lg border-2 border-white/30 hover:bg-white/30 hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3">
              <BarChart3 className="w-5 h-5" />
              View Analytics
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-gray-900 text-white">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold">MailTracker 360</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                The most advanced email marketing platform for modern businesses.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
                <li><Link href="/analytics" className="hover:text-white transition-colors">Analytics</Link></li>
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API Reference</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status Page</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 MailTracker 360. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}