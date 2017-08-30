<template>

<div>

  <q-card flat v-if='items' class='bg-tertiary'>
    <q-card-title>
    <toggle-source  :sources='sources'></toggle-source>
    </q-card-title>
     <q-list class='bg-tertiary text-white'>
        <!-- <q-list-header>Feed</q-list-header> -->
        <item v-for='(item, idx) in filteredItems'
                :item='item'
                :idx=idx
                :key='item.key'>
        </item>

      </q-list>

  </q-card>


</div>
</template>

<script>
  import Item from './Item'
  import toggleSource from './toggleSources'
  import {mapState} from 'vuex'
  export default {
    name: 'feed-list',
    components: {
      Item,
      toggleSource
    },
    props: ['items', 'title'],
    created () {
      this.$store.commit('player/setPlaylist', this.filteredItems)
    },
    data () {
      return {}
    },
    watch: {
      filteredItems (newPlaylist) {
        this.$store.commit('player/setPlaylist', newPlaylist)
      }
    },
    computed: {
      ...mapState({
        currentIdx: state => state.player.currentIdx,
        selectedSource: state => state.player.selectedSource
      }),
      filteredItems: function () {
        if (this.selectedSource === 'all') { return this.items }
        var filtered = []
        for (var i = 0; i < this.items.length; i++) {
          let itemSource = this.items[i].subreddit
          if (itemSource === this.selectedSource) {
            filtered.push(this.items[i])
          }
        }
        return [...new Set(filtered)]
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
    }
  }
</script>

<style>
  .parent {
    font-size: 0;
  }
</style>
