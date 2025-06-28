'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { useLocale } from 'next-intl';

type Project = {
  id: number;
  title_fr: string;
  title_en: string;
  description_fr: string;
  description_en: string;
  image_url?: string;
  stack?: string[];
  github_url?: string;
  live_url?: string;
  featured?: boolean;
  category?: string;
};

export default function Projects() {
  const t = useTranslations();
  const [projects, setProjects] = useState<Project[]>([]);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [filter, setFilter] = useState('all');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const locale = useLocale();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data } = await supabase
        .from('projects')
        .select('*')
        .eq('featured', true)
        .order('id', { ascending: false });
      if (data) setProjects(data);
    };
    fetchProjects();
  }, []);

  const categories = ['all', ...new Set(projects.map(p => p.category).filter(Boolean))];
  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(p => p.category === filter);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring' as const,
        damping: 20,
        stiffness: 100
      }
    }
  };

  const floatingElements = [
    { top: '10%', left: '5%', size: '60px', delay: '0s' },
    { top: '70%', right: '8%', size: '80px', delay: '2s' },
    { bottom: '20%', left: '12%', size: '50px', delay: '4s' }
  ];

  return (
    <section
      id="projects"
      className="position-relative"
      style={{
        padding: '120px 0',
        overflow: 'hidden'
      }}
    >
      {/* Floating background elements */}
      {floatingElements.map((element, index) => (
        <div
          key={index}
          className="position-absolute animate-float"
          style={{
            top: element.top,
            left: element.left,
            right: element.right,
            bottom: element.bottom,
            width: element.size,
            height: element.size,
            background: index % 2 === 0 ? 'var(--primary-gradient)' : 'var(--accent-gradient)',
            opacity: 0.08,
            borderRadius: '50%',
            filter: 'blur(1px)',
            animationDelay: element.delay,
            animationDuration: '8s'
          }}
        />
      ))}

      {/* Mouse follower effect */}
      <div
        className="position-fixed"
        style={{
          left: mousePosition.x - 120,
          top: mousePosition.y - 120,
          width: '240px',
          height: '240px',
          background: 'radial-gradient(circle, rgba(79, 172, 254, 0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
          transition: 'all 0.2s ease',
          zIndex: 0
        }}
      />

      <div className="container position-relative" style={{ zIndex: 1 }}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-5"
        >
          <span
            className="badge px-4 py-2 rounded-pill mb-4"
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
              color: 'var(--text-secondary)',
              fontSize: '0.9rem'
            }}
          >
            🚀 Featured Work
          </span>

          <h2
            className="text-gradient display-3 fw-bold mb-4"
            style={{
              fontSize: 'clamp(2rem, 6vw, 3.5rem)',
              lineHeight: '1.1',
              letterSpacing: '-0.02em'
            }}
          >
            {t('projects.title')}
          </h2>

          <p
            className="lead mx-auto mb-5"
            style={{
              maxWidth: '600px',
              color: 'var(--text-muted)',
              fontSize: 'clamp(1rem, 2.5vw, 1.2rem)'
            }}
          >
            A curated selection of projects that showcase my technical expertise and creative problem-solving approach.
          </p>

          {/* Filter buttons */}
          {categories?.length > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="d-flex flex-wrap justify-content-center gap-2 mb-5"
            >
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setFilter(category ?? 'all')}
                  className={`btn-glass ${filter === category ? 'active' : ''}`}
                  style={{
                    padding: '8px 20px',
                    fontSize: '0.9rem',
                    background: filter === category
                      ? 'var(--primary-gradient)'
                      : 'rgba(255, 255, 255, 0.1)',
                    border: filter === category
                      ? 'none'
                      : '1px solid rgba(255, 255, 255, 0.2)',
                    textTransform: 'capitalize'
                  }}
                >
                  {category}
                </button>
              ))}
            </motion.div>
          )}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="row g-4"
        >
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              className="col-lg-6 col-xl-4"
            >
              <div
                className="glass-card h-100 overflow-hidden position-relative"
                style={{
                  borderRadius: '24px',
                  transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  transform: hoveredProject === project.id ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
                  background: hoveredProject === project.id
                    ? 'rgba(255, 255, 255, 0.12)'
                    : 'rgba(255, 255, 255, 0.08)'
                }}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                {/* Project Image */}
                {project.image_url && (
                  <div
                    className="position-relative overflow-hidden"
                    style={{ height: '220px' }}
                  >
                    <Image
                      src={project.image_url}
                      alt={locale === 'fr' ? project.title_fr : project.title_en}
                      fill
                      className="object-fit-cover"
                      style={{
                        borderRadius: '24px 24px 0 0',
                        transition: 'transform 0.4s ease',
                        transform: hoveredProject === project.id ? 'scale(1.1)' : 'scale(1)'
                      }}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />

                    {/* Overlay on hover */}
                    <div
                      className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
                      style={{
                        background: 'rgba(0, 0, 0, 0.7)',
                        opacity: hoveredProject === project.id ? 1 : 0,
                        transition: 'opacity 0.3s ease'
                      }}
                    >
                      <div className="d-flex gap-3">
                        {project.github_url && (
                          <a
                            href={project.github_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-glass"
                            style={{ padding: '10px' }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                          </a>
                        )}
                        {project.live_url && (
                          <a
                            href={project.live_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary-glass"
                            style={{ padding: '10px 15px', fontSize: '0.9rem' }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                              <polyline points="15,3 21,3 21,9" />
                              <line x1="10" y1="14" x2="21" y2="3" />
                            </svg>
                            Live Demo
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Project Content */}
                <div className="p-4">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <h3
                      className="fw-bold mb-0"
                      style={{
                        color: 'var(--text-primary)',
                        fontSize: '1.25rem',
                        lineHeight: '1.3'
                      }}
                    >
                      {locale === 'fr' ? project.title_fr : project.title_en}
                    </h3>

                    {project.category && (
                      <span
                        className="badge"
                        style={{
                          background: 'var(--accent-gradient)',
                          color: 'white',
                          fontSize: '0.7rem',
                          padding: '4px 8px',
                          textTransform: 'capitalize'
                        }}
                      >
                        {project.category}
                      </span>
                    )}
                  </div>

                  <p
                    style={{
                      color: 'var(--text-muted)',
                      fontSize: '0.95rem',
                      lineHeight: '1.5',
                      marginBottom: '1rem'
                    }}
                  >
                    {locale === 'fr' ? project.description_fr : project.description_en}
                  </p>

                  {/* Tech Stack */}
                  {project.stack && (
                    <div className="d-flex flex-wrap gap-2 mb-3">
                      {project.stack.map((tech, i) => (
                        <span
                          key={i}
                          className="badge"
                          style={{
                            background: 'rgba(255, 255, 255, 0.1)',
                            color: 'var(--text-secondary)',
                            fontSize: '0.75rem',
                            padding: '4px 8px',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '12px'
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Action Buttons - Mobile fallback */}
                  <div className="d-flex gap-2 d-sm-none">
                    {project.github_url && (
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-glass flex-fill text-center"
                        style={{ padding: '8px 12px', fontSize: '0.85rem' }}
                      >
                        Code
                      </a>
                    )}
                    {project.live_url && (
                      <a
                        href={project.live_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary-glass flex-fill text-center"
                        style={{ padding: '8px 12px', fontSize: '0.85rem' }}
                      >
                        Demo
                      </a>
                    )}
                  </div>
                </div>

                {/* Hover border effect */}
                <div
                  className="position-absolute top-0 start-0 w-100 h-100"
                  style={{
                    border: '2px solid transparent',
                    borderRadius: '24px',
                    background: hoveredProject === project.id
                      ? 'linear-gradient(135deg, transparent, transparent) padding-box, var(--primary-gradient) border-box'
                      : 'none',
                    opacity: hoveredProject === project.id ? 0.6 : 0,
                    transition: 'opacity 0.3s ease',
                    pointerEvents: 'none'
                  }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Projects CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-5 pt-4"
        >
          <div
            className="glass-card p-4 mx-auto"
            style={{
              maxWidth: '400px',
              borderRadius: '20px',
              background: 'rgba(255, 255, 255, 0.05)'
            }}
          >
            <p
              className="mb-3"
              style={{
                color: 'var(--text-secondary)',
                fontSize: '1rem',
                margin: 0
              }}
            >
              Want to see more of my work?
            </p>
            <button
              className="btn-glass"
              onClick={() => {
                // You can implement navigation to a full projects page here
                console.log('Navigate to all projects');
              }}
              style={{
                fontSize: '0.95rem',
                padding: '12px 28px'
              }}
            >
              <span>View All Projects</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17L17 7" />
                <path d="M7 7h10v10" />
              </svg>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}