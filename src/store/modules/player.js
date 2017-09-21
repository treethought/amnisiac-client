
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
  setPlaying (state, duration) {
    if (duration) {
      console.log('change duration from ' + state.currentDuration + ' to ' + duration)
      state.currentDuration = duration
    }
    console.log('setting playing')
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
    // console.log('setting time to ' + time)
    state.currentTime = time
  },
  setDuration (state, duration) {
    console.log('change duration from ' + state.currentDuration + ' to ' + duration)
    state.currentDuration = duration
  },
  seekTime (state, time) {
    console.log('seeking')
    state.targetTime = time
  },
  toggleMiniPlayer (state) {
    console.log('toggling miniplayer')
    let newStatus = !state.miniPlayerActive
    state.miniPlayerActive = newStatus
  },
  restartTime (state) {
    console.log('Refreshing time info')
    console.log('change time from ' + state.currentTime + ' to 0')
    console.log('change duration from ' + state.currentDuration + ' to 1')
    state.trackTime = false
    state.currentlyPlaying = false
    state.currentTime = 0
    state.currentDuration = 1
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
