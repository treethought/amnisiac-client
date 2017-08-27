<template>

  <q-layout ref='layout' view="hHh LpR FFF">

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

    <!-- Tabs -->
<!--     <q-tabs slot='navigation' align='center' inverted>
      <q-route-tab icon="home" to="/" exact slot="title"    
      />
      <q-route-tab icon="radio" to="/listen" exact slot="title"
      />
      <q-route-tab icon="favorites" to="/favorites" exact slot="title"
      />
      <q-route-tab icon="playlist_play" to="/dashboard" exact slot="title"
      />
      <q-tab-pane name='Logout' v-if='authenticated' to="/login" exact @click.native='logout'
      />
      </q-tabs> -->






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

    <router-view></router-view>

    <!-- Footer -->
    <control slot='footer'></control>

<!-- 
        <q-tabs slot="navigation" class='toolbar justified bg-tertiary desktop-hide' :padding="1">
          <q-tab icon="radio" route="/listen" exact replace>listen</q-tab>
          
          <q-tab v-if='authenticated' icon="favorites" route="/favorites" exact replace>favorites</q-tab>
          <q-tab v-if='authenticated' icon="playlist_play" route="/dashboard" exact replace>dashboard</q-tab>
          <q-tab v-if='authenticated' icon="build" route="/manage" exact replace>manage</q-tab>
          
          <q-tab class='mobile-only' v-if='authenticated' icon="account_circle" route="/login" exact replace @click.native='logout'>logout</q-tab>

          <q-tab v-if='!authenticated' icon="account_circle" route="/login" exact replace>login</q-tab>
          <q-tab v-if='!authenticated' icon="supervisor_account" route="/register" exact replace>register</q-tab>
        </q-tabs> -->

    </q-toolbar>
   
  </q-layout>
</template>

<script>
import auth from '../api/auth.js'
import Control from './player/Control'
export default {
  name: 'layout',
  store: ['authenticated', 'user', 'currentItem'],
  components: {
    Control
  },
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
.layout-view {
    margin:0;
    padding:0;
}

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
