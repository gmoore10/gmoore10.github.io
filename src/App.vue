<template>
  <div id="app">
    <section>
        <button ref="authorizeButton" id="authorize-button" style="display: none;">Authorize</button>
        <button ref="signoutButton" id="signout-button" style="display: none;">Sign Out</button>
    </section>
    <router-link :to="{ name: 'Home' }">Home</router-link>
    <router-link :to="{ name: 'Search' }">Search Files</router-link>
    <router-link :to="{ name: 'About' }">About</router-link>
    <router-view v-bind:google="google" 
                 v-bind:signedIn="signedIn"
                 v-bind:userInfo="userInfo"
                 v-bind:chartProperties="chartProperties"
                 v-on:changeSignInStatus="updateSignInStatus($event)" 
                 v-on:scaffoldAPI="scaffoldAPI($event)" 
                 v-on:getUserInfo="getUserInfo($event)"/>
  </div>
</template>

<script>
export default {
  props: ['google', 'signedIn', 'userInfo', 'chartProperties'],
  watch: {
    google: function(newVal, oldVal) {
      if(oldVal === null) {
        console.log("GOOGLE WAS INSTANTIATED")
      }
    }
  },
  name: 'app',
  methods: {
    updateSigninStatus(isSignedIn) {
        console.log(this.$refs)
        if (isSignedIn) {
            this.$emit('changeSignInStatus', isSignedIn)
            this.$emit('scaffoldAPI', gapi)

            console.log(gapi.client.drive.about.get())

            let that = this

            let request = gapi.client.drive.about.get({'fields': 'user, storageQuota'})/*.setFields("user, storageQuota")*/.execute(function(event) {
                console.log(event)
                console.log('Current user name: ' + event.user.emailAddress)
                console.log('Current name: ' + event.user.displayName)
                console.log('Total quota (bytes): ' + event.storageQuota.limit)
                console.log('Used quota (bytes): ' + event.storageQuota.usageInDrive)

                that.$emit('getUserInfo', {email: event.user.emailAddress, fullName: event.user.displayName, storageLimit: event.storageQuota.limit, spaceUsed: event.storageQuota.usageInDrive})
            })

            this.$refs.authorizeButton.style.display = 'none';
            this.$refs.signoutButton.style.display = 'block';
        } else {
            this.$emit('changeSignInStatus', isSignedIn)
            this.$refs.authorizeButton.style.display = 'block';
            this.$refs.signoutButton.style.display = 'none';
        }
    },
    handleAuthClick(event) {
        gapi.auth2.getAuthInstance().signIn();
    },
    handleSignoutClick(event) {
        gapi.auth2.getAuthInstance().signOut();
    },
    handleClientLoad() {
        let that = this
      gapi.load("client:auth2", function initClient() {
        gapi.client
          .init({
            apiKey: 'AIzaSyCMn8SUN0i26iSvz-MYpK7vvyMyMAMs67A',
            clientId: '955493671398-tfqdpdjqih875eucq609c1vnc28bpfui.apps.googleusercontent.com',
            discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
            scope: 'https://www.googleapis.com/auth/drive.metadata.readonly'
          })
          .then(function() {
            // Listen for sign-in state changes.
            gapi.auth2.getAuthInstance().isSignedIn.listen((isSignedIn) => { that.updateSigninStatus(isSignedIn) });

            var isSignedInStatus = gapi.auth2.getAuthInstance().isSignedIn.get()


            // Handle the initial sign-in state.
            var func = function() {
                that.updateSigninStatus(isSignedInStatus);
            };

            func();

            that.$refs.authorizeButton.onclick = that.handleAuthClick;
            that.$refs.signoutButton.onclick = that.handleSignoutClick;
          });
      });
    }
  },
  created() {
    let googleapiScript = document.createElement('script')
    googleapiScript.setAttribute('src', 'https://apis.google.com/js/api.js')
    document.head.appendChild(googleapiScript)

    var timer = setInterval(() => {
      if (typeof gapi != 'undefined') {
        clearInterval(timer)
        this.handleClientLoad()
      }
    }, 100)
  }
  // methods: {
  //   updateSignInStatus(event) {
  //     this.$emit('changeSignInStatus', event)
  //   },
  //   scaffoldAPI(event) {
  //     this.$emit('scaffoldAPI', event)
  //   },
  //   getUserInfo(event) {
  //     this.$emit('getUserInfo', event)
  //   }
  // },
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
