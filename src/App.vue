<template>
  <div id="app">
    <router-link class="router-link" exact active-class="router-link-active" :to="{ name: 'Home' }">Home</router-link>
    <router-link class="router-link" exact active-class="router-link-active" :to="{ name: 'Search' }">Search Files</router-link>
    <router-link class="router-link" exact active-class="router-link-active" :to="{ name: 'About' }">About</router-link>
    <button ref="authorizeButton" id="authorize-button" style="display: none;">Log In</button>
    <button ref="signoutButton" id="signout-button" style="display: none;">Log Out</button>
    <router-view v-bind:google="google" 
                 v-bind:signedIn="signedIn"
                 v-bind:userInfo="userInfo"
                 v-bind:chartProperties="chartProperties"
                 v-on:changeSignInStatus="updateSignInStatus($event)" 
                 v-on:scaffoldAPI="scaffoldAPI($event)" 
                 v-on:getUserInfo="getUserInfo($event)"
                 v-on:updateSpaceChart="updateSpaceChart($event)"/>
  </div>
</template>

<script>
export default {
  props: ['google', 'signedIn', 'userInfo', 'chartProperties'],
  name: 'app',
  methods: {
    updateSigninStatus(isSignedIn) {
        if (isSignedIn) {
            this.$emit('changeSignInStatus', isSignedIn)
            this.$emit('scaffoldAPI', gapi)

            let that = this

            let request = gapi.client.drive.about.get({'fields': 'user, storageQuota'})/*.setFields("user, storageQuota")*/.execute(function(event) {
                that.$emit('getUserInfo', {email: event.user.emailAddress, fullName: event.user.displayName, storageLimit: event.storageQuota.limit, spaceUsed: event.storageQuota.usageInDrive})
                that.$emit('updateSpaceChart', [{type: 'Space Used', amount: parseInt(event.storageQuota.usageInDrive)}, {type: 'Space Available', amount: parseInt(event.storageQuota.limit - event.storageQuota.usageInDrive)}])
            })

            this.$refs.authorizeButton.style.display = 'none';
            this.$refs.signoutButton.style.display = 'inline-block';
        } else {
            this.$emit('changeSignInStatus', isSignedIn)
            this.$refs.authorizeButton.style.display = 'inline-block';
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

#app > button {
  display: inline-block;
}

#app > button, .router-link {
  color: white;
  background-color: #9196B5;
  padding: 5px;
  margin-right: -5px;
}

.router-link-active {
  color: white;
  background-color: #3f51b5;
}
</style>
