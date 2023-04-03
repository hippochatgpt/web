1. `style-resources-loader`配置全局scss变量和混入等（vue.config.js）
2. babel配置`styleLibraryName: '~node_modules/element-ui/packages/theme-chalk/src',`自定义主题色按需加载
3. 路由通过后台数据添加，动态添加路由时，将本地路由配置合并，生成对应的路由
4. components下global注册为全局组件，common组件页面使用时引入
5. 通过.env文件配置了不同环境的请求地址，包括http和ws(VUE_APP_BASE_URL/VUE_APP_WS_BASE_URL)
