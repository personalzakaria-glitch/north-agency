import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowRight, Code, Palette, Zap, Users, Award, Mail, Phone } from 'lucide-react';

export default function NorthAgency() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visibleSections, setVisibleSections] = useState(new Set());
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState(false);

  // spam protection
  const formStartTimeRef = useRef(Date.now());

  const sectionRefs = useRef([]);

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
    setFormError(false);

    const formData = new FormData(e.target);

    // Honeypot check (bots fill hidden fields)
    const hp = formData.get('company_website');
    if (hp && String(hp).trim().length > 0) {
      // silently ignore spam
      setFormSubmitted(true);
      e.target.reset();
      setTimeout(() => setFormSubmitted(false), 2000);
      return;
    }

    // Time-based check (too fast submit = likely bot)
    const elapsedMs = Date.now() - formStartTimeRef.current;
    if (elapsedMs < 2500) {
      setFormError(true);
      return;
    }

    try {
      const response = await fetch('https://formspree.io/f/xqeejkdo', {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      });

      if (response.ok) {
        setFormSubmitted(true);
        e.target.reset();
        formStartTimeRef.current = Date.now();
        setTimeout(() => setFormSubmitted(false), 3000);
      } else {
        setFormError(true);
      }
    } catch (error) {
      setFormError(true);
      console.error('Error:', error);
    }
  };

  const services = [
    {
      icon: Code,
      title: 'Snel online met een sterke website',
      desc: 'Een professionele website die op elk toestel perfect werkt. Live binnen 2 weken, klaar om klanten aan te trekken.',
    },
    {
      icon: Award,
      title: 'Landingspagina’s die leads opleveren',
      desc: 'Een slimme one-pager om e-mails en telefoonnummers te verzamelen. Ideaal voor advertenties en campagnes.',
    },
    {
      icon: Zap,
      title: 'Snellere website = meer aanvragen',
      desc: 'Laadt je website traag? Wij optimaliseren tot onder 2 seconden zodat je geen bezoekers meer verliest.',
    },
    {
      icon: Palette,
      title: 'Moderne refresh voor je huidige site',
      desc: 'Maak je website opnieuw strak en overtuigend, zonder een volledige herbouw. Meer vertrouwen, meer conversie.',
    },
    {
      icon: Users,
      title: 'Start met online verkopen',
      desc: 'E-commerce setup met betalingen, winkelmandje en productpagina’s. Klaar om direct te verkopen.',
    },
  ];

  // ~30% goedkoper + charm pricing
  const packages = [
    {
      name: 'Starter',
      price: '€195',
      description: 'Voor zelfstandigen en kleine ondernemingen die professioneel online willen staan.',
      features: ['1–3 pagina’s', 'Mobielvriendelijk design', 'Contactformulier', 'Basis SEO setup'],
      highlight: false,
    },
    {
      name: 'Business',
      price: '€349',
      description: 'Voor bedrijven die meer aanvragen en een sterkere uitstraling willen.',
      features: ['Tot 6 pagina’s', 'Betere UI/UX structuur', 'Snelheidsoptimalisatie', 'SEO setup', 'Lead capture formulier'],
      highlight: true,
    },
    {
      name: 'Premium',
      price: '€735',
      description: 'Voor merken die topkwaliteit willen en serieus willen groeien.',
      features: [
        'Tot 10 pagina’s',
        'Premium UI/UX design',
        'Geavanceerde performance optimalisatie',
        'SEO setup',
        'Priority support',
      ],
      highlight: false,
    },
    {
      name: 'Custom',
      price: 'Offerte op maat',
      description: 'Voor custom functies, integraties en grotere projecten.',
      features: ['Custom design + functies', 'Integraties', 'E-commerce (optioneel)', 'Planning op maat'],
      highlight: false,
    },
  ];

  const addons = [
    {
      name: 'Extra pagina',
      price: '+€35',
      desc: 'Voeg een extra pagina toe aan je website',
    },
    {
      name: 'Boekingssysteem',
      price: '+€55',
      desc: 'Afspraakmodule / booking integratie',
    },
  ];

  const maintenance = [
    {
      name: 'Care',
      price: '€17 / maand',
      features: ['Updates', 'Back-ups', 'Security monitoring', 'E-mail support'],
      popular: false,
    },
    {
      name: 'Growth',
      price: '€35 / maand',
      features: ['Content updates', 'Performance checks', 'Priority support'],
      popular: true,
    },
  ];

  const projects = [
    {
      name: 'Buildify',
      category: 'AI Agent Platform',
      year: '2026',
      url: 'https://buildify-north.vercel.app/',
      desc: 'Slim AI-platform dat bedrijven helpt workflows te automatiseren en sneller te schalen',
    },
    {
      name: 'Agentix',
      category: 'AI Solutions',
      year: '2026',
      url: 'https://agentix-north.vercel.app/',
      desc: 'Automatisatieplatform dat bedrijfsprocessen stroomlijnt',
    },
    {
      name: 'Pixel IO',
      category: 'Digital Agency',
      year: '2026',
      url: 'https://pixel-io-north.vercel.app/',
      desc: 'Creatieve agency website met sterke focus op design en development',
    },
    {
      name: 'Prompt2App',
      category: 'AI Builder',
      year: '2026',
      url: 'https://prompt2app-north.vercel.app/',
      desc: 'Tool die ideeën omzet in werkende apps, snel en efficiënt',
    },
    {
      name: 'Saasly',
      category: 'SaaS Platform',
      year: '2026',
      url: 'https://saasly-north.vercel.app/',
      desc: 'Complete oplossing om SaaS-producten sneller te lanceren en te schalen',
    },
    {
      name: 'Pixel',
      category: 'Template',
      year: '2026',
      url: 'https://pixel-north.vercel.app/',
      desc: 'Professionele Next.js starter template voor moderne websites',
    },
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
              <a href="#about" className="hover:text-neutral-600 transition">Over ons</a>
              <a href="#work" className="hover:text-neutral-600 transition">Werk</a>
              <a href="#packages" className="hover:text-neutral-600 transition">Pakketten</a>
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
              <a href="#packages" onClick={() => setIsMenuOpen(false)} className="block">Pakketten</a>
              <a href="#work" onClick={() => setIsMenuOpen(false)} className="block">Werk</a>
              <a href="#about" onClick={() => setIsMenuOpen(false)} className="block">Over ons</a>
              <a href="#contact" onClick={() => setIsMenuOpen(false)} className="block">Contact</a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-br from-white via-neutral-50 to-white">
        <div className="max-w-5xl text-center">
          <h1 className="text-6xl md:text-6xl lg:text-7xl font-display font-bold mb-8 tracking-tighter leading-none">
            Websites die klanten opleveren
          </h1>
          <p className="text-lg md:text-xl text-neutral-600 mb-12 max-w-2xl mx-auto font-light">
            Snelle, moderne websites die vertrouwen uitstralen, vlot laden en bezoekers omzetten naar aanvragen.
          </p>
          <a href="#contact" className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 text-sm font-medium tracking-wide btn-hover transition relative z-10">
            Gratis kennismaking <ArrowRight size={16} />
          </a>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-24 px-6 bg-neutral-50" ref={(el) => (sectionRefs.current[0] = el)} data-section="services">
        <div className="max-w-7xl mx-auto">
          <h2 className={`text-5xl md:text-6xl font-display font-bold mb-4 text-center tracking-tight fade-in-up ${visibleSections.has('services') ? 'visible' : ''}`}>
            Services
          </h2>
          <p className={`text-center text-neutral-600 mb-16 fade-in-up stagger-1 ${visibleSections.has('services') ? 'visible' : ''}`}>
            Gericht op resultaat: meer aanvragen, meer omzet.
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
      <section id="about" className="py-24 px-6 bg-neutral-50" ref={(el) => (sectionRefs.current[3] = el)} data-section="about">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className={`text-5xl md:text-6xl font-display font-bold mb-8 tracking-tight fade-in-up ${visibleSections.has('about') ? 'visible' : ''}`}>
            Waarom North
          </h2>
          <p className={`text-lg md:text-xl text-neutral-700 leading-relaxed mb-8 font-light fade-in-up stagger-1 ${visibleSections.has('about') ? 'visible' : ''}`}>
            Een mooie website is niet genoeg. Wij bouwen websites die helder communiceren, snel laden en gericht zijn op conversie.
            Het doel is simpel: meer kwalitatieve aanvragen en meer groei.
          </p>
          <div className="grid grid-cols-3 gap-8 pt-12">
            {[
              { value: '3.2x', label: 'Meer aanvragen gemiddeld' },
              { value: '60 dagen', label: 'Typische ROI termijn' },
              { value: '3-5 dagen', label: 'Gemiddelde oplevering' },
            ].map((stat, i) => (
              <div key={i} className={`fade-in-up stagger-${i + 2} ${visibleSections.has('about') ? 'visible' : ''}`}>
                <div className="text-5xl font-display font-bold mb-2">{stat.value}</div>
                <div className="text-neutral-600 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Work */}
      <section id="work" className="py-24 px-6 bg-white" ref={(el) => (sectionRefs.current[2] = el)} data-section="work">
        <div className="max-w-7xl mx-auto">
          <h2 className={`text-5xl md:text-6xl font-display font-bold mb-4 text-center tracking-tight fade-in-up ${visibleSections.has('work') ? 'visible' : ''}`}>
            Geselecteerd werk
          </h2>
          <p className={`text-center text-neutral-600 mb-16 fade-in-up stagger-1 ${visibleSections.has('work') ? 'visible' : ''}`}>
            Enkele recente projecten
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
                    <h3 className="text-3xl md:text-4xl font-display font-semibold mb-2 group-hover:translate-x-2 transition">
                      {project.name}
                    </h3>
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
            Website pakketten
          </h2>
          <p className={`text-center text-neutral-600 mb-16 fade-in-up stagger-1 ${visibleSections.has('packages') ? 'visible' : ''}`}>
            Duidelijke prijzen, zonder verrassingen
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
            {packages.map((pkg, i) => (
              <div
                key={i}
                className={`bg-white p-6 border-2 ${pkg.highlight ? 'border-black' : 'border-neutral-200'} hover:border-black transition relative fade-in-up stagger-${i + 1} ${visibleSections.has('packages') ? 'visible' : ''}`}
              >
                {pkg.highlight && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-black text-white px-3 py-1 text-xs font-medium tracking-wide">
                    MEEST GEKOZEN
                  </div>
                )}
                <h3 className="text-2xl mb-2 font-display font-semibold">{pkg.name}</h3>
                <div className="text-3xl font-display font-bold mb-4">{pkg.price}</div>
                <p className="text-sm text-neutral-600 mb-4">{pkg.description}</p>
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
                  Offerte aanvragen
                </a>
              </div>
            ))}
          </div>

          <h3 className={`text-4xl font-display font-bold mb-12 text-center tracking-tight fade-in-up ${visibleSections.has('packages') ? 'visible' : ''}`}>
            Extra opties
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
            Onderhoud & support
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {maintenance.map((plan, i) => (
              <div
                key={i}
                className={`bg-white p-6 border-2 ${plan.popular ? 'border-black' : 'border-neutral-200'} hover:border-black transition relative fade-in-up stagger-${i + 1} ${visibleSections.has('packages') ? 'visible' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-black text-white px-3 py-1 text-xs font-medium tracking-wide">
                    MEEST POPULAIR
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
                  Start abonnement
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 px-6 bg-black text-white" ref={(el) => (sectionRefs.current[4] = el)} data-section="contact">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className={`text-5xl md:text-6xl font-display font-bold mb-6 tracking-tight fade-in-up ${visibleSections.has('contact') ? 'visible' : ''}`}>
            Contacteer ons
          </h2>
          <p className={`text-lg text-neutral-300 mb-12 font-light fade-in-up stagger-1 ${visibleSections.has('contact') ? 'visible' : ''}`}>
            Vertel kort wat je nodig hebt. We antwoorden snel en duidelijk.
          </p>

          <div className={`flex flex-col sm:flex-row gap-6 justify-center items-center mb-12 fade-in-up stagger-2 ${visibleSections.has('contact') ? 'visible' : ''}`}>
            <a href="mailto:webagencynorth@gmail.com" className="flex items-center gap-2 hover:text-neutral-300 transition">
              <Mail size={20} /> webagencynorth@gmail.com
            </a>

            <a href="tel:+32492885395" className="flex items-center gap-2 hover:text-neutral-300 transition">
              <Phone size={20} /> +32 492 88 53 95
            </a>
          </div>

          <form onSubmit={handleSubmit} className={`max-w-xl mx-auto space-y-6 fade-in-up stagger-3 ${visibleSections.has('contact') ? 'visible' : ''}`}>
            {formSubmitted && (
              <div className="bg-white text-black px-6 py-3 text-center mb-4 font-medium">
                Bericht verzonden ✓
              </div>
            )}

            {formError && (
              <div className="bg-white text-black px-6 py-3 text-center mb-4 font-medium">
                Verzenden mislukt — probeer opnieuw
              </div>
            )}

            {/* Honeypot field (hidden) */}
            <input
              type="text"
              name="company_website"
              tabIndex="-1"
              autoComplete="off"
              className="hidden"
            />

            <div>
              <input
                type="text"
                name="name"
                placeholder="Naam"
                required
                className="w-full bg-transparent border-b border-neutral-600 py-3 focus:border-white outline-none transition"
              />
            </div>

            <div>
              <input
                type="tel"
                name="phone"
                placeholder="Telefoonnummer"
                required
                className="w-full bg-transparent border-b border-neutral-600 py-3 focus:border-white outline-none transition"
              />
            </div>

            <div>
              <input
                type="email"
                name="email"
                placeholder="E-mail"
                required
                className="w-full bg-transparent border-b border-neutral-600 py-3 focus:border-white outline-none transition"
              />
            </div>

            <div>
              <textarea
                name="message"
                placeholder="Waarmee kunnen we je helpen?"
                rows="4"
                required
                className="w-full bg-transparent border-b border-neutral-600 py-3 focus:border-white outline-none resize-none transition"
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-white text-black px-8 py-4 text-sm font-medium tracking-wide btn-hover btn-dark transition w-full sm:w-auto relative z-10"
            >
              Verstuur bericht
            </button>

            <p className="text-xs text-neutral-400 pt-2">
              Door te verzenden ga je akkoord dat we je mogen contacteren over je aanvraag.
            </p>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12 px-6 border-t border-neutral-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-2xl font-display font-semibold tracking-tight">NORTH</div>
            <div className="text-neutral-400 text-sm">© 2026 North Agency. Alle rechten voorbehouden.</div>
          </div>
        </div>
      </footer>
    </div>
  );
}