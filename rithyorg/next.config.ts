import type { NextConfig } from "next";
import { indexable } from "./lib/metadata";
import { archiveRedirects } from "./lib/redirects";

const nextConfig: NextConfig = {
  images: { unoptimized: true },
  async redirects() {
    return archiveRedirects;
  },
  async headers() {
    if (indexable) return [];
    return [{ source: "/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] }];
  },
};

export default nextConfig;
