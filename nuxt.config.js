import colors from 'vuetify/es5/util/colors'

export default {
  // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
  ssr: true,

  server: {
    port: process.env.PORT || 8000,
    host: process.env.HOST || '0.0.0.0'
  },

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: '%s - thasung-clinic',
    title: 'thasung-clinic',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Sarabun:wght@100;200;300;400;500;600;700;800&display=swap",
      },
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    "~/assets/main.css",
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    {src: "~/plugins/api.js",ssr: false},
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/proxy',
  ],

  auth: {
    redirect: {
      login: '/login'
    },
    strategies: {
      local: {
        token: {
          property: 'token'
        },
        autoRefresh: {
          enable: true
        },
        endpoints: {
          login: {url: '/api/v1/login',method: 'post'},
          logout: {url: '/api/v1/logout',method: 'get'},
          user: {url: '/api/v1/me',method: 'get',propertyName: ''},
        },
      }
    }
  },
  // tetraflex.gsoftbiz.com/api/v1
  proxy: [
    [
      "/api",
      {
        target: process.env.API||`https://thasung.herokuapp.com`,
        pathRewrite: {"^/api": "/api"}
      }
    ]
  ],
  axios: {
    basrURL: process.env.API||`https://thasung.herokuapp.com`,
    credentials: true,
    proxy: true
  },

  router: {
    base: '/'
  },

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  }
}
