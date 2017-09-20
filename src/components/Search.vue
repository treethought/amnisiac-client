<template>
<div class="container">

<q-card flat color='tertiary' class='relative-postion'>
  <q-card-title>
    Select Sources
  </q-card-title>
  <q-card-main>



  <q-card color='secondary' class='text-left'>
    <q-card-main>

      <q-field dark
          icon="fa-reddit"
          helper="i.e mathrock, listentothis"
          labelWidth='1'>
    


        <q-chips-input v-model='redditQuery'
          float-label="Enter subreddits"
          prefix='r/'
          color='primary'
          frame-color='secondary'
          align='left'
          dark
          :after="[{
            icon: 'explore',
            error: false,
            handler: showList
          }]">
              <q-autocomplete :static-data='redditStaticData' @selected="submitSearch" />
        </q-chips-input>

         </q-field>  
       
      </q-card-main>
    </q-card>



<q-card class='hidden'>
    <q-select class='' ref='redditList'
            multiple
            toggle
            filter
            filter-placeholder='Search subs'
            dark

            chips
            v-model="redditQuery"
            :options="redditOptions"
            @change='submitSearch'
            stack-label="Or select from list"
          >
          </q-select>    
</q-card>


<q-card color='secondary' class='text-left'>
  <q-card-main>

    <q-field dark
      icon="fa-soundcloud"
      color='pink'
      inverted
      helper="Enter soundcloud artists"
      :labelWidth='1'>

      <q-search dark icon=''  v-model="scQuery" float-label="Search soundcloud artists">
          <q-autocomplete @search='autocompleteSC' @selected="submitSearch" />
      </q-search>

    </q-field>
    
  </q-card-main>
</q-card>

     <q-card-actions class=''>
      <q-btn color='secondary' @click="submitSearch">
        Submit
      </q-btn>
    </q-card-actions>
    </q-card-main>
   
  </q-card>
  </div>
</template>

<script>
import { QField, QSelect, QAutocomplete, QSearch, QChipsInput } from 'quasar'
import {http} from '../api/common.js'
import {mapActions} from 'vuex'

export default {
  name: 'search-field',
  data () {
    return {
      redditSources: [],
      scOptions: [],
      redditQuery: [], // list of sub names
      scQuery: [],
      fetching: true
    }
  },
  components: {
    QField,
    QSelect,
    QAutocomplete,
    QSearch,
    QChipsInput
  },
  computed: {

    redditStaticData () {
      return {field: 'label', list: this.redditOptions}
    },
    redditOptions () {
      return this.optionsFromStrings(this.redditSources)
    }
  },
  created () {
    console.log('Fetching reddit sources')
    http.get('platforms/reddit/sources').then(response => {
      console.log(response.status)
      this.redditSources = response.data
      this.fetching = false
    }).catch(error => {
      console.log('error fetching reddit sources ' + error.message)
    })
  },
  methods: {
    ...mapActions('session', [
      'fetchItems'
    ]),
    showList () {
      this.$refs.redditList.open()
    },
    optionsFromStrings (strings) {
      // used for providing options to q-select or autocomplete done()
      let options = []
      for (var i = 0; i < strings.length; i++) {
        let val = strings[i].toString()
        let option = {'label': val, 'value': val}
        options.push(option)
      }
      return options
    },
    autocompleteSC (search, done) {
      console.log('Searching sc for -  ' + search)
      let params = {q: search}
      http.get('platforms/sc_autocomplete', {params: params})
        .then(response => {
          console.log(response.status)
          let artists = response.data.results
          let results = this.optionsFromStrings(artists)
          done(results)
        })
        .catch(error => {
          console.log('error ' + error)
          done([])
        })
    },
    submitSearch () {
      let reddit = this.redditQuery.join('+')
      let sc = this.scQuery
      let searchParams = {reddit: reddit, sc: sc}
      this.fetchItems(searchParams)
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
