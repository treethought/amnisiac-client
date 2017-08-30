<template>
 <div v-if='items'>
    <feed-list :items='reversedItems'></feed-list>
    <!-- <feed-list></feed-list> -->
  </div>
</template>

<script>
// import api from '../../api/api.js'
import feedList from '../feed/feedList'
import Player from '../player/Player'
import toggleSource from '../feed/toggleSources'
import {mapState} from 'vuex'
export default {
  name: 'favorites',
  // store: ['user', 'authenticated'],
  data () {
    return {}
  },
  components: {
    feedList,
    Player,
    toggleSource
  },
  computed: {
    ...mapState({
      authenticated: state => state.auth.authenticated,
      user: state => state.auth.user
    }),
    items () {
      return this.user.favorites
    },
    reversedItems: function () {
      return this.reverse(this.items)
    }
  },
  methods: {
    reverse: function (array) {
      return array.slice().reverse()
    }
  },
  created () {
    this.$store.dispatch('auth/fetchUser')
    // .then(this.$store.commit('player/setPlaylist', this.reversedItems))
  },
  route: {
    // Check the users auth status before allowing access
    activate () {
      return !!this.user
    }
  }
}
</script>
