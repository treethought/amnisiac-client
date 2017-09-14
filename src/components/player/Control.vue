<template>

<div>
<div class='bg-secondary'>
 <q-slider :disable='!currentDuration' :value='currentTime' @change='seekTime' :min='0' :max='currentDuration'></q-slider>
</div>

<!--   <q-toolbar slot='header' class="justify-center no-margin mobile-hide cordova-hide" :padding="1">


    <q-toolbar-title class='text-center'>
        {{currentItem.raw_title}}
        <span slot="subtitle" class='text-white'>
      {{currentItem.subreddit}}
    </span>
    </q-toolbar-title>

  </q-toolbar> -->



<q-toolbar class='row items-start'>


  <q-card-media inline class='col-xs-2 col-md-1 no-margin no-gutter' @click='toTop'>
    <img class='responsive' :srcset="thumbnailSrc">
  </q-card-media>


    <!-- <q-toolbar slot='header' class="justify-center no-margin mobile-hide cordova-hide" :padding="1"> -->


    <q-card flat class='text-center col-xs-0 col-md-3 mobile-hide cordova-hide'>  <!-- New title info replacing old empty space -->
        {{currentItem.raw_title}}<br>
        <span slot="subtitle" class='text-white'>
      {{currentItem.subreddit}}
    </span>
    </q-card flat>

  <!-- </q-toolbar> -->




<!-- <div class='col-xs-0 col-md-3'></div> -->


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

    <q-btn flat  @click="openReddit" class=''>
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
import MiniPlayer from './MiniPlayer'
import Player from './Player'
import {BackToTop, openURL} from 'quasar'
export default {
  name: 'control',
  inject: ['layout'],
  components: { MiniPlayer, Player },
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
      return 'https://img.youtube.com/vi/' + this.currentItem.track_id + '/0.jpg'
    },
    sourceUrl () {
      let base = 'https://reddit.com/'
      return base + this.currentItem.subreddit
    },
    inFavorites: function () {
      return this.user.favorites.some((fav) => {
        return fav.track_id === this.currentItem.track_id
      })
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
      'seekTime'
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
    saveOrRemove () {
      if (this.inFavorites) {
        this.removeItem(this.currentItem)
      }
      else {
        this.saveItem(this.currentItem)
      }
    },
    pause () {
      this.$root.$emit('pause')
    },
    resume () {
      this.$root.$emit('resume')
    },
    cleanTime (t) {
      // https://stackoverflow.com/questions/5539028/converting-seconds-into-hhmmss
      t = Number(t)

      var m = Math.floor(t % 3600 / 60)
      var s = Math.floor(t % 3600 % 60)
      return ('0' + m).slice(-2) + ':' + ('0' + s).slice(-2)
    },
    onSuccess () {
      console.log('MusicControls created successfully')
    },
    onError (err) {
      console.log('Failed to create musicCronrols')
      console.log(err)
    },
    updateNotification () {
      console.log('Creating Music Controls')
      if (this.$q.platform.is.cordova) {
        MusicControls.create({
          track: this.currentItem.raw_title, // optional, default : ''
          // artist: 'Muse', // optional, default : ''
          cover: this.thumbnailSrc, // optional, default : nothing
          isPlaying: this.currentlyPlaying, // optional, default : true
          ticker: 'Now playing "Time is Running Out"'
        }, this.onSuccess, this.onError)

        // Register callback
        MusicControls.subscribe(this.notifyEvents)
        MusicControls.listen()
      }
    },
    notifyEvents (action) {
      const message = JSON.parse(action).message
      switch (message) {
        case 'music-controls-next':
          this.selectNext() // changes currentItem to trigger update
          this.updateNotification()
          break
        case 'music-controls-previous':
          this.selectPrevious() // changes currentItem to trigger update
          this.updateNotification()
          break
        case 'music-controls-pause':
          this.pause()
          this.updateNotification()
          break
        case 'music-controls-play':
          this.resume()
          this.updateNotification()
          break
        case 'music-controls-destroy':
          // todo
          break

        // External controls (iOS only)
        case 'music-controls-toggle-play-pause' :
          // Do something
          break
        case 'music-controls-seek-to':
          const seekToInSeconds = JSON.parse(action).position
          MusicControls.updateElapsed({
            elapsed: seekToInSeconds,
            isPlaying: true
          })
          self.seekTime(seekToInSeconds)
          // Do something
          break

        // Headset events (Android only)
        // All media button events are listed below
        case 'music-controls-media-button' :
          // Do something
          console.log('Media button pressed')
          break
        case 'music-controls-headset-unplugged':
          // Do something
          break
        case 'music-controls-headset-plugged':
          // Do something
          break
        default:
          break
      }
    }
  },
  watch: {
    currentlyPlaying () {
      // console.log('new item')
      this.updateNotification()
    }
  }
}
</script>

<style>
</style>
