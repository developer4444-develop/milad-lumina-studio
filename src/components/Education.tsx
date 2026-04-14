import { useEffect, useRef } from 'react';
import RippleGrid from './RippleGrid';
import BlurText from './BlurText';

const education = [
  {
    degree: 'B.Tech in AI & Data Science',
    institution: 'Dhanalakshmi Srinivasan College',
    year: 'Graduation: 2025',
    details: 'Specialized in Artificial Intelligence, Machine Learning, and Big Data Analytics. Built a solid foundation in backend architecture and various data processing frameworks.'
  },
  {
    degree: 'Full Stack Development Certification',
    institution: 'Qspiders Institution, Bangalore',
    year: '2025',
    details: 'Completed an intensive industrial certification program in full-stack web development. Developed core competencies across modern web stacks, multi-tier architecture, and scalable application development.'
  }
];

const Education = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const loadGsap = async () => {
      const gsap = (await import('gsap')).default;
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      const section = sectionRef.current;
      if (!section) return;

      gsap.fromTo(
        section.querySelector('.education-header'),
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1, scale: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 75%' },
        }
      );

      gsap.fromTo(
        section.querySelectorAll('.education-card'),
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: 'power3.out',
          scrollTrigger: { trigger: section.querySelector('.education-grid'), start: 'top 80%' },
        }
      );
    };

    loadGsap();
  }, []);

  return (
    <section id="education" ref={sectionRef} className="py-24 md:py-32 relative bg-black overflow-hidden border-t border-white/5">
      {/* Background decoration */}
      <div className="absolute inset-0 z-[0] opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-[100px]" />
      </div>

      <div className="relative z-[2] max-w-7xl mx-auto px-6 md:px-12">
        {/* Simple Header */}
        <div className="education-header mb-16 md:mb-24 opacity-0 text-center">
          <div className="text-xs md:text-sm font-mono tracking-[0.4em] uppercase text-white/30 mb-4">
            Academic Background
          </div>
          <BlurText
            text="EDUCATION"
            delay={100}
            animateBy="letters"
            direction="top"
            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white mb-6 justify-center"
            stepDuration={0.2}
          />
          <div className="w-12 h-px bg-white/20 mx-auto" />
        </div>

        {/* Education Grid */}
        <div className="education-grid grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {education.map((item, i) => (
            <div
              key={item.degree}
              className="education-card opacity-0 bg-white/[0.02] border border-white/5 p-8 md:p-12 rounded-[2rem] hover:bg-white/[0.04] transition-all duration-500 cursor-target group"
            >
              <div className="space-y-6">
                <div className="flex justify-between items-start gap-4">
                  <span className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em]">{item.year}</span>
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-white transition-colors tracking-tight">
                    {item.degree}
                  </h3>
                  <p className="text-lg text-white/50 font-medium">
                    {item.institution}
                  </p>
                </div>
                <p className="text-sm md:text-base text-white/30 leading-relaxed font-light group-hover:text-white/40 transition-colors">
                  {item.details}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
