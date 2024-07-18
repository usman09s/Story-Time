/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        ignoreBuildErrors: true,
    },
    experimental: {
      missingSuspenseWithCSRBailout: false,
    },
    images: {
        remotePatterns: [
          {
            protocol: "https",
            hostname: "**",
          },
        ],
    },
};

export default nextConfig;
