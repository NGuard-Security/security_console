import { apiEndpoint } from './config.json'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
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
    link: [
      { rel: 'icon', href: '/favicon.ico' },

      /* Preconnect CDNs */
      { rel: 'preconnect', href:'https://cdn.jsdelivr.net', crossorigin: 'anonymous' },
      { rel: 'preconnect', href:'https://fonts.googleapis.com', crossorigin: 'anonymous' },
      { rel: 'preconnect', href:'https://fonts.gstatic.com', crossorigin: 'anonymous' },

      /* Import Pretendard & Pretendard-Like font familes */
      { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/gh/wanteddev/wanted-sans@v1.0.0/packages/wanted-sans/fonts/webfonts/variable/split/WantedSansVariable.min.css' },
      { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/gh/wanteddev/wanted-sans@v1.0.0/packages/wanted-sans-std/fonts/webfonts/variable/split/WantedSansStdVariable.min.css' },
      { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/packages/pretendard-jp/dist/web/variable/pretendardvariable-jp-dynamic-subset.min.css' },

      /* Import Be Vietnam Pro for support Vietnamese */
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap' },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/styles/global.css'],

  styleResources: {
    scss: ['@/assets/styles/_variables.scss'],
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['@/plugins/vue-js-modal.js'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // The target property: https://go.nuxtjs.dev/config-target
  target: 'server',

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/style-resources',

    '@nuxt/image',

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

    'nuxt-google-sheets-parser',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: apiEndpoint || '/',
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    loaders: {
      sass: {
        implementation: require('sass'),
      },
      scss: {
        implementation: require('sass'),
      },
    },
  },
}
