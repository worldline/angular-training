module.exports = {
  base: "/angular-training/",
  locales: {
    "/": {
      lang: "en-US",// this will be set as the lang attribute on <html>
      title: "Angular Training",
      description: "Angular training docs"
    },

    "/fr/": {
      lang: "fr-FR",
      title: "Formation Angular",
      description: "Support de formation Angular"
    }
  },

  head: [
    ['link', { rel: 'icon', href: '/logo.svg' }],
    ['meta', { name: 'theme-color', content: '#C3002F' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    repo: '',
    editLinks: false,
    docsDir: '',
    editLinkText: '',
    lastUpdated: false,
    nav: [],
    locales: {
      "/": {
        selectText: "Language",
        label: "English",
        sidebar: [
          "/",
          "/presentation/",
          "/typescript/",
          "/tooling/",
          "/first-steps/",
          "/directives/",
          "/pipes/",
          "/components/",
          "/routing/",
          "/services/",
          "/rxjs/",
          "/forms/",
          "/to-go-further/",
          "/ecosystem/"
        ]
      },

      "/fr/": {
        selectText: "Langue",
        label: "Français",
        sidebar: [
          "/fr/",
          "/fr/presentation/",
          "/fr/typescript/",
          "/fr/outillage/",
          "/fr/premiers-pas/",
          "/fr/directives/",
          "/fr/pipes/",
          "/fr/composants/",
          "/fr/routage/",
          "/fr/services/",
          "/fr/rxjs/",
          "/fr/formulaires/",
          "/fr/pour-aller-plus-loin/",
          "/fr/ecosysteme/"
        ]
      }
    }
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    'vuepress-plugin-global-toc'
  ]
}
