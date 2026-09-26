import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      // /projects was an empty "Coming soon" page. The work it was meant
      // to list is described on /about, which links to smallworld.xyz.
      { source: "/projects", destination: "/about", permanent: true },
    ];
  },
};

export default nextConfig;
