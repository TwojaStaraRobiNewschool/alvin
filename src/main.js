import Vue from 'vue'
import App from './App'

import './plugins/vee-validate'
import './plugins/vue-konva'
import './plugins/vuetify'
import './plugins/vuex'

import router from './router'
import store from './store'

import './registerServiceWorker'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
