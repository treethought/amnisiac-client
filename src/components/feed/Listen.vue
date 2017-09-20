<template>
<div class="container">

  <div class="container">
    <q-card flat class='text-white'>
      <q-card-title>
        Serach Sources
      </q-card-title>
    </q-card>
    <search-field v-model='searchParams' :onSubmit='submitSearch'></search-field>
  </div>


 <div v-if='items.length > 0'>
    <feed-list :items='items'></feed-list>
  </div>

   <q-inner-loading :visible="isLoading" />
  
</div>

</template>

<script>
import Player from '../player/Player'
import feedList from './feedList'
import searchField from '../Search'
import toggleSource from './toggleSources'
import {mapActions} from 'vuex'
export default {
  name: 'listen',
  components: {
    Player,
    feedList,
    searchField,
    toggleSource
  },
  computed: {
    items () {
      return this.$store.state.session.currentPlaylist
    }
  },
  data () {
    return {
      isLoading: false,
      searchParams: {reddit: '', sc: ''}
    }
  },
  methods: {
    ...mapActions('session', [
      'fetchItems'
    ]),
    submitSearch () {
      this.fetchItems(this.searchParams)
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
