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
      // items: [],
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
      items: state => state.session.currentPlaylist
    }),
    redditQuery: function () {
      var sourceNames = []
      if (this.user) {
        for (var i = 0; i < this.user.feeds.length; i++) {
          sourceNames.push(this.user.feeds[i].name.replace('/r/', ''))
        }
      }
      return sourceNames.join('+')
    }
  },
  components: {
    feedList,
    toggleSource
  },
  created () {
    this.isLoading = true
    let reddit = this.redditQuery
    let searchParams = {reddit: reddit, sc: ''}
    this.fetchUser().then(this.fetchItems(searchParams)).then(this.isLoading = false)
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
