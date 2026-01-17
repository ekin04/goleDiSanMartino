// @ts-check
import { defineConfig } from "astro/config";
import { siteConfig } from "./siteConfig";

import react from "@astrojs/react";
import markdoc from "@astrojs/markdoc";
import keystatic from "@keystatic/astro";
import tailwindcss from "@tailwindcss/vite";
import icon from "astro-icon";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel";
import node from "@astrojs/node";

let adapter = vercel({ isr: true });
if (process.argv[3] === "--node" || process.argv[4] === "--node") {
  adapter = node({ mode: "standalone" });
}

export default defineConfig({
  integrations: [react(), markdoc(), keystatic(), icon(), sitemap()],
  site: siteConfig.site.baseUrl,
  vite: {
    plugins: [tailwindcss()],
  },
  adapter,
  redirects: {
    "/digital": "/keystatic",
  },
});