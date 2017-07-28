<template>
  <div class='feed-list container' ref:items>
      
     <toggle-source :sources='sources'></toggle-source>

    <div class='card bg-dark'>
      <div class="list" id="feed-table">
        <item v-for='(item, idx) in filteredItems'
              :item='item'
              :idx=idx
              :key='item.key'
              :currentIdx='currentIdx'>
        </item>
      </div>
    </div>

  </div>
</template>

<script>
  import Item from './Item'
  import toggleSource from './toggleSources'
  export default {
    name: 'feed-list',
    components: {
      Item,
      toggleSource
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
