import { useEffect, useRef } from 'react';
import RippleGrid from './RippleGrid';
import BlurText from './BlurText';
import { ArrowUpRight } from '@phosphor-icons/react';

const projects = [
  {
    title: 'Rental Platform',
    description: 'Backend development for user registration, bookings, and vehicle listings with real-time booking updates using WebSockets.',
    tags: ['Django', 'REST API', 'WebSocket', 'PostgreSQL'],
    color: 'hsl(190 100% 50%)',
    company: 'BrandStrek Coders',
  },
  {
    title: 'Cloud Kitchen Platform',
    description: 'Multi-branch cloud kitchen system with role-based authentication for admin, staff, and delivery partners.',
    tags: ['Django', 'REST API', 'WebSocket', 'PostgreSQL'],
    color: 'hsl(220 90% 60%)',
    company: 'BrandStrek Coders',
  },
  {
    title: 'E-Commerce Admin Dashboard',
    description: 'Professional admin dashboard system with customized UI template for managing products, orders, and users across multiple e-commerce projects.',
    tags: ['Django', 'Bootstrap', 'PostgreSQL'],
    color: 'hsl(265 85% 60%)',
  },
];

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const loadGsap = async () => {
      const gsap = (await import('gsap')).default;
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      const section = sectionRef.current;
      if (!section) return;

      gsap.fromTo(
        section.querySelector('.projects-header'),
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 75%' },
        }
      );

      gsap.fromTo(
        section.querySelectorAll('.project-card'),
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.7,
          stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: section.querySelector('.projects-grid'), start: 'top 80%' },
        }
      );
    };

    loadGsap();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="section-padding relative bg-black">
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

      <div className="relative z-[2] max-w-7xl mx-auto">
        <div className="projects-header mb-16 opacity-0 text-center">
          <div className="text-xs md:text-sm font-mono tracking-[0.3em] uppercase text-white/50 mb-4">
            Selected Work
          </div>
          <BlurText
            text="PROJECTS"
            delay={100}
            animateBy="letters"
            direction="top"
            className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-8 justify-center"
            stepDuration={0.2}
          />
          <div className="w-20 h-[2px] bg-white/30 mx-auto" />
        </div>

        <div className="projects-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <div
              key={project.title}
              className="project-card group opacity-0 cursor-target flex"
            >
              <div className="border border-white/20 rounded-lg overflow-hidden hover:border-white/50 transition-all duration-500 hover:translate-y-[-4px] flex flex-col w-full">
                {/* Color accent bar */}
                <div className="h-[2px] w-full bg-white/30" />

                <div className="p-6 bg-black/40 backdrop-blur-sm flex-1 flex flex-col">
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-xs font-mono text-white/40">0{i + 1}</span>
                    <ArrowUpRight 
                      size={20} 
                      weight="light" 
                      className="text-white/40 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" 
                    />
                  </div>

                  {project.company && (
                    <div className="text-xs font-mono text-white/40 mb-3">{project.company}</div>
                  )}

                  <h3 className="text-xl font-bold mb-3 text-white tracking-tight">{project.title}</h3>
                  <p className="text-sm text-white/60 mb-5 leading-relaxed flex-1">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tags.map((tag) => (
                      <span 
                        key={tag} 
                        className="text-[10px] font-mono uppercase tracking-wider px-3 py-1 border border-white/20 rounded text-white/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
