import { defaultTheme, defineUserConfig } from 'vuepress-webpack'
import { path } from '@vuepress/utils'
import { registerComponentsPlugin } from '@vuepress/plugin-register-components'

export default defineUserConfig({
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
    ['link', { rel: 'icon', href: 'logo.png' }],
    ['meta', { name: 'theme-color', content: '#8514F5' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],
  theme: defaultTheme({
    logo: '/logo.png',
    logoDark: '/logo.png',
    navbar: [],
    sidebarDepth: 1,
    locales: {
      "/": {
        selectLanguageText: "Language",
        selectLanguageName: "English",
        sidebar: [
          "/presentation/",
          "/typescript/",
          "/tooling/",
          "/first-steps/",
          "/html/",
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
        selectLanguageText: "Langue",
        selectLanguageName: "Français",
        sidebar: [
          "/fr/presentation/",
          "/fr/typescript/",
          "/fr/tooling/",
          "/fr/first-steps/",
          "/fr/html/",
          "/fr/pipes/",
          "/fr/components/",
          "/fr/routing/",
          "/fr/services/",
          "/fr/rxjs/",
          "/fr/forms/",
          "/fr/to-go-further/",
          "/fr/ecosystem/"
        ]
      }
    },
    editLink: false,
    lastUpdated: false,
    contributors: false
  }),
  plugins: [
    registerComponentsPlugin({
      componentsDir: path.resolve(__dirname, './components'),
    })
  ]
})
