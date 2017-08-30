
const state = {
  selectedSource: 'all',
  currentPlaylist: [],
  currentItem: null,
  currentlyPlaying: false,
  playerVisible: false,
  currentIdx: 0,
  currentTime: 0,
  targetTime: 0,
  currentDuration: null
}

const getters = {
  nextItem: (state) => {
    let idx = state.currentIdx + 1
    return state.currentPlaylist[idx]
  },
  previousItem: (state) => {
    let idx = state.currentIdx - 1
    return state.currentPlaylist[idx]
  }
}

const mutations = {
  setSelectedSource (state, source) {
    state.selectedSource = source
  },
  setPlaying (state, status) {
    state.currentlyPlaying = status
  },
  setPlayerVisible (state, status) {
    state.playerVisible = status
  },
  selectItem (state, {item, idx}) {
    state.currentItem = item
    state.currentIdx = idx
    state.currentTime = 0
    state.currentDuration = 0
    state.seekTime = 0
    console.log('new item, time and duration set to 0')
  },
  setPlaylist (state, items) {
    state.currentPlaylist = items
    state.currentIdx = 0 // reset idx bc new source brings new 'playlist'
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
  setTime ({commit}, time) {
    commit('setTime', time)
  },
  setDuration ({commit}, duration) {
    commit('setDuration', duration)
  },
  next ({commit}) {
    let nextIdx = state.currentIdx + 1
    let nextItem = state.currentPlaylist[nextIdx]
    let payload = {item: nextItem, idx: nextIdx}
    commit('selectItem', payload)
  },
  previous ({commit}) {
    let prevIdx = state.currentIdx - 1
    let prevItem = state.currentPlaylist[prevIdx]
    let payload = {item: prevItem, idx: prevIdx}
    commit('selectItem', payload)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
