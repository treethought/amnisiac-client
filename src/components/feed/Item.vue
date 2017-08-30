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

</div>
 
</template>

<script>
// import auth from '../../auth/index.js'
import api from '../../api/api.js'
import { Toast } from 'quasar'
import {mapState} from 'vuex'
export default {
  name: 'item',
  props: ['item', 'idx'],
  // store: ['user', 'currentlyPlaying'],
  data () {
    return {
      payload: { item: this.item, idx: this.idx }
    }
  },
  computed: {
    ...mapState({
      user: state => state.auth.user,
      currentlyPlaying: state => state.player.currentlyPlaying,
      currentIdx: state => state.player.currentIdx,
      currentItem: state => state.player.currentItem
    }),
    title: function () {
      if (this.item) {
        return this.item.raw_title
      }
    },
    isActive: function () {
      if (this.currentItem) {
        return this.currentItem.track_id === this.item.track_id
      }
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
      this.$store.commit('player/selectItem', this.payload)
      // this.$root.$emit('select-item', this.item, this.idx)
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
