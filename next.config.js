/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["rb.gy", "www.jsonkeeper.com"],
  },
};

module.exports = nextConfig;
