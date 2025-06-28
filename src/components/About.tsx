'use client';

import type { Variants } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export default function About() {
  const t = useTranslations('about');
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const skills = [
    { 
      icon: '🧠', 
      label: 'Problem Solving',
      description: 'Breaking down complex challenges into manageable solutions',
      gradient: 'var(--primary-gradient)'
    },
    { 
      icon: '🧩', 
      label: 'System Design',
      description: 'Architecting scalable and maintainable software systems',
      gradient: 'var(--secondary-gradient)'
    },
    { 
      icon: '⚙️', 
      label: 'API Development',
      description: 'Building robust and efficient backend services',
      gradient: 'var(--accent-gradient)'
    },
    { 
      icon: '📊', 
      label: 'Data-Driven Thinking',
      description: 'Making informed decisions based on analytics and metrics',
      gradient: 'var(--primary-gradient)'
    },
    { 
      icon: '🧪', 
      label: 'Testing & Debugging',
      description: 'Ensuring code quality through comprehensive testing',
      gradient: 'var(--secondary-gradient)'
    },
    { 
      icon: '🚀', 
      label: 'Deployment & CI/CD',
      description: 'Streamlining development workflow and delivery',
      gradient: 'var(--accent-gradient)'
    }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };


  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        type: "spring" as const,
        damping: 20,
        stiffness: 100
      }
    }
  };

  const floatingElements = [
    { top: '15%', left: '8%', size: '80px', delay: '0s', shape: 'circle' },
    { top: '25%', right: '12%', size: '60px', delay: '2s', shape: 'triangle' },
    { bottom: '30%', left: '15%', size: '70px', delay: '4s', shape: 'diamond' },
    { bottom: '15%', right: '20%', size: '50px', delay: '1s', shape: 'hexagon' }
  ];

  return (
    <section
      id="about"
      className="position-relative"
      style={{
        padding: '120px 0',
        overflow: 'hidden'
      }}
    >
      {/* Animated background elements */}
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
            background: index % 2 === 0 ? 'var(--primary-gradient)' : 'var(--secondary-gradient)',
            opacity: 0.1,
            borderRadius: element.shape === 'circle' ? '50%' : '0',
            clipPath: element.shape === 'triangle' ? 'polygon(50% 0%, 0% 100%, 100% 100%)' :
                      element.shape === 'diamond' ? 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' :
                      element.shape === 'hexagon' ? 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)' : 'none',
            animationDelay: element.delay,
            animationDuration: '6s'
          }}
        />
      ))}

      {/* Mouse follower effect */}
      <div
        className="position-fixed"
        style={{
          left: mousePosition.x - 150,
          top: mousePosition.y - 150,
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(255, 119, 198, 0.08) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
          transition: 'all 0.3s ease',
          zIndex: 0
        }}
      />

      <div className="container position-relative" style={{ zIndex: 1 }}>
        <div className="row justify-content-center text-center">
          <div className="col-lg-12 col-xl-10">
            
            {/* Section header */}
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mb-5"
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
                💫 Get to know me
              </span>

              <h2
                className="text-gradient display-3 fw-bold mb-4"
                style={{
                  fontSize: 'clamp(2rem, 6vw, 3.5rem)',
                  lineHeight: '1.1',
                  letterSpacing: '-0.02em'
                }}
              >
                {t('title')}
              </h2>

              <p
                className="lead mx-auto"
                style={{ 
                  maxWidth: '700px', 
                  color: 'var(--text-muted)',
                  fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
                  lineHeight: '1.6'
                }}
              >
                {t('description')}
              </p>
            </motion.div>

            {/* Skills grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="row g-4 justify-content-center"
            >
              {skills.map((skill, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  className="col-lg-4 col-md-6"
                >
                  <div
                    className="glass-card h-100 p-4 position-relative overflow-hidden"
                    style={{
                      borderRadius: '24px',
                      cursor: 'pointer',
                      transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                      background: hoveredSkill === index 
                        ? 'rgba(255, 255, 255, 0.12)' 
                        : 'rgba(255, 255, 255, 0.08)'
                    }}
                    onMouseEnter={() => setHoveredSkill(index)}
                    onMouseLeave={() => setHoveredSkill(null)}
                  >
                    {/* Hover gradient overlay */}
                    <div
                      className="position-absolute top-0 start-0 w-100 h-100"
                      style={{
                        background: skill.gradient,
                        opacity: hoveredSkill === index ? 0.1 : 0,
                        transition: 'opacity 0.3s ease',
                        zIndex: 0
                      }}
                    />

                    {/* Content */}
                    <div className="position-relative" style={{ zIndex: 1 }}>
                      <div
                        className="d-flex align-items-center justify-content-center mb-3"
                        style={{
                          width: '70px',
                          height: '70px',
                          background: hoveredSkill === index 
                            ? skill.gradient 
                            : 'rgba(255, 255, 255, 0.1)',
                          borderRadius: '20px',
                          margin: '0 auto',
                          transition: 'all 0.3s ease',
                          transform: hoveredSkill === index ? 'scale(1.1) rotate(5deg)' : 'scale(1)',
                          backdropFilter: 'blur(10px)'
                        }}
                      >
                        <span style={{ fontSize: '2rem' }}>{skill.icon}</span>
                      </div>

                      <h4
                        className="fw-bold mb-3"
                        style={{
                          color: hoveredSkill === index ? 'var(--text-primary)' : 'var(--text-secondary)',
                          fontSize: '1.1rem',
                          transition: 'color 0.3s ease'
                        }}
                      >
                        {skill.label}
                      </h4>

                      <p
                        style={{
                          color: 'var(--text-muted)',
                          fontSize: '0.9rem',
                          lineHeight: '1.5',
                          margin: 0,
                          opacity: hoveredSkill === index ? 1 : 0.8,
                          transition: 'opacity 0.3s ease'
                        }}
                      >
                        {skill.description}
                      </p>
                    </div>

                    {/* Animated border */}
                    <div
                      className="position-absolute top-0 start-0 w-100 h-100"
                      style={{
                        border: `2px solid transparent`,
                        borderRadius: '24px',
                        background: hoveredSkill === index 
                          ? `linear-gradient(135deg, transparent, transparent) padding-box, ${skill.gradient} border-box`
                          : 'none',
                        opacity: hoveredSkill === index ? 0.6 : 0,
                        transition: 'opacity 0.3s ease'
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Call to action */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-5 pt-4"
            >
              <div
                className="glass-card p-4 mx-auto"
                style={{
                  maxWidth: '500px',
                  borderRadius: '20px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
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
                  Ready to collaborate? Let&apos;s build something amazing together.
                </p>
                <button
                  className="btn-primary-glass"
                  onClick={() => {
                    const element = document.getElementById('contact');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  style={{
                    fontSize: '0.95rem',
                    padding: '12px 28px'
                  }}
                >
                  <span>Let&apos;s Connect</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 17L17 7" />
                    <path d="M7 7h10v10" />
                  </svg>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}