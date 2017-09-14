<template>

  <q-layout ref='layout' view="hHh LpR FFF" class='bg-tertiary'>

  <app-header slot='header'></app-header>
  
  <left-drawer slot='left' class='bg-tertiary'></left-drawer>

  <player v-if='currentItem'></player>

  <router-view></router-view>

<!--   <div v-if="miniPlayerActive">
    <mini-player></mini-player>
  </div> -->

  <control slot="footer" v-if='currentItem'></control>
  <!-- <div slot='footer' v-else></div> -->
  <!-- <mini-player slot='footer' v-if='currentItem'></mini-player> -->

  </q-layout>
</template>

<script>
// import auth from '../api/auth.js'
import AppHeader from './Header'
import LeftDrawer from './LeftDrawer'
import Control from '../player/Control'
import Player from '../player/Player'
// import MiniPlayer from '../player/MiniPlayer'
import { mapState } from 'vuex'
export default {
  name: 'layout',
  // store: ['authenticated', 'user', 'currentItem'],
  components: {
    AppHeader,
    LeftDrawer,
    Control,
    Player,
    // MiniPlayer
  },
  methods: {
    logout () {
      this.$store.dispatch('auth/logout')
    }
  },
  computed: {
    title () {
      return this.$route.name
    },
    ...mapState({
      authenticated: state => state.auth.authenticated,
      user: state => state.auth.user,
      currentItem: state => state.session.currentItem,
      // miniPlayerActive: state => state.player.miniPlayerActive
    })
  }
}
</script>

<style>
.layout-view {
    margin:0;
    padding:0;
}

/*.layout-aside {
  background: #555
}*/

h4 {
  /*color: purple !important;*/
  font-family: 'Comfortaa', cursive;
    /*font-size: 60px;*/

}
span {
  color: black !important;
  /*color: white !important;*/
}

/*h4 {
  font-family: Comfortaa;
}*/
</style>
