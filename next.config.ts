import type { NextConfig } from 'next';

const isProd = process.env.GITHUB_ACTIONS === 'true';
const basePath = isProd ? '/Kuran-Arapcasi' : '';

const nextConfig: NextConfig = {
  output: 'export',
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
