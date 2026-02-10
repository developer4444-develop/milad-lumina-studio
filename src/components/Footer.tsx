import { useEffect, useRef } from 'react';
import { GithubLogo, LinkedinLogo, Heart } from '@phosphor-icons/react';

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const loadGsap = async () => {
      const gsap = (await import('gsap')).default;
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      const footer = footerRef.current;
      if (!footer) return;

      gsap.fromTo(
        footer.children,
        { opacity: 0, y: 30, filter: 'blur(5px)' },
        {
          opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8,
          stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: footer, start: 'top 90%' },
        }
      );
    };

    loadGsap();
  }, []);

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer ref={footerRef} className="relative border-t border-border/50 px-6 py-12 md:px-12">
      {/* Subtle glow at top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px]"
        style={{ background: 'linear-gradient(90deg, transparent, hsl(190 100% 50% / 0.4), transparent)' }}
      />

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          {['Home', 'About', 'Projects', 'Contact'].map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(`#${link.toLowerCase()}`)}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors tracking-wide"
            >
              {link}
            </button>
          ))}
        </div>

        <p className="text-xs text-muted-foreground flex items-center gap-1">
          Crafted with <Heart size={12} weight="fill" className="text-primary" /> by Milad
        </p>

        <div className="flex gap-3">
          {[GithubLogo, LinkedinLogo].map((Icon, i) => (
            <a key={i} href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Icon size={18} weight="light" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
