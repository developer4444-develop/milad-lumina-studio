import { useEffect, useRef, useState, type FormEvent } from 'react';
import RippleGrid from './RippleGrid';
import BlurText from './BlurText';
import { GithubLogo, LinkedinLogo, EnvelopeSimple, PaperPlaneTilt } from '@phosphor-icons/react';

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
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
        section.querySelectorAll('.contact-field'),
        { opacity: 0, x: -40 },
        {
          opacity: 1, x: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: section.querySelector('form'), start: 'top 80%' },
        }
      );

      gsap.fromTo(
        section.querySelectorAll('.social-icon'),
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1, scale: 1, duration: 0.5, stagger: 0.1, ease: 'back.out(1.7)',
          scrollTrigger: { trigger: section.querySelector('.socials'), start: 'top 85%' },
        }
      );
    };

    loadGsap();
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="section-padding relative bg-black">
      {/* RippleGrid background */}
      <div className="absolute inset-0 z-[0]">
        <RippleGrid
          enableRainbow={false}
          gridColor="#ffffff"
          rippleIntensity={0.05}
          gridSize={10}
          gridThickness={15}
          mouseInteraction={true}
          mouseInteractionRadius={1.2}
          opacity={0.2}
        />
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 z-[1] bg-black/70" />

      <div className="relative z-[2] max-w-4xl mx-auto">
        <div className="contact-header mb-16 opacity-0 text-center">
          <div className="text-xs md:text-sm font-mono tracking-[0.3em] uppercase text-white/50 mb-4">
            Get In Touch
          </div>
          <BlurText
            text="CONTACT"
            delay={100}
            animateBy="letters"
            direction="top"
            className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-8 justify-center"
            stepDuration={0.2}
          />
          <div className="w-20 h-[2px] bg-white/30 mx-auto" />
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="contact-field opacity-0">
              <input
                type="text"
                placeholder="Your Name"
                required
                className="w-full bg-black/40 border border-white/20 rounded-lg px-5 py-4 text-white placeholder:text-white/40 text-sm focus:border-white/50 focus:outline-none transition-colors cursor-target"
              />
            </div>
            <div className="contact-field opacity-0">
              <input
                type="email"
                placeholder="Your Email"
                required
                className="w-full bg-black/40 border border-white/20 rounded-lg px-5 py-4 text-white placeholder:text-white/40 text-sm focus:border-white/50 focus:outline-none transition-colors cursor-target"
              />
            </div>
            <div className="contact-field opacity-0">
              <textarea
                placeholder="Your Message"
                rows={5}
                required
                className="w-full bg-black/40 border border-white/20 rounded-lg px-5 py-4 text-white placeholder:text-white/40 text-sm resize-none focus:border-white/50 focus:outline-none transition-colors cursor-target"
              />
            </div>
            <div className="contact-field opacity-0">
              <button
                type="submit"
                className="w-full py-4 rounded-lg text-white font-semibold flex items-center justify-center gap-2 text-sm border border-white/30 hover:border-white hover:bg-white/10 transition-all duration-300 cursor-target"
              >
                {submitted ? (
                  'Message Sent ✓'
                ) : (
                  <>
                    Send Message
                    <PaperPlaneTilt size={18} weight="light" />
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="flex flex-col justify-center items-center md:items-start gap-8">
            <div className="border border-white/20 rounded-lg p-6 w-full max-w-xs bg-black/40 cursor-target">
              <div className="flex items-center gap-3 mb-3">
                <EnvelopeSimple size={20} weight="light" className="text-white/70" />
                <span className="text-sm text-white/50 font-mono uppercase tracking-wider">Email</span>
              </div>
              <p className="text-white font-medium text-sm">shihasyasin@gmail.com</p>
            </div>

            <div className="socials flex gap-4">
              {[
                { icon: GithubLogo, label: 'GitHub', href: 'https://github.com/ShihasYasinn' },
                { icon: LinkedinLogo, label: 'LinkedIn', href: 'https://linkedin.com/in/shihasyasin' },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon border border-white/20 w-12 h-12 rounded-lg flex items-center justify-center opacity-0 hover:border-white hover:bg-white/10 transition-all duration-300 group cursor-target"
                  aria-label={label}
                >
                  <Icon size={22} weight="light" className="text-white/50 group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
