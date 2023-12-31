// @ts-nocheck
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  app: {
    baseURL: "/measure/",
  },

  css: ["~/assets/css/tailwind.css", "primeicons/primeicons.css"],

  modules: [
    "nuxt-primevue",
    "@pinia/nuxt",
    "@vueuse/nuxt",
    "@nuxtjs/tailwindcss",
  ],

  typescript: {
    typeCheck: true,
  },

  primevue: {
    options: {
      unstyled: false,
      ripple: true,
      inputStyle: "filled",
    },
    cssLayerOrder: "tailwind-base, primevue, tailwind-utilities",
  },
});
