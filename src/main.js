import Vue from 'vue'
import App from './App.vue'
import Buefy from 'buefy'
import 'buefy/lib/buefy.css'
import VueRouter from 'vue-router'
import router from './routes.js'

Vue
  .use(Buefy)
  .use(VueRouter)

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
