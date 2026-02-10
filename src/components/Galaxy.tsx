import { useEffect, useRef } from 'react';

interface GalaxyProps {
  density?: number;
  speed?: number;
  mouseInteraction?: boolean;
}

const Galaxy = ({ density = 1, speed = 1, mouseInteraction = true }: GalaxyProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const starCount = Math.floor(800 * density);
    const stars: {
      x: number; y: number; z: number;
      size: number; baseSize: number;
      hue: number; alpha: number;
      twinkleSpeed: number; twinkleOffset: number;
      vx: number; vy: number;
    }[] = [];

    for (let i = 0; i < starCount; i++) {
      const hue = 190 + Math.random() * 80; // cyan to violet range
      stars.push({
        x: Math.random() * width - width / 2,
        y: Math.random() * height - height / 2,
        z: Math.random() * 1000,
        size: Math.random() * 2 + 0.5,
        baseSize: Math.random() * 2 + 0.5,
        hue,
        alpha: Math.random() * 0.8 + 0.2,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinkleOffset: Math.random() * Math.PI * 2,
        vx: 0,
        vy: 0,
      });
    }

    // Nebula clouds
    const nebulae: { x: number; y: number; radius: number; hue: number; alpha: number }[] = [];
    for (let i = 0; i < 5; i++) {
      nebulae.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 300 + 150,
        hue: 190 + Math.random() * 80,
        alpha: Math.random() * 0.04 + 0.02,
      });
    }

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / width - 0.5) * 2;
      mouseRef.current.y = (e.clientY / height - 0.5) * 2;
    };

    window.addEventListener('resize', handleResize);
    if (mouseInteraction) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    let time = 0;

    const animate = () => {
      time += 0.01 * speed;
      ctx.clearRect(0, 0, width, height);

      // Draw nebulae
      for (const neb of nebulae) {
        const grad = ctx.createRadialGradient(neb.x, neb.y, 0, neb.x, neb.y, neb.radius);
        grad.addColorStop(0, `hsla(${neb.hue}, 80%, 50%, ${neb.alpha})`);
        grad.addColorStop(0.5, `hsla(${neb.hue}, 60%, 30%, ${neb.alpha * 0.5})`);
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.fillRect(neb.x - neb.radius, neb.y - neb.radius, neb.radius * 2, neb.radius * 2);
      }

      const cx = width / 2;
      const cy = height / 2;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      for (const star of stars) {
        // Slow rotation
        const angle = time * 0.05;
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        const rx = star.x * cos - star.y * sin;
        const ry = star.x * sin + star.y * cos;

        // Perspective
        const perspective = 600 / (600 + star.z);
        const sx = rx * perspective + cx + mx * 30 * perspective;
        const sy = ry * perspective + cy + my * 30 * perspective;

        // Twinkle
        const twinkle = Math.sin(time * star.twinkleSpeed * 100 + star.twinkleOffset) * 0.4 + 0.6;
        const size = star.baseSize * perspective * twinkle;
        const alpha = star.alpha * perspective * twinkle;

        // Draw star with glow
        const grad = ctx.createRadialGradient(sx, sy, 0, sx, sy, size * 3);
        grad.addColorStop(0, `hsla(${star.hue}, 90%, 80%, ${alpha})`);
        grad.addColorStop(0.3, `hsla(${star.hue}, 80%, 60%, ${alpha * 0.5})`);
        grad.addColorStop(1, 'transparent');

        ctx.beginPath();
        ctx.fillStyle = grad;
        ctx.arc(sx, sy, size * 3, 0, Math.PI * 2);
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.fillStyle = `hsla(${star.hue}, 100%, 95%, ${alpha})`;
        ctx.arc(sx, sy, size * 0.5, 0, Math.PI * 2);
        ctx.fill();

        // Depth movement
        star.z -= 0.2 * speed;
        if (star.z < 1) star.z = 1000;
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [density, speed, mouseInteraction]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 0 }}
    />
  );
};

export default Galaxy;
