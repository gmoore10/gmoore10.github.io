// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import AppHeader from './components/AppHeader'

Vue.config.productionTip = false

import '@progress/kendo-ui'
import '@progress/kendo-theme-default/dist/all.css'
import { KendoChart } from '@progress/kendo-charts-vue-wrapper'
import { KendoGrid, KendoGridInstaller } from '@progress/kendo-grid-vue-wrapper'

Vue.use(KendoGridInstaller)

Vue.component(KendoChart.name, KendoChart)
Vue.component(KendoGrid.name, KendoGrid)

/* eslint-disable no-new */
new Vue({
  data: {
    google: null,
    signedIn: false,
    userInfo: null,
    chartProperties: {
      title: {
        text: "Drive Space Used vs. Space Available"
      },
      legend: {
        position: "bottom"
      },
      seriesDefaults: {
        labels: {
          visible: true,
          background: "transparent",
          template: "#= category#: \n #= value # GB", 
          center: "50%"
      }
      },
      series: [{
        type: "pie",
        data: [0, 0]
      }],
      valueAxis: {
        line: {
          visible: false
        }
      },
      tooltip: {
        visible: true,
        format: "{0} GB"
      },
      theme: "Material"
    }
  },
  methods: {
    updateSignInStatus(event) {
      this.signedIn = event
      event ? true : this.userInfo = null
    },
    scaffoldAPI(event) {
      this.google = event
    },
    getUserInfo(event) {
      this.userInfo = event
    },
    updateSpaceChart(event) {
      console.log("MASTER SPACE CHART UPDATED")
      this.chartProperties.series[0].data = [{ category: event[0].type, value: parseFloat(event[0].amount/1024/1024/1024).toFixed(2)}, {category: event[1].type, value: parseFloat(event[1].amount/1024/1024/1024).toFixed(2)}]
    }
  },
  el: '#app',
  router,
  template: '<div><AppHeader></AppHeader><App v-bind:google="google" v-bind:chartProperties="chartProperties" v-bind:signedIn="signedIn" v-bind:userInfo="userInfo" v-on:changeSignInStatus="updateSignInStatus($event)" v-on:scaffoldAPI="scaffoldAPI($event)" v-on:getUserInfo="getUserInfo($event)" v-on:updateSpaceChart="updateSpaceChart($event)"/></div>',
  components: { App, AppHeader }
})
