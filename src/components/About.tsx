import { useEffect, useRef } from 'react';
import RippleGrid from './RippleGrid';
import BlurText from './BlurText';
import {
  Code,
  Database,
  FileJs,
  Atom,
  PaintBrush,
  Lightning,
  GitBranch,
  Coffee,
} from '@phosphor-icons/react';

const skills = [
  { name: 'Python', icon: Code },
  { name: 'Django', icon: Lightning },
  { name: 'FastAPI', icon: Atom },
  { name: 'SQL', icon: Database },
  { name: 'Spring Boot', icon: Coffee },
  { name: 'Docker', icon: Lightning },
  { name: 'n8n', icon: GitBranch },
  { name: 'Git', icon: GitBranch },
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
    <section id="about" ref={sectionRef} className="section-padding relative bg-black">
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

      <div className="relative z-[2] max-w-6xl mx-auto px-4 md:px-0">
        {/* Section Title */}
        <div className="about-text opacity-0 mb-12 md:mb-16 text-center">
          <div className="text-xs md:text-sm font-mono tracking-[0.3em] uppercase text-white/50 mb-4">
            About Me
          </div>
          <BlurText
            text="PYTHON DEVELOPER"
            delay={100}
            animateBy="letters"
            direction="top"
            className="text-3xl sm:text-5xl md:text-7xl font-black tracking-tighter text-white mb-6 md:mb-8 justify-center"
            stepDuration={0.2}
          />
          <div className="w-16 md:w-20 h-[2px] bg-white/30 mb-8 mx-auto" />

          <div className="max-w-3xl mx-auto space-y-4 md:space-y-6">
            <p className="text-white/70 leading-relaxed text-base md:text-lg cursor-target">
              Junior Python Developer experienced in Django and DRF, building RESTful APIs, 
              integrating third-party services, and managing PostgreSQL databases. 
              Strong background in backend architecture, authentication, and scalable server-side development.
            </p>
            <div className="pt-6">
              <a
                href="https://drive.google.com/file/d/1Dd2GjOJ3JXnOgCGSt2hmZMP5V_2jrrpX/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-3 border border-white/20 rounded-full text-[10px] md:text-xs font-mono uppercase tracking-[0.2em] text-white/50 hover:text-white hover:border-white/60 hover:bg-white/5 transition-all duration-500 cursor-target group"
              >
                Download Full CV
                <span className="w-1.5 h-1.5 rounded-full bg-white/40 group-hover:bg-white animate-pulse" />
              </a>
            </div>
          </div>
        </div>

        {/* Skills grid */}
        <div className="skill-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
          {skills.map((skill) => (
            <div
              key={skill.name}
              className="skill-item opacity-0 cursor-target"
            >
              <div className="border border-white/20 rounded-lg p-6 md:p-8 flex flex-col items-center gap-3 md:gap-4 hover:border-white/50 hover:bg-white/5 transition-all duration-300 group aspect-square justify-center text-center">
                <skill.icon
                  size={32}
                  className="text-white/70 group-hover:text-white transition-colors duration-300 md:w-[40px] md:h-[40px]"
                />
                <span className="text-[10px] md:text-xs font-mono uppercase tracking-wider text-white/50 group-hover:text-white/80 transition-colors">
                  {skill.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
