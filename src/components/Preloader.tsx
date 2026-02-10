import { useEffect, useRef, useState } from 'react';

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
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
      style={{
        background: 'linear-gradient(135deg, hsl(225 25% 3%), hsl(265 20% 6%))',
      }}
    >
      {/* Ambient glow */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, hsl(190 100% 50% / 0.3), transparent)',
          filter: 'blur(80px)',
        }}
      />

      <h1
        ref={textRef}
        className="text-5xl md:text-7xl font-bold tracking-tight mb-12 gradient-text"
        style={{ letterSpacing: '-0.03em' }}
      >
        Milad
      </h1>

      <div className="relative w-48 md:w-64 h-[2px] overflow-hidden rounded-full bg-muted/30">
        <div
          ref={progressRef}
          className="h-full rounded-full transition-all duration-100"
          style={{
            width: `${progress}%`,
            background: 'linear-gradient(90deg, hsl(190 100% 50%), hsl(265 85% 60%))',
            boxShadow: '0 0 15px hsl(190 100% 50% / 0.5)',
          }}
        />
      </div>

      <span className="mt-4 text-sm font-mono text-muted-foreground tracking-widest">
        {progress}%
      </span>
    </div>
  );
};

export default Preloader;
