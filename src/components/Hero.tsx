import { useEffect, useRef } from 'react';
import RippleGrid from './RippleGrid';
import LightRays from './LightRays';
import BlurText from './BlurText';

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
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* RippleGrid 3D background */}
      <div className="absolute inset-0 z-[0]">
        <RippleGrid
          enableRainbow={false}
          gridColor="#ffffff"
          rippleIntensity={0.05}
          gridSize={10}
          gridThickness={15}
          mouseInteraction={true}
          mouseInteractionRadius={1.2}
          opacity={0.3}
        />
      </div>

      {/* LightRays background */}
      <div className="absolute inset-0 z-[0]">
        <LightRays
          raysOrigin="top-center"
          raysColor="#ffffff"
          raysSpeed={1}
          lightSpread={0.5}
          rayLength={3}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0}
          distortion={0}
          pulsating={false}
          fadeDistance={1}
          saturation={1}
        />
      </div>

      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 z-[1] bg-black/60" />

      {/* Content */}
      <div className="relative z-[2] text-center px-6 max-w-6xl">
        {/* Small label */}
        <div
          ref={subtitleRef}
          className="text-sm md:text-base font-mono tracking-[0.4em] uppercase text-white/50 mb-12 opacity-0"
        >
          SHIHAS YASIN S
        </div>

        {/* Main title with BlurText animation */}
        <div
          ref={headlineRef}
          className="mb-12 opacity-0"
        >
          <div className="flex items-center justify-center gap-6 mb-2">
            <BlurText
              text="JUNIOR"
              delay={100}
              animateBy="letters"
              direction="top"
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-none text-white justify-center"
              stepDuration={0.2}
            />
            <BlurText
              text="PYTHON"
              delay={100}
              animateBy="letters"
              direction="top"
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-none text-white justify-center"
              stepDuration={0.2}
            />
          </div>
          <BlurText
            text="DEVELOPER"
            delay={100}
            animateBy="letters"
            direction="top"
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-none text-white justify-center block"
            stepDuration={0.2}
          />
        </div>

        {/* CTA Button */}
        <a
          ref={ctaRef}
          href="#projects"
          onClick={(e) => { e.preventDefault(); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }); }}
          className="inline-flex items-center justify-center w-32 h-32 rounded-full border-2 border-white/30 text-white font-medium text-xs uppercase tracking-widest opacity-0 cursor-pointer transition-all duration-500 hover:border-white hover:bg-white/10 hover:scale-110 cursor-target"
          style={{ 
            borderStyle: 'dashed',
            animation: 'spin 20s linear infinite'
          }}
        >
          <span className="block" style={{ animation: 'spin 20s linear infinite reverse' }}>
            View Work
          </span>
        </a>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
};

export default Hero;
