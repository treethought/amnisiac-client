<template>
    <div class="container">

        
        <form id="form" v-on:submit.prevent="submitSearch">
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
          <button class="primary" @click="submitSearch">
            listen
          </button>
          </form>

    </div>
</template>

<script>
import vSelect from 'vue-select'
import api from '../api/api.js'
export default {
  name: 'search-field',
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
    submitSearch () {
      let reddit = this.redditQuery.join('+')
      let sc = this.scQuery.join('+')
      this.$root.$emit('submit-search', reddit, sc)
    }
  }
}
</script>

<style>
  .btn {
  color: black;
  background-color: white;
  border-color: purple;
}
</style>
