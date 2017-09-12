<template>
  <!-- Don't drop "q-app" class -->
  <div id="q-app">
    <!-- <nav-bar-head :authenticated='authenticated'></nav-bar-head> -->
    <router-view></router-view>
</div>


</template>

<script>
import layout from './components/layout'
// import api from './api/api.js'
// import auth from './api/auth.js'
import {mapState, mapActions} from 'vuex'
export default {
  name: 'app',
  components: {
    layout
  },
  computed: {
    ...mapState({
      authenticated: state => state.auth.authenticated,
      user: state => state.auth.user
    })
  },
  methods: {
    ...mapActions('auth', [
      'authorize',
      'fetchUser'
    ])
  },
  created () {
    console.log('in created, checking auth status')
    if (this.authenticated) {
      console.log('fetching user')
      this.fetchUser()
    }
  }
}
</script>

<style>
  #q-app {
    margin: 0;
    padding: 0;
  }
</style>
