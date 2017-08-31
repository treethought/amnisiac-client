<template>

<!-- <div class='bg-white'> -->

<q-card class='text-center bg-tertiary'>
  <q-card-title >
   <h1 class="display-2 text-primary">amnis<span>!ac</span></h1>
  </q-card-title>
  <q-card-main>
    <img src="../assets/icons/mtn-stream.png"><br>
    
    <p class="lead">Discover new music by subscribing to subreddits and soundcloud users</p>
    <p>Built with Flask, Vue.JS, and Quasar</p>
    <p><router-link to='login'>Login</router-link>  -   <router-link to='register'>Register</router-link></p>

      <q-card flat>
<q-card-actions>
    <feed-index></feed-index>
  </q-card-actions>
</q-card>

  </q-card-main>
</q-card>


</template>

<script>
  import Listen from './feed/Listen'
  export default {
    name: 'home',
    components: {
      'feed-index': Listen
    }
  }
</script>

<style>
.jumbotron {
  background-color: white !important;
}
h1 {
  color: purple;
  font-family: 'Comfortaa', cursive;
    /*font-size: 60px;*/

}
h1 > span {
  color: black;
}
</style>
