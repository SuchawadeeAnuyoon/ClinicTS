import colors from 'vuetify/es5/util/colors'

export default {
  // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
  ssr: false,

  server: {
    port: process.env.PORT||8000,
    host: process.env.HOST||'0.0.0.0'
  },

  // Global page headers (https://go.nuxtjs.dev/config-head)
  // <script id="gsoftbiz.pdpa-scripts" async src="https://staging.propdpa.com/script.js" data-id="1e1a03d0-548f-11eb-aa46-5b2000bb4e70" charset="utf-8"></script>
  head: {
    title: 'ท่าซุงคลินิกเวชกรรม',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport',content: 'width=device-width, initial-scale=1'},
      {hid: 'description',name: 'description',content: ''}
    ],
    script: [
    ],
    link: [
      {rel: 'icon',type: 'image/x-icon',href: '/logo.ico'},
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
    '@/plugins/axios',
    '@/plugins/api',
    '@/plugins/notification',
  ],
  loading: false,

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: false,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
  ],

  // auth: {
  //   redirect: {
  //     login: '/login'
  //   },
  //   strategies: {
  //     local: {
  //       token: {
  //         property: 'token'
  //       },
  //       autoRefresh: {
  //         enable: true
  //       },
  //       endpoints: {
  //         login: {url: '/api/v1/login',method: 'post'},
  //         logout: {url: '/api/v1/logout',method: 'get'},
  //         user: {url: '/api/v1/me',method: 'get',propertyName: ''},
  //       },
  //     }
  //   }
  // },
  // tetraflex.gsoftbiz.com/api/v1

  // axios: {
  //   basrURL: process.env.NODE_ENV=='production'
  //     ? '/'
  //     :process.env.API||`https://thasung-api-vzrb2.ondigitalocean.app/`,
  //   credentials: true,
  //   proxy: true
  // },
  axios: {
    baseURL:
      process.env.NODE_ENV == 'production'
        ? '/'
        : process.env.API || 'http://localhost:3000/',
    credentials: true,
    proxy: true,
  },
  proxy: [
    [
      "/api",
      {
        target: `http://localhost:3000/`,
        pathRewrite: {"^/api": "/api"}
      }
    ]
  ],

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
    babel:{
      plugins: [
        ['@babel/plugin-proposal-private-methods', { loose: true }]
      ]
    }
  }
}
