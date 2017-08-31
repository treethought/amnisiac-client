<template>
  <div class='container'>

  <div>
  <q-card v-for="source in sources" inline style="width: 300px" :key='source'>
  <q-card-title>
    {{source.name}}
    <div slot="right" class="row items-center">
      <q-icon name="headset" />
      <q-icon name="fa-reddit" />
      <q-icon name="fa-trash" v-on:click='deleteSource(source)' />
    </div>
  </q-card-title>


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
import {mapState} from 'vuex'
export default {
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
      this.$store.dispatch('auth/addSources', {reddit, sc})
    },
    deleteSource (source) {
      console.log('deleting ' + source)
      this.$store.dispatch('auth/removeSource', source)
    }
  },
  computed: {
    ...mapState({
      authenticated: state => state.auth.authenticated,
      user: state => state.auth.user
    }),
    sources: function () {
      var sources = []
      for (var i = 0; i < this.user.feeds.length; i++) {
        sources.push(this.user.feeds[i])
      }
      return sources
    }
  },
  beforeCreate () {
    this.$store.dispatch('auth/fetchUser')
  }
}
</script>

<style>
</style>
