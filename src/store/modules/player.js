
const state = {
  selectedSource: 'all',
  currentPlaylist: [],
  currentItem: null,
  currentlyPlaying: false,
  playerVisible: false,
  currentIdx: 0
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
  },
  setPlaylist (state, items) {
    state.currentPlaylist = items
  }
}

const actions = {
  next ({commit}) {

  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
