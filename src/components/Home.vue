<template>

<!-- <div class='bg-white'> -->

<q-card  color='tertiary' flat class='text-center'>
  <q-card-title >
   <h1 class="display-2 text-primary">a<span>m</span>nis<span>!ac</span></h1>
   <!-- <q-btn round flat>
   <img src="../assets/icons/logo-small.png" class='full-height' height='120'>
   </q-btn> -->
  
  </q-card-title>
  <q-card-main class='text-white'>
    <img src="../assets/icons/mtn-stream.png" class='responsive'><br>
    
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
