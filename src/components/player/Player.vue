<template>
<div class='player' v-if='currentItem'>

  <q-card v-show='playerVisible' class='bg-secondary text-center '>
  <q-card-title slot='overlay' class='text-primary'>{{currentItem.raw_title}}</q-card-title>
    <q-card-media overlay-position="top">
     
        <youtube v-model='player' :video-id.sync="currentItem.track_id" @ready="playerReady" @playing="playing"
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
  // props: ['items'],
  computed: {
    ...mapState({
      currentItem: state => state.player.currentItem,
      playerVisible: state => state.player.playerVisible
    })
  },
  data () {
    return {
      player: null
    }
  },
  created () {
    this.$root.$on('previous', this.previous)
    this.$root.$on('pause', this.pause)
    this.$root.$on('resume', this.resume)
  },
  methods: {
    playerReady (player) {
      this.player = player
      this.player.playVideo()
    },
    playing (player) {
      console.log('Video playing')
      this.$store.commit('player/setPlaying', true)
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
    },
    stop () {
      this.player.stopVideo()
      this.$store.commit('player/setPlaying', false)
    },
    pause () {
      this.player.pauseVideo()
      this.$store.commit('player/setPlaying', false)
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
