<template>

<!-- <div class='bg-white'> -->

<q-card class='text-center'>
  <q-card-title >
   <h1 class="display-2 text-primary">amnis<span>!ac</span></h1>
  </q-card-title>
  <q-card-main>
    <img src="../assets/icons/mtn-stream.png"><br>

    <!-- <q-icon large name='filter_hdr' /> -->
    
    <p class="lead">Discover new music by subscribing to subreddits and soundcloud users</p>
    <p>Built with Flask, Vue.JS, and Quasar</p>
    <p><router-link to='login'>Login</router-link> | <router-link to='register'>Register</router-link></p>

      <q-card flat>
<q-card-actions>
    <feed-index></feed-index>
  </q-card-actions>
</q-card>

  </q-card-main>
</q-card>

<!-- <q-card flat>
<q-card-actions>
    <feed-index></feed-index>
  </q-card-actions>
</q-card> -->
<!-- </div> -->
  <!-- <div class="card text-center text-primary bg-secondary">


 <h1 class="display-2 text-primary">amnis<span>!ac</span></h1>
    <div class="card bg-tertiary">
      <div class="card-content bg-secondary">
        <img src="../assets/icons/mtn-stream.png"><br>
        <p class="lead">Discover new music by subscribing to subreddits and soundcloud users</p>
        <hr class="m-y-md">
        <p>Built with Flask, Vue.JS, and Quasar</p>
      </div>
    </div>
    
     <feed-index></feed-index>
   
</div> -->


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
