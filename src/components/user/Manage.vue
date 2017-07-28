<template>
  <div class='container'>

  <div class='card flex'>
    <div class='card-title'>Current Sources</div>
    <div class="list" id="feed-table">
        <div v-for='source in sources' class='item'>

            <i class="item-primary fa fa-trash" v-on:click='deleteSource(source)'></i>
            <div class='item-content'>{{source}}</div>
        </div>
       
      </div>
  </div>


  <div class='card'>

    <div class='card-title'>
        Add Sources
    </div>

    <div class="container">

        
        <form id="form" v-on:submit.prevent="addSources">
          <v-select v-model='redditQuery'
                    :options='redditSources'
                    multiple
                    placeholder='Search Reddit'>
          </v-select>

          <v-select v-model='scQuery'
                    :options='scOptions'
                    :on-search="autocompleteSC"
                    multiple
                    placeholder='Search Soundcloud'>  
          </v-select>
          <!-- <input class='lead btn btn-primary btn-lg' type="submit" value="listen"> -->
          <button class="primary" @click.native="addSources">
            Subscribe
          </button>
          </form>

    </div>
  </div>


  </div>
</template>

<script>
import api from '../../api/api.js'
import vSelect from 'vue-select'

export default {
  store: ['user', 'authenticated'],
  data () {
    return {
      redditSources: [],
      scOptions: [],
      redditQuery: [],
      scQuery: []
    }
  },
  components: {
    vSelect
  },
  created () {
    this.getRedditSources()
  },
  methods: {
    getRedditSources () {
      api.fetchRedditSources(this)
    },
    autocompleteSC (search, loading) {
      api.fetchScSources(this, search, loading)
    },
    addSources () {
      let reddit = this.redditQuery.join('+')
      let sc = this.scQuery.join('+')
      api.addSources(reddit, sc, this)
    },
    deleteSource (source) {
      console.log('deleting ' + source)
      api.removeSource(source, this)
    }
  },
  computed: {
    sources: function () {
      var sources = []
      for (var i = 0; i < this.user.feeds.length; i++) {
        sources.push(this.user.feeds[i].name)
      }
      return sources
    }
  },
  beforeCreate () {
    api.fetchUser(this)
  }
}
</script>

<style>
</style>
