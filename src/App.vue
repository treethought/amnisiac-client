<template>
  <!-- Don't drop "q-app" class -->
  <div id="q-app">
    <!-- <nav-bar-head :authenticated='authenticated'></nav-bar-head> -->
    <router-view :user='user' :authenticated='authenticated'></router-view>
</div>


</template>

<script>
import index from './components/layout'
import api from './api/api.js'
import auth from './api/auth.js'
export default {
  name: 'app',
  store: ['authenticated', 'user'],
  watch: {
    authenticated: function () {
      if (this.authenticated) {
        console.log('activated auth watch!')
        // api.fetchUser(this)
      }
    }
  },
  created () {
    console.log('checking auth')
    if (auth.checkAuth()) {
      console.log('jwt token found')
      console.log('setting logged instate')
      this.$store.authenticated = true
      api.fetchUser(this)
    }
  },
  destroyed () {
    console.log('Destroyed - removing token')
    auth.logout(this)
  },
  components: {
    // feedIndex,
    // feedList,
    // Item,
    // Player,
    // Home,
    // Login,
    // Favorites,
    index
  }
}
</script>

<style>
  #q-app {
    margin: 0;
    padding: 0;
  }
</style>
