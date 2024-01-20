import CONFIG from './config.json'
const isDev = process.env.NODE_ENV === 'development'
const isTest = process.env.IS_TEST === 'true'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
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
          // MS Clarity
          textContent: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window, document, "clarity", "script", "kdxoqws6v8");`,
        },
        {
          // Google Adsense
          async: true,
          src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7700677534024923',
        },
        {
          async: true,
          src: 'https://fundingchoicesmessages.google.com/i/pub-7700677534024923?ers=1',
          nonce: 'QHzY_FUE44g8R4HbPxq60A',
        },
        {
          nonce: 'QHzY_FUE44g8R4HbPxq60A',
          textContent: `;(function () {function signalGooglefcPresent() {if (!window.frames['googlefcPresent']) {if (document.body) {const iframe = document.createElement('iframe');iframe.style = 'width: 0; height: 0; border: none; z-index: -1000; left: -1000px; top: -1000px;';iframe.style.display = 'none';iframe.name = 'googlefcPresent';document.body.appendChild(iframe);} else {setTimeout(signalGooglefcPresent, 0);}}}signalGooglefcPresent();})()`,
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
    '@zadigetvoltaire/nuxt-gtm',
    '@nuxtjs/turnstile',
  ],

  gtm: {
    id: 'GTM-KKQTHLK',
    // queryParams: {
    //   // Add URL query string when loading gtm.js with GTM ID (required when using custom environments)
    //   gtm_auth: 'AB7cDEf3GHIjkl-MnOP8qr',
    //   gtm_preview: 'env-4',
    //   gtm_cookies_win: 'x',
    // },
    // defer: false, // Script can be set to `defer` to speed up page load at the cost of less accurate results (in case visitor leaves before script is loaded, which is unlikely but possible). Defaults to false, so the script is loaded `async` by default
    // compatibility: false, // Will add `async` and `defer` to the script tag to not block requests for old browsers that do not support `async`
    // nonce: '2726c7f26c', // Will add `nonce` to the script tag
    // enabled: true, // defaults to true. Plugin can be disabled by setting this to false for Ex: enabled: !!GDPR_Cookie (optional)
    // debug: true, // Whether or not display console logs debugs (optional)
    // loadScript: true, // Whether or not to load the GTM Script (Helpful if you are including GTM manually, but need the dataLayer functionality in your components) (optional)
    // enableRouterSync: true, // Pass the router instance of your app to automatically sync with router (optional)
    // ignoredViews: ['homepage'], // Don't trigger events for specified router names (optional)
    // trackOnNextTick: false, // Whether or not call trackView in Vue.nextTick
    // devtools: true, // (optional)
  },

  // turnstile: {
  //   siteKey: '<your-site-key>',
  // },

  svgSprite: {
    input: '~/assets/icons',
  },

  runtimeConfig: {
    public: {
      API_BASE_URL: isTest ? CONFIG.apiLocalEndpoint : isDev ? CONFIG.apiTestEndpoint : CONFIG.apiEndpoint,
      IS_TEST: isTest,
    },
  },
  alias: {},
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
