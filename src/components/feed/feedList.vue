<template>



  <q-card flat v-if='items' color='tertiary'>
  <!-- <q-window-resize-observable @resize="onResize" /> -->
    <q-card-title>
    <toggle-source  v-model='selectedSource' :sources='sources'></toggle-source>
<!--     <q-search dark  label='Select Sources' placeholder="Search items">

        <q-autocomplete :static-data='searchStaticData' />
    </q-search> -->
    </q-card-title>

     <q-list class='bg-tertiary text-white'>

<q-scroll-area class='scroll'
  :style="{height: feedHeight}"
  :thumb-style="{
    right: '4px',
    borderRadius: '5px',
    background: 'pink',
    width: '10px',
    opacity: 1
  }"
  :delay="1500"
>
        <track-item v-for='(item, idx) in filteredItems'
                :item='item'
                :idx=idx
                :key='item.key'>
        </track-item>
        </q-scroll-area>
      </q-list>

  </q-card>



</template>

<script>
  import TrackItem from './TrackItem'
  import toggleSource from './toggleSources'
  // import {mapState} from 'vuex'
  import {filter, QSearch, QAutocomplete} from 'quasar'
  export default {
    name: 'feed-list',
    components: {
      TrackItem,
      toggleSource,
      QSearch,
      QAutocomplete
    },
    props: ['items', 'title'],
    created () {
      this.$store.commit('session/setPlaylist', this.filteredItems)
    },
    data () {
      return {
        feedHeight: window.innerHeight + 'px',
        selectedSource: 'all'
      }
    },
    watch: {
      selectedSource () {
        this.$store.commit('session/setPlaylist', this.filteredItems)
      }
    },
    methods: {
      onResize (size) {
        this.feedHeight = size.height
      }
      // optionsFromStrings (strings) {
      // // used for providing options to q-select or autocomplete done()
      //   let options = []
      //   for (var i = 0; i < strings.length; i++) {
      //     let val = strings[i].toString()
      //     let option = {'label': val, 'value': val}
      //     options.push(option)
      //   }
      //   return options
      // }
    },
    computed: {
      // searchStaticData () {
      //   let titles = []
      //   for (var i = this.items.length - 1; i >= 0; i--) {
      //     titles.push(this.items[i].raw_title)
      //   }
      //   let options = this.optionsFromStrings(titles)
      //   return {field: 'label', list: options}
      // },
      // ...mapState({
      //   currentIdx: state => state.session.currentIdx
      // }),
      filteredItems: function () {
        if (this.selectedSource === 'all') {
          return this.items
        }
        else if (this.selectedSource.indexOf('r/') > -1) {
          return filter(this.selectedSource, {field: 'subreddit', list: this.items})
        }
        else {
          return filter(this.selectedSource, {field: 'artist', list: this.items})
        }
      },
      sources: function () {
        var sources = []
        for (var i = 0; i < this.items.length; i++) {
          let item = this.items[i]
          if (item.source === 'sc') {
            sources.push(item.artist)
          }
          else if (item.source === 'reddit') {
            if (item.subreddit !== '') {
              sources.push(item.subreddit)
            }
          }
        }
        return [...new Set(sources)]
      }
    }
  }
</script>

<style>
  .parent {
    font-size: 0;
  }
</style>
