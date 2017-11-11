// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  data: {
    google: null,
    signedIn: false,
    userInfo: null
  },
  methods: {
    updateSignInStatus(event) {
      this.signedIn = event
    },
    scaffoldAPI(event) {
      this.google = event
    },
    getUserInfo(event) {
      this.userInfo = event
    }
  },
  el: '#app',
  router,
  template: '<App v-bind:google="google" v-bind:signedIn="signedIn" v-bind:userInfo="userInfo" v-on:changeSignInStatus="updateSignInStatus($event)" v-on:scaffoldAPI="scaffoldAPI($event)" v-on:getUserInfo="getUserInfo($event)"/>',
  components: { App }
})
