// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxt/eslint", "@nuxt/ui", "nuxt-gtag", "@nuxtjs/sitemap"],

  gtag: {
    id: 'G-W6QTEJ56WE'
  },

  devtools: {
    enabled: true,
  },

  css: ["~/assets/css/main.css"],

  // IMPORTANTE: Mantém ssr: true para que o 'nuxt generate'
  // consiga pré-renderizar o HTML corretamente.
  ssr: true,

  routeRules: {
    // Garante que TODAS as rotas sejam pré-renderizadas estaticamente
    "/**": { prerender: true },
  },

  compatibilityDate: "2025-01-15",

  // Adiciona a cor customizada 'rocket' para ser reconhecida pelo tema
  ui: {
    theme: {
      colors: ["primary", "secondary", "rocket"],
    },
  },

  eslint: {
    config: {
      stylistic: {
        commaDangle: "never",
        braceStyle: "1tbs",
      },
    },
  },
});