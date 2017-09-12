
const state = {
  // states for navigating tracks
  selectedSource: 'all',
  currentPlaylist: [],
  currentIdx: 0,
  currentItem: null,

  // states for controlling/tracking time
  currentTime: 0,
  targetTime: 0,
  currentDuration: null,
  trackTime: false,

  // states for syncing player status
  currentlyPlaying: false,
  buffering: false,
  playerVisible: false
}

// const getters = {
//   nextItem: (state) => {
//     let idx = state.currentIdx + 1
//     return state.currentPlaylist[idx]
//   },
//   previousItem: (state) => {
//     let idx = state.currentIdx - 1
//     return state.currentPlaylist[idx]
//   }
// }

const mutations = {
  setSelectedSource (state, source) {
    state.selectedSource = source
  },
  setPlaylist (state, items) {
    state.currentPlaylist = items
    state.currentIdx = 0 // reset idx bc new source brings new 'playlist' content
  },
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
  selectItem (state, {item, idx}) {
    state.currentItem = item
    state.currentIdx = idx
    state.currentTime = 0
    state.currentDuration = 1 // placeholder so min != max in slider
    state.seekTime = 0
    console.log('new item, time and duration set to 1')
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
  },
  selectNext ({commit}) {
    let nextIdx = state.currentIdx + 1
    let nextItem = state.currentPlaylist[nextIdx]
    let payload = {item: nextItem, idx: nextIdx}
    commit('selectItem', payload)
  },
  selectPrevious ({commit}) {
    let prevIdx = state.currentIdx - 1
    let prevItem = state.currentPlaylist[prevIdx]
    let payload = {item: prevItem, idx: prevIdx}
    commit('selectItem', payload)
  }
}

export default {
  namespaced: true,
  state,
  // getters,
  mutations,
  actions
}
