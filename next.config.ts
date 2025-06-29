import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from 'next';

const withNextIntl = createNextIntlPlugin('./next-intl.config.ts');

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https' as const,
        hostname: 'accent-systems.com',
        pathname: '/**'
      },
      {
        protocol: 'https' as const,
        hostname: 'www.legalsupportworld.com',
        pathname: '/**'
      }
    ]
  }
};

export default withNextIntl(nextConfig);