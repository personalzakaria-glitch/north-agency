import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowRight, Code, Palette, Zap, Users, Award, Mail, Calculator } from 'lucide-react';

export default function NorthAgency() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [formSubmitted, setFormSubmitted] = useState(false);

  const sectionRefs = useRef([]);

const PRICING = {
  packages: {
    Starter: [399, 399],
    Business: [799, 799],
    Premium: [1499, 1499],
    Custom: [0, 0],
  },
  addons: {
    "Extra Page": [75, 75],
    Booking: [150, 150],
  },
  maintenance: {
    Care: [49, 49],
    Growth: [149, 149],
  },
};

  const QuoteCalculator = () => {
    const [pkg, setPkg] = useState('');
    const [addons, setAddons] = useState([]);
    const [maint, setMaint] = useState('');
    const [form, setForm] = useState(false);

    const calcTotal = () => {
      let min = 0, max = 0;
      
      if (pkg && pkg !== 'Custom') {
        const [pMin, pMax] = PRICING.packages[pkg];
        min += pMin;
        max += pMax;
      }
      
      addons.forEach(a => {
        const [aMin, aMax] = PRICING.addons[a];
        min += aMin;
        max += aMax;
      });
      
      if (maint && maint !== 'None') {
        const [mMin, mMax] = PRICING.maintenance[maint];
        min += mMin;
        max += mMax;
      }
      
      return [min, max];
    };

    const [min, max] = calcTotal();

    const toggle = (item) => setAddons(prev => 
      prev.includes(item) ? prev.filter(a => a !== item) : [...prev, item]
    );

    const submit = async (e) => {
      e.preventDefault();
      const fd = new FormData(e.target);
      fd.append('package', pkg);
      fd.append('addons', addons.join(', ') || 'None');
      fd.append('maintenance', maint || 'None');
      fd.append('estimate', pkg === 'Custom' ? 'TBD' : `${min} - ${max}`);

      try {
        await fetch('https://formspree.io/f/xqeejkdo', {
          method: 'POST',
          body: fd,
          headers: { 'Accept': 'application/json' }
        });
        alert('Quote sent! We\'ll contact you soon.');
        setPkg('');
        setAddons([]);
        setMaint('');
        setForm(false);
      } catch (err) {
        console.error(err);
      }
    };

    return (
      <div className="bg-white p-8 border-2 border-neutral-200">
        <div className="space-y-8">
          <div>
            <label className="block text-sm font-medium mb-3">Website Package</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {Object.keys(PRICING.packages).map(p => (
                <button
                  key={p}
                  onClick={() => setPkg(p)}
                  className={`p-3 text-sm border-2 transition ${pkg === p ? 'border-black bg-black text-white' : 'border-neutral-200 hover:border-black'}`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-3">Add-Ons (Optional)</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {Object.keys(PRICING.addons).map(a => (
                <button
                  key={a}
                  onClick={() => toggle(a)}
                  className={`p-3 text-sm border-2 transition ${addons.includes(a) ? 'border-black bg-black text-white' : 'border-neutral-200 hover:border-black'}`}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-3">Maintenance (Optional)</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <button
                onClick={() => setMaint('None')}
                className={`p-3 text-sm border-2 transition ${maint === 'None' ? 'border-black bg-black text-white' : 'border-neutral-200 hover:border-black'}`}
              >
                None
              </button>
              {Object.keys(PRICING.maintenance).map(m => (
                <button
                  key={m}
                  onClick={() => setMaint(m)}
                  className={`p-3 text-sm border-2 transition ${maint === m ? 'border-black bg-black text-white' : 'border-neutral-200 hover:border-black'}`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t-2 border-neutral-200">
            <div className="flex justify-between items-center mb-4">
              <span className="text-2xl font-display font-bold">Estimated Total:</span>
              <span className="text-4xl font-display font-bold">
                {pkg === 'Custom' ? 'TBD' : !pkg ? '$0' : min === max ? `${min}` : `${min} - ${max}`}
              </span>
            </div>

            <div className="bg-neutral-50 p-4 mb-6 text-xs text-neutral-600 space-y-1">
              <p>• Final pricing depends on project scope and complexity</p>
              <p>• Add-on prices vary based on requirements and implementation</p>
              <p>• Custom projects quoted individually after consultation</p>
              <p>• Monthly maintenance is billed separately and can be canceled anytime</p>
            </div>

            {!form ? (
              <button
                onClick={() => setForm(true)}
                disabled={!pkg}
                className="w-full bg-black text-white px-8 py-4 text-sm font-medium tracking-wide btn-hover transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                REQUEST THIS QUOTE
              </button>
            ) : (
              <form onSubmit={submit} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  required
                  className="w-full border-2 border-neutral-200 px-4 py-3 focus:border-black outline-none transition"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  required
                  className="w-full border-2 border-neutral-200 px-4 py-3 focus:border-black outline-none transition"
                />
                <textarea
                  name="message"
                  placeholder="Project Details (Optional)"
                  rows="3"
                  className="w-full border-2 border-neutral-200 px-4 py-3 focus:border-black outline-none transition"
                ></textarea>
                <button
                  type="submit"
                  className="w-full bg-black text-white px-8 py-4 text-sm font-medium tracking-wide btn-hover transition"
                >
                  SEND QUOTE REQUEST
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.dataset.section]));
          }
        });
      },
      { threshold: 0.1 }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      const response = await fetch('https://formspree.io/f/xqeejkdo', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setFormSubmitted(true);
        e.target.reset();
        setTimeout(() => setFormSubmitted(false), 3000);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

const services = [
  { icon: Code, title: 'Get Online Fast', desc: 'Professional site that works on any device. Live in 2 weeks, ready to bring in customers.' },
  { icon: Award, title: 'Lead Capture Pages', desc: 'Single page designed to collect emails and phone numbers. Perfect for running ads.' },
  { icon: Zap, title: 'Fix Your Slow Site', desc: 'Site taking forever to load? We will get it under 2 seconds so you stop losing visitors.' },
  { icon: Palette, title: 'Outdated Site Refresh', desc: 'Make your current website look modern and actually convert. No full rebuild needed.' },
  { icon: Users, title: 'Start Selling Online', desc: 'E-commerce setup with payments, cart, and product pages. Everything to launch your store.' }
];
const packages = [
  {
    name: "Starter",
    price: "$399",
    description: "Best for simple business sites.",
    features: [
      "1–3 pages",
      "Mobile-responsive design",
      "Contact form",
      "Basic SEO setup",
    ],
    highlight: false,
  },
  {
    name: "Business",
    price: "$799",
    description: "Best for growing businesses.",
    features: [
      "Up to 6 pages",
      "Better UI/UX layout",
      "Speed optimization",
      "SEO setup",
      "Lead capture form",
    ],
    highlight: true,
  },
  {
    name: "Premium",
    price: "$1,499",
    description: "Best for brands that want the best.",
    features: [
      "Up to 10 pages",
      "Premium UI/UX design",
      "Advanced performance optimization",
      "SEO setup",
      "Priority support",
    ],
    highlight: false,
  },
  {
    name: "Custom",
    price: "By Quote",
    description: "Custom scope & advanced features.",
    features: [
      "Custom design + features",
      "Integrations",
      "E-commerce (optional)",
      "Custom timeline",
    ],
    highlight: false,
  },
];
const addons = [
  {
    name: "Extra Page",
    price: "+$75",
    desc: "Add an extra page to your website",
  },
  {
    name: "Booking",
    price: "+$150",
    desc: "Booking system / appointment integration",
  },
];

const maintenance = [
  {
    name: "Care",
    price: "$49 / month",
    features: ["Updates", "Backups", "Security monitoring", "Email support"],
    popular: false,
  },
  {
    name: "Growth",
    price: "$149 / month",
    features: ["Content updates", "Performance checks", "Priority support"],
    popular: true,
  },
];

  const projects = [
    { name: 'Buildify', category: 'AI Agent Platform', year: '2026', url: 'https://buildify-north.vercel.app/', desc: 'Intelligent AI platform helping businesses automate workflows and scale operations' },
    { name: 'Landing Project', category: 'Marketing Site', year: '2026', url: 'https://landingproject-north.vercel.app/', desc: 'Conversion-optimized landing page driving measurable results' },
    { name: 'Agentix', category: 'AI Solutions', year: '2026', url: 'https://agentix-north.vercel.app/', desc: 'Smart automation platform streamlining business processes' },
    { name: 'Pixel IO', category: 'Digital Agency', year: '2026', url: 'https://pixel-io-north.vercel.app/', desc: 'Creative agency site showcasing design and development excellence' },
    { name: 'Prompt2App', category: 'AI Builder', year: '2026', url: 'https://prompt2app-north.vercel.app/', desc: 'Revolutionary tool turning ideas into working applications instantly' },
    { name: 'Saasly', category: 'SaaS Platform', year: '2026', url: 'https://saasly-north.vercel.app/', desc: 'Complete solution for launching and scaling SaaS products fast' },
    { name: 'SlideX', category: 'Presentation Tool', year: '2026', url: 'https://slidex-north.vercel.app/', desc: 'AI-powered presentation builder creating slides in seconds' },
    { name: 'Pixel', category: 'Template', year: '2026', url: 'https://pixel-north.vercel.app/', desc: 'Professional Next.js starter template for modern websites' }
  ];

  return (
    <div className="min-h-screen bg-white text-black font-sans">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
        * {
          scroll-behavior: smooth;
          font-family: 'Inter', sans-serif;
        }
        .font-display { font-family: 'Space Grotesk', sans-serif; }
        .btn-hover {
          position: relative;
          overflow: hidden;
        }
        .btn-hover::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.15);
          transform: translate(-50%, -50%);
          transition: width 0.6s, height 0.6s;
        }
        .btn-hover:hover::before {
          width: 300px;
          height: 300px;
        }
        .btn-dark::before {
          background: rgba(0, 0, 0, 0.1);
        }
        .fade-in-up {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }
        .fade-in-up.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .stagger-1 { transition-delay: 0.1s; }
        .stagger-2 { transition-delay: 0.2s; }
        .stagger-3 { transition-delay: 0.3s; }
        .stagger-4 { transition-delay: 0.4s; }
        .stagger-5 { transition-delay: 0.5s; }
      `}</style>

      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex justify-between items-center h-20">
            <a href="#" className="text-2xl font-display font-semibold tracking-tight">NORTH</a>

            <div className="hidden md:flex gap-12 text-sm font-medium">
              <a href="#services" className="hover:text-neutral-600 transition">Services</a>
              <a href="#about" className="hover:text-neutral-600 transition">About</a>
              <a href="#work" className="hover:text-neutral-600 transition">Work</a>
              <a href="#packages" className="hover:text-neutral-600 transition">Packages</a>
              <a href="#calculator" className="hover:text-neutral-600 transition">Calculator</a>
              <a href="#contact" className="hover:text-neutral-600 transition">Contact</a>
            </div>

            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-6 py-6 space-y-4 text-sm font-medium">
              <a href="#services" onClick={() => setIsMenuOpen(false)} className="block">Services</a>
              <a href="#packages" onClick={() => setIsMenuOpen(false)} className="block">Packages</a>
              <a href="#calculator" onClick={() => setIsMenuOpen(false)} className="block">Calculator</a>
              <a href="#work" onClick={() => setIsMenuOpen(false)} className="block">Work</a>
              <a href="#about" onClick={() => setIsMenuOpen(false)} className="block">About</a>
              <a href="#contact" onClick={() => setIsMenuOpen(false)} className="block">Contact</a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-br from-white via-neutral-50 to-white">
        <div className="max-w-5xl text-center">
          <h1 className="text-6xl md:text-6xl lg:text-7xl font-display font-bold mb-8 tracking-tighter leading-none">
            Websites That Actually Make You Money
          </h1>
          <p className="text-lg md:text-xl text-neutral-600 mb-12 max-w-2xl mx-auto font-light">
            Most web developers create good-looking sites that just sit there looking good and doing nothing. Most web developers are not like me because I create conversion machines, fast-loading sites with a solid design optimized for all devices, looking to convert your visitors into paying customers. You will see results within weeks, not months. Fixed price, fixed time, no bullshit.
          </p>
          <a href="#contact" className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 text-sm font-medium tracking-wide btn-hover transition relative z-10">
            Let's Talk About Your Site <ArrowRight size={16} />
          </a>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-24 px-6 bg-neutral-50" ref={(el) => (sectionRefs.current[0] = el)} data-section="services">
        <div className="max-w-7xl mx-auto">
          <h2 className={`text-5xl md:text-6xl font-display font-bold mb-4 text-center tracking-tight fade-in-up ${visibleSections.has('services') ? 'visible' : ''}`}>
            Our Services
          </h2>
          <p className={`text-center text-neutral-600 mb-16 fade-in-up stagger-1 ${visibleSections.has('services') ? 'visible' : ''}`}>
            What makes us different
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <div
                key={i}
                className={`bg-white p-8 border border-neutral-200 hover:border-black transition group fade-in-up stagger-${i + 1} ${visibleSections.has('services') ? 'visible' : ''}`}
              >
                <service.icon className="mb-6 text-neutral-400 group-hover:text-black transition" size={32} />
                <h3 className="text-2xl mb-3 font-display font-semibold">{service.title}</h3>
                <p className="text-neutral-600 text-sm leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

           {/* About */}
<section id="about" className="py-24 px-6 bg-neutral-50" ref={(el) => (sectionRefs.current[4] = el)} data-section="about">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className={`text-5xl md:text-6xl font-display font-bold mb-8 tracking-tight fade-in-up ${visibleSections.has('about') ? 'visible' : ''}`}>
            Why North
          </h2>
          <p className={`text-lg md:text-xl text-neutral-700 leading-relaxed mb-8 font-light fade-in-up stagger-1 ${visibleSections.has('about') ? 'visible' : ''}`}>
            Most agencies build websites that look nice but do nothing for your bottom line. We build sites that generate leads and revenue. Our clients average 3x more customer inquiries in the first 60 days compared to their old sites.
          </p>
          <div className="grid grid-cols-3 gap-8 pt-12">
            {[
              { value: '3.2x', label: 'Average Lead Increase' },
              { value: '60 days', label: 'Typical ROI Timeline' },
              { value: '2 weeks', label: 'Launch Time' }
            ].map((stat, i) => (
              <div key={i} className={`fade-in-up stagger-${i + 2} ${visibleSections.has('about') ? 'visible' : ''}`}>
                <div className="text-5xl font-display font-bold mb-2">{stat.value}</div>
                <div className="text-neutral-600 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

            <section id="work" className="py-24 px-6 bg-white" ref={(el) => (sectionRefs.current[3] = el)} data-section="work">
        <div className="max-w-7xl mx-auto">
          <h2 className={`text-5xl md:text-6xl font-display font-bold mb-4 text-center tracking-tight fade-in-up ${visibleSections.has('work') ? 'visible' : ''}`}>
            Selected Work
          </h2>
          <p className={`text-center text-neutral-600 mb-16 fade-in-up stagger-1 ${visibleSections.has('work') ? 'visible' : ''}`}>
            Recent projects we're proud of
          </p>

          <div className="space-y-1">
            {projects.map((project, i) => (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                key={i}
                className={`border-t border-neutral-200 py-8 hover:bg-neutral-50 transition cursor-pointer group fade-in-up stagger-${i % 5 + 1} ${visibleSections.has('work') ? 'visible' : ''} block`}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-3xl md:text-4xl font-display font-semibold mb-2 group-hover:translate-x-2 transition">{project.name}</h3>
                    <p className="text-neutral-600 text-sm mb-1">{project.category}</p>
                    <p className="text-neutral-500 text-xs">{project.desc}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-neutral-400 text-sm">{project.year}</span>
                    <ArrowRight className="text-neutral-400 group-hover:text-black group-hover:translate-x-2 transition" size={20} />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section id="packages" className="py-24 px-6 bg-white" ref={(el) => (sectionRefs.current[1] = el)} data-section="packages">
        <div className="max-w-7xl mx-auto">
          <h2 className={`text-5xl md:text-6xl font-display font-bold mb-4 text-center tracking-tight fade-in-up ${visibleSections.has('packages') ? 'visible' : ''}`}>
            Website Packages
          </h2>
          <p className={`text-center text-neutral-600 mb-16 fade-in-up stagger-1 ${visibleSections.has('packages') ? 'visible' : ''}`}>
            Transparent pricing for every budget
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
            {packages.map((pkg, i) => (
              <div
                key={i}
                className={`bg-white p-6 border-2 ${pkg.highlight ? 'border-black' : 'border-neutral-200'} hover:border-black transition relative fade-in-up stagger-${i + 1} ${visibleSections.has('packages') ? 'visible' : ''}`}
              >
                {pkg.highlight && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-black text-white px-3 py-1 text-xs font-medium tracking-wide">
                    POPULAR
                  </div>
                )}
                <h3 className="text-2xl mb-2 font-display font-semibold">{pkg.name}</h3>
                <div className="text-3xl font-display font-bold mb-4">{pkg.price}</div>
                <ul className="space-y-2 mb-6">
                  {pkg.features.map((feature, j) => (
                    <li key={j} className="text-sm text-neutral-600 flex items-start">
                      <span className="mr-2">•</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  className={`block text-center ${pkg.highlight ? 'bg-black text-white' : 'bg-white text-black border-2 border-black'} px-4 py-2 text-sm font-medium tracking-wide btn-hover ${pkg.highlight ? '' : 'btn-dark'} transition relative z-10`}
                >
                  GET STARTED
                </a>
              </div>
            ))}
          </div>

          <h3 className={`text-4xl font-display font-bold mb-12 text-center tracking-tight fade-in-up ${visibleSections.has('packages') ? 'visible' : ''}`}>
            Add-On Services
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-24">
            {addons.map((addon, i) => (
              <div
                key={i}
                className={`bg-neutral-50 p-6 border border-neutral-200 hover:border-black transition fade-in-up stagger-${i + 1} ${visibleSections.has('packages') ? 'visible' : ''}`}
              >
                <div className="flex justify-between items-start mb-3">
                  <h4 className="text-xl font-display font-semibold">{addon.name}</h4>
                  <span className="text-sm font-medium text-neutral-600">{addon.price}</span>
                </div>
                <p className="text-sm text-neutral-600">{addon.desc}</p>
              </div>
            ))}
          </div>

          <h3 className={`text-4xl font-display font-bold mb-12 text-center tracking-tight fade-in-up ${visibleSections.has('packages') ? 'visible' : ''}`}>
            Maintenance & Support
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {maintenance.map((plan, i) => (
              <div
                key={i}
                className={`bg-white p-6 border-2 ${plan.popular ? 'border-black' : 'border-neutral-200'} hover:border-black transition relative fade-in-up stagger-${i + 1} ${visibleSections.has('packages') ? 'visible' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-black text-white px-3 py-1 text-xs font-medium tracking-wide">
                    MOST POPULAR
                  </div>
                )}
                <h4 className="text-2xl mb-2 font-display font-semibold">{plan.name}</h4>
                <div className="text-3xl font-display font-bold mb-4">{plan.price}</div>
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="text-sm text-neutral-600 flex items-start">
                      <span className="mr-2">•</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  className={`block text-center ${plan.popular ? 'bg-black text-white' : 'bg-white text-black border-2 border-black'} px-4 py-2 text-sm font-medium tracking-wide btn-hover ${plan.popular ? '' : 'btn-dark'} transition relative z-10`}
                >
                  SUBSCRIBE
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Package Calculator */}
      <section id="calculator" className="py-24 px-6 bg-neutral-50" ref={(el) => (sectionRefs.current[2] = el)} data-section="calculator">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-display font-bold mb-4 text-center tracking-tight">
            Build Your Quote
          </h2>
          <p className="text-center text-neutral-600 mb-12">
            Select what you need and get an instant estimate
          </p>

          <QuoteCalculator />
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 px-6 bg-black text-white" ref={(el) => (sectionRefs.current[5] = el)} data-section="contact">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className={`text-5xl md:text-6xl font-display font-bold mb-6 tracking-tight fade-in-up ${visibleSections.has('contact') ? 'visible' : ''}`}>
            Let's Work Together
          </h2>
          <p className={`text-lg text-neutral-300 mb-12 font-light fade-in-up stagger-1 ${visibleSections.has('contact') ? 'visible' : ''}`}>
            Have a project in mind? We'd love to hear about it.
          </p>

          <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 fade-in-up stagger-2 ${visibleSections.has('contact') ? 'visible' : ''}`}>
            <a href="mailto:webagencynorth@gmail.com" className="flex items-center gap-2 hover:text-neutral-300 transition">
              <Mail size={20} /> webagencynorth@gmail.com
            </a>
          </div>

          <form
            onSubmit={handleSubmit}
            className={`max-w-xl mx-auto space-y-6 fade-in-up stagger-3 ${visibleSections.has('contact') ? 'visible' : ''}`}
          >
            {formSubmitted && (
              <div className="bg-white text-black px-6 py-3 text-center mb-4 font-medium">
                MESSAGE SENT ✓
              </div>
            )}

            <div>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
                className="w-full bg-transparent border-b border-neutral-600 py-3 focus:border-white outline-none transition"
              />
            </div>

            <div>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                required
                className="w-full bg-transparent border-b border-neutral-600 py-3 focus:border-white outline-none transition"
              />
            </div>

            <div>
              <textarea
                name="message"
                placeholder="Tell us about your project"
                rows="4"
                required
                className="w-full bg-transparent border-b border-neutral-600 py-3 focus:border-white outline-none resize-none transition"
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-white text-black px-8 py-4 text-sm font-medium tracking-wide btn-hover btn-dark transition w-full sm:w-auto relative z-10"
            >
              SEND MESSAGE
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12 px-6 border-t border-neutral-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-2xl font-display font-semibold tracking-tight">NORTH</div>
            <div className="text-neutral-400 text-sm">
              © 2026 North Agency. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}