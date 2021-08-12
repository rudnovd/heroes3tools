module.exports = {
  css: {
    sourceMap: import.meta.env.DEV,
    loaderOptions: {
      sass: {
        additionalData: `
          @use "sass:color";
          @use "sass:map";
          @import "~@/styles/variables";
          @import "~@/styles/mixins";
        `,
      },
    },
  },
  configureWebpack: {
    devtool: 'source-map',
  },
  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false,
    },
  },
  chainWebpack: (config) => {
    config.plugins.delete('prefetch')
    config.plugin('html').tap((args) => {
      args[0].title = 'Heroes 3 tools'
      return args
    })
  },
  pwa: {
    name: 'Heroes 3 tools',
    themeColor: '#4DBA87',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    manifestOptions: {
      author: 'https://github.com/rudnovd',
      developer: {
        name: 'rudnovd',
        url: 'https://github.com/rudnovd',
      },
      manifest_version: 2,
      version: '0.1',
      background_color: '#42B883',
      icons: [
        { src: 'favicon-192.png', type: 'image/png', sizes: '192x192' },
        { src: 'favicon-512.png', type: 'image/png', sizes: '512x512' },
      ],
    },
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: 'src/service-worker.js',
    },
    iconPaths: {
      favicon32: null,
      favicon16: null,
      appleTouchIcon: null,
      maskIcon: null,
      msTileImage: null,
    },
  },
}
