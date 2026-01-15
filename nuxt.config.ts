// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxt/eslint", "@nuxt/ui", "nuxt-gtag", "@nuxtjs/sitemap"],

  srcDir: 'app',

  app: {
    head: {
      htmlAttrs: {
        lang: 'pt-BR'
      },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Rocket Pages | Transformação Digital e Inovação Corporativa',
      meta: [
        { name: 'theme-color', content: '#ca000d' },
        { name: 'author', content: 'Rocket Pages' },
        { name: 'format-detection', content: 'telephone=no' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/rocket.svg' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      ]
    }
  },

  site: {
    url: 'https://rocketweb.tech',
    name: 'Rocket Pages',
  },

  sitemap: {
    xsl: false,
    exclude: ['/login', '/account', '/payment', '/admin/**'],
  },

  runtimeConfig: {
    public: {
      siteUrl: 'https://rocketweb.tech',
    }
  },

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

  nitro: {
    compressPublicAssets: true,
    prerender: {
      crawlLinks: false,
    },
  },

  vite: {
    build: {
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor': ['vue', 'vue-router'],
          }
        }
      }
    }
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