import { useEffect, useRef, useState, type FormEvent } from 'react';
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
    <section id="contact" ref={sectionRef} className="section-padding relative">
      <div className="max-w-4xl mx-auto">
        <div className="contact-header text-center mb-16 opacity-0">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-3">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Have a project in mind? Let's create something extraordinary together.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="contact-field opacity-0">
              <input
                type="text"
                placeholder="Your Name"
                required
                className="w-full glass-input rounded-xl px-5 py-4 text-foreground placeholder:text-muted-foreground text-sm"
              />
            </div>
            <div className="contact-field opacity-0">
              <input
                type="email"
                placeholder="Your Email"
                required
                className="w-full glass-input rounded-xl px-5 py-4 text-foreground placeholder:text-muted-foreground text-sm"
              />
            </div>
            <div className="contact-field opacity-0">
              <textarea
                placeholder="Your Message"
                rows={5}
                required
                className="w-full glass-input rounded-xl px-5 py-4 text-foreground placeholder:text-muted-foreground text-sm resize-none"
              />
            </div>
            <div className="contact-field opacity-0">
              <button
                type="submit"
                className="btn-neo w-full py-4 rounded-xl text-foreground font-semibold flex items-center justify-center gap-2 text-sm"
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
            <div className="glass rounded-2xl p-6 w-full max-w-xs">
              <div className="flex items-center gap-3 mb-3">
                <EnvelopeSimple size={20} weight="light" className="text-primary" />
                <span className="text-sm text-muted-foreground">Email</span>
              </div>
              <p className="text-foreground font-medium text-sm">hello@milad.dev</p>
            </div>

            <div className="socials flex gap-4">
              {[
                { icon: GithubLogo, label: 'GitHub', href: '#' },
                { icon: LinkedinLogo, label: 'LinkedIn', href: '#' },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="social-icon glass w-12 h-12 rounded-xl flex items-center justify-center opacity-0 hover:glow-primary transition-all duration-300 group"
                  aria-label={label}
                >
                  <Icon size={22} weight="light" className="text-muted-foreground group-hover:text-primary transition-colors" />
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
