<template>
<div class="container">

  <div class="toolbar white">
      <q-toolbar-title :padding="2">
        <div class='wrap'>
        <h5><big class='token'>Listen</big></h5>
        </div>
      </q-toolbar-title>
    </div>

  <div class="container">
    <search-field></search-field>
  </div>

<!--   <div v-if='items'>
      <player :items='items'></player>
    </div> -->

 <div v-if='items'>
    <!-- <toggle-source :sources='sources'></toggle-source> -->
    <feed-list :items='items'></feed-list>
  </div>

  <div v-if="isLoading">
    <h1>Loading</h1>
      <i class="fa fa-refresh fa-spin fa-3x fa-fw"></i>
      <span class="sr-only">Loading...</span>
  </div>

  <div v-if='alertError'>
    <p>Sorry, an error occured when contacting the server</p>
  </div>
  
</div>

</template>

<script>
import Player from '../player/Player'
import feedList from './feedList'
import searchField from '../Search'
import api from '../../api/api.js'
import toggleSource from './toggleSources'

export default {
  name: 'feed-index',
  store: ['selectedSource'],
  components: {
    Player,
    feedList,
    searchField,
    toggleSource
  },
  data () {
    return {
      items: null,
      isLoading: false,
      alertError: false
    }
  },
  created () {
    this.$root.$on('submit-search', this.submitSearch)
  },
  methods: {
    submitSearch (reddit, sc) {
      api.fetchItems(reddit, sc, this)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


.btn {
  color: black;
  background-color: white;
  border-color: purple;
}

#flipped-logo, #flipped-brand {
  -webkit-transform: rotate(180deg);
}


button.btn.toggle-filter.active {
  color: gray;
  border-color: grey;
  /*background-color: white;*/
}





p {
    /*font-family: 'Kreon', serif;*/
    /*font-family: 'Comfortaa', cursive;*/

}
</style>
