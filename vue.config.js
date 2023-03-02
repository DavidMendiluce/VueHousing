const { defineConfig } = require('@vue/cli-service')
module.exports = {
  devServer : {
    proxy: {
      '^/api': {
        target: 'https://api.intern.d-tt.nl/api',
        changeOrigin: true,
        logLevel: 'debug',
        pathRewrite: {'^/api': '/'},
      },
    }
  },
  configureWebpack: {
    module: {
      rules: [
        {       
         test: /\.txt/,
         type: 'asset/source',
        }
      ]
    },
  }
  }
