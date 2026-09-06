import type { MetadataRoute } from "next";

const baseUrl = "https://official.lingshu.site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/demo", "/legal", "/privacy", "/data-deletion", "/terms", "/cookies", "/acceptable-use"].map(
    (path) => ({
      url: `${baseUrl}${path}`,
      lastModified: new Date(path === "" || path === "/demo" ? "2026-08-24" : "2026-09-04"),
      changeFrequency: path === "" ? "weekly" : "monthly",
      priority: path === "" ? 1 : path === "/demo" ? 0.9 : 0.7,
    }),
  );
}
