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
    <footer ref={footerRef} className="relative bg-black border-t border-white/5">
      {/* Large Statement Section */}
      <div className="relative py-32 md:py-48 overflow-hidden">
        {/* RippleGrid background */}
        <div className="absolute inset-0 z-[0]">
          <RippleGrid
            enableRainbow={false}
            gridColor="#ffffff"
            rippleIntensity={0.03}
            gridSize={12}
            gridThickness={10}
            mouseInteraction={true}
            mouseInteractionRadius={1.5}
            opacity={0.08}
          />
        </div>

        {/* Dynamic Typography Watermark */}
        <div className="absolute inset-0 z-[1] flex items-center justify-center opacity-[0.02] pointer-events-none select-none">
          <span className="text-[20vw] font-black tracking-tighter whitespace-nowrap">SHIHAS YASIN</span>
        </div>

        <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black via-transparent to-transparent" />

        {/* Vertical divider lines (Consistent with rest of the site) */}
        <div className="absolute inset-0 z-[1] flex justify-center pointer-events-none">
          <div className="w-px h-full bg-white/5" />
          <div className="w-px h-full bg-white/5 mx-[25vw]" />
          <div className="w-px h-full bg-white/5" />
        </div>

        <div className="relative z-[2] flex flex-col items-center justify-center text-center space-y-6">
          <div className="footer-logo space-y-4">
            <h2 className="text-4xl md:text-6xl font-black text-white/90 tracking-tighter uppercase">
              SHIHAS YASIN
            </h2>
            <p className="text-[10px] md:text-xs font-mono uppercase tracking-[0.5em] text-white/30">
              © {new Date().getFullYear()} • ALL RIGHTS RESERVED
            </p>
          </div>
        </div>

        {/* Scroll to top button (More minimal) */}
        <button
          onClick={scrollToTop}
          className="absolute bottom-12 right-6 md:right-12 z-[3] w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/20 hover:border-white/40 hover:text-white hover:bg-white/5 transition-all duration-500 cursor-target group"
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} weight="thin" className="group-hover:-translate-y-1 transition-transform" />
        </button>
      </div>

      {/* Bottom Navigation & Identity */}
      <div className="relative border-t border-white/5 py-12 bg-black">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-12">
          
          {/* Main sections */}
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-4">
            {['Home', 'About', 'Experience', 'Education', 'Projects', 'Contact'].map((link) => (
              <button
                key={link}
                onClick={() => scrollTo(`#${link.toLowerCase()}`)}
                className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/30 hover:text-white transition-all duration-300 relative group cursor-target"
              >
                {link}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-white/40 transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </div>

          <div className="flex flex-col items-center md:items-end gap-6 text-center md:text-right">
              <div className="flex gap-6">
                {[
                  { icon: GithubLogo, label: 'GitHub', href: 'https://github.com/ShihasYasinn' },
                  { icon: LinkedinLogo, label: 'LinkedIn', href: 'https://linkedin.com/in/shihasyasin' },
                ].map(({ icon: Icon, href, label }) => (
                  <a 
                    key={label}
                    href={href} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-white/20 hover:text-white transition-all duration-500 cursor-target p-2 border border-white/0 hover:border-white/10 rounded-lg hover:bg-white/[0.02]"
                    aria-label={label}
                  >
                    <Icon size={22} weight="thin" />
                  </a>
                ))}
              </div>
              <p className="text-[10px] font-mono text-white/20 uppercase tracking-widest">
                Crafted with <span className="text-white/40 group-hover:text-red-500/50 transition-colors">intensity</span> by Shihas Yasin
              </p>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
