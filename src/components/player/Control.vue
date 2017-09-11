<template>

<div>

  <q-toolbar class="justify-center no-margin" :padding="1">

    <q-toolbar-title class='text-center'>
        {{currentItem.raw_title}}
        <span slot="subtitle" class='text-white'>
      {{currentItem.subreddit}}
    </span>
    </q-toolbar-title>

  </q-toolbar>



  <q-toolbar class="justify-center fit">
  <q-toolbar-title class='text-center'>
  <div class="group relative-position">
      
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
  </q-toolbar-title>
  </q-toolbar>

   <q-toolbar class="justify-center" :padding="1">
  <q-toolbar-title class='text-center col-6'>
      <div>
        <q-slider :disable='!currentDuration' :value='currentTime' @change='seekTime' :min='0' :max='currentDuration'></q-slider>
      </div>

      <div>
          {{cleanCurrentTime}} / {{cleanDuration}}
      </div>


<q-btn v-if='playerVisible'
        v-back-to-top round
        small
        color="primary"
        icon="keyboard_arrow_up"
        class="fixed-bottom-right"
      style="right: 18px; bottom: 18px" />
   <!--    
    <q-btn round flat v-if='playerVisible'
      v-back-to-top
      color="primary"

      class="fixed-bottom-right"
      style="right: 18px; bottom: 18px">

      <q-icon  name="keyboard_arrow_up" />
    <!-- <img v-else :src="thumbnailSrc" height='auto' width='70' block> -->
    <!-- <player height='60' width='60'></player> -->
  <!-- </q-btn>  -->

  <q-btn v-else
    v-back-to-top.animate="0"
    color="tertiary"
    @click='togglePlayer()'
    class="fixed-bottom-right"
    style="right: 18px; bottom: 18px">
    <img :src="thumbnailSrc" height='auto' width='70' block>
    </q-btn>

 
     
 </q-toolbar-title>
 </q-toolbar>



 </div>


</template>

<script>
import {mapState, mapActions, mapMutations} from 'vuex'
// import Player from './Player'
import {BackToTop} from 'quasar'
export default {
  name: 'control',
  // components: { Player },
  directives: { BackToTop },
  computed: {
    ...mapState({
      currentlyPlaying: state => state.player.currentlyPlaying,
      buffering: state => state.player.buffering,
      currentItem: state => state.player.currentItem,
      playerVisible: state => state.player.playerVisible,
      currentTime: state => state.player.currentTime,
      currentDuration: state => state.player.currentDuration
    }),
    cleanCurrentTime () {
      return this.cleanTime(this.currentTime)
    },
    cleanDuration () {
      return this.cleanTime(this.currentDuration)
    },
    thumbnailSrc () {
      return 'https://img.youtube.com/vi/' + this.currentItem.track_id + '/0.jpg'
    }
  },
  methods: {
    ...mapActions('player', [
      'seekTime',
      'selectNext',
      'selectPrevious'
    ]),
    ...mapMutations('player', [
      'togglePlayer'
    ]),
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
