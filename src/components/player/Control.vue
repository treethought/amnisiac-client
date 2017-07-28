<template>
  <div class='card container bg-secondary text-white'>
  <!-- <section> -->

   <section class='card-title text-center'>
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
  </section class='card-title'>

</div>
</template>

<script>
export default {
  props: ['currentItem', 'currentlyPlaying'],
  data () {
    return {}
  },
  methods: {
    previous () {
      this.$emit('previous')
    },
    pause () {
      this.$emit('pause')
    },
    resume () {
      this.$emit('resume')
    },
    next () {
      this.$emit('next')
    }
  }
}
</script>

<style>
</style>
