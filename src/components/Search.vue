<template>

<q-card flat color='tertiary' class='relative-postion'>
  <q-card-main>

  <q-card color='secondary' class='text-left'>
    <q-card-main>

      <q-field dark
          icon="fa-reddit"
          helper="i.e mathrock, listentothis">
    


        <q-chips-input v-model='redditQuery' @change='updateValue'
          float-label="Enter subreddits"
          prefix='r/'
          color='secondary'
          frame-color='secondary'
          align='left'
          dark
          :after="[{
            icon: 'explore',
            error: false,
            handler: showList
          }]">
              <q-autocomplete :static-data='redditStaticData' @selected="onSubmit()" />
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
            @change='updateValue'
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
     >

      <q-search dark icon='' v-model="scQuery" @change='updateValue' float-label="Search soundcloud artists">
          <q-autocomplete @search='autocompleteSC' @selected="onSubmit()" />
      </q-search>

    </q-field>
    
  </q-card-main>
</q-card>

     <q-card-actions class=''>
      <q-btn color='secondary' @click="onSubmit()">
        Submit
      </q-btn>
    </q-card-actions>
    </q-card-main>
   
  </q-card>
</template>

<script>
import { QField, QSelect, QAutocomplete, QSearch, QChipsInput } from 'quasar'
import {http} from '../api/common.js'

export default {
  name: 'search-field',
  props: {
    value: {
      type: Object,
      required: true
    },
    onSubmit: {
      type: Function,
      required: true
    }
  },
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
    },
    searchParams () {
      let reddit = this.redditQuery.join('+')
      let sc = this.scQuery
      return {reddit: reddit, sc: sc}
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
    updateValue () {
      this.$emit('input', this.searchParams)
    },
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
    }
  }
}
</script>

<style>

</style>
