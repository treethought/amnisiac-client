import {http} from '../../api/common.js'

const state = {
  redditQuery: [],
  scQuery: [],
  selectedSource: 'all',
  currentPlaylist: [],
  currentIdx: 0,
  currentItem: null
}

const mutations = {
  setRedditQuery (state, subreddits) {
    state.redditQuery = subreddits.join('+')
  },
  setScQuery (state, users) {
    state.scQuery = users.join('+')
  },
  setSelectedSource (state, source) {
    console.log('selected source is now ' + source)
    state.selectedSource = source
  },
  setPlaylist (state, items) {
    console.log('setting new playlist')
    state.currentPlaylist = items
    state.currentIdx = 0 // reset idx bc new source brings new 'playlist' content
  },
  selectItem (state, {item, idx}) {
    state.currentItem = item
    state.currentIdx = idx
  }
}

const actions = {
  // move next and previous to mutations?
  selectNext ({commit, state}) {
    console.log('Selecting next item')
    let nextIdx = state.currentIdx + 1
    let nextItem = state.currentPlaylist[nextIdx]
    let payload = {item: nextItem, idx: nextIdx}
    commit('player/restartTime', null, { root: true })
    commit('selectItem', payload)
  },
  selectPrevious ({commit, state}) {
    console.log('Selecting previous item')
    let prevIdx = state.currentIdx - 1
    let prevItem = state.currentPlaylist[prevIdx]
    let payload = {item: prevItem, idx: prevIdx}
    commit('player/restartTime', null, { root: true })
    commit('selectItem', payload)
  },
  fetchItems ({commit}, {reddit, sc}) {
    console.log('Fetching items with query')
    console.log('sc - ' + sc)
    console.log('reddit - ' + reddit)

    let searchParams = {
      reddit_query: reddit,
      sc_query: sc
    }

    return http.get('platforms/search', { params: searchParams })
      .then(response => {
        console.log(response.status + ' ' + response.statusText)
        commit('setPlaylist', response.data)
      })
      .catch(error => {
        console.log('error fetching items ' + error.message)
      })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
