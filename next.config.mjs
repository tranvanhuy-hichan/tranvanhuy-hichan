/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // static site -> GitHub Pages
  trailingSlash: true,
  reactStrictMode: true,
  images: { unoptimized: true },
};
export default nextConfig;
