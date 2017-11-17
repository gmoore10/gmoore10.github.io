<template>
  <div>{{message}}
  </div>
</template>

<script>

export default {
  props: ['google', 'signedIn', 'userInfo'],
  watch: {
    signedIn: function(oldVal, newVal) {
        this.listFiles();
    }
  },
  name: 'Files',
  data () {
    return {
      message: 'This is the files page.'
    }
  },
  methods: {
    listFiles() {
        this.google.client.drive.files.list({
            'pageSize': 50,
            'folderId': 'root',
            'fields': "nextPageToken, files(id, name, mimeType, trashed)",
            'orderBy': 'name',
            'q': "mimeType = 'application/vnd.google-apps.folder' and parents in 'root'"
        }).then(function (response) {
            //appendPre('Files:');
            console.log(response.result.files)
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
