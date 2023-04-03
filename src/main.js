import Vue from 'vue'
import App from './App.vue'
import store from '@/store'
import router from '@/router'

import './assets/scss/index.scss'
import login from './components/login'

import { Icon, Tabs, TabPane, Form, FormItem, Input, Radio, RadioGroup, Button, Drawer } from 'element-ui'
Vue.use(Icon)
Vue.use(Tabs)
Vue.use(TabPane)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Button)
Vue.use(Drawer)
Vue.prototype.$login = login

Vue.config.productionTip = false
new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
