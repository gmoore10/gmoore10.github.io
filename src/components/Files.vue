<template>
  <div>{{message}}
    <drive />
  </div>
</template>

<script>

import Drive from '@/api/Drive'

export default {
  name: 'Files',
  data () {
    return {
      message: 'This is the files page.'
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
