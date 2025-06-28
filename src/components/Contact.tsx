'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

export default function Contact() {
    const t = useTranslations('contact');
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        // TODO: connect with Supabase or email API
        setSubmitted(true);
        setIsSubmitting(false);
        setFormData({ name: '', email: '', message: '' });

        // Reset success message after 5 seconds
        setTimeout(() => setSubmitted(false), 5000);
    };

    return (
        <section
            id="contact"
            className="position-relative"
            style={{
                minHeight: '100vh',
                padding: '100px 0',
                overflow: 'hidden'
            }}
        >
            {/* Floating geometric shapes */}
            <div
                className="position-absolute animate-float"
                style={{
                    top: '15%',
                    right: '10%',
                    width: '80px',
                    height: '80px',
                    background: 'var(--secondary-gradient)',
                    borderRadius: '50%',
                    opacity: 0.4,
                    filter: 'blur(1px)',
                    animationDelay: '0s'
                }}
            ></div>

            <div
                className="position-absolute animate-float"
                style={{
                    bottom: '25%',
                    left: '8%',
                    width: '60px',
                    height: '60px',
                    background: 'var(--accent-gradient)',
                    clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                    opacity: 0.3,
                    animationDelay: '1.5s'
                }}
            ></div>

            <div
                className="position-absolute animate-float"
                style={{
                    top: '70%',
                    right: '25%',
                    width: '45px',
                    height: '45px',
                    background: 'var(--primary-gradient)',
                    clipPath: 'polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)',
                    opacity: 0.5,
                    animationDelay: '0.8s'
                }}
            ></div>

            {/* Mouse follower effect */}
            <div
                className="position-fixed"
                style={{
                    left: mousePosition.x - 150,
                    top: mousePosition.y - 150,
                    width: '300px',
                    height: '300px',
                    background: 'radial-gradient(circle, rgba(102, 126, 234, 0.08) 0%, transparent 70%)',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    transition: 'all 0.15s ease',
                    zIndex: -1
                }}
            ></div>

            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-10">
                        {/* Section header */}
                        <div className="text-center mb-5 animate-fade-in-up">
                            <div className="mb-4">
                                <span
                                    className="badge px-4 py-2 rounded-pill mb-4"
                                    style={{
                                        background: 'rgba(255, 255, 255, 0.08)',
                                        border: '1px solid rgba(255, 255, 255, 0.15)',
                                        backdropFilter: 'blur(15px)',
                                        color: 'var(--text-secondary)',
                                        fontSize: '0.9rem'
                                    }}
                                >
                                    📬 Let&apos;s Connect
                                </span>
                            </div>

                            <h2
                                className="display-2 fw-bold mb-4"
                                style={{
                                    fontSize: 'clamp(2rem, 6vw, 3.5rem)',
                                    lineHeight: '1.1',
                                    letterSpacing: '-0.02em'
                                }}
                            >
                                <span className="text-gradient">
                                    {t('title')}
                                </span>
                            </h2>

                            <p
                                className="lead mx-auto mb-0"
                                style={{
                                    color: 'var(--text-muted)',
                                    maxWidth: '600px',
                                    fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
                                    lineHeight: '1.6'
                                }}
                            >
                                {t('description')}
                            </p>
                        </div>

                        <div className="row justify-content-center">
                            <div className="col-lg-8">
                                {/* Contact form */}
                                <div
                                    className="glass-card p-5 animate-fade-in-up"
                                    style={{
                                        animationDelay: '0.2s',
                                        position: 'relative'
                                    }}
                                >
                                    {/* Success overlay */}
                                    {submitted && (
                                        <div
                                            className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
                                            style={{
                                                background: 'rgba(0, 0, 0, 0.8)',
                                                borderRadius: '20px',
                                                backdropFilter: 'blur(10px)',
                                                zIndex: 10,
                                                animation: 'fadeInUp 0.5s ease-out'
                                            }}
                                        >
                                            <div className="text-center">
                                                <div
                                                    className="mb-3"
                                                    style={{
                                                        fontSize: '3rem',
                                                        animation: 'float 2s ease-in-out infinite'
                                                    }}
                                                >
                                                    ✨
                                                </div>
                                                <h3 className="text-gradient mb-3">Message Sent!</h3>
                                                <p style={{ color: 'var(--text-secondary)' }}>
                                                    {t('success')}
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    <form onSubmit={handleSubmit}>
                                        <div className="row">
                                            <div className="col-md-6 mb-4">
                                                <div className="form-floating">
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        id="name"
                                                        className="form-control"
                                                        placeholder={t('name')}
                                                        value={formData.name}
                                                        onChange={handleChange}
                                                        required
                                                        disabled={isSubmitting}
                                                        style={{
                                                            background: 'rgba(255, 255, 255, 0.05)',
                                                            border: '1px solid rgba(255, 255, 255, 0.1)',
                                                            backdropFilter: 'blur(15px)',
                                                            color: 'var(--text-primary)',
                                                            borderRadius: '15px',
                                                            fontSize: '1rem',
                                                            padding: '20px 15px 8px',
                                                            transition: 'all 0.3s ease'
                                                        }}
                                                        onFocus={(e) => {
                                                            e.target.style.background = 'rgba(255, 255, 255, 0.08)';
                                                            e.target.style.borderColor = 'rgba(102, 126, 234, 0.5)';
                                                            e.target.style.boxShadow = '0 0 0 0.2rem rgba(102, 126, 234, 0.25)';
                                                        }}
                                                        onBlur={(e) => {
                                                            e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                                                            e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                                                            e.target.style.boxShadow = 'none';
                                                        }}
                                                    />
                                                    <label
                                                        htmlFor="name"
                                                        style={{
                                                            color: 'var(--text-muted)',
                                                            fontSize: '0.9rem'
                                                        }}
                                                    >
                                                        {t('name')}
                                                    </label>
                                                </div>
                                            </div>

                                            <div className="col-md-6 mb-4">
                                                <div className="form-floating">
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        id="email"
                                                        className="form-control"
                                                        placeholder={t('email')}
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                        required
                                                        disabled={isSubmitting}
                                                        style={{
                                                            background: 'rgba(255, 255, 255, 0.05)',
                                                            border: '1px solid rgba(255, 255, 255, 0.1)',
                                                            backdropFilter: 'blur(15px)',
                                                            color: 'var(--text-primary)',
                                                            borderRadius: '15px',
                                                            fontSize: '1rem',
                                                            padding: '20px 15px 8px',
                                                            transition: 'all 0.3s ease'
                                                        }}
                                                        onFocus={(e) => {
                                                            e.target.style.background = 'rgba(255, 255, 255, 0.08)';
                                                            e.target.style.borderColor = 'rgba(102, 126, 234, 0.5)';
                                                            e.target.style.boxShadow = '0 0 0 0.2rem rgba(102, 126, 234, 0.25)';
                                                        }}
                                                        onBlur={(e) => {
                                                            e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                                                            e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                                                            e.target.style.boxShadow = 'none';
                                                        }}
                                                    />
                                                    <label
                                                        htmlFor="email"
                                                        style={{
                                                            color: 'var(--text-muted)',
                                                            fontSize: '0.9rem'
                                                        }}
                                                    >
                                                        {t('email')}
                                                    </label>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mb-4">
                                            <div className="form-floating">
                                                <textarea
                                                    name="message"
                                                    id="message"
                                                    rows={6}
                                                    className="form-control"
                                                    placeholder={t('message')}
                                                    value={formData.message}
                                                    onChange={handleChange}
                                                    required
                                                    disabled={isSubmitting}
                                                    style={{
                                                        background: 'rgba(255, 255, 255, 0.05)',
                                                        border: '1px solid rgba(255, 255, 255, 0.1)',
                                                        backdropFilter: 'blur(15px)',
                                                        color: 'var(--text-primary)',
                                                        borderRadius: '15px',
                                                        fontSize: '1rem',
                                                        minHeight: '140px',
                                                        resize: 'vertical',
                                                        transition: 'all 0.3s ease'
                                                    }}
                                                    onFocus={(e) => {
                                                        e.target.style.background = 'rgba(255, 255, 255, 0.08)';
                                                        e.target.style.borderColor = 'rgba(102, 126, 234, 0.5)';
                                                        e.target.style.boxShadow = '0 0 0 0.2rem rgba(102, 126, 234, 0.25)';
                                                    }}
                                                    onBlur={(e) => {
                                                        e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                                                        e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                                                        e.target.style.boxShadow = 'none';
                                                    }}
                                                />
                                                <label
                                                    htmlFor="message"
                                                    style={{
                                                        color: 'var(--text-muted)',
                                                        fontSize: '0.9rem'
                                                    }}
                                                >
                                                    {t('message')}
                                                </label>
                                            </div>
                                        </div>

                                        <div className="text-center">
                                            <button
                                                type="submit"
                                                className="btn-primary-glass d-flex align-items-center gap-2 mx-auto"
                                                disabled={isSubmitting}
                                                style={{
                                                    fontSize: '1.1rem',
                                                    padding: '15px 40px',
                                                    position: 'relative',
                                                    overflow: 'hidden'
                                                }}
                                            >
                                                {isSubmitting ? (
                                                    <>
                                                        <div
                                                            className="spinner-border spinner-border-sm me-2"
                                                            style={{ width: '18px', height: '18px' }}
                                                        ></div>
                                                        <span>Sending...</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <span>{t('send')}</span>
                                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                            <path d="M2 12L22 2L13 22L11 13L2 12Z" />
                                                        </svg>
                                                    </>
                                                )}
                                            </button>
                                        </div>
                                    </form>
                                </div>

                                {/* Contact info cards */}
                                <div className="row mt-5 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                                    <div className="col-md-4 mb-3">
                                        <div
                                            className="glass-card p-4 text-center h-100"
                                            style={{
                                                background: 'rgba(255, 255, 255, 0.05)',
                                                transition: 'all 0.3s ease'
                                            }}
                                        >
                                            <div
                                                className="mb-3"
                                                style={{
                                                    fontSize: '2rem',
                                                    background: 'var(--primary-gradient)',
                                                    WebkitBackgroundClip: 'text',
                                                    WebkitTextFillColor: 'transparent',
                                                    backgroundClip: 'text'
                                                }}
                                            >
                                                📧
                                            </div>
                                            <h5 className="text-gradient-secondary mb-2">Email</h5>
                                            <p style={{ color: 'var(--text-white)', fontSize: '0.9rem' }}>
                                                <a href={`mailto:${t('my_email')}`}>{t('my_email')}</a>
                                            </p>
                                        </div>
                                    </div>

                                    <div className="col-md-4 mb-3">
                                        <div
                                            className="glass-card p-4 text-center h-100"
                                            style={{
                                                background: 'rgba(255, 255, 255, 0.05)',
                                                transition: 'all 0.3s ease'
                                            }}
                                        >
                                            <div
                                                className="mb-3"
                                                style={{
                                                    fontSize: '2rem',
                                                    background: 'var(--secondary-gradient)',
                                                    WebkitBackgroundClip: 'text',
                                                    WebkitTextFillColor: 'transparent',
                                                    backgroundClip: 'text'
                                                }}
                                            >
                                                💼
                                            </div>
                                            <h5 className="text-gradient mb-2">LinkedIn</h5>
                                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                                /in/lary-hountokoude
                                            </p>
                                        </div>
                                    </div>

                                    <div className="col-md-4 mb-3">
                                        <div
                                            className="glass-card p-4 text-center h-100"
                                            style={{
                                                background: 'rgba(255, 255, 255, 0.05)',
                                                transition: 'all 0.3s ease'
                                            }}
                                        >
                                            <div
                                                className="mb-3"
                                                style={{
                                                    fontSize: '2rem',
                                                    background: 'var(--accent-gradient)',
                                                    WebkitBackgroundClip: 'text',
                                                    WebkitTextFillColor: 'transparent',
                                                    backgroundClip: 'text'
                                                }}
                                            >
                                                🐙
                                            </div>
                                            <h5 className="text-gradient-secondary mb-2">GitHub</h5>
                                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                                @LaryDev-360
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}