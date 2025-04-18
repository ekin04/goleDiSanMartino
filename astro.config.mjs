// @ts-check
import { defineConfig } from "astro/config";
import { siteConfig } from "./siteConfig";

import react from "@astrojs/react";
import markdoc from "@astrojs/markdoc";
import keystatic from "@keystatic/astro";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  integrations: [react(), markdoc(), keystatic()],
  site: siteConfig.site.baseUrl,
  output:"static",
  vite: {
    plugins: [tailwindcss()],
  },
});