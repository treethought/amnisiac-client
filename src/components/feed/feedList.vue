<template>

<div>

  <player :items='filteredItems'></player>

  <q-card flat v-if='items' class='bg-tertiary'>
    <q-card-title>
    <toggle-source  :sources='sources'></toggle-source>
    </q-card-title>
     <q-list class='bg-white'>
        <q-list-header>Feed</q-list-header>
        <item v-for='(item, idx) in filteredItems'
                :item='item'
                :idx=idx
                :key='item.key'
                :currentIdx='currentIdx'>
        </item>

      </q-list>

  </q-card>




   <!--  <div v-if='items' class=' bg-tertiary'>
      <toggle-source  :sources='sources'></toggle-source>

      <q-list >
        <q-list-header>Feed</q-list-header>
        <item v-for='(item, idx) in filteredItems'
                :item='item'
                :idx=idx
                :key='item.key'
                :currentIdx='currentIdx'>
        </item>

      </q-list>
    </div> -->

</div>
</template>

<script>
  import Item from './Item'
  import toggleSource from './toggleSources'
  import Player from '../player/Player'
  export default {
    name: 'feed-list',
    components: {
      Item,
      toggleSource,
      Player
    },
    props: ['items', 'title'],
    store: ['selectedSource'],
    data () {
      return {
        isLoading: null,
        alertError: false,
        currentIdx: 0
      }
    },
    computed: {
      itemLength: function () {
        return this.items.length
      },
      filteredItems: function () {
        if (this.selectedSource === 'all') { return this.items }
        var filtered = []
        for (var i = 0; i < this.items.length; i++) {
          let itemSource = this.items[i].subreddit
          if (itemSource === this.selectedSource) {
            filtered.push(this.items[i])
          }
        }
        return filtered
      },
      sources: function () {
        var sources = []
        for (var i = 0; i < this.items.length; i++) {
          var s = this.items[i].subreddit
          if (s !== '') {
            sources.push(s)
          }
        }
        return [...new Set(sources)]
      }
    },
    created () {
      this.$root.$on('item-loaded', this.highLightItem)
      this.selectedSource = 'all'
    },
    methods: {
      highLightItem (item, idx) {
        console.log('DETECTED Item SELECTED')
        console.log(item, idx)
        this.currentIdx = idx
      }
    }
  }
</script>

<style>
  .parent {
    font-size: 0;
  }
</style>
