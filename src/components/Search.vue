<template>
  <div id="search">
    <input type="text" v-on:keyup.enter="searchFiles" v-model="searchText" ref="searchInput" :disabled="signedIn === false" />
    <input type="submit" ref="searchSubmit" value="Search" />
    <br /><span v-if="!signedIn" ref="loginMessage">Please log in to search your drive.</span>
    <br />
    <kendo-grid v-if="searchText" :data-source="searchDataSource" :sortable="true">
      <kendo-grid-column :encoded="false" field="name" title="File Name (Click to Download)"></kendo-grid-column>
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
            var files = response.result.files;

            files.forEach((e) => {
              e.name = '<a target="_blank" href="https://drive.google.com/open?id=' + e.id + '">' + e.name + "</a>"
            })

            that.searchDataSource = files
            if (files && files.length > 0) {
                for (var i = 0; i < files.length; i++) {
                    var file = files[i];
                }
            } else {
                console.log("No files found")
            }
        });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#search {
  margin-top: 20px;
}
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
