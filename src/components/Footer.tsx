import { useEffect, useRef } from 'react';
import { GithubLogo, LinkedinLogo, ArrowUp } from '@phosphor-icons/react';
import RippleGrid from './RippleGrid';

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
        footer.querySelector('.footer-logo'),
        { opacity: 0, y: 30, filter: 'blur(5px)' },
        {
          opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: footer, start: 'top 90%' },
        }
      );
    };

    loadGsap();
  }, []);

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer ref={footerRef} className="relative bg-black">
      {/* Large Logo Section */}
      <div className="relative py-24 md:py-32 overflow-hidden">
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
            opacity={0.15}
          />
        </div>

        {/* Dark overlay */}
        <div className="absolute inset-0 z-[1] bg-black/80" />

        {/* Vertical divider lines */}
        <div className="absolute inset-0 z-[1] flex justify-center">
          <div className="w-[1px] bg-white/10" />
          <div className="w-[1px] bg-white/10 ml-[33.33vw]" />
          <div className="w-[1px] bg-white/10 ml-[33.33vw]" />
        </div>

        {/* Logo */}
        <div className="relative z-[2] flex flex-col items-center justify-center footer-logo">
          <p className="text-xs font-mono uppercase tracking-[0.3em] text-white/40">
            © {new Date().getFullYear()} • All Rights Reserved
          </p>
        </div>

        {/* Scroll to top button */}
        <button
          onClick={scrollToTop}
          className="absolute bottom-8 right-8 z-[3] w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white/50 hover:border-white hover:text-white hover:bg-white/10 transition-all duration-300 cursor-target"
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} weight="light" />
        </button>
      </div>

      {/* Bottom Bar */}
      <div className="relative border-t border-white/10 bg-black/90 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Navigation Links */}
          <div className="flex items-center gap-8">
            {['Home', 'About', 'Projects', 'Contact'].map((link) => (
              <button
                key={link}
                onClick={() => scrollTo(`#${link.toLowerCase()}`)}
                className="text-xs font-mono uppercase tracking-wider text-white/40 hover:text-white transition-colors cursor-target"
              >
                {link}
              </button>
            ))}
          </div>

          {/* Credit */}
          <p className="text-xs font-mono text-white/40">
            Crafted with ❤️ by Shihas Yasin
          </p>

          {/* Social Links */}
          <div className="flex gap-4">
            <a 
              href="https://github.com/ShihasYasinn" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white/40 hover:text-white transition-colors cursor-target"
              aria-label="GitHub"
            >
              <GithubLogo size={18} weight="light" />
            </a>
            <a 
              href="https://linkedin.com/in/shihasyasin" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white/40 hover:text-white transition-colors cursor-target"
              aria-label="LinkedIn"
            >
              <LinkedinLogo size={18} weight="light" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
