import { useEffect, useRef } from 'react';
import {
  Code,
  Browser,
  FileJs,
  Atom,
  PaintBrush,
  Lightning,
} from '@phosphor-icons/react';

const skills = [
  { name: 'HTML5', icon: Code },
  { name: 'CSS3', icon: PaintBrush },
  { name: 'JavaScript', icon: FileJs },
  { name: 'React', icon: Atom },
  { name: 'GSAP', icon: Lightning },
  { name: 'Web Dev', icon: Browser },
];

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const loadGsap = async () => {
      const gsap = (await import('gsap')).default;
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      const section = sectionRef.current;
      if (!section) return;

      gsap.fromTo(
        section.querySelector('.about-image'),
        { opacity: 0, x: -60, filter: 'blur(8px)' },
        {
          opacity: 1, x: 0, filter: 'blur(0px)', duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 75%' },
        }
      );

      gsap.fromTo(
        section.querySelector('.about-text'),
        { opacity: 0, y: 40, filter: 'blur(6px)' },
        {
          opacity: 1, y: 0, filter: 'blur(0px)', duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 70%' },
        }
      );

      gsap.fromTo(
        section.querySelectorAll('.skill-item'),
        { opacity: 0, y: 30, scale: 0.9 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.5,
          stagger: 0.1, ease: 'back.out(1.7)',
          scrollTrigger: { trigger: section.querySelector('.skill-grid'), start: 'top 80%' },
        }
      );
    };

    loadGsap();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="section-padding relative">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        {/* Profile image */}
        <div className="about-image flex justify-center opacity-0">
          <div className="relative">
            <div className="w-56 h-56 md:w-72 md:h-72 rounded-full overflow-hidden glow-primary"
              style={{ padding: '3px', background: 'linear-gradient(135deg, hsl(190 100% 50%), hsl(265 85% 60%))' }}
            >
              <div className="w-full h-full rounded-full bg-card flex items-center justify-center">
                <span className="text-6xl md:text-7xl font-bold gradient-text">M</span>
              </div>
            </div>
            {/* Glow behind */}
            <div className="absolute inset-0 rounded-full opacity-30"
              style={{ filter: 'blur(40px)', background: 'linear-gradient(135deg, hsl(190 100% 50%), hsl(265 85% 60%))' }}
            />
          </div>
        </div>

        {/* Bio */}
        <div className="about-text opacity-0">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 tracking-tight">
            About <span className="gradient-text">Me</span>
          </h2>
          <div className="w-12 h-[2px] mb-6" style={{ background: 'linear-gradient(90deg, hsl(190 100% 50%), hsl(265 85% 60%))' }} />

          <p className="text-muted-foreground leading-relaxed mb-4">
            I'm a passionate full-stack web developer specializing in creating immersive,
            high-performance digital experiences. With expertise spanning frontend frameworks,
            animation libraries, and creative coding, I bring designs to life with precision
            and flair.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-8">
            Every project is a chance to push boundaries—blending cutting-edge tech with
            thoughtful design to deliver experiences that feel cinematic and unforgettable.
          </p>

          {/* Skills grid */}
          <div className="skill-grid grid grid-cols-3 gap-3">
            {skills.map((skill) => (
              <div
                key={skill.name}
                className="skill-item glass rounded-xl p-4 flex flex-col items-center gap-2 opacity-0 hover:glow-primary transition-shadow duration-300 group cursor-default"
              >
                <skill.icon
                  size={28}
                  weight="light"
                  className="text-primary group-hover:text-glow-secondary transition-colors duration-300"
                />
                <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                  {skill.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
