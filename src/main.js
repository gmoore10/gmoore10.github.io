// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  data: {
    client_id: '955493671398-tfqdpdjqih875eucq609c1vnc28bpfui.apps.googleusercontent.com',
    api_key: 'AIzaSyCMn8SUN0i26iSvz-MYpK7vvyMyMAMs67A',
    discovery_docs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
    scopes: 'https://www.googleapis.com/auth/drive.metadata.readonly'
  },
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
