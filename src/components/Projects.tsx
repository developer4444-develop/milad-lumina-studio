import { useEffect, useRef } from 'react';
import { ArrowUpRight } from '@phosphor-icons/react';

const projects = [
  {
    title: 'Aurora Dashboard',
    description: 'Real-time analytics platform with data visualization and AI insights.',
    tags: ['React', 'D3.js', 'Node.js'],
    color: 'hsl(190 100% 50%)',
  },
  {
    title: 'NexGen Commerce',
    description: 'High-conversion e-commerce with immersive 3D product previews.',
    tags: ['Next.js', 'Three.js', 'Stripe'],
    color: 'hsl(220 90% 60%)',
  },
  {
    title: 'Pulse Social',
    description: 'Social media platform with real-time messaging and content feeds.',
    tags: ['React', 'Socket.io', 'PostgreSQL'],
    color: 'hsl(265 85% 60%)',
  },
  {
    title: 'Cipher Vault',
    description: 'Enterprise-grade security platform with end-to-end encryption.',
    tags: ['TypeScript', 'Rust', 'WebAssembly'],
    color: 'hsl(170 80% 45%)',
  },
  {
    title: 'Orbit Studio',
    description: 'Creative agency portfolio with GSAP-powered micro-interactions.',
    tags: ['GSAP', 'WebGL', 'Figma'],
    color: 'hsl(30 90% 55%)',
  },
  {
    title: 'SynapseAI',
    description: 'Machine learning interface with neural network visualizations.',
    tags: ['Python', 'TensorFlow', 'React'],
    color: 'hsl(340 80% 55%)',
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
    <section id="projects" ref={sectionRef} className="section-padding relative">
      <div className="max-w-7xl mx-auto">
        <div className="projects-header mb-16 opacity-0">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-3">
            Selected <span className="gradient-text">Work</span>
          </h2>
          <p className="text-muted-foreground max-w-md">
            A curated collection of projects that showcase my craft in design, development, and creative technology.
          </p>
        </div>

        <div className="projects-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, i) => (
            <div
              key={project.title}
              className="project-card group glass rounded-2xl overflow-hidden opacity-0 cursor-pointer transition-all duration-500 hover:translate-y-[-4px]"
              style={{
                ['--card-glow' as string]: project.color,
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.boxShadow = `0 0 30px ${project.color}30, 0 0 60px ${project.color}10`;
                el.style.borderColor = `${project.color}40`;
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.boxShadow = '';
                el.style.borderColor = '';
              }}
            >
              {/* Color accent bar */}
              <div className="h-[2px] w-full" style={{ background: `linear-gradient(90deg, ${project.color}, transparent)` }} />

              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-xs font-mono text-muted-foreground">0{i + 1}</span>
                  <ArrowUpRight size={20} weight="light" className="text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                </div>

                <h3 className="text-xl font-semibold mb-2 text-foreground tracking-tight">{project.title}</h3>
                <p className="text-sm text-muted-foreground mb-5 leading-relaxed">{project.description}</p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-[10px] font-mono uppercase tracking-wider px-3 py-1 rounded-full bg-muted/50 text-muted-foreground">
                      {tag}
                    </span>
                  ))}
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
