/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        ignoreBuildErrors: true,
    },
    images: {
        remotePatterns: [
          {
            protocol: "http",
            hostname: "**",
          },
        ],
    },
};

export default nextConfig;
