<template>

  <q-toolbar class="justify-center" :padding="1">

  <q-toolbar-title class='text-center col-6'>

    <!-- <q-inner-loading dark :visible='!currentDuration'>
          <q-spinner-bars size="30px" color="primary" />
      </q-inner-loading> -->

    {{currentItem.raw_title}}<br>


      <div class="group text-center relative-position">
      
  
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

      <div>
        <q-slider :disable='!currentDuration' :value='currentTime' @change='seekTime' :min='0' :max='currentDuration'></q-slider>
      </div>

      <div class='relative-position'>

       <!--  <q-inner-loading dark :visible='!currentDuration'>
          <q-spinner-bars size="30px" color="primary" />
        </q-inner-loading> -->

        <!-- <div v-if="currentDuration"> -->
          {{cleanCurrentTime}} / {{cleanDuration}}
        <!-- </div> -->
      </div>
     

    </q-toolbar-title>


  <q-btn
    color="tertiary"
    @click='togglePlayer()'
    class="fixed-bottom-right"
    style="right: 18px; bottom: 18px">

    <q-icon v-if='playerVisible' name="close" color='primary' />
    <img v-else :src="thumbnailSrc" height='auto' width='70' block>
    <!-- <player height='60' width='60'></player> -->
  </q-btn> 


 </q-toolbar>
 


</template>

<script>
import {mapState, mapActions} from 'vuex'
import Player from './Player'
// import BackToTop from 'quasar'
export default {
  name: 'control',
  components: { Player },
  // directives: { BackToTop },
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
      return 'http://img.youtube.com/vi/' + this.currentItem.track_id + '/0.jpg'
    }
  },
  methods: {
    ...mapActions('player', [
      'seekTime',
      'selectNext',
      'selectPrevious'
    ]),
    pause () {
      this.$root.$emit('pause')
    },
    resume () {
      this.$root.$emit('resume')
    },
    togglePlayer () {
      let status = !this.playerVisible
      this.$store.commit('player/setPlayerVisible', status)
    },
    cleanTime (t) {
      // https://stackoverflow.com/questions/5539028/converting-seconds-into-hhmmss
      t = Number(t)

      var m = Math.floor(t % 3600 / 60)
      var s = Math.floor(t % 3600 % 60)
      return ('0' + m).slice(-2) + ':' + ('0' + s).slice(-2)
    }
  }
}
</script>

<style>
</style>
