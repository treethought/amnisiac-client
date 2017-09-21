<template>

  <q-layout ref='layout' view="hHh LpR FFF" class='bg-tertiary'>

  <app-header slot='header'></app-header>
  
  <left-drawer slot='left' class='bg-tertiary'></left-drawer>

  <youtube-player v-if='currentIsYoutube'></youtube-player>
  <soundcloud-player v-else-if='currentIsSC'></soundcloud-player>

  <router-view></router-view>


  <control slot="footer" v-if='currentItem'></control>

  </q-layout>
</template>

<script>
import AppHeader from './Header'
import LeftDrawer from './LeftDrawer'
import Control from '../player/Control'
import YoutubePlayer from '../player/YoutubePlayer'
import SoundcloudPlayer from '../player/SoundCloudPlayer'

import { mapState, mapGetters } from 'vuex'
export default {
  name: 'layout',
  components: {
    AppHeader,
    LeftDrawer,
    Control,
    YoutubePlayer,
    SoundcloudPlayer
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
    ...mapGetters('session', [
      'currentIsYoutube',
      'currentIsSC'
    ]),
    ...mapState({
      authenticated: state => state.auth.authenticated,
      user: state => state.auth.user,
      currentItem: state => state.session.currentItem
    })
  }
}
</script>

<style>
.layout-view {
    margin:0;
    padding:0;
}

</style>
