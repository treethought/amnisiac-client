<template>
<div v-if='currentItem' class="container">


<div class='player container col-md-8 col-md-offset-2'>
 <section>
    <div class='video-container card-content'>
      <youtube :video-id="currentItem.track_id" @ready="ready" @playing="playing" @ended='next' :player-vars="{autoplay: 1}"></youtube>
    </div>
  </section>
 <hr>
</div>

<control></control>


</div>

</template>


<script>
  import Control from './Control'
  export default {
    name: 'player',
    props: ['items'],
    store: ['currentItem', 'currentlyPlaying'],
    components: {
      Control
    },
    data () {
      return {
        // videoId: this.currentItem.track_id,
        firstItem: this.items[0],
        // currentItem: null,
        currentIdx: null,
        // currentlyPlaying: false,
        player: null
      }
    },
    created () {
      this.$root.$on('select-item', this.loadItem)
      this.$root.$on('previous', this.previous)
      this.$root.$on('pause', this.pause)
      this.$root.$on('resume', this.resume)
      this.$root.$on('next', this.next)
      // this.$root.$on('feed-ready', this.setFirstItem)
      // console.log('items as player prop is ' + this.items)
    },
    methods: {
      loadItem (item, idx) {
        console.log('Loading item ' + idx)
        this.currentItem = item
        this.currentIdx = idx
        this.$root.$emit('item-loaded', item, idx)
      },
      setFirstItem (item) {
        this.firstItem = item
      },
      ready (player) {
        this.player = player
        this.player.playVideo()
      },
      playing (player) {
        // player is palying video
        console.log('Video playing')
        this.currentlyPlaying = true
      },
      change () {
        // when you change the value, the player will also change.
        // If you would like to change `playerVars`, please change it before you change `videoId`.
        // If `playerVars.autoplay` is 1, `loadVideoById` will be called.
        // If `playerVars.autoplay` is 0, `cueVideoById` will be called.
        // this.videoId = 'another video id'
      },
      startFeed () {
        this.loadItem(this.firstItem, 0)
      },
      resume () {
        this.player.playVideo()
        this.currentlyPlaying = true
      },
      stop () {
        this.player.stopVideo()
        this.currentlyPlaying = false
      },
      pause () {
        this.player.pauseVideo()
        this.currentlyPlaying = false
      },
      next () {
        console.log('Ended video ' + this.currentIdx)
        let nextIdx = this.currentIdx + 1
        let nextItem = this.items[nextIdx]
        this.loadItem(nextItem, nextIdx)
        console.log('Loaded video ' + nextIdx)
      },
      previous () {
        let prevIdx = this.currentIdx - 1
        let prevItem = this.items[prevIdx]
        this.loadItem(prevItem, prevIdx)
        console.log('Playing previous item: ' + this.currentIdx)
      }
    }
  }
</script>

<style>
  .video-container {
  position:relative;
  padding-bottom:56.25%;
  padding-top:30px;
  height:0;
  overflow:hidden;
}

.video-container iframe, .video-container object, .video-container embed {
  position:absolute;
  top:0;
  left:0;
  width:100%;
  height:100%;
}
</style>
