<template>

  <q-layout ref='layout' view="hHh LpR FFF" class='bg-tertiary'>

    <q-toolbar slot='header'>
      <!-- opens drawer below -->
      <q-btn flat @click="$refs.layout.toggleLeft()">
        <img src="../assets/icons/mtn-stream.png" width="30" height="30" alt="">
      </q-btn>
     
      <q-toolbar-title :padding="2">
        <div class='text-left'>
          <!-- <img src="../assets/icons/mtn-stream.png" width="30" height="30" alt=""> -->
          <big>amnis<span>!ac</span></big>
        </div>
      </q-toolbar-title>

      <div class=''>
           <small v-if='user' class='mobile-only'>{{user.username}}</small> :: <big>{{title}}</big>
       </div>

    </q-toolbar> 

    <!-- Drawer -->
    <div slot="left" class='bg-tertiary'>
  <!--   <q-list  class='bg-tertiary'>
      <q-list-header>
          <span v-if='user'>
            {{user.username}}
          </span>
      </q-list-header> -->
      

      <q-side-link item to="/" exact>
        <q-item-side icon="home" color='primary' />
        <q-item-main  label="Home" />
      </q-side-link>
      <q-side-link item to="/listen">
        <q-item-side icon="radio" color='primary'/>
        <q-item-main label="Listen" />
      </q-side-link>
      <q-side-link item v-if='authenticated' to="/favorites">
        <q-item-side icon="favorites" color='primary'/>
        <q-item-main label="Favorites" />
      </q-side-link>
      <q-side-link item v-if='authenticated' to="/dashboard">
        <q-item-side icon="playlist_play" color='primary'/>
        <q-item-main label="Dashboard" />
      </q-side-link>
      <q-side-link item v-if='authenticated' to="/manage">
        <q-item-side icon="build" color='primary'/>
        <q-item-main label="Manage" />
      </q-side-link>
      <q-side-link item v-if='authenticated' to="/login" @click.native='logout'>
        <q-item-side icon="account_circle" color='primary'/>
        <q-item-main label="Logout" />
      </q-side-link>
      <q-side-link item v-if='!authenticated' to="/login">
        <q-item-side icon="account_circle" color='primary'/>
        <q-item-main label="Login" />
      </q-side-link>
      <q-side-link item v-if='!authenticated' to="/register">
        <q-item-side icon="supervisor_account" color='primary'/>
        <q-item-main label="Register" />
      </q-side-link>
    <!-- </q-list> -->
    </div>

    <player></player>

    <router-view></router-view>

    <q-toolbar slot="footer" class="justify-center" :padding="1">
        <control v-if='currentItem'></control>
    </q-toolbar>

  </q-layout>
</template>

<script>
// import auth from '../api/auth.js'
import Control from './player/Control'
import Player from './player/Player'
import { mapState } from 'vuex'
export default {
  name: 'layout',
  // store: ['authenticated', 'user', 'currentItem'],
  components: {
    Control,
    Player
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
      currentItem: state => state.player.currentItem
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
