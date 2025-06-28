'use client';

import { useTranslations } from 'next-intl';

export default function Footer() {
    const t = useTranslations('footer');

    return (
        <footer
            className="glass mt-2 pt-2 pb-2 position-relative"
            style={{ overflow: 'hidden', zIndex: 1 }}
        >
            {/* Floating gradient shapes */}
            <div
                className="position-absolute"
                style={{
                    top: '-40px',
                    right: '-40px',
                    width: '120px',
                    height: '120px',
                    background: 'var(--primary-gradient)',
                    borderRadius: '50%',
                    opacity: 0.15,
                    filter: 'blur(2px)',
                    animation: 'float 6s ease-in-out infinite'
                }}
            ></div>

            <div
                className="position-absolute"
                style={{
                    bottom: '-30px',
                    left: '-30px',
                    width: '80px',
                    height: '80px',
                    background: 'var(--accent-gradient)',
                    borderRadius: '50%',
                    opacity: 0.1,
                    filter: 'blur(2px)',
                    animation: 'float 7s ease-in-out infinite',
                    animationDelay: '1.5s'
                }}
            ></div>

            <div className="container text-center">


                <p className="small text-white">
                    &copy; {new Date().getFullYear()} Lary Enock. {t('rights')}
                </p>

                <a
                    href="#hero"
                    className="btn-glass mt-3 d-inline-block"
                    style={{ fontSize: '0.9rem' }}
                >
                    ⬆️ {t('backToTop')}
                </a>
            </div>
        </footer>
    );
}
