<template>
  <div v-if="userInfo">
    <div>Welcome back, {{userInfo ? userInfo.fullName : ""}}!
      <kendo-chart :title="chartProperties.title" 
                   :legend="chartProperties.legend"
                   :seriesDefaults="chartProperties.seriesDefaults"
                   :series="chartProperties.series"
                   :tooltip="chartProperties.tooltip"
                   ref="spaceChart">
      </kendo-chart>
    </div>
  </div>
</template>

<script>
export default {
  props: ['google', 'signedIn', 'userInfo', 'chartProperties'],
  watch: {
    userInfo: function(newVal, oldVal) {
      console.log("Chart Properties changed in About.vue!")
      console.log(this.$refs)
      this.$emit('updateCharts', true)
    }
  },
  name: 'About',
  data () {
    return {
      message: 'This is the about page.'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
