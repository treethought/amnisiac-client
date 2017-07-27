<template>


  <div class="item" v-bind:class='{active: isActive}' :item='item'>
  <!-- <div class='card-content'> -->

    <i class="item-primary fa fa-play" v-on:click='clickItem'></i>
    <div class="item-content has-secondary">

    <div class='item-label'>
      <i v-if="item.source === 'reddit'" class="fa fa-reddit">  {{item.raw_title}}</i>
      
    </div>
    <div class='item-label item-smaller'>
      {{item.subreddit}}
    </div>

    </div>
    <div v-if='user' class="item-secondary">
    <i v-if='inFavorites' class="fa fa-star" v-on:click='removeItem'></i>
    <i v-else  class="item-secondary fa fa-star-o" v-on:click='saveItem'></i>
    </div>
  <!-- </div> -->
  </div>

 
</template>

<script>
// import auth from '../../auth/index.js'
import api from '../../api/api.js'
export default {
  name: 'item',
  props: ['item', 'idx', 'currentIdx'],
  store: ['user'],
  computed: {
    title: function () {
      if (this.item) {
        return this.item.raw_title
      }
    },
    isActive: function () {
      return this.currentIdx === this.idx
    },
    inFavorites: function () {
      return this.user.favorites.some((fav) => {
        return fav.track_id === this.item.track_id
      })
    }
  },
  methods: {
    clickItem (event) {
      console.log('clicked ' + this.item)
      console.log('clicked index ' + this.idx)
      this.$root.$emit('select-item', this.item, this.idx)
    },
    saveItem (event) {
      console.log('Saving item to favorites')
      api.saveItem(this) // should update user
      this.$root.$emit('update-user') // todo
    },
    removeItem (event) {
      api.removeItem(this)
    }
  }
}
</script>

<style scoped>
td > img {
    width: 40px;
    width: 40px;
}

div.active {
  background-color: pink;

}

</style>
