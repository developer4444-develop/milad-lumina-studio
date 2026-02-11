import { useEffect, useRef, useState } from 'react';
import RippleGrid from './RippleGrid';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let start: number | null = null;
    const duration = 2200;

    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const p = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      setProgress(Math.floor(eased * 100));

      if (p < 1) {
        requestAnimationFrame(animate);
      } else {
        // Fade out preloader
        setTimeout(() => {
          if (preloaderRef.current) {
            preloaderRef.current.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            preloaderRef.current.style.opacity = '0';
            preloaderRef.current.style.transform = 'scale(0.95)';
            setTimeout(() => {
              onComplete();
            }, 800);
          }
        }, 300);
      }
    };

    requestAnimationFrame(animate);
  }, [onComplete]);

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black"
    >
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

      {/* Content */}
      <div className="relative z-[2] flex flex-col items-center">
        <div className="text-xs md:text-sm font-mono tracking-[0.3em] uppercase text-white/50 mb-8">
          Loading
        </div>

        <h1
          ref={textRef}
          className="text-6xl md:text-8xl font-black tracking-tighter mb-12 text-white"
          style={{ letterSpacing: '-0.05em' }}
        >
          SHIHAS YASIN
        </h1>

        <div className="relative w-64 md:w-80 h-[2px] overflow-hidden bg-white/10">
          <div
            ref={progressRef}
            className="h-full transition-all duration-100 bg-white"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>

        <span className="mt-6 text-sm font-mono text-white/40 tracking-[0.3em] uppercase">
          {progress}%
        </span>
      </div>
    </div>
  );
};

export default Preloader;
