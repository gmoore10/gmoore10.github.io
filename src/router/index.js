import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import About from '@/components/About'
import Search from '@/components/Search'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/Search',
      name: 'Search',
      component: Search
    },
    {
      path: '/About',
      name: 'About',
      component: About
    }
  ]
})
