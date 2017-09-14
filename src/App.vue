<template>
  <!-- Don't drop "q-app" class -->
  <div id="q-app">
    <router-view></router-view>
</div>


</template>

<script>
import {mapState, mapActions} from 'vuex'
export default {
  name: 'app',
  computed: {
    ...mapState({
      authenticated: state => state.auth.authenticated,
      user: state => state.user.user
    })
  },
  methods: {
    ...mapActions('auth', [
      'authorize'
    ]),
    ...mapActions('user', [
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
