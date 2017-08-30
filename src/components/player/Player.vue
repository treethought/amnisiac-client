<template>
<div class='player' v-if='currentItem'>

  <q-card v-show='playerVisible' class='bg-secondary text-center'>
  <q-card-title slot='overlay' class='text-primary'>{{currentItem.raw_title}}</q-card-title>
    <q-card-media overlay-position="top">
     
        <youtube v-model='player' :video-id.sync="currentItem.track_id" @ready="playerReady" @playing="playing" @ended='ended'
                 :player-vars="{autoplay: 1, controls: 1, color: 'white', enablejsapi: 1, playsinline: 1, rel: 0, showinfo: 0,
                 widget_referrer: 'www.amnisiac.com'}"
                 class=''
        ></youtube>
  </q-card-media>
  </q-card> 
</div>



</template>


<script>
import {mapState} from 'vuex'
export default {
  name: 'player',
  computed: {
    ...mapState({
      currentItem: state => state.player.currentItem,
      playerVisible: state => state.player.playerVisible,
      targetTime: state => state.player.targetTime
    })
  },
  data () {
    return {
      player: null,
      time: 0,
      tracker: 0
    }
  },
  created () {
    this.$root.$on('previous', this.previous)
    this.$root.$on('pause', this.pause)
    this.$root.$on('resume', this.resume)
  },
  watch: {
    targetTime (newTime) {
      console.log('Detected new target time')
      this.seek(newTime)
    },
    currentItem () {
      if (this.tracker) {
        clearInterval(this.tracker)
      }
    }
  },
  methods: {
    trackTime () {
      this.tracker = setInterval(this.getTime, 100)
    },
    getTime () {
      this.time = parseInt(this.player.getCurrentTime())
      this.$store.dispatch('player/setTime', this.time)
    },
    seek (time) {
      this.player.seekTo(time, true)
    },
    playerReady (player) {
      this.player = player
      this.player.playVideo()
    },
    playing (player) {
      console.log('Video playing')
      this.$store.commit('player/setPlaying', true)
      this.$store.commit('player/setDuration', parseInt(this.player.getDuration()))
      this.trackTime()
    },
    change () {
      // when you change the value, the player will also change.
      // If you would like to change `playerVars`, please change it before you change `videoId`.
      // If `playerVars.autoplay` is 1, `loadVideoById` will be called.
      // If `playerVars.autoplay` is 0, `cueVideoById` will be called.
      // this.videoId = 'another video id'
    },
    resume () {
      this.player.playVideo()
      this.$store.commit('player/setPlaying', true)
      this.trackTime()
    },
    stop () {
      this.player.stopVideo()
      this.$store.commit('player/setPlaying', false)
      clearInterval(this.tracker)
      this.$store.commit('player/setDuration', 0)
    },
    pause () {
      this.player.pauseVideo()
      this.$store.commit('player/setPlaying', false)
      clearInterval(this.tracker)
    },
    ended () {
      this.$store.dispatch('player/next')
      clearInterval(this.tracker)
      this.$store.dispatch('player/setTime', 0)
      this.$store.commit('player/setDuration', 0)
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
  padding-bottom:56.25%;
  /*padding-bottom: 20%;*/
  padding-top:30px;
  height:0;
  overflow:hidden;
}

.video-container iframe, .video-container object, .video-container embed {
  position:absolute;
  top:0;
  left:0;
  width:80%;
  height:80%;


}
</style>
