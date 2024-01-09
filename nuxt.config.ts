import CONFIG from './config.json'
const isDev = process.env.NODE_ENV === 'development'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'NGuard Console',
      meta: [
        { charset: 'utf-8' },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1',
        },
        { hid: 'description', name: 'description', content: '' },
        { name: 'format-detection', content: 'telephone=no' },
      ],
      script: [
        {
          // Google Tag Manager
          textContent: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-KKQTHLK');`,
        },
        {
          // MS Clarity
          textContent: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window, document, "clarity", "script", "kdxoqws6v8");`,
        },
      ],
      noscript: [
        {
          // Google Tag Manager (noscript)
          textContent: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KKQTHLK" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
        },
      ],
      link: [
        { rel: 'icon', href: '/favicon.ico' },

        /* Preconnect CDNs */
        {
          rel: 'preconnect',
          href: 'https://cdn.jsdelivr.net',
          crossorigin: 'anonymous',
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com',
          crossorigin: 'anonymous',
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: 'anonymous',
        },

        /* Import Pretendard & Pretendard-Like font familes */
        {
          rel: 'stylesheet',
          href: 'https://cdn.jsdelivr.net/gh/wanteddev/wanted-sans@v1.0.0/packages/wanted-sans/fonts/webfonts/variable/split/WantedSansVariable.min.css',
        },
        {
          rel: 'stylesheet',
          href: 'https://cdn.jsdelivr.net/gh/wanteddev/wanted-sans@v1.0.0/packages/wanted-sans-std/fonts/webfonts/variable/split/WantedSansStdVariable.min.css',
        },
        {
          rel: 'stylesheet',
          href: 'https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/packages/pretendard-jp/dist/web/variable/pretendardvariable-jp-dynamic-subset.min.css',
        },

        /* Import Be Vietnam Pro for support Vietnamese */
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap',
        },
      ],
    },
  },

  modules: [
    [
      '@nuxtjs/i18n',
      {
        locales: [
          { code: 'ko', iso: 'ko-KR', file: 'ko/translation' },
          { code: 'en', iso: 'en-US', file: 'en/translation' },
          { code: 'en', iso: 'en-GB', file: 'en/translation' },
          { code: 'ja', iso: 'ja-JP', file: 'ja/translation' },
          { code: 'vi', iso: 'vi-VN', file: 'vi/translation' },
        ],
        langDir: 'locales/',
        lazy: true,
        defaultLocale: 'ko',
        strategy: 'prefix_and_default',
        vuex: {
          moduleName: 'i18n',
          syncLocale: true,
          syncMessages: true,
          syncRouteParams: true,
        },
      },
    ],
    '@vueuse/nuxt',
    '@nuxt/image',
    '@nuxtjs/svg-sprite',
    '@nuxtjs/tailwindcss',
  ],

  svgSprite: {
    input: '~/assets/icons',
  },

  runtimeConfig: {
    public: {
      API_BASE_URL: isDev ? CONFIG.apiTestEndpoint : CONFIG.apiEndpoint,
    },
  },
  alias: {},
  devtools: { enabled: true },
  css: ['~/assets/styles/global.scss'],
  typescript: {
    typeCheck: true,
    strict: true,
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "~/assets/styles/_variables.scss";',
        },
      },
    },
  },
})
