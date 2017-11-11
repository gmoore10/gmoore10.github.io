import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import About from '@/components/About'
import Files from '@/components/Files'
import Connect from '@/components/Connect'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/Files',
      name: 'Files',
      component: Files
    },
    {
      path: '/Connect',
      name: 'Connect',
      component: Connect
    },
    {
      path: '/About',
      name: 'About',
      component: About
    }
  ]
})
