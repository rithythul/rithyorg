import type { NextConfig } from "next";
import { indexable } from "./lib/metadata";

const nextConfig: NextConfig = {
  images: { unoptimized: true },
  async headers() {
    if (indexable) return [];
    return [{ source: "/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] }];
  },
};

export default nextConfig;
