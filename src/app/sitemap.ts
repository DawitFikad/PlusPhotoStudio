import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://plusphotography.et";

  const publicRoutes = [
    "",
    "/portfolio",
    "/portfolio/tirunesh-haile-wedding",
    "/portfolio/meron-portraits",
    "/portfolio/selam-coffee-brand",
    "/portfolio/ethiopian-business-gala",
    "/portfolio/yeshi-music-video",
    "/portfolio/hanna-dawit-wedding",
    "/services",
    "/services/wedding-photography",
    "/services/wedding-videography",
    "/services/event-coverage",
    "/services/portrait-photography",
    "/services/commercial-photography",
    "/services/product-photography",
    "/services/music-video-production",
    "/packages",
    "/about",
    "/book",
    "/contact",
    "/privacy",
    "/terms",
  ];

  return publicRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" || route === "/portfolio" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : route.startsWith("/services") ? 0.9 : 0.8,
  }));
}
