module.exports = {
  css: {
    sourceMap: process.env.NODE_ENV === 'development',
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
}
