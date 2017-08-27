<template>
<div>
<q-card>
<q-item dense :item='item'  v-bind:class="{'bg-primary': isActive, 'text-black': isActive}">
  <q-item-side v-if='!isPlaying' icon='play_arrow' highlight @click='clickItem' />
  <q-item-side v-else icon='pause' highlight @click='clickItem' />
  <q-item-main>
    <div v-if="item.source === 'reddit'">
    <q-item-tile label>{{item.raw_title}}</q-item-tile>
    <q-item-tile sublabel>
    <q-icon name="fa-reddit" /> {{item.subreddit}}</q-item-tile>
    </div>
  </q-item-main>
  <div v-if='user'>
  <q-item-tile right v-if='inFavorites' icon='favorite' @click='removeItem'></q-item-tile>
  <q-item-tile right v-else icon='favorite_border' @click='saveItem'></q-item-tile>
  </div>
</q-item>
</q-card>


 <!--  <div class="item" v-bind:class="{'bg-primary': isActive, 'text-black': isActive}" :item='item'>
  <!-- <div class='card-content'> -->

  <!--   <i class="item-primary fa fa-play" v-on:click='clickItem'></i>
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
    <i v-else class="item-secondary fa fa-star-o" v-on:click='saveItem'></i>
    </div> -->
  <!-- </div> -->
<!--   </div> --> 
</div>
 
</template>

<script>
// import auth from '../../auth/index.js'
import api from '../../api/api.js'
import { Toast } from 'quasar'
export default {
  name: 'item',
  props: ['item', 'idx', 'currentIdx'],
  store: ['user', 'currentlyPlaying'],
  computed: {
    title: function () {
      if (this.item) {
        return this.item.raw_title
      }
    },
    isActive: function () {
      return this.currentIdx === this.idx
    },
    isPlaying: function () {
      return this.isActive && this.currentlyPlaying
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
      this.$root.$emit('update-user') // todo\
      Toast.create({
        html: 'Saved ' + this.item.raw_title + 'to favorites!',
        icon: 'star',
        timeout: 2500,
        color: '#f8c1c1',
        bgColor: 'black'
        // button: {
        //   label: 'Undo',
        //   handler () {
        //     // Specify what to do when button is clicked/tapped
        //   },
        //   color: 'white'
        // }
      })
    },
    removeItem (event) {
      api.removeItem(this)
      // var self = this
      Toast.create({
        html: 'Removed ' + this.item.raw_title + 'from favorites!',
        icon: 'delete',
        timeout: 2500,
        color: '#f8c1c1',
        bgColor: 'black',
        button: {
          label: 'Undo',
          handler (event) {
            // self.saveItem(event)
            // Specify what to do when button is clicked/tapped
            // console.log('in handler, before call')
            // console.log(self.user.length)
            // api.saveItem(self)
            // console.log('after call')
            // console.log(self.user.length)
          },
          color: 'white'
        }
      })
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
  color: pink;
}


</style>
