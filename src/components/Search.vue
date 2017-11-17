<template>
  <div>
    <input type="text" v-on:keyup.enter="searchFiles" v-model="searchText" ref="searchInput" :disabled="signedIn === false" />
    <input type="submit" ref="searchSubmit" :disabled="signedIn === false" />
    <br /><span v-if="!signedIn" ref="loginMessage">Please log in to search your drive.</span>
    <br />
    <kendo-grid :data-source="searchDataSource" :sortable="true">

    </kendo-grid>
  </div>
</template>

<script>

export default {
  props: ['google', 'signedIn', 'userInfo'],
  watch: {
    signedIn: function(oldVal, newVal) {
      this.$refs.searchSubmit.onclick = this.searchFiles;
    },
    google: function(newVal, oldVal) {
      if(oldVal === null && newVal !== null) {
        console.log("GOOGLE WAS INSTANTIATED")
      }
    }
  },
  name: 'Files',
  data () {
    return {
      message: 'This is the files page.',
      searchText: null,
      searchDataSource: [],
    }
  },
  methods: {
    searchFiles() {
      this.listFiles(this.searchText)
    },
    listFiles(searchString) {
      let that = this
        this.google.client.drive.files.list({
            'pageSize': 50,
            'folderId': 'root',
            'fields': "nextPageToken, files(id, name, mimeType, trashed)",
            'orderBy': 'name',
            'q': "name contains '" + searchString + "'"
        }).then(function (response) {
            //appendPre('Files:');
            //console.log(response.result.files)
            //console.log('Files:')
            var files = response.result.files;
            that.searchDataSource = files
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
