import { useEffect, useRef } from 'react';
import RippleGrid from './RippleGrid';
import BlurText from './BlurText';

const experiences = [
  {
    role: 'Python Developer',
    company: 'BrandStrek Coders',
    period: 'Aug 2025 — Present',
    description: [
      'Developing and maintaining production-ready backend modules using Django and DRF.',
      'Building and optimizing APIs for core business modules.',
      'Collaborating with product and frontend teams to deliver scalable solutions.'
    ]
  },
  {
    role: 'Automation / Backend Developer',
    company: 'BrandStrek Coders',
    period: 'Feb 2025 — Present',
    description: [
      'Leading a team focused on AI automation solutions and no-code website development.',
      'Implementing automation systems using n8n and other AI-powered tools.',
      'Handling client requirements and managing project timelines.'
    ]
  },
  {
    role: 'Python Django Intern',
    company: 'Futura Labs',
    period: 'Jul 2024 — Aug 2024',
    description: [
      'Built basic web application features using Django under mentor guidance.',
      'Implemented CRUD operations with Django ORM and MySQL.',
      'Customized dashboards using Django templates.'
    ]
  }
];

const Experience = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const loadGsap = async () => {
      const gsap = (await import('gsap')).default;
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      const section = sectionRef.current;
      if (!section) return;

      gsap.fromTo(
        section.querySelector('.experience-header'),
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 75%' },
        }
      );

      gsap.fromTo(
        section.querySelectorAll('.experience-item'),
        { opacity: 0, x: -30 },
        {
          opacity: 1, x: 0, duration: 0.7,
          stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: section.querySelector('.experience-list'), start: 'top 80%' },
        }
      );
    };

    loadGsap();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="pt-32 pb-24 md:pt-48 md:pb-32 relative bg-black overflow-hidden">
      {/* RippleGrid background */}
      <div className="absolute inset-0 z-[0]">
        <RippleGrid
          enableRainbow={false}
          gridColor="#ffffff"
          rippleIntensity={0.04}
          gridSize={8}
          gridThickness={12}
          mouseInteraction={true}
          mouseInteractionRadius={1.2}
          opacity={0.1}
        />
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 z-[1] bg-black/85" />

      <div className="relative z-[2] max-w-7xl mx-auto px-6 md:px-12">
        {/* Header Section */}
        <div className="experience-header mb-20 md:mb-32 opacity-0">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="text-left">
              <div className="text-xs md:text-sm font-mono tracking-[0.3em] uppercase text-white/40 mb-4 px-1">
                Professional Path
              </div>
              <BlurText
                text="EXPERIENCE"
                delay={100}
                animateBy="letters"
                direction="top"
                className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white mb-0 text-left leading-none"
                stepDuration={0.2}
              />
            </div>
            <div className="hidden md:block max-w-[280px] text-left md:text-right text-white/40 text-[10px] md:text-xs font-mono uppercase tracking-widest leading-relaxed mb-2">
              A journey of building scalable systems and innovative backend solutions.
            </div>
          </div>
          <div className="w-full h-px bg-white/10 mt-8" />
        </div>

        {/* Experience List */}
        <div className="experience-list flex flex-col">
          {experiences.map((exp, i) => (
            <div
              key={exp.role + exp.period}
              className="experience-item group opacity-0 border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-all duration-500"
            >
              <div className="py-12 md:py-20 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-4 items-start">

                {/* Period & Company (3 Cols) */}
                <div className="md:col-span-3 flex flex-col gap-2">
                  <span className="text-[10px] md:text-xs font-mono text-white/30 uppercase tracking-[0.2em]">{exp.period}</span>
                  <p className="text-lg md:text-xl font-bold text-white/60 tracking-tight group-hover:text-white transition-colors">
                    {exp.company}
                  </p>
                </div>

                {/* Role & Details (9 Cols) */}
                <div className="md:col-span-9 space-y-6">
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-white/80 group-hover:text-white transition-all duration-500 tracking-tighter">
                    {exp.role.toUpperCase()}
                  </h3>
                  <ul className="space-y-4 max-w-3xl">
                    {exp.description.map((item, idx) => (
                      <li key={idx} className="flex gap-4 group/item">
                        <div className="mt-2 w-1.5 h-1.5 rounded-full bg-white/10 group-hover/item:bg-white/40 transition-colors shrink-0" />
                        <p className="text-sm md:text-lg text-white/40 group-hover:text-white/60 transition-colors leading-relaxed font-light">
                          {item}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
