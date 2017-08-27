<template>
 <div v-if='items'>
    <feed-list :items='reversedItems'></feed-list>
  </div>
</template>

<script>
import api from '../../api/api.js'
import feedList from '../feed/feedList'
import Player from '../player/Player'
import toggleSource from '../feed/toggleSources'
export default {
  name: 'favorites',
  store: ['user', 'authenticated'],
  data () {
    return {
      isLoading: false,
      alertError: false
    }
  },
  components: {
    feedList,
    Player,
    toggleSource
  },
  computed: {
    items: function () { // computed so that it updates when removing favorited items?
      return this.user.favorites
    },
    reversedItems: function () {
      return this.reverse(this.items)
    },
    sources: function () {
      var sources = []
      for (var i = 0; i < this.user.favorites.length; i++) {
        var s = this.user.favorites[i].subreddit
        sources.push(s)
      }
      return [...new Set(sources)]
    }
  },
  methods: {
    reverse: function (array) {
      return array.slice().reverse()
    }
  },
  beforeCreate () {
    api.fetchUser(this)
  },
  route: {
    // Check the users auth status before allowing access
    activate () {
      return !!this.user
    }
  }
}
</script>
