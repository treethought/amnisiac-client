<template>
  <!-- <div class='card container bg-tertiary text-white'> -->
  <div>
  <!-- <section> -->

  <q-toolbar-title class='text-center'>
     <section class='text-center'>
    {{currentItem.raw_title}}<br>
    <button type="button" v-on:click.stop="previous">
     <i class="fa fa-backward" aria-hidden="true"></i>
    </button>

    <button v-if='currentlyPlaying' type="button" v-on:click="pause">
     <i class="fa fa-pause" aria-hidden="true"></i>
    </button>
    <button v-else type="button" v-on:click="resume">
     <i class="fa fa-play" aria-hidden="true"></i>
    </button>

    <button type="button" v-on:click.stop="next">
     <i class="fa fa-forward" aria-hidden="true"></i>
    </button>
  </section>
  </q-toolbar-title>
 
<button v-if='!playerVisible'
    class="primary circular fixed-bottom-right z-absolute"
    @click="togglePlayer()" icon='music_video'>Video
</button>
   

</div>
</template>

<script>
export default {
  name: 'control',
  store: ['currentItem', 'currentlyPlaying', 'playerVisible'],
  data () {
    return {}
  },
  methods: {
    previous () {
      this.$root.$emit('previous')
    },
    pause () {
      this.$root.$emit('pause')
    },
    resume () {
      this.$root.$emit('resume')
    },
    next () {
      this.$root.$emit('next')
    },
    togglePlayer () {
      if (this.playerVisible) {
        this.playerVisible = false
      }
      else {
        this.playerVisible = true
      }
    }
  }
}
</script>

<style>
</style>
