import Vue from 'vue'
import App from './App.vue'

import './assets/tailwind.output.css'

Vue.config.productionTip = false

new Vue({
  render: (h) => h(App),
}).$mount('#app')
