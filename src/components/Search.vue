<template>
  <div class="container">

  <q-card>
    <q-card-title>
      Select Sources
    </q-card-title>
    <q-card-main>
      <multiselect v-model="redditQuery"
                  :multiple='true'
                  :close-on-select="false"
                  :hide-selected="false"
                  :options="redditSources"
                  @input='submitSearch'
                  >

      <template slot="tag" scope="props">
        <span class="custom__tag">
        <span>{{ props.option }}, </span>
        <!-- <span class="custom__remove" @click="props.remove(props.option)"> ❌ </span> -->
        </span>
      </template>
                
    </multiselect>

     <q-card-action>
      <q-btn @click="submitSearch">
        Submit
      </q-btn>
    </q-card-action>
    </q-card-main>
   
  </q-card>
  </div>
</template>

<script>
import vSelect from 'vue-select'
import Multiselect from 'vue-multiselect'

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
    vSelect,
    Multiselect
  },
  computed: {
    // redditData: function () {
    //   return {field: 'value', list: this.redditSources}
    // }
    redditData: function () {
      var staticData = []
      for (var i = 0; i < this.redditSources.length; i++) {
        let sub = this.redditSources[i].toString()
        let item = {name: sub, label: sub}
        staticData.push(item)
      }
      return staticData
    }
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

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style>
  .btn {
  color: black;
  background-color: white;
  border-color: purple;
}
</style>
