<template>

<!-- <div class='bg-white'> -->

<q-card class='text-center bg-tertiary'>
  <q-card-title >
   <h1 class="display-2 text-primary">amnis<span>!ac</span></h1>
  </q-card-title>
  <q-card-main class='text-secondary'>
    <img src="../assets/icons/mtn-stream.png"><br>
    
    <p class="lead">Discover new music by subscribing to subreddits and soundcloud users</p>
    <p>Built with Flask, Vue.JS, and Quasar</p>
    <p v-if='!user'><router-link to='login'>Login</router-link>  -   <router-link to='register'>Register</router-link></p>
    <p v-else><router-link to='dashboard'>Dashboard</router-link>  -   <router-link to='favorites'>Favorites</router-link></p>

    <listen></listen>

  </q-card-main>
</q-card>


</template>

<script>
  import Listen from './feed/Listen'
  export default {
    name: 'home',
    components: {
      Listen
    },
    computed: {
      user () {
        return this.$store.state.auth.user
      }
    }

  }
</script>

<style>

</style>
