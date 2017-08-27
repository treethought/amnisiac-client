<template>

  <!-- <div> -->

   <q-toolbar class="justify-center" :padding="1">

  <q-toolbar-title class='text-center z-absolute'>
    {{currentItem.raw_title}}<br>

    <q-btn flat round v-on:click.stop="previous">
      <q-icon name="skip_previous" />
    </q-btn>  

    <q-btn v-if='currentlyPlaying' flat round v-on:click="pause">
      <q-icon name="pause" />
    </q-btn> 

    <q-btn v-else flat round v-on:click="resume">
      <q-icon name="play_arrow" />
    </q-btn> 

    <q-btn flat round v-on:click.stop="next">
      <q-icon name="skip_next" />
    </q-btn> 

  </q-toolbar-title>

  <q-btn
    round
    color="primary"
    @click="togglePlayer()"
    class="fixed"
    style="right: 18px; bottom: 18px"
  >
  <q-icon name="music_video" />
</q-btn>

</q-toolbar>
 
<!-- <button v-if='!playerVisible'
    class="primary circular fixed-bottom-right z-absolute"
    @click="togglePlayer()" icon='music_video'><i>music_video</i>
</button>
    -->

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
