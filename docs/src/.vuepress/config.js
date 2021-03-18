module.exports = {
  base: "/angular-training/",
  locales: {
    "/": {
      lang: "en-US",// this will be set as the lang attribute on <html>
      title: "Angular Training",
      description: "Angular training docs"
    }/*,

    "/fr/": {
      lang: "fr-FR",
      title: "Formation Angular",
      description: "Support de formation Angular"
    }*/
  },

  head: [
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
          "/tooling/",
          "/typescript/",
          "/rxjs/",
          "/project-creation/",
          "/components/",
          "/routing/",
          "/services/",
          "/forms/",
          "/ecosystem/",
          "/to-go-further/"
        ]
      } /*,

      "/fr/": {
        selectText: "Langue",
        label: "Français",
        sidebar: [
          "/fr/",
          "/fr/presentation/",
          "/fr/outillage/",
          "/fr/typescript/",
          "/fr/rxjs/",
          "fr/creation-projet/",
          "fr/composants/",
          "fr/routage/",
          "fr/services/",
          "fr/formulaires/",
          "fr/ecosysteme/",
          "fr/aller-plus-loin/"
        ]
      }*/
    }
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    'vuepress-plugin-global-toc'
  ]
}
