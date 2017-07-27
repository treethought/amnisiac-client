<template>
  <div>
  <div class="container">

    <div class="jumbotron">
    <h1 class="display-3">amnis<span>!ac</span></h1>
    <img src="../assets/icons/mtn-stream.png"><br>
    <hr>
    <!-- <img id='flipped-logo' src="../../assets/icons/mtn-stream.png">
    <h1 id='flipped-brand' class="display-3">amnis<span>!ac</span></h1> -->
    <p class="lead">Discover new music by subscribing to subreddits and soundcloud users</p>
    <hr class="m-y-md">
    <p>Built with Flask and Vue.JS</p>
   </div>
   <feed-index></feed-index>
</div>

</div>
</div>
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
