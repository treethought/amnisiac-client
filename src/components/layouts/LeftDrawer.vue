<template>

  <!-- Drawer -->
<div slot="left" class='bg-tertiary'>

<q-toolbar class='desktop-hide'>
    <q-btn flat @click="layout.toggleLeft()">
        <img src="../../assets/icons/mtn-stream.png" width="30" height="30" alt="">
      </q-btn>
      <div class='text-left'>
        <big>amnis<span>!ac</span></big>
      </div>
      <q-item-separator></q-item-separator>
</q-toolbar>

  <q-list no-border class='bg-tertiary text-white'>
    <q-list-header>

      <div v-if='user' class='text-primary'>{{user.username}}</div>
    </q-list-header>
    

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
  </q-list>
  </div>

</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'left-drawer',
  inject: ['layout'],
  methods: {
    logout () {
      this.$store.dispatch('auth/logout')
    }
  },
  computed: {
    ...mapState({
      authenticated: state => state.auth.authenticated,
      user: state => state.auth.user
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
