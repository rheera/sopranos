import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
        @import "@/scss/_variables.scss";
        @import "@/scss/_mixins.scss";
        @import "@/scss/_themes.scss";
        @import "@/scss/_fonts.scss";
        @import "@/scss/_global.scss";
        @import "@/scss/_helpers.scss";
        @import "@/scss/_vendor.scss";
        @import "@/scss/_reset.scss";
      `,
      },
    },
  },
  server: {
    host: true,
  },
});
