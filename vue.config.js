module.exports = {
  css: {
    sourceMap: process.env.NODE_ENV === 'development',
    loaderOptions: {
      sass: {
        additionalData: `
          @import "~@/scss/variables/main";
          @import "~@/scss/mixins/main";
        `,
      },
    },
  },

  configureWebpack: {
    devtool: 'source-map',
    optimization: {
      splitChunks: {
        maxSize: 100000,
      },
    },
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
