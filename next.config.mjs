/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Enable proper linting in production
    ignoreDuringBuilds: false,
    dirs: ['app', 'components', 'lib', 'hooks', 'contexts'],
  },
  typescript: {
    // Enable strict type checking
    ignoreBuildErrors: false,
  },
  images: {
    // Enable Vercel Image Optimization
    unoptimized: false,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  // Security headers
  headers: async () => {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ]
  },
  // Redirect HTTP to HTTPS in production
  redirects: async () => {
    return []
  },
}

export default nextConfig
