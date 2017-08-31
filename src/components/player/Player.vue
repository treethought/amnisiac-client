<template>

  <q-card v-show='playerVisible' class='bg-secondary text-center'>
  <q-card-title slot='overlay' class='text-primary'>{{currentItem.raw_title}}</q-card-title>
    <q-card-media overlay-position="top">

        <youtube v-model='player' :video-id.sync="currentItem.track_id"
                 @ready="playerReady"
                 @qued='playerReady'
                 @playing="setPlaying"
                 @paused='setPaused'

                 @ended='selectNext'
                 @error='onError'
                 :player-vars="{autoplay: 1, controls: 0, color: 'white', enablejsapi: 1, playsinline: 1, rel: 0, showinfo: 0,
                 widget_referrer: 'www.amnisiac.com'}"
                 player-width='100%'
        ></youtube>
  </q-card-media>
  </q-card>

</template>


<script>
import {mapState, mapMutations, mapActions} from 'vuex'
export default {
  name: 'player',
  data () {
    return {
      player: null,
      time: 0,
      tracker: 0
    }
  },
  created () {
    // responds to events emitted from Control
    this.$root.$on('pause', this.pause)
    this.$root.$on('resume', this.resume)
  },
  destroyed () {
    this.$root.$off('pause')
    this.$root.$off('resume')
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
    currentItem () {
      this.setDuration(parseInt(this.player.getDuration()))
    }
  },
  computed: {
    ...mapState({
      currentItem: state => state.player.currentItem,
      playerVisible: state => state.player.playerVisible,
      targetTime: state => state.player.targetTime,
      trackTime: state => state.player.trackTime
    })
  },
  methods: {
    // commits to sync player status with store
    ...mapMutations('player', [
      'setPlaying', // map `this.increment()` to `this.$store.dispatch('increment')`
      'setPaused',
      'setBuffering', // maybe set as callback for @buffering from player
      'setDuration'
    ]),
    // actions to sync time
    ...mapActions('player', [
      'selectNext',
      'setTime'
    ]),
    playerReady (player) {
      console.log('player ready')
      this.player = player
      this.player.playVideo()
    },
    resume () {
      this.player.playVideo()
    },
    pause () {
      this.player.pauseVideo()
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
    onError () {
      console.log('ERROR')
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
