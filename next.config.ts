import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./next-intl.config.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'accent-systems.com',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'www.legalsupportworld.com',
        pathname: '/**'
      }
    ]
  }
};

export default withNextIntl(nextConfig);