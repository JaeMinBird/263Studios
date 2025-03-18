/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.uniqlo.com',
        port: '',
        pathname: '/UQ/ST3/us/imagesgoods/**',
      },
    ],
  },
};

module.exports = nextConfig; 