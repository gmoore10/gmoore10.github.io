<template>
  <div id="app">
    <router-link :to="{ name: 'Home' }">Home</router-link>
    <router-link :to="{ name: 'Files' }">Files</router-link>
    <router-link :to="{ name: 'Connect' }">Connect</router-link>
    <router-link :to="{ name: 'About' }">About</router-link>
    <router-view v-bind:google="google" v-bind:signedIn="signedIn" v-on:changeSignInStatus="updateSignInStatus($event)" v-on:scaffoldAPI="scaffoldAPI($event)"/>
  </div>
</template>

<script>

export default {
  props: ['google', 'signedIn'],
  name: 'app',
  methods: {
    updateSignInStatus(event) {
      this.$emit('changeSignInStatus', event)
    },
    scaffoldAPI(event) {
      this.$emit('scaffoldAPI', event)
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
