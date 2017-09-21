<template>
  <div>

 <!-- <div v-if='items'> -->
   <q-inner-loading :visible="isLoading" />
    <feed-list :items='items'></feed-list>
  <!-- </div> -->

   

  <div v-if='alertError'>
    <p>Sorry, an error occured when contacting the server</p>
  </div>

</div>

</template>

<script>
// import auth from '../../auth/index.js'
import feedList from '../feed/feedList'
import toggleSource from '../feed/toggleSources'
import {mapState, mapActions} from 'vuex'
export default {
  name: 'dashboard',
  data () {
    return {
      items: [],
      isLoading: false,
      alertError: false
    }
  },
  methods: {
    ...mapActions({
      fetchUser: 'user/fetchUser',
      fetchItems: 'session/fetchItems'
    })
  },
  computed: {
    ...mapState({
      authenticated: state => state.auth.authenticated,
      user: state => state.user.user,
      currentPlaylist: state => state.session.currentPlaylist // set by fetching items
    }),
    redditQuery () {
      var sourceNames = []
      if (this.user) {
        for (var i = 0; i < this.user.feeds.length; i++) {
          let feed = this.user.feeds[i]
          if (feed.domain === 'reddit') {
            sourceNames.push(feed.name.replace('/r/', ''))
          }
        }
      }
      return sourceNames.join('+')
    },
    scQuery () {
      var artists = []
      if (this.user) {
        for (var i = 0; i < this.user.feeds.length; i++) {
          let feed = this.user.feeds[i]
          if (feed.domain === 'sc') {
            artists.push(feed.name)
          }
        }
      }
      return artists.join('+')
    }
  },
  components: {
    feedList,
    toggleSource
  },
  beforeCreate () {
    if (!this.user) {
      this.$store.dispatch('user/fetchUser')
    }
  },
  created () {
    this.isLoading = true
    let searchParams = {reddit: this.redditQuery, sc: this.scQuery}
    let self = this
    this.fetchItems(searchParams).then(function () {
      console.log('Setting items for dashboard')
      self.items = self.currentPlaylist
      self.isLoading = false
    })
  },
  route: {
    // Check the users auth status befre allowing access
    activate () {
      console.log('checking user auth for dashboard')
      return !!this.user
    }
  }
}
</script>

<style>
  big.token {
  color: purple !important;
  font-family: 'Comfortaa', cursive !important;
    /*font-size: 60px;*/

}
small {
  color: black !important;
}
</style>
