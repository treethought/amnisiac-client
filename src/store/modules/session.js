import {http} from '../../api/common.js'
// const state = {
//   user
// }

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
    state.selectedSource = source
  },
  setPlaylist (state, items) {
    state.currentPlaylist = items
    state.currentIdx = 0 // reset idx bc new source brings new 'playlist' content
  },
  selectItem (state, {item, idx}) {
    state.currentItem = item
    state.currentIdx = idx

    state.currentTime = 0
    state.currentDuration = 1 // placeholder so min != max in slider
    // state.seekTime = 0
    console.log('new item, time and duration set to 1')
  }
}

const actions = {
  // move next and previous to mutations?
  selectNext ({commit, state}) {
    let nextIdx = state.currentIdx + 1
    let nextItem = state.currentPlaylist[nextIdx]
    let payload = {item: nextItem, idx: nextIdx}
    commit('selectItem', payload)
  },
  selectPrevious ({commit, state}) {
    let prevIdx = state.currentIdx - 1
    let prevItem = state.currentPlaylist[prevIdx]
    let payload = {item: prevItem, idx: prevIdx}
    commit('selectItem', payload)
  },
  fetchItems ({commit}, reddit, sc) {
    console.log('Fetching items with query')

    let searchParams = {
      reddit_query: reddit,
      sc_query: sc
    }

    return http.get('reddit/search', { params: searchParams })
      .then(response => {
        console.log(response.status + ' ' + response.statusText)
        commit('setPlaylist', response.data)
      })
      .catch(error => {
        console.log('error fetching items ' + error.message)
      })
  },
  saveItem ({dispatch}, item) {
    console.log('Saving item to favorites')
    return http.post('users/favorites', {item: item})
      .then(response => {
        console.log('Successfully saved item')
        return dispatch('auth/fetchUser', null, { root: true })
      }).catch(error => {
        console.log('error saving favorite ' + error.message)
      })
  },
  removeItem ({dispatch}, item) {
    console.log('Removing item to favorites')
    return http.put('users/favorites', {item: item})
      .then(response => {
        console.log('Successfully removed item')
        return dispatch('auth/fetchUser', null, { root: true })
      }).catch(error => {
        console.log('error removing favorite ' + error.message)
      })
  }
}

export default {
  namespaced: true,
  state,
  // getters,
  mutations,
  actions
}
// const actions = {
//   addSources ({commit}, {reddit, sc}) {
//     console.log('Adding sources ' + reddit + sc)
//     return http.post('users/sources', { params: {
//     reddit_query: reddit,
//     sc_query: sc
//     }
//     })
//     .then(response => {
//         commit('setUser', response.data)
//         console.log('User sources updated')
//     })
//     .catch(error => {
//         console.log(error)
//     })
//   },
//   removeSource ({commit}, source) {
//     console.log(source)
//     console.log('Removing ' + source + 'from user feeds')
//     return http.put('users/sources', { params: {
//     source: source.name
//     }
//     })
//     .then(response => {
//         commit('setUser', response.data)
//         console.log('User sources updated')
//     })
//     .catch(error => {
//         console.log(error)
//     })
//   }
// }
