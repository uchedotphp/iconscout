export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "iconscot-assessment-vue-2-uchedotphp",
    // titleTemplate: "%s | Iconscout Assessment, Vue 2",
    htmlAttrs: {
      lang: "en",
    },
    bodyAttrs: {
      // class: ["bg-light"],
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
      {
        hid: "author",
        name: "author",
        content: "uchedotphp",
      },
      {
        hid: "keywords",
        name: "keywords",
        content: "iconscout, vue, nuxt, vuejs, nuxtjs",
      },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["~/assets/css/main.scss"],

  // loading: {
  //   color: "red",
  //   height: "5px",
  //   throttle: 0,
  // },

  // loading: "~/components/LoadingShimmer.vue",
  loading: false,

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "~/plugins/dataApi.ts",
    { src: "~/plugins/bootstrap.js", mode: "client" },
    "~/plugins/axios.js",
    { src: "~/plugins/lottie-player.js", mode: "client" },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    "@nuxt/typescript-build",
    "@nuxtjs/dotenv",
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    "bootstrap-vue/nuxt",
    "@nuxtjs/axios",
  ],

  axios: {
    baseURL: process.env.NUXT_ENV_API_URL,
  },

  // publicRuntimeConfig: {
  //   axios: {
  //     browserBaseURL: process.env.BROWSER_BASE_URL,
  //   },
  // },

  // privateRuntimeConfig: {
  //   axios: {
  //     baseURL: process.env.NUXT_ENV_API_URL,
  //   },
  // },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  router: {
    middleware:["routeTrigger"],
  }
};
