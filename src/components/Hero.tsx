'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

export default function Hero() {
    const t = useTranslations('hero');
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section
            id="hero"
            className="d-flex align-items-center justify-content-center position-relative"
            style={{
                minHeight: '100vh',
                overflow: 'hidden'
            }}
        >
            {/* Floating geometric shapes */}
            <div
                className="position-absolute animate-float"
                style={{
                    top: '20%',
                    left: '10%',
                    width: '60px',
                    height: '60px',
                    background: 'var(--primary-gradient)',
                    borderRadius: '50%',
                    opacity: 0.6,
                    filter: 'blur(1px)',
                    animationDelay: '0s'
                }}
            ></div>

            <div
                className="position-absolute animate-float"
                style={{
                    top: '60%',
                    right: '15%',
                    width: '40px',
                    height: '40px',
                    background: 'var(--secondary-gradient)',
                    clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                    opacity: 0.5,
                    animationDelay: '1s'
                }}
            ></div>

            <div
                className="position-absolute animate-float"
                style={{
                    bottom: '20%',
                    left: '20%',
                    width: '50px',
                    height: '50px',
                    background: 'var(--accent-gradient)',
                    clipPath: 'polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)',
                    opacity: 0.4,
                    animationDelay: '2s'
                }}
            ></div>

            {/* Mouse follower effect */}
            <div
                className="position-fixed"
                style={{
                    left: mousePosition.x - 100,
                    top: mousePosition.y - 100,
                    width: '200px',
                    height: '200px',
                    background: 'radial-gradient(circle, rgba(102, 126, 234, 0.1) 0%, transparent 70%)',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    transition: 'all 0.1s ease',
                    zIndex: -1
                }}
            ></div>

            <div className="container text-center">
                <div className="row justify-content-center">
                    <div className="col-lg-10 col-xl-8">

                        {/* Main content */}
                        <div className="animate-fade-in-up">
                            <div className="mb-4">
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
                                    👋 Welcome to my portfolio
                                </span>
                            </div>

                            <h1
                                className="display-1 fw-bold mb-4"
                                style={{
                                    fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
                                    lineHeight: '1.1',
                                    letterSpacing: '-0.02em'
                                }}
                            >
                                <span className="text-gradient">
                                    {t('title')}
                                </span>
                            </h1>

                            <h2
                                className="h3 mb-4 fw-normal"
                                style={{
                                    color: 'var(--text-secondary)',
                                    fontSize: 'clamp(1.2rem, 4vw, 1.8rem)'
                                }}
                            >
                                <span className="text-gradient-secondary">
                                    {t('subtitle')}
                                </span>
                            </h2>

                            <p
                                className="lead mb-5 mx-auto"
                                style={{
                                    color: 'var(--text-muted)',
                                    maxWidth: '600px',
                                    fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
                                    lineHeight: '1.6'
                                }}
                            >
                                {t('description')}
                            </p>

                            {/* Action buttons */}
                            <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center align-items-center mb-5">
                                <button
                                    className="btn-primary-glass d-flex align-items-center gap-2"
                                    onClick={() => scrollToSection('projects')}
                                    style={{
                                        fontSize: '1.1rem',
                                        padding: '15px 35px'
                                    }}
                                >
                                    <span>View My Work</span>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M7 17L17 7" />
                                        <path d="M7 7h10v10" />
                                    </svg>
                                </button>

                                <button
                                    className="btn-glass d-flex align-items-center gap-2"
                                    onClick={() => scrollToSection('contact')}
                                    style={{
                                        fontSize: '1.1rem',
                                        padding: '15px 35px'
                                    }}
                                >
                                    <span>Get In Touch</span>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                        <polyline points="22,6 12,13 2,6" />
                                    </svg>
                                </button>
                            </div>

                            {/* Tech stack preview */}
                            <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                                <p className="small text-muted mb-3">Built with</p>
                                <div className="d-flex flex-wrap justify-content-center gap-3">
                                    {[
                                        { name: 'Next.js', icon: '⚡' },
                                        { name: 'React', icon: '⚛️' },
                                        { name: 'TypeScript', icon: '🔷' },
                                        { name: 'Supabase', icon: '🚀' },
                                        { name: 'Bootstrap', icon: '🎨' }
                                    ].map((tech, index) => (
                                        <div
                                            key={tech.name}
                                            className="glass-card px-3 py-2 d-flex align-items-center gap-2"
                                            style={{
                                                fontSize: '0.85rem',
                                                borderRadius: '25px',
                                                background: 'rgba(255, 255, 255, 0.05)',
                                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                                transition: 'all 0.3s ease',
                                                animationDelay: `${index * 0.1}s`
                                            }}
                                        >
                                            <span>{tech.icon}</span>
                                            <span style={{ color: 'var(--text-secondary)' }}>{tech.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Scroll indicator */}
                <div
                    className="position-absolute bottom-0 start-50 translate-middle-x mb-4 animate-fade-in-up"
                    style={{ animationDelay: '0.8s' }}
                >
                    <div
                        className="d-flex flex-column align-items-center gap-2 cursor-pointer"
                        onClick={() => scrollToSection('about')}
                        style={{
                            cursor: 'pointer',
                            opacity: 0.7,
                            transition: 'opacity 0.3s ease'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                        onMouseLeave={(e) => e.currentTarget.style.opacity = '0.7'}
                    >
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Scroll to explore</span>
                        <div
                            style={{
                                width: '2px',
                                height: '30px',
                                background: 'var(--primary-gradient)',
                                borderRadius: '1px',
                                animation: 'float 2s ease-in-out infinite'
                            }}
                        ></div>
                    </div>
                </div>
            </div>
        </section>
    );
}