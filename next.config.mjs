/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      serverComponentsExternalPackages: ["@clerk/nextjs"], // Ensures compatibility
    },
  };
  
  export default nextConfig;