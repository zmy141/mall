import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'

Vue.config.productionTip = false
//事件总线一般为undefined
Vue.prototype.$bus=new Vue()

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
