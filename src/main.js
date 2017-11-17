// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

import '@progress/kendo-ui'
import '@progress/kendo-theme-material/dist/all.css'
import { KendoChart } from '@progress/kendo-charts-vue-wrapper'
import { KendoGrid } from '@progress/kendo-grid-vue-wrapper'

Vue.component(KendoChart.name, KendoChart)

/* eslint-disable no-new */
new Vue({
  data: {
    google: null,
    signedIn: false,
    userInfo: null,
    chartProperties: {
      title: {
        text: "Top 15 largest files"
      },
      legend: {
        position: "bottom"
      },
      seriesDefaults: {
        type: "column"
      },
      series: [{
        name: "Total Visits",
        data: [56000, 63000, 74000, 91000, 117000, 138000]
      }, {
        name: "Unique visitors",
        data: [52000, 34000, 23000, 48000, 67000, 83000]
      }],
      valueAxis: {
        line: {
          visible: false
        }
      },
      categoryAxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        majorGridLines: {
          visible: false
        }
      },
      tooltip: {
        visible: true,
        format: "{0}"
      }
    }
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
  template: '<App v-bind:google="google" v-bind:chartProperties="chartProperties" v-bind:signedIn="signedIn" v-bind:userInfo="userInfo" v-on:changeSignInStatus="updateSignInStatus($event)" v-on:scaffoldAPI="scaffoldAPI($event)" v-on:getUserInfo="getUserInfo($event)"/>',
  components: { App, KendoChart }
})
