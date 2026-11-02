import type { MetadataRoute } from "next";
import { liveSiteUrl } from "@/lib/utils";

export default function robots(): MetadataRoute.Robots {
  // Demo deployments stay out of search until NEXT_PUBLIC_SITE_URL is set.
  if (!liveSiteUrl) return { rules: { userAgent: "*", disallow: "/" } };

  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: `${liveSiteUrl}/sitemap.xml`,
  };
}
