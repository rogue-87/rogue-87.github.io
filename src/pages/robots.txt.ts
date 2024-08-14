import type { APIRoute } from "astro";
const baseUrl = import.meta.env.BASE_URL;

const getRobotsTxt = (sitemapURL: URL) => `
User-agent: *
Disallow: /admin/
Disallow: /private/
Allow: /public/

Sitemap: ${sitemapURL.href}
`;

export const GET: APIRoute = ({ site }) => {
  const sitemapURL = new URL(`${baseUrl}sitemap-index.xml`, site);
  return new Response(getRobotsTxt(sitemapURL));
};
