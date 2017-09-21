import store from '../../store'
export default {

  sendNotification (title, artist = '', art, playing) {
    MusicControls.create({
      track: title, // optional, default : ''
      artist: artist, // optional, default : ''
      cover: art, // optional, default : nothing
      isPlaying: playing, // optional, default : true
      ticker: 'Now playing "Time is Running Out"'
    }, this.onSuccess, this.onError)

    // Register callback
    MusicControls.subscribe(this.notifyEvents)
    MusicControls.listen()
  },
  onSuccess () {
    console.log('MusicControls created successfully')
  },
  onError (err) {
    console.log('Failed to create musicCronrols')
    console.log(err)
  },
  notifyEvents (action) {
    const message = JSON.parse(action).message
    switch (message) {
      case 'music-controls-next':
        store.dispatch('session/selectNext') // changes currentItem to trigger update
        this.sendNotification()
        break
      case 'music-controls-previous':
        store.dispatch('session/selectPrevious') // changes currentItem to trigger update
        this.sendNotification()
        break
      case 'music-controls-pause':
        store.commit('player/setPaused')
        this.sendNotification()
        break
      case 'music-controls-play':
        store.commit('player/setPlaying')
        this.sendNotification()
        break
      case 'music-controls-destroy':
        // todo
        break

      // External controls (iOS only)
      case 'music-controls-toggle-play-pause' :
        // Do something
        break
      case 'music-controls-seek-to':
        const seekToInSeconds = JSON.parse(action).position
        MusicControls.updateElapsed({
          elapsed: seekToInSeconds,
          isPlaying: true
        })
        store.commit('player/seekTime', seekToInSeconds)
        // Do something
        break

      // Headset events (Android only)
      // All media button events are listed below
      case 'music-controls-media-button' :
        // Do something
        console.log('Media button pressed')
        break
      case 'music-controls-headset-unplugged':
        // Do something
        break
      case 'music-controls-headset-plugged':
        // Do something
        break
      default:
        break
    }
  }
}
