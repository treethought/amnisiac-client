<template>

  <q-card class='bg-black text-center' v-show='playerVisible' v-bind:class="{'fixed-top': underLayVideo}"> 
      <q-card-actions align='end'><q-btn flat disable /></q-card-actions>


    <img class='responsive' :src="croppedArt">
    <div class="row text-center">
    <q-card flat color='primary' class='col-md-8 offset-md-2'>
    <img id='waveform' class='fit' :src='currentItem.waveform_url'>
  </q-card>
  </div>


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
import SC from 'soundcloud'
export default {
  name: 'soundcloud-player',
  data () {
    return {
      time: 0,
      tracker: 0,
      underLayVideo: false,
      player: null
    }
  },
  created () {
    console.log('Creating SC player')
    SC.initialize({
      client_id: this.ScClientId
    })
    this.startPlayer()
  },
  destroyed () {
    console.log('Destroying soundcloud player')
    this.player.kill()
  },
  watch: {
    targetTime (newTime) {
      console.log('Detected new target time')
      this.seek(newTime)
    },
    currentlyPlaying (isPlaying) {
      if (isPlaying) {
        this.player.play()
      }
      else {
        this.player.pause()
      }
    },
    currentItem () { // new item selected/played
      if (this.currentItem.source === 'sc') {
        this.startPlayer()
      }
      else {
        this.player.kill()
      }
    }
  },
  computed: {
    ...mapState({
      currentItem: state => state.session.currentItem,
      playerVisible: state => state.player.playerVisible,
      targetTime: state => state.player.targetTime,
      trackTime: state => state.player.trackTime,
      currentTime: state => state.player.currentTime,
      currentlyPlaying: state => state.player.currentlyPlaying,
      ScClientId: state => state.auth.ScClientId
    }),
    trackStreamUrl () {
      return '/tracks/' + this.currentItem.track_id
    },
    croppedArt () {
      return this.currentItem.artwork_url.replace('large', 't500x500')
    }
  },
  methods: {
    // commits to sync player status with store
    ...mapMutations('player', [
      'setPlaying', // map `this.increment()` to `this.$store.dispatch('increment')`
      'setPaused',
      'setBuffering', // maybe set as callback for @buffering from player
      'setDuration',
      'togglePlayer',
      'setTime'
    ]),
    ...mapActions('session', [
      'selectNext'
    ]),
    startPlayer () {
      if (this.player) {
        this.player.kill()
      }
      let path = '/tracks/' + this.currentItem.track_id
      let self = this
      SC.stream(path).then(function (player) {
        player.on('time', self.timeFromPlayer)
        player.on('state-change', self.onStateChange)
        self.player = player
        self.player.play()
      })
    },
    onStateChange (state) {
      console.log('SC STATE: ' + state)
      if (state === 'playing') {
        let duration = parseInt(this.currentItem.duration / 1000)
        this.setPlaying(duration)
      }
      else if (state === 'paused') {
        this.setPaused()
      }
      else if (state === 'loading') {
        this.setBuffering()
      }
      else if (state === 'ended') {
        this.player.kill()
        this.selectNext()
      }
    },
    timeFromPlayer (time) {
      let seconds = parseInt(time / 1000)
      if (seconds !== this.currentTime) {
        this.setTime(seconds)
      }
    },
    seek (seconds) {
      let ms = seconds * 1000
      this.player.seek(ms)
    },
    onError () {
      console.log('ERROR')
    }

  }
}
</script>

<style>
#waveform {
 /*filter: saturate(100) hue-rotate(241.5deg);*/
 
/* -webkit-filter: grayscale(100%);  Safari 
  filter: grayscale(100%);
*/  -webkit-filter: invert(1);
 filter: invert(1);
}
</style>
