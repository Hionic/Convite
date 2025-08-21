// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    "@nuxt/ui",
    "@nuxt/eslint",
    "@nuxt/content",
    "@nuxt/fonts",
    "@nuxt/icon",
    "@nuxt/image",
  ],

  ui: {
    colorMode: false,
  },

  css: ["~/assets/css/main.css"],

  plugins: [{ src: "@/plugins/vue-html2pdf", mode: "client" }],

  future: {
    compatibilityVersion: 4,
  },

  runtimeConfig: {
    app: {
      baseUrl: process.env.BASE_URL,
      subventionBaseUrl: process.env.SUBVENTION_BASE_URL,
    },
    public: {
      baseUrl: process.env.BASE_URL,
      dev: process.env.NODE_ENV,
      subventionBaseUrl: process.env.SUBVENTION_BASE_URL,
    },
  },

  compatibilityDate: "2024-11-27",
});
