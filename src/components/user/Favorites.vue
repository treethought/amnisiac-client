<template>
<div>
  <div v-if='items'>
    <feed-list :items='reversedItems'></feed-list>
  </div>
  <div v-else>
   <q-inner-loading :visible="fetching" />
   </div>
</div>
</template>

<script>
// import api from '../../api/api.js'
import feedList from '../feed/feedList'
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
    toggleSource
  },
  computed: {
    ...mapState({
      authenticated: state => state.auth.authenticated,
      user: state => state.auth.user,
      fetching: state => state.auth.fetching
    }),
    items () {
      return this.$store.getters['auth/favorites']
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
  ready () {
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
