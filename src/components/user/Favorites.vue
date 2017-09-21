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
      return this.$store.getters['user/favorites']
      // return this.$store.getters.favorites
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
    this.$store.dispatch('user/fetchUser')
      .then(this.$store.commit('session/setPlaylist', this.reversedItems))
  },
  route: {
    // Check the users auth status before allowing access
    activate () {
      return !!this.user
    }
  }
}
</script>
