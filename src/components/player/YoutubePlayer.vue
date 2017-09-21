<template>

  <q-card class='bg-black text-center' v-show='playerVisible' v-bind:class="{'fixed-top': underLayVideo}"> 
      <q-card-actions align='end'><q-btn flat disable /></q-card-actions>

    <q-card-media overlay-position='top'>
        <youtube v-model='player' :video-id.sync="currentItem.track_id"
                 @ready="onPlayerReady"
                 @playing="onPlaying"
                 @paused='setPaused'

                 @ended='onPlayerFinsish'
                 @error='onError'
                 :player-vars="{autoplay: 1, controls: 0, color: 'white', enablejsapi: 1, playsinline: 1, rel: 0, showinfo: 0,
                 widget_referrer: 'www.amnisiac.com'}"
                 player-width='100%'
        ></youtube>
  </q-card-media>

  <q-card-actions align='end'>
    <q-btn small round

    color="primary"
    @click="togglePlayer"
    icon="close" />
  </q-card-actions>


  </q-card>



</template>


<script>
import {mapState, mapMutations, mapActions} from 'vuex'
export default {
  name: 'youtube-player',
  data () {
    return {
      player: null,
      time: 0,
      tracker: 0,
      underLayVideo: false
    }
  },
  // created () {
  //   console.log('Creating youtube')
  //   this.restartTime()
  // },
  destroyed () {
    console.log('Destroying youtube player')
    clearInterval(this.tracker)
  },
  watch: {
    trackTime (status) {
      if (status) { this.startTracking() }
      else { clearInterval(this.tracker) }
    },
    targetTime (newTime) {
      console.log('Detected new target time')
      this.seek(newTime)
    },
    currentlyPlaying (isPlaying) {
      if (isPlaying) {
        this.player.playVideo()
      }
      else {
        this.player.pauseVideo()
      }
    }
  },
  computed: {
    ...mapState({
      currentItem: state => state.session.currentItem,
      playerVisible: state => state.player.playerVisible,
      targetTime: state => state.player.targetTime,
      trackTime: state => state.player.trackTime,
      currentlyPlaying: state => state.player.currentlyPlaying
    })
  },
  methods: {
    // commits to sync player status with store
    ...mapMutations('player', [
      'setPlaying',
      'setPaused',
      'setBuffering', // maybe set as callback for @buffering from player
      'setDuration',
      'togglePlayer',
      'setTime',
      'restartTime'
    ]),
    ...mapActions('session', [
      'selectNext'
    ]),
    onPlayerReady (player) {
      console.log('player ready')
      this.player = player
      this.player.playVideo()
    },
    onPlayerFinsish () {
      this.selectNext()
    },
    onPlaying (player) {
      this.setPlaying(parseInt(this.player.getDuration()))
    },
    startTracking () {
      this.tracker = setInterval(this.getTime, 100)
    },
    getTime () {
      let time = parseInt(this.player.getCurrentTime())
      this.setTime(time)
    },
    seek (time) {
      this.player.seekTo(time, true)
    },
    onError (error) {
      console.log('ERROR')
      console.log(error)
    }

  }
}
</script>

<style>
  .player {
    padding: 0;
  }

  .video-container {
  position:relative;
  padding-bottom:56.25%; /* 16:9 */
  padding-top:30px;
  height:0;
  overflow:hidden;
}

.video-container iframe, .video-container object, .video-container embed {
  position: absolute;
  top:0;
  left:0;
  width:80%;
  height:80%;

}
</style>
