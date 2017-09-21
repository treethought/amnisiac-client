<template>

<div>
<div class='bg-secondary'>
 <q-slider class='' :disable='!controlDuration' :value='controlTime' @change='seekTime' :min='0' :max='controlDuration'></q-slider>
</div>

<q-toolbar class='row items-start'>


  <q-card-media inline class='col-xs-2 col-md-1 no-margin no-gutter' @click='toTop'>
    <img class='responsive' :src="thumbnailSrc">
  </q-card-media>



    <q-card flat class='text-center col-xs-0 col-md-3 mobile-hide cordova-hide'> 
        {{currentItem.raw_title}}<br>
        <span slot="subtitle" class='text-white'>
      {{currentItem.subreddit}}
    </span>
    </q-card flat>



<q-toolbar-title class='text-center fit col-xs-8 col-md-4'>
  <div class="group">
    <q-btn flat  v-on:click.stop="selectPrevious">
      <q-icon name="skip_previous" color='primary' />
    </q-btn>  

    <q-btn v-if='currentlyPlaying' flat  v-on:click="pause">
      <q-icon name="pause" color='primary' />
    </q-btn> 

    <q-btn v-else flat  v-on:click="resume">
      <q-icon name="play_arrow" color='primary' />
    </q-btn> 

    <q-btn flat v-on:click.stop="selectNext">
      <q-icon name="skip_next" color='primary' />
    </q-btn><br>
  </div>

     <div slot='subtitle'>
          {{cleanCurrentTime}} / {{cleanDuration}}<br>
      </div>
</q-toolbar-title>

<q-toolbar-title class='text-center col-xs-auto col-md-3 offset-md-1 justify-end'>
<div class="group mobile-hide cordova-hide">
    <q-btn flat  @click.stop="saveOrRemove" class=''>
      <q-icon name="favorite" v-bind:class="{'text-primary': inFavorites}" />
    </q-btn>  

    <q-btn  flat  @click="goToSource" class=''>
      <q-icon name="fa-reddit" color='black' />
    </q-btn>

    <q-btn flat @click.stop="showPlayer" class=''>
      <q-icon name="live_tv" v-bind:class="{'text-primary': playerVisible}"/>
    </q-btn>
</div>
</q-toolbar-title>



<q-fab flat 
  class='fixed-bottom-right z-absolute desktop-hide'
  style="right: 15px; bottom: 10px"
  color="tertiary"
  icon="dehaze"
  direction="up"
>
  <q-fab-action
    icon='favorite'
    color="primary"
    @click="saveOrRemove"
  />
  <q-fab-action
    color="white"
    @click="openReddit"
    icon="fa-reddit"
  />
  <q-fab-action
    color="white"
    @click="showPlayer"
    icon="live_tv"
  />
</q-fab>

</q-toolbar>

 </div>


</template>

<script>
import {mapState, mapActions, mapMutations} from 'vuex'
import {BackToTop, openURL} from 'quasar'
import notification from './notification'
export default {
  name: 'control',
  inject: ['layout'],
  directives: { BackToTop },
  computed: {
    ...mapState({
      user: state => state.user.user,
      currentlyPlaying: state => state.player.currentlyPlaying,
      buffering: state => state.player.buffering,
      playerVisible: state => state.player.playerVisible,
      currentDuration: state => state.player.currentDuration,
      currentTime: state => state.player.currentTime,
      currentItem: state => state.session.currentItem
    }),
    cleanCurrentTime () {
      return this.cleanTime(this.currentTime)
    },
    cleanDuration () {
      return this.cleanTime(this.currentDuration)
    },
    thumbnailSrc () {
      if (this.currentItem.source === 'sc') { return this.currentItem.artwork_url }
      return 'https://img.youtube.com/vi/' + this.currentItem.track_id + '/0.jpg'
    },
    sourceUrl () {
      let base = 'https://reddit.com/'
      return base + this.currentItem.subreddit
    },
    inFavorites () {
      if (!this.user) { return false }
      return this.user.favorites.some((fav) => {
        return fav.track_id === this.currentItem.track_id
      })
    },
    controlTime () {
      if (this.currentTime) {
        return this.currentTime
      }
      else {
        return 0
      }
    },
    controlDuration () {
      if (this.currentDuration) {
        return this.currentDuration
      }
      else {
        return 1
      }
    }
  },
  methods: {
    ...mapActions('session', [
      'selectNext',
      'selectPrevious'
    ]),
    ...mapActions('user', [
      'saveItem',
      'removeItem'
    ]),
    ...mapMutations('player', [
      'togglePlayer',
      'toggleMiniPlayer',
      'seekTime',
      'setPlaying',
      'setPaused'
    ]),
    showPlayer () {
      if (!this.playerVisible) {
        this.togglePlayer()
      }
      this.toTop()
    },
    toTop () {
      document.documentElement.scrollTop = 0
      document.body.scrollTop = 0
    },
    openReddit () {
      openURL(this.sourceUrl)
    },
    goToSource () {
      openURL(this.currentItem.url)
    },
    saveOrRemove () {
      if (this.inFavorites) {
        this.removeItem(this.currentItem)
      }
      else {
        this.saveItem(this.currentItem)
      }
    },
    pause () {
      this.setPaused()
    },
    resume () {
      this.setPlaying()
    },
    cleanTime (t) {
      // https://stackoverflow.com/questions/5539028/converting-seconds-into-hhmmss
      t = Number(t)

      var m = Math.floor(t % 3600 / 60)
      var s = Math.floor(t % 3600 % 60)
      return ('0' + m).slice(-2) + ':' + ('0' + s).slice(-2)
    },
    updateNotification () {
      if (this.$q.platform.is.cordova) {
        let title = this.currentItem.raw_title
        let artist = this.currentItem.artist || ''
        let art = this.thumbnailSrc
        let playing = this.currentlyPlaying
        notification.sendNotification(title, artist, art, playing)
      }
    }
  },
  watch: {
    currentlyPlaying () {
      this.updateNotification()
    }
  }
}
</script>

<style>
</style>
