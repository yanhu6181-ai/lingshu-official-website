import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  devIndicators: false,
  output: process.env.EDGEONE_STATIC_EXPORT === "1" ? "export" : "standalone",
  trailingSlash: process.env.EDGEONE_STATIC_EXPORT === "1",
  images: { unoptimized: process.env.EDGEONE_STATIC_EXPORT === "1" },
  ...(process.env.EDGEONE_STATIC_EXPORT === "1" ? {} : { async headers() {
    return [{ source: "/(.*)", headers: [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "X-Frame-Options", value: "DENY" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
      { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
    ] }];
  } }),
};

export default nextConfig;
