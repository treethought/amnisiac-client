<template>

<q-card inline class='no-margin full-width'>
<q-item :item='item'  v-bind:class="{'bg-primary': isActive, 'text-black': isActive}">
  <q-item-side v-if='isPlaying' icon='pause' color='tertiary' @click='clickItem'/>
  <q-item-side v-else-if='isPaused' icon='play_arrow' color='tertiary' @click='clickItem' />
  <q-item-side v-else icon='play_arrow' color='white' @click='clickItem'/>
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


 
</template>

<script>
import { Toast } from 'quasar'
import {mapState} from 'vuex'
export default {
  name: 'item',
  props: ['item', 'idx'],
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
    isPaused: function () {
      return this.isActive && !this.currentlyPlaying
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
    },
    saveItem (event) {
      console.log('Saving item to favorites')
      let self = this
      this.$store.dispatch('user/saveItem', this.item)
        .then(Toast.create({
          html: 'Saved ' + this.item.raw_title + 'to favorites!',
          icon: 'favorites',
          timeout: 2500,
          color: '#f8c1c1',
          bgColor: 'black',
          button: {
            label: 'Undo',
            handler () {
              console.log('Undo save')
              self.$store.dispatch('user/removeItem', self.item)
            },
            color: 'white'
          }
        })
        )
    },
    removeItem (event) {
      let self = this
      this.$store.dispatch('user/removeItem', this.item)
        .then(Toast.create({
          html: 'Removed ' + this.item.raw_title + 'from favorites!',
          icon: 'delete',
          timeout: 3000,
          color: '#f8c1c1',
          bgColor: 'black',
          button: {
            label: 'Undo',
            handler () {
              console.log('Undo remove')
              self.$store.dispatch('user/saveItem', self.item)
            },
            color: 'white'
          }
        })
        )
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
