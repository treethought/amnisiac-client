<template>
  <q-layout>
    <div slot="header" class="toolbar">
      <!-- opens drawer below -->
      <button class="hide-on-drawer-visible" @click="$refs.drawer.open()">
        <i>menu</i>
      </button>
     
      <q-toolbar-title :padding="2"
        <div class='text-left'>
        <img src="../assets/icons/mtn-stream.png" width="30" height="30" alt="">
        <big>amnis<span>!ac</span></big>
         </div>
      </q-toolbar-title>

      <div class='text-center'>
           <small v-if='user'>{{user.username}}</small> :: <big>{{title}}</big>
       </div>

    </div>


    <!-- Drawer -->
    <q-drawer class='text-primary' ref="drawer">
      <div class="toolbar">
        <q-toolbar-title>
          Amnisiac
        </q-toolbar-title>
      </div>

      <div class="list no-border">
<!--        <div class="list-header">
        Left Side Drawer
      </div> -->
      <q-drawer-link icon="home" to="/home">home</q-drawer-link>
      <q-drawer-link icon="radio" to="/listen">listen</q-drawer-link>
      <q-drawer-link v-if='!user' icon="register" to="/register">register</q-drawer-link>
      <q-drawer-link v-if='user' icon="favorites" to="/favorites">favorites</q-drawer-link>
      <q-drawer-link v-if='user' icon="playlist_play" to="/dashboard">dashboard</q-drawer-link>
      <q-drawer-link v-if='user' icon="build" to="/manage">manage</q-drawer-link>
      
      <q-drawer-link v-if='user' icon="logout" to="/login" @click.native='logout'>logout</q-drawer-link>

      <q-drawer-link v-if='!user' icon="login" to='/login'>
        Login
      </q-drawer-link>
      <q-drawer-link v-if='!user' icon="register" to='/register'>
        Register
      </q-drawer-link>
      </div>


    </q-drawer>

    <router-view class="layout-view"></router-view>
    <!-- <div class="layout-view"></div> -->

    <!-- Footer -->
    <div slot="footer" class="toolbar" :padding="1">
    <!-- <q-tabs slot="navigation" class='toolbar' :padding="1"> -->
      <q-tab icon="home" route="/home" exact replace>home</q-tab>
      <q-tab icon="radio" route="/listen" exact replace>listen</q-tab>
      <q-tab v-if='!authenticated' icon="login" route="/login" exact replace>login</q-tab>
      <q-tab v-if='!authenticated' icon="register" route="/register" exact replace>register</q-tab>
      <q-tab v-if='authenticated' icon="favorites" route="/favorites" exact replace>favorites</q-tab>
      <q-tab v-if='authenticated' icon="playlist_play" route="/dashboard" exact replace>dashboard</q-tab>
      <q-tab v-if='authenticated' icon="build" route="/manage" exact replace>manage</q-tab>
      
      <q-tab v-if='authenticated' icon="logout" route="/login" exact replace @click.native='logout'>logout</q-tab>



    <!-- </q-tabs> -->
      
    </div>
   
  </q-layout>
</template>

<script>
import auth from '../api/auth.js'
export default {
  name: 'nav-bar-head',
  store: ['authenticated', 'user'],
  methods: {
    logout () {
      auth.logout(this)
    }
  },
  computed: {
    title: function () {
      return this.$route.name
    }
  }
}
</script>

<style>

h4 {
  /*color: purple !important;*/
  font-family: 'Comfortaa', cursive;
    /*font-size: 60px;*/

}
span {
  color: black !important;
}

/*h4 {
  font-family: Comfortaa;
}*/
</style>
