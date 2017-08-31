<template>
  <div>

 <div v-if='items'>
    <feed-list :items='items'></feed-list>
  </div>

  <!-- <div v-else class='relative-position'> -->
    <q-inner-loading :visible="isLoading" />
  <!-- </div> -->

  <div v-if='alertError'>
    <p>Sorry, an error occured when contacting the server</p>
  </div>

</div>

</template>

<script>
// import auth from '../../auth/index.js'
import api from '../../api/api.js'
import feedList from '../feed/feedList'
import toggleSource from '../feed/toggleSources'
import {mapState} from 'vuex'
export default {
  name: 'dashboard',
  // store: ['user', 'authenticated'],
  data () {
    return {
      items: [],
      isLoading: false,
      alertError: false
    }
  },
  computed: {
    ...mapState({
      authenticated: state => state.auth.authenticated,
      user: state => state.auth.user
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
  beforeCreate () {
    console.log('In before create!')
    api.fetchUser(this)
  },
  created () {
    api.fetchItems(this.redditQuery, '', this)
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
