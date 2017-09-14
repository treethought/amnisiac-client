
const state = {
  // states for controlling/tracking time
  currentTime: 0,
  targetTime: 0,
  currentDuration: null,
  trackTime: false,

  // states for syncing player status
  currentlyPlaying: false,
  buffering: false,
  playerVisible: false,

  miniPlayerActive: false
}

const mutations = {
  setPlayerVisible (state, status) {
    state.playerVisible = status
  },
  togglePlayer (state) {
    let newStatus = !state.playerVisible
    state.playerVisible = newStatus
  },
  setPlaying (state, player) {
    console.log('setting playing')
    state.currentDuration = parseInt(player.getDuration()) // metadata loaded after video beings playing
    state.currentlyPlaying = true
    state.buffering = false
    state.trackTime = true
  },
  setPaused (state) {
    console.log('setting paused')
    state.currentlyPlaying = false
    state.buffering = false
    state.trackTime = false
  },
  setBuffering (state) {
    console.log('setting buffering')
    // state.currentlyPlaying = false
    state.buffering = true
    state.trackTime = false
  },
  setTime (state, time) {
    state.currentTime = time
  },
  setDuration (state, duration) {
    state.currentDuration = duration
    console.log('duration set to ' + duration)
  },
  seekTime (state, time) {
    state.targetTime = time
  },
  toggleMiniPlayer (state) {
    console.log('toggling miniplayer')
    let newStatus = !state.miniPlayerActive
    state.miniPlayerActive = newStatus
  }
}

const actions = {
  // time mutations need to be async bc constant changing
  seekTime ({commit}, time) {
    commit('seekTime', time)
  },
  setTime ({commit}, time) {
    commit('setTime', time)
  },
  setDuration ({commit}, duration) {
    commit('setDuration', duration)
  }
}

export default {
  namespaced: true,
  state,
  // getters,
  mutations,
  actions
}
