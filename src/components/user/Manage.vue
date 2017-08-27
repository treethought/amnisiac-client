<template>
  <div class='container'>

  <div>
  <q-card v-for="source in sources" inline style="width: 300px" :key='source'>
<!--   <q-card-media>
    <img src="~assets/icons/mtn-stream.png">
    <img src="https://www.reddit.com/r/minimal/">
  </q-card-media> -->
  <q-card-title>
    {{source.name}}
    <!-- <q-rating slot="subtitle" v-model="stars" :max="5" /> -->
    <div slot="right" class="row items-center">
      <q-icon name="headset" />
      <q-icon name="fa-reddit" />
      <q-icon name="fa-trash" v-on:click='deleteSource(source)' />
    </div>
  </q-card-title>

<!--   <q-card-main>
    <q-icon name="headset" />
    <q-icon name="fa-reddit" />
    <q-icon name="fa-trash" />
  </q-card-main> -->
  <!-- <q-card-separator /> -->
 <!--  <q-card-actions>
    <q-btn flat round ><q-icon name="headset" /></q-btn>
    <q-btn flat round ><q-icon name="fa-reddit" /></q-btn>
    <q-btn flat round ><q-icon name="fa-trash" /></q-btn>
  </q-card-actions> -->
</q-card>

</div>

<hr>

<div>

<q-card inline style="width: 500px">
  <q-card-title>Add Subreddits</q-card-title>
  <q-card-main>
    <form id="form" v-on:submit.prevent="addSources">
          <v-select v-model='redditQuery'
                    :options='redditSources'
                    multiple
                    placeholder='Search Reddit'>
          </v-select>
    </form>

  </q-card-main>
  </q-card>

  <q-card inline style="width: 500px">
    <q-card-title>Add Soundcloud Artists</q-card-title>
    <q-card-main>
      <form id="form" v-on:submit.prevent="addSources">
          <v-select v-model='scQuery'
                    :options='scOptions'
                    :on-search="autocompleteSC"
                    multiple
                    placeholder='Search Soundcloud'>  
          </v-select>
          <!-- <input class='lead btn btn-primary btn-lg' type="submit" value="listen"> -->
      </form>
  </q-card-main>
</q-card>
<br>
<q-btn @click.native="addSources">Subscribe</q-btn> 


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
      api.removeSource(source.name, this)
    }
  },
  computed: {
    sources: function () {
      var sources = []
      for (var i = 0; i < this.user.feeds.length; i++) {
        sources.push(this.user.feeds[i])
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
