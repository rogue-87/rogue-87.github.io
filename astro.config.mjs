import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://rogue-87.github.io",
  base: "",
  integrations: [sitemap()],
});
