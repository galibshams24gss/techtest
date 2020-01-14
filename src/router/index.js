import Vue from 'vue'
import VueRouter from 'vue-router'
import NotFound from '@/components/page/NotFound'
import Home from '@/components/fed/Home'

Vue.use(VueRouter)

const routes = [
  { 
    path: '/', 
    name: 'Home', 
    component: Home 
  },
  { 
    path: '/notfound', 
    name: 'NotFound', 
    component: NotFound
  },
  { 
    path: '*', 
    name: 'All', 
    component: Home 
  }
]

const Router = new VueRouter({
  mode: 'history',
  routes
})

export default Router