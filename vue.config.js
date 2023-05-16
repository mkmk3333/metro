const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 作业要求：跨域代理
  devServer: {
    open: false,   
    // 本地端口号
    port: 8081,    
    https: false,
    // 设置代理
    proxy: {
      // 请求的url以'/api'开始时，调用代理
      '/api': {
        target: 'http://localhost:8080',
        Secure: false,     
        ws: true,  
        changeOrigin: true,  
        pathRewrite: {
          '^/api': ''  //正则表达式  匹配/api，替换为空。
        },
      }
    }
  }
})