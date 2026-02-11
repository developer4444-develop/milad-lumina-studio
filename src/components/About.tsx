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
  { name: 'SQL', icon: Database },
  { name: 'Java', icon: Coffee },
  { name: 'HTML/CSS', icon: PaintBrush },
  { name: 'JavaScript', icon: FileJs },
  { name: 'Git', icon: GitBranch },
  { name: 'REST API', icon: Atom },
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

      <div className="relative z-[2] max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="about-text opacity-0 mb-16 text-center">
          <div className="text-xs md:text-sm font-mono tracking-[0.3em] uppercase text-white/50 mb-4">
            About Me
          </div>
          <BlurText
            text="PYTHON DEVELOPER"
            delay={100}
            animateBy="letters"
            direction="top"
            className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-8 justify-center"
            stepDuration={0.2}
          />
          <div className="w-20 h-[2px] bg-white/30 mb-8 mx-auto" />

          <div className="max-w-3xl mx-auto space-y-6">
            <p className="text-white/70 leading-relaxed text-lg cursor-target">
              Junior Python Developer with hands-on experience in Django, DRF, REST API development, 
              and database management. Strong background in AI & Data Science with a solid understanding 
              of backend architecture, real-time communication, and scalable web applications.
            </p>
            <p className="text-white/70 leading-relaxed text-lg cursor-target">
              Currently working at BrandStrek Coders, developing and maintaining production-ready backend 
              modules, building optimized APIs, and collaborating with cross-functional teams to deliver 
              scalable solutions.
            </p>
          </div>
        </div>

        {/* Skills grid */}
        <div className="skill-grid grid grid-cols-4 gap-6 max-w-5xl mx-auto">
          {skills.map((skill) => (
            <div
              key={skill.name}
              className="skill-item opacity-0 cursor-target"
            >
              <div className="border border-white/20 rounded-lg p-8 flex flex-col items-center gap-4 hover:border-white/50 hover:bg-white/5 transition-all duration-300 group aspect-square justify-center">
                <skill.icon
                  size={40}
                  weight="light"
                  className="text-white/70 group-hover:text-white transition-colors duration-300"
                />
                <span className="text-xs font-mono uppercase tracking-wider text-white/50 group-hover:text-white/80 transition-colors text-center">
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
