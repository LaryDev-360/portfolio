'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLocale = pathname.split('/')[1] || 'en';
  const otherLocale = currentLocale === 'en' ? 'fr' : 'en';

  const switchLanguage = (locale: string) => {
    const newPath = pathname.replace(`/${currentLocale}`, `/${locale}`);
    router.push(newPath);
    setIsOpen(false);
  };

  const getFlag = (locale: string) => {
    return locale === 'en' ? '🇺🇸' : '🇫🇷';
  };

  const getLanguageName = (locale: string) => {
    return locale === 'en' ? 'EN' : 'FR';
  };

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="position-relative" ref={dropdownRef}>
      <button
        className="btn btn-glass d-flex align-items-center gap-2 px-3 py-2"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          border: '1px solid rgba(255, 255, 255, 0.2)',
          minWidth: '70px',
          fontSize: '0.9rem'
        }}
      >
        <span>{getFlag(currentLocale)}</span>
        <span>{getLanguageName(currentLocale)}</span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {isOpen && (
        <div
          className="glass position-absolute mt-2"
          style={{
            right: 0,
            minWidth: '100%',
            zIndex: 1000,
            borderRadius: '8px',
            padding: '8px',
            backdropFilter: 'blur(20px)'
          }}
        >
          <button
            className="btn btn-link w-100 text-start px-2 py-1 text-white"
            onClick={() => switchLanguage(otherLocale)}
            style={{
              textDecoration: 'none',
              color: 'var(--text-secondary)'
            }}
          >
            {getFlag(otherLocale)} {getLanguageName(otherLocale)}
          </button>
        </div>
      )}
    </div>
  );
}
