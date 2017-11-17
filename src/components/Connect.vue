<template>
  <div>
    <div>{{message}}</div>
  </div>
</template>

<script>
import Drive from '@/api/Drive'

export default {
  name: 'Connect',
  props: ['google', 'signedIn', 'userInfo'],
  data () {
    return {
      message: 'This is the connect page.'
    }
  },
  methods: {
    updateSignInStatus(event) {
      this.$emit('changeSignInStatus', event)
    },
    scaffoldAPI(event) {
      this.$emit('scaffoldAPI', event)
    },
    getUserInfo(event) {
      this.$emit('getUserInfo', event)
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
