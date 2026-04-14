import { useEffect, useRef, useState, type FormEvent } from 'react';
import RippleGrid from './RippleGrid';
import BlurText from './BlurText';
import { GithubLogo, LinkedinLogo, EnvelopeSimple, PaperPlaneTilt, WhatsappLogo } from '@phosphor-icons/react';

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    
    // You can get your own free access key from web3forms.com
    formData.append("access_key", "156c83be-3ac9-45f1-bbb3-3fbfd5c97867");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setSubmitted(true);
        (e.target as HTMLFormElement).reset();
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        console.error("Error", data);
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error", error);
      alert("Something went wrong. Please check your connection.");
    }
  };

  useEffect(() => {
    const loadGsap = async () => {
      const gsap = (await import('gsap')).default;
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      const section = sectionRef.current;
      if (!section) return;

      gsap.fromTo(
        section.querySelector('.contact-header'),
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 75%' },
        }
      );

      gsap.fromTo(
        section.querySelectorAll('.contact-col'),
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.7, stagger: 0.2, ease: 'power3.out',
          scrollTrigger: { trigger: section.querySelector('.contact-grid'), start: 'top 80%' },
        }
      );
    };

    loadGsap();
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="pt-32 pb-24 md:pt-48 md:pb-32 relative bg-black overflow-hidden">
      {/* RippleGrid background */}
      <div className="absolute inset-0 z-[0]">
        <RippleGrid
          enableRainbow={false}
          gridColor="#ffffff"
          rippleIntensity={0.04}
          gridSize={8}
          gridThickness={12}
          mouseInteraction={true}
          mouseInteractionRadius={1.2}
          opacity={0.1}
        />
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 z-[1] bg-black/85" />

      <div className="relative z-[2] max-w-7xl mx-auto px-6 md:px-12">
        {/* Header Section (Consistent with Projects) */}
        <div className="contact-header mb-16 md:mb-24 opacity-0">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="text-left">
              <div className="text-xs md:text-sm font-mono tracking-[0.3em] uppercase text-white/40 mb-4 px-1">
                Get In Touch
              </div>
              <BlurText
                text="CONTACT"
                delay={100}
                animateBy="letters"
                direction="top"
                className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white mb-0 text-left leading-none"
                stepDuration={0.2}
              />
            </div>
            <div className="hidden md:block max-w-[280px] text-left md:text-right text-white/40 text-[10px] md:text-xs font-mono uppercase tracking-widest leading-relaxed mb-2">
              Available for freelance opportunities and full-time collaborations.
            </div>
          </div>
          <div className="w-full h-px bg-white/10 mt-8" />
        </div>

        {/* Contact Grid */}
        <div className="contact-grid grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24">
          
          {/* Left Column: CTA & Info (7 Cols) */}
          <div className="contact-col lg:col-span-7 space-y-12 md:space-y-20">
            <div className="space-y-6">
              <h3 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.1]">
                Let&apos;s create something <span className="text-white/40 italic font-light">exceptional</span> together.
              </h3>
              <p className="text-base md:text-xl text-white/40 leading-relaxed max-w-lg">
                Whether you have a fully-baked idea or just a spark of inspiration, I&apos;d love to help you build the backend that powers it.
              </p>
            </div>

            <div className="space-y-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="group space-y-3 cursor-target">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/20">Email Me</span>
                  <a href="mailto:shihasyasin@gmail.com" className="block text-lg md:text-2xl font-medium text-white/80 hover:text-white transition-colors underline decoration-white/10 underline-offset-8">
                    shihasyasin@gmail.com
                  </a>
                </div>
                <div className="group space-y-3 cursor-target">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/20">WhatsApp</span>
                  <a href="https://wa.me/919605698790" className="block text-lg md:text-2xl font-medium text-white/80 hover:text-white transition-colors underline decoration-white/10 underline-offset-8">
                    +91 9605698790
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                {[
                  { icon: GithubLogo, label: 'GitHub', href: 'https://github.com/ShihasYasinn' },
                  { icon: LinkedinLogo, label: 'LinkedIn', href: 'https://linkedin.com/in/shihasyasin' },
                ].map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 md:w-14 md:h-14 border border-white/10 rounded-full flex items-center justify-center hover:border-white/40 hover:bg-white/5 transition-all duration-500 group cursor-target"
                    aria-label={label}
                  >
                    <Icon size={24} weight="thin" className="text-white/40 group-hover:text-white transition-colors" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Form (5 Cols) */}
          <div className="contact-col lg:col-span-5">
            <div className="bg-white/[0.02] border border-white/10 p-8 md:p-12 rounded-[2rem] backdrop-blur-xl">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-white/20">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full bg-transparent border-b border-white/10 py-3 text-white focus:border-white focus:outline-none transition-all cursor-target text-base"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-white/20">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full bg-transparent border-b border-white/10 py-3 text-white focus:border-white focus:outline-none transition-all cursor-target text-base"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase tracking-widest text-white/20">Message</label>
                  <textarea
                    rows={2}
                    name="message"
                    required
                    className="w-full bg-transparent border-b border-white/10 py-3 text-white resize-none focus:border-white focus:outline-none transition-all cursor-target text-base"
                  />
                </div>
                
                <button
                  type="submit"
                  className="group relative w-full py-5 rounded-xl overflow-hidden transition-all duration-500 cursor-target mt-4"
                >
                  <div className="absolute inset-0 bg-white hover:bg-white/90 transition-colors" />
                  <span className="relative z-10 text-black font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-3">
                    {submitted ? (
                      'Sent ✓'
                    ) : (
                      <>
                        Send Message
                        <PaperPlaneTilt size={16} weight="bold" className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </>
                    )}
                  </span>
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;

