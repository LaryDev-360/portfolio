    'use client';

    import { useState, useEffect } from 'react';
    import { useTranslations } from 'next-intl';
    import LanguageSwitcher from './LanguageSwitcher';

    export default function Header() {
        const t = useTranslations();
        const [isScrolled, setIsScrolled] = useState(false);
        const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

        useEffect(() => {
            const handleScroll = () => {
                setIsScrolled(window.scrollY > 50);
            };

            window.addEventListener('scroll', handleScroll);
            return () => window.removeEventListener('scroll', handleScroll);
        }, []);

        const scrollToSection = (sectionId: string) => {
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
                setIsMobileMenuOpen(false);
            }
        };

        return (
            <header
                className={`fixed-top transition-all duration-300 ${isScrolled ? 'glass py-2' : 'py-3'
                    }`}
                style={{
                    zIndex: 1000,
                    background: isScrolled
                        ? 'rgba(255, 255, 255, 0.1)'
                        : 'transparent',
                    backdropFilter: isScrolled ? 'blur(20px)' : 'none',
                    borderBottom: isScrolled ? '1px solid rgba(255, 255, 255, 0.1)' : 'none'
                }}
            >
                <nav className="container">
                    <div className="d-flex justify-content-between align-items-center">
                        {/* Logo */}
                        <div
                            className="navbar-brand mb-0 h1 text-gradient fw-bold cursor-pointer"
                            onClick={() => scrollToSection('hero')}
                            style={{ cursor: 'pointer', fontSize: '1.8rem' }}
                        >
                            Lary<span className="text-gradient-secondary">.</span>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="d-none d-lg-flex align-items-center gap-4">
                            <button
                                className="btn btn-link text-decoration-none px-3 py-2 rounded-pill"
                                onClick={() => scrollToSection('about')}
                                style={{
                                    color: 'var(--text-secondary)',
                                    transition: 'all 0.3s ease',
                                    border: 'none',
                                    background: 'transparent'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.color = 'var(--text-primary)';
                                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.color = 'var(--text-secondary)';
                                    e.currentTarget.style.background = 'transparent';
                                }}
                            >
                                {t('header.about')}
                            </button>

                            <button
                                className="btn btn-link text-decoration-none px-3 py-2 rounded-pill"
                                onClick={() => scrollToSection('projects')}
                                style={{
                                    color: 'var(--text-secondary)',
                                    transition: 'all 0.3s ease',
                                    border: 'none',
                                    background: 'transparent'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.color = 'var(--text-primary)';
                                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.color = 'var(--text-secondary)';
                                    e.currentTarget.style.background = 'transparent';
                                }}
                            >
                                {t('header.projects')}
                            </button>

                            <button
                                className="btn btn-link text-decoration-none px-3 py-2 rounded-pill"
                                onClick={() => scrollToSection('contact')}
                                style={{
                                    color: 'var(--text-secondary)',
                                    transition: 'all 0.3s ease',
                                    border: 'none',
                                    background: 'transparent'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.color = 'var(--text-primary)';
                                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.color = 'var(--text-secondary)';
                                    e.currentTarget.style.background = 'transparent';
                                }}
                            >
                                {t('header.contact')}
                            </button>

                            <div className="mx-2">
                                <LanguageSwitcher />
                            </div>

                            <button
                                className="btn-primary-glass"
                                onClick={() => scrollToSection('contact')}
                            >
                                Hire Me
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="m9 18 6-6-6-6" />
                                </svg>
                            </button>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="d-lg-none d-flex align-items-center gap-3">
                            <LanguageSwitcher />
                            <button
                                className="btn btn-glass p-2"
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                style={{ border: 'none' }}
                            >
                                <div className="d-flex flex-column gap-1">
                                    <span
                                        style={{
                                            width: '20px',
                                            height: '2px',
                                            background: 'white',
                                            transition: 'all 0.3s ease',
                                            transform: isMobileMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none'
                                        }}
                                    ></span>
                                    <span
                                        style={{
                                            width: '20px',
                                            height: '2px',
                                            background: 'white',
                                            transition: 'all 0.3s ease',
                                            opacity: isMobileMenuOpen ? '0' : '1'
                                        }}
                                    ></span>
                                    <span
                                        style={{
                                            width: '20px',
                                            height: '2px',
                                            background: 'white',
                                            transition: 'all 0.3s ease',
                                            transform: isMobileMenuOpen ? 'rotate(-45deg) translate(7px, -6px)' : 'none'
                                        }}
                                    ></span>
                                </div>
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    <div
                        className={`d-lg-none mt-3 ${isMobileMenuOpen ? 'd-block' : 'd-none'}`}
                        style={{
                            background: 'rgba(255, 255, 255, 0.1)',
                            backdropFilter: 'blur(20px)',
                            borderRadius: '15px',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            padding: '20px',
                            animation: isMobileMenuOpen ? 'fadeInUp 0.3s ease-out' : 'none'
                        }}
                    >
                        <div className="d-flex flex-column gap-3">
                            <button
                                className="btn btn-link text-start text-decoration-none py-2"
                                onClick={() => scrollToSection('about')}
                                style={{ color: 'var(--text-secondary)', border: 'none' }}
                            >
                                {t('header.about')}
                            </button>
                            <button
                                className="btn btn-link text-start text-decoration-none py-2"
                                onClick={() => scrollToSection('projects')}
                                style={{ color: 'var(--text-secondary)', border: 'none' }}
                            >
                                {t('header.projects')}
                            </button>
                            <button
                                className="btn btn-link text-start text-decoration-none py-2"
                                onClick={() => scrollToSection('contact')}
                                style={{ color: 'var(--text-secondary)', border: 'none' }}
                            >
                                {t('header.contact')}
                            </button>
                            <button
                                className="btn-primary-glass w-100 justify-content-center mt-2"
                                onClick={() => scrollToSection('contact')}
                            >
                                Hire Me
                            </button>
                        </div>
                    </div>
                </nav>
            </header>
        );
    }