import { useEffect, useRef } from 'react';
import Galaxy from './Galaxy';

const Hero = () => {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const loadGsap = async () => {
      const gsap = (await import('gsap')).default;

      const tl = gsap.timeline({ delay: 0.3 });

      tl.fromTo(
        headlineRef.current,
        { opacity: 0, y: 60, filter: 'blur(10px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2, ease: 'power3.out' }
      )
        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
          '-=0.6'
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)' },
          '-=0.4'
        );
    };

    loadGsap();
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Galaxy background */}
      <Galaxy density={1.2} speed={0.8} mouseInteraction />

      {/* Gradient overlay for readability */}
      <div className="absolute inset-0 z-[1]"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 30%, hsl(225 25% 4% / 0.6) 70%)',
        }}
      />

      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full animate-float opacity-20"
        style={{ background: 'radial-gradient(circle, hsl(190 100% 50% / 0.4), transparent)', filter: 'blur(40px)' }}
      />
      <div className="absolute bottom-1/3 right-1/4 w-48 h-48 rounded-full animate-float opacity-15"
        style={{ background: 'radial-gradient(circle, hsl(265 85% 60% / 0.4), transparent)', filter: 'blur(50px)', animationDelay: '2s' }}
      />

      {/* Content */}
      <div className="relative z-[2] text-center px-6 max-w-4xl">
        <h1
          ref={headlineRef}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-none mb-6 opacity-0"
          style={{ letterSpacing: '-0.04em' }}
        >
          <span className="text-foreground">Hi, I'm </span>
          <span className="gradient-text glow-text">Milad</span>
          <br />
          <span className="text-foreground text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold block mt-2">
            Web Developer
          </span>
        </h1>

        <p
          ref={subtitleRef}
          className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto mb-10 opacity-0 leading-relaxed"
        >
          Crafting immersive digital experiences with cutting-edge technology,
          precision design, and cinematic motion.
        </p>

        <a
          ref={ctaRef}
          href="#contact"
          onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
          className="btn-neo inline-flex items-center gap-2 px-8 py-4 rounded-full text-foreground font-semibold text-lg opacity-0 cursor-pointer"
        >
          Hire Me
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
        </a>
      </div>
    </section>
  );
};

export default Hero;
