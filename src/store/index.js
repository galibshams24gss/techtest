import Vue from 'vue'
import Vuex from 'vuex'
import fed from './fed'
Vue.use(Vuex)

const store = new Vuex.Store({

    modules: {
      fed
    },

    state: {},
    getters: {},
    mutations: {},
    actions: {}
})

export default store