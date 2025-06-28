'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';

type Skill = {
    id: number;
    name: string;
    category_fr: string;
    category_en: string;
    proficiency: number; // 1-100
    icon?: string;
    description_fr?: string;
    description_en?: string;
    featured?: boolean;
};

type SkillCategory = {
    name: string;
    skills: Skill[];
    gradient: string;
    icon: string;
};

export default function Skills() {
    const t = useTranslations();
    const [skills, setSkills] = useState<Skill[]>([]);
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
        const fetchSkills = async () => {
            const { data } = await supabase
                .from('skills')
                .select('*')
                .eq('featured', true)
                .order('proficiency', { ascending: false });
            if (data) setSkills(data);
        };
        fetchSkills();
    }, []);

    // Group skills by category
    const groupedSkills = skills.reduce((acc, skill) => {
        const categoryName = locale === 'fr' ? skill.category_fr : skill.category_en;
        if (!acc[categoryName]) {
            acc[categoryName] = [];
        }
        acc[categoryName].push(skill);
        return acc;
    }, {} as Record<string, Skill[]>);

    // Define category configurations
    const categoryConfig: Record<string, { gradient: string; icon: string }> = {
        'Frontend': { gradient: 'var(--primary-gradient)', icon: '🎨' },
        'Backend': { gradient: 'var(--secondary-gradient)', icon: '⚙️' },
        'Database': { gradient: 'var(--accent-gradient)', icon: '🗄️' },
        'Tools': { gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', icon: '🛠️' },
        'DevOps': { gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', icon: '☁️' },
        'Mobile': { gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', icon: '📱' },
    };

    const categories: SkillCategory[] = Object.entries(groupedSkills).map(([name, skills]) => ({
        name,
        skills,
        gradient: categoryConfig[name]?.gradient || 'var(--primary-gradient)',
        icon: categoryConfig[name]?.icon || '💡'
    }));

    const getProficiencyColor = (proficiency: number) => {
        if (proficiency >= 90) return 'var(--primary-gradient)';
        if (proficiency >= 75) return 'var(--secondary-gradient)';
        if (proficiency >= 60) return 'var(--accent-gradient)';
        return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    };

    const getProficiencyLabel = (proficiency: number) => {
        if (proficiency >= 90) return 'Expert';
        if (proficiency >= 75) return 'Advanced';
        if (proficiency >= 60) return 'Intermediate';
        return 'Beginner';
    };

    return (
        <section
            id="skills"
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
                    top: '10%',
                    left: '5%',
                    width: '100px',
                    height: '100px',
                    background: 'var(--primary-gradient)',
                    borderRadius: '50%',
                    opacity: 0.3,
                    filter: 'blur(2px)',
                    animationDelay: '0s'
                }}
            ></div>

            <div
                className="position-absolute animate-float"
                style={{
                    top: '70%',
                    right: '8%',
                    width: '70px',
                    height: '70px',
                    background: 'var(--accent-gradient)',
                    clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                    opacity: 0.4,
                    animationDelay: '1.2s'
                }}
            ></div>

            <div
                className="position-absolute animate-float"
                style={{
                    bottom: '15%',
                    left: '15%',
                    width: '80px',
                    height: '80px',
                    background: 'var(--secondary-gradient)',
                    clipPath: 'polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)',
                    opacity: 0.35,
                    animationDelay: '2s'
                }}
            ></div>

            {/* Mouse follower effect */}
            <div
                className="position-fixed"
                style={{
                    left: mousePosition.x - 120,
                    top: mousePosition.y - 120,
                    width: '240px',
                    height: '240px',
                    background: 'radial-gradient(circle, rgba(102, 126, 234, 0.06) 0%, transparent 70%)',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    transition: 'all 0.12s ease',
                    zIndex: -1
                }}
            ></div>

            <div className="container">
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
                            💡 My Expertise
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
                            {t('skills.title')}
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
                        {t('skills.subtitle')}
                    </p>
                </div>

                {/* Skills categories */}
                <div className="row g-4">
                    {categories.map((category, categoryIndex) => (
                        <div
                            key={category.name}
                            className="col-lg-6 animate-fade-in-up"
                            style={{ animationDelay: `${categoryIndex * 0.15}s` }}
                        >
                            <div className="glass-card p-4 h-100">
                                {/* Category header */}
                                <div className="d-flex align-items-center mb-4">
                                    <div
                                        className="me-3 d-flex align-items-center justify-content-center"
                                        style={{
                                            width: '50px',
                                            height: '50px',
                                            background: category.gradient,
                                            borderRadius: '15px',
                                            fontSize: '1.5rem'
                                        }}
                                    >
                                        {category.icon}
                                    </div>
                                    <div>
                                        <h3
                                            className="h4 mb-1 fw-bold"
                                            style={{
                                                background: category.gradient,
                                                WebkitBackgroundClip: 'text',
                                                WebkitTextFillColor: 'transparent',
                                                backgroundClip: 'text'
                                            }}
                                        >
                                            {category.name}
                                        </h3>
                                        <p className="small mb-0" style={{ color: 'var(--text-muted)' }}>
                                            {category.skills.length} skill{category.skills.length > 1 ? 's' : ''}
                                        </p>
                                    </div>
                                </div>

                                {/* Skills list */}
                                <div className="space-y-3">
                                    {category.skills.map((skill, skillIndex) => (
                                        <div
                                            key={skill.id}
                                            className="mb-4"
                                            style={{
                                                animation: `fadeInUp 0.6s ease-out ${(categoryIndex * 0.15) + (skillIndex * 0.1)}s both`
                                            }}
                                        >
                                            <div className="d-flex justify-content-between align-items-center mb-2">
                                                <div className="d-flex align-items-center gap-2">
                                                    {skill.icon && (
                                                        <span style={{ fontSize: '1.2rem' }}>{skill.icon}</span>
                                                    )}
                                                    <span
                                                        className="fw-medium"
                                                        style={{ color: 'var(--text-primary)' }}
                                                    >
                                                        {skill.name}
                                                    </span>
                                                </div>
                                                <div className="d-flex align-items-center gap-2">
                                                    <span
                                                        className="small badge rounded-pill px-2 py-1"
                                                        style={{
                                                            background: 'rgba(255, 255, 255, 0.1)',
                                                            color: 'var(--text-muted)',
                                                            fontSize: '0.7rem'
                                                        }}
                                                    >
                                                        {getProficiencyLabel(skill.proficiency)}
                                                    </span>
                                                    <span
                                                        className="small fw-medium"
                                                        style={{
                                                            color: 'var(--text-secondary)',
                                                            minWidth: '35px',
                                                            textAlign: 'right'
                                                        }}
                                                    >
                                                        {skill.proficiency}%
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Progress bar */}
                                            <div
                                                className="progress"
                                                style={{
                                                    height: '6px',
                                                    background: 'rgba(255, 255, 255, 0.1)',
                                                    borderRadius: '10px',
                                                    overflow: 'hidden'
                                                }}
                                            >
                                                <div
                                                    className="progress-bar"
                                                    style={{
                                                        width: `${skill.proficiency}%`,
                                                        background: getProficiencyColor(skill.proficiency),
                                                        borderRadius: '10px',
                                                        transition: 'width 1.5s ease-out',
                                                        animation: `slideInLeft 1.5s ease-out ${(categoryIndex * 0.15) + (skillIndex * 0.1) + 0.3}s both`
                                                    }}
                                                ></div>
                                            </div>

                                            {/* Skill description */}
                                            {skill.description_fr && skill.description_en && (
                                                <p
                                                    className="small mt-2 mb-0"
                                                    style={{
                                                        color: 'var(--text-muted)',
                                                        fontSize: '0.85rem',
                                                        lineHeight: '1.4'
                                                    }}
                                                >
                                                    {locale === 'fr' ? skill.description_fr : skill.description_en}
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Skills summary */}
                <div className="row mt-5 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                    <div className="col-12">
                        <div className="glass-card p-5 text-center">
                            <div className="row g-4">
                                <div className="col-md-3 col-6">
                                    <div className="h2 mb-2">
                                        <span className="text-gradient fw-bold">
                                            {skills.length}+
                                        </span>
                                    </div>
                                    <p className="small mb-0" style={{ color: 'var(--text-muted)' }}>
                                        Technologies
                                    </p>
                                </div>
                                <div className="col-md-3 col-6">
                                    <div className="h2 mb-2">
                                        <span className="text-gradient-secondary fw-bold">
                                            {Math.round(skills.reduce((acc, skill) => acc + skill.proficiency, 0) / skills.length)}%
                                        </span>
                                    </div>
                                    <p className="small mb-0" style={{ color: 'var(--text-muted)' }}>
                                        Average Proficiency
                                    </p>
                                </div>
                                <div className="col-md-3 col-6">
                                    <div className="h2 mb-2">
                                        <span className="text-gradient fw-bold">
                                            {categories.length}
                                        </span>
                                    </div>
                                    <p className="small mb-0" style={{ color: 'var(--text-muted)' }}>
                                        Categories
                                    </p>
                                </div>
                                <div className="col-md-3 col-6">
                                    <div className="h2 mb-2">
                                        <span className="text-gradient-secondary fw-bold">
                                            {skills.filter(skill => skill.proficiency >= 90).length}
                                        </span>
                                    </div>
                                    <p className="small mb-0" style={{ color: 'var(--text-muted)' }}>
                                        Expert Level
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
        @keyframes slideInLeft {
          from {
            width: 0%;
          }
          to {
            width: var(--target-width);
          }
        }
      `}</style>
        </section>
    );
}