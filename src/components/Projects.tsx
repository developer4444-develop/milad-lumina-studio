import { useEffect, useRef } from 'react';
import RippleGrid from './RippleGrid';
import BlurText from './BlurText';
import { ArrowUpRight } from '@phosphor-icons/react';

const projects = [
  {
    title: 'Rental Platform',
    company: 'NeoCarz',
    description: 'Spearheaded the backend development for NeoCarz. Created scalable APIs for bookings, vehicle tracking, and user management. Implemented real-time updates via WebSockets and optimized PostgreSQL queries for high performance.',
    tags: ['Django', 'REST API', 'WebSocket', 'PostgreSQL', 'NeoCarz Backend'],
    link: 'https://neocarz.com/',
  },
  {
    title: 'Cloud Kitchen Platform',
    company: 'MenuStarter',
    description: 'Developed robust backend modules for a multi-branch cloud kitchen platform. Engineered workflows for order management, dynamic menus, and delivery logistics. Implemented multi-role authentication to support complex operational requirements.',
    tags: ['Django', 'REST API', 'Auth', 'PostgreSQL', 'MenuStarter Backend'],
    link: 'https://menustarter.com/',
  },
  {
    title: 'Kaffaway Coffee',
    company: 'Kaffaway',
    description: 'Developed the full-featured e-commerce backend for a premium coffee brand. Implemented secure product catalogs, integrated cart systems, and streamlined the order fulfillment pipeline. Managed payment gateway integrations and optimized database search for various coffee blends.',
    tags: ['Django', 'REST API', 'E-Commerce', 'PostgreSQL', 'Payment Gateway'],
    link: 'https://www.kaffaway.com/',
  },
  {
    title: 'Crocotile India',
    company: 'Crocotile',
    description: 'Engineered a high-performance product catalog and enquiry system for an international roofing brand. Developed dynamic product filtering, automated lead generation forms, and a custom backend for managing high-resolution asset delivery and multi-category taxonomies.',
    tags: ['Django', 'REST API', 'Lead Gen', 'PostgreSQL', 'Asset Mgmt'],
    link: 'https://crocotileindia.com/',
  },
  {
    title: 'E-Commerce SaaS Platform',
    company: 'BrandStrek Coders',
    description: 'Built a multi-store SaaS platform integrating Shopify and WooCommerce APIs to sync products and inventory. Implemented webhooks for real-time data sync.',
    tags: ['Django', 'Shopify API', 'WooCommerce API', 'Webhooks'],
    link: '#',
  },
  {
    title: 'E-Commerce Admin Dashboard',
    company: 'BrandStrek Coders',
    description: 'Professional admin dashboard system with customized UI template for managing products, orders, and users. Integrated Django views and models for a fully functional panel.',
    tags: ['Django', 'Bootstrap', 'PostgreSQL', 'UI/UX'],
    link: '#',
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
        section.querySelectorAll('.project-item'),
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.7,
          stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: section.querySelector('.projects-list'), start: 'top 85%' },
        }
      );
    };

    loadGsap();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="pt-32 pb-24 md:pt-48 md:pb-32 relative bg-black overflow-hidden">
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
        <div className="projects-header mb-16 md:mb-24 opacity-0">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="text-left">
              <div className="text-xs md:text-sm font-mono tracking-[0.3em] uppercase text-white/40 mb-4 px-1">
                Featured Projects
              </div>
              <BlurText
                text="PROJECTS"
                delay={100}
                animateBy="letters"
                direction="top"
                className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white mb-0 text-left leading-none"
                stepDuration={0.2}
              />
            </div>
            <div className="hidden md:block max-w-[280px] text-left md:text-right text-white/40 text-[10px] md:text-xs font-mono uppercase tracking-widest leading-relaxed mb-2">
              Expertise in building scalable backend architectures and high-performance digital solutions across industries.
            </div>
          </div>
          <div className="w-full h-px bg-white/10 mt-8" />
        </div>

        {/* Projects List with 12-Column Grid */}
        <div className="projects-list flex flex-col">
          {projects.map((project, i) => (
            <a
              key={project.title}
              href={project.link}
              target={project.link !== '#' ? "_blank" : undefined}
              rel={project.link !== '#' ? "noopener noreferrer" : undefined}
              className="project-item group opacity-0 border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-all duration-500 block cursor-target"
            >
              <div className="py-12 md:py-16 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-4 items-start">
                {/* 01. Number (1 Col) */}
                <div className="md:col-span-1 hidden md:block">
                  <span className="text-[10px] md:text-xs font-mono text-white/20 uppercase tracking-widest">
                    {(i + 1).toString().padStart(2, '0')}
                  </span>
                </div>

                {/* Title & Company (4 Cols) */}
                <div className="md:col-span-4 flex flex-col gap-2">
                  <span className="text-[10px] md:text-xs font-mono text-white/30 uppercase tracking-[0.2em]">{project.company}</span>
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-white/80 group-hover:text-white group-hover:translate-x-2 transition-all duration-500 tracking-tighter">
                    {project.title.toUpperCase()}
                  </h3>
                  <div className="flex md:hidden items-center gap-3 mt-1">
                    <span className="text-[11px] font-mono text-white/40">0{i + 1}</span>
                    <div className="w-8 h-px bg-white/10" />
                  </div>
                </div>

                {/* 03: Description (Middle-Right) */}
                <div className="md:col-span-5 md:px-6">
                  <p className="text-sm md:text-base text-white/50 group-hover:text-white/70 transition-colors leading-relaxed font-light">
                    {project.description}
                  </p>
                  
                  {/* Tags integrated below description for better alignment */}
                  <div className="flex flex-wrap gap-2 mt-6">
                    {project.tags.map((tag) => (
                      <span key={tag} className="text-[9px] font-mono uppercase tracking-[0.1em] text-white/30 border border-white/5 px-2 py-0.5 rounded-sm group-hover:border-white/20 group-hover:text-white/50 transition-all">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 04: Control/Arrow (Right) */}
                <div className="md:col-span-2 flex justify-end">
                    <div className="p-3 border border-white/5 rounded-full group-hover:border-white/20 group-hover:bg-white/5 transition-all duration-500 transform group-hover:scale-110">
                        <ArrowUpRight 
                            size={32} 
                            weight="thin" 
                            className="text-white/20 group-hover:text-white transition-all duration-500 transform group-hover:translate-x-1 group-hover:-translate-y-1" 
                        />
                    </div>
                </div>

              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;




