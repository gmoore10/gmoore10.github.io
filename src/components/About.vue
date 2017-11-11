<template>
  <div>
    {{message}}
    <div>Welcome back, {{userInfo.fullName}}!
      <br />{{userInfo.email}}
      <br />Space Used: {{userInfo.spaceUsed/1024/1024}} MB
      <br />Storage Limit: {{userInfo.storageLimit/1024/1024}} MB
    </div>
  </div>
</template>

<script>
export default {
  props: ['google', 'signedIn', 'userInfo'],
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
