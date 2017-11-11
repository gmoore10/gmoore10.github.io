<template>
  <div class="hello">
      <div>{{msg}}</div>
    <section>
        <button v-on:click="handleClientLoad" id="newButton">click me!</button>
        <button ref="authorizeButton" id="authorize-button" style="display: none;">Authorize</button>
        <button ref="signoutButton" id="signout-button" style="display: none;">Sign Out</button>
    </section>
  </div>
</template>

<script>

export default {
  props: ['google', 'signedIn'],
  name: "Drive",
  data() {
    return {
      msg: "Connect to Drive!"
    };
  },
  created() {
    let googleapiScript = document.createElement('script')
    googleapiScript.setAttribute('src', 'https://apis.google.com/js/api.js')
    document.head.appendChild(googleapiScript)
  },
  methods: {
    changeMessage() {
      this.msg = "New Message!";
    },
    signIn() {},
    signOut() {},
    updateSigninStatus(isSignedIn) {
        console.log(this.$refs)
        if (isSignedIn) {
            this.$emit('changeSignInStatus', isSignedIn)
            this.$emit('scaffoldAPI', gapi)
            this.$refs.authorizeButton.style.display = 'none';
            this.$refs.signoutButton.style.display = 'block';
            this.listFiles();
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
    listFiles() {
        gapi.client.drive.files.list({
            'pageSize': 25,
            'fields': "nextPageToken, files(id, name)"
        }).then(function (response) {
            //appendPre('Files:');
            console.log('Files:')
            var files = response.result.files;
            if (files && files.length > 0) {
                for (var i = 0; i < files.length; i++) {
                    var file = files[i];
                    //appendPre(file.name + ' (' + file.id + ')');
                    console.log(file.name + ' (' + file.id + ')')
                }
            } else {
                //appendPre('No files found.');
                console.log("No files found")
            }
        });
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
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
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


/*
export default class DriveApi {
    constructor() {
        this.client_id = '955493671398-tfqdpdjqih875eucq609c1vnc28bpfui.apps.googleusercontent.com';
        this.api_key = 'AIzaSyCMn8SUN0i26iSvz-MYpK7vvyMyMAMs67A';
        this.discovery_docs = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];
        this.scopes = 'https://www.googleapis.com/auth/drive.metadata.readonly';

        gapi.load('client:auth2', () => {
            gapi.client.init({
                apiKey: this.client_id,
                clientId: this.api_key,
                discoveryDocs: this.discovery_docs,
                scope: this.scopes
            }).then(function () {
                // Listen for sign-in state changes.
                gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateSigninStatus);
        
                // Handle the initial sign-in state.
                updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
                authorizeButton.onclick = handleAuthClick;
                signoutButton.onclick = handleSignoutClick;
            });
        });
    }

    //Called after signin status changes.
    updateSigninStatus(isSignedIn) {
        if (isSignedIn) {
            authorizeButton.style.display = 'none';
            signoutButton.style.display = 'block';
            listFiles();
        } else {
            authorizeButton.style.display = 'block';
            signoutButton.style.display = 'none';
        }
    }

    handleAuthClick = (event) => {
        gapi.auth2.getAuthInstance().signIn();
    }
    
    handleSignoutClick = (event) => {
        gapi.auth2.getAuthInstance().signOut();
    }

    appendPre = (message) => {
        var pre = document.getElementById('content');
        var textContent = document.createTextNode(message + '\n');
        pre.appendChild(textContent);
    }
    
    listFiles = () => {
        gapi.client.drive.files.list({
            'pageSize': 25,
            'fields': "nextPageToken, files(id, name)"
        }).then(function (response) {
            //appendPre('Files:');
            console.log('Files:')
            var files = response.result.files;
            if (files && files.length > 0) {
                for (var i = 0; i < files.length; i++) {
                    var file = files[i];
                    //appendPre(file.name + ' (' + file.id + ')');
                    console.log(file.name + ' (' + file.id + ')')
                }
            } else {
                //appendPre('No files found.');
                console.log("No files found")
            }
        });
    }
}
*/