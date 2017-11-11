<template>
  <div>{{message}}
    <drive v-bind:google="google" v-bind:signedIn="signedIn" v-on:changeSignInStatus="updateSignInStatus($event)" v-on:scaffoldAPI="scaffoldAPI($event)" />
  </div>
</template>

<script>

import Drive from '@/api/Drive'

export default {
  props: ['google', 'signedIn'],
  name: 'Files',
  data () {
    return {
      message: 'This is the files page.'
    }
  },
  methods: {
    updateSignInStatus(event) {
      this.$emit('changeSignInStatus', event)
    },
    scaffoldAPI(event) {
      this.$emit('scaffoldAPI', event)
    }
  },
  components: {
    Drive
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
