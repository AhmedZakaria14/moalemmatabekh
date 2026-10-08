import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  // Safety net: keep legacy apex URLs on the single indexable www host.
  // Vercel also redirects the apex domain at its edge; this covers requests reaching Next directly.
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'matabekhjeddah.com' }],
        destination: 'https://www.matabekhjeddah.com/:path*',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [{ source: '/:path*', headers: [{ key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains' }] }];
  },
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  // Allow access to remote image placeholder.
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**', // This allows any path under the hostname
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  output: 'standalone',
  transpilePackages: ['motion'],
  webpack: (config, {dev}) => {
    // HMR is disabled in AI Studio via DISABLE_HMR env var.
    // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
    if (dev && process.env.DISABLE_HMR === 'true') {
      config.watchOptions = {
        ignored: /.*/,
      };
    }
    return config;
  },
};

export default nextConfig;
