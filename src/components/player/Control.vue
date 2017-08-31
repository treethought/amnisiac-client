<template>

  <q-toolbar  class="justify-center" :padding="1">
    <q-inner-loading dark :visible='buffering'>
      <q-spinner-bars size="60px" color="primary" />
    </q-inner-loading>

  <q-toolbar-title  class='text-center col-6 relative-position'>

    {{currentItem.raw_title}}<br>

      <div class="group text-center">
  
        <q-btn flat  v-on:click.stop="previous">
          <q-icon name="skip_previous" color='primary' />
        </q-btn>  

        <q-btn v-if='currentlyPlaying' flat  v-on:click="pause">
          <q-icon name="pause" color='primary' />
        </q-btn> 

        <q-btn v-else flat  v-on:click="resume">
          <q-icon name="play_arrow" color='primary' />
        </q-btn> 

        <q-btn flat v-on:click.stop="next">
          <q-icon name="skip_next" color='primary' />
        </q-btn><br>
      </div>

      <div class='relative-position'>
        <q-slider :disable='currentDuration < currentTime' :value='currentTime' @change='seekTime' label :min='0' :max='currentDuration'></q-slider>
      </div>
     

    </q-toolbar-title>



 
  

  <q-btn
    round
    color="primary"
    @click="togglePlayer()"
    class="fixed"
    style="right: 18px; bottom: 18px">

    <q-icon name="music_video" />
  </q-btn>


</q-toolbar>
 


</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'control',
  // store: ['currentItem', 'currentlyPlaying', 'playerVisible'],
  computed: {
    ...mapState({
      currentlyPlaying: state => state.player.currentlyPlaying,
      buffering: state => state.player.buffering,
      currentItem: state => state.player.currentItem,
      playerVisible: state => state.player.playerVisible,
      currentTime: state => state.player.currentTime,
      currentDuration: state => state.player.currentDuration
    })
  },
  methods: {
    seekTime (newTime) {
      console.log('seeking to time')
      this.$store.commit('player/seekTime', newTime)
    },
    previous () {
      this.$store.dispatch('player/previous')
    },
    pause () {
      this.$root.$emit('pause')
    },
    resume () {
      this.$root.$emit('resume')
    },
    next () {
      this.$store.dispatch('player/next')
    },
    togglePlayer () {
      let status = !this.playerVisible
      this.$store.commit('player/setPlayerVisible', status)
    }
  }
}
</script>

<style>
</style>
