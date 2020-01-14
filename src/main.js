import Vue from 'vue'
import 'babel-polyfill'
import 'es6-promise/auto'
import Es6Promise from 'es6-promise'
Es6Promise.Promise
Es6Promise.polyfill()
import App from './App'
import store from './store/index'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import axios from 'axios'
import Vuex from 'vuex'
Vue.use(Vuetify)
Vue.use(Vuex)
window.axios = axios
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
