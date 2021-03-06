import {http} from '../../api/common.js'

const state = {
  user: null,
  fetchingUser: false
}

const getters = {
  favorites: (state) => {
    if (state.user) {
      return state.user.favorites
    }
  }
}

const mutations = {
  setFetching (state, status) {
    state.fetching = status
  },
  setUser (state, user) {
    state.user = user
  }
}

const actions = {
  fetchUser ({commit, state, dispatch}) {
    if (!state.user) {
      commit('setFetching', true)
    }
    console.log('fetching user')
    return http.get('users')
      .then(response => {
        let user = response.data
        commit('setUser', user)
        commit('setFetching', false)
        console.log('user object set')
      }).catch(error => {
        console.log('Failed to fetch user ' + error)
      })
  },
  addSources ({commit}, {reddit, sc}) {
    console.log('Adding sources ' + reddit + sc)
    return http.post('users/sources', { params: {
      reddit_query: reddit,
      sc_query: sc
    }
    })
      .then(response => {
        commit('setUser', response.data)
        console.log('User sources updated')
      })
      .catch(error => {
        console.log(error)
      })
  },
  removeSource ({commit}, source) {
    console.log('Removing ' + source + 'from user feeds')
    return http.put('users/sources', { params: {
      source: source.name
    }
    })
      .then(response => {
        commit('setUser', response.data)
        console.log('User sources updated')
      })
      .catch(error => {
        console.log(error)
      })
  },
  saveItem ({dispatch}, item) {
    console.log('Saving item to favorites')
    return http.post('users/favorites', {item: item})
      .then(response => {
        console.log('Successfully saved item')
        return dispatch('fetchUser')
      }).catch(error => {
        console.log('error saving favorite ' + error.message)
      })
  },
  removeItem ({dispatch}, item) {
    console.log('Removing item to favorites')
    return http.put('users/favorites', {item: item})
      .then(response => {
        console.log('Successfully removed item')
        return dispatch('fetchUser')
      }).catch(error => {
        console.log('error removing favorite ' + error.message)
      })
  }
}

export default {
  namespaced: true,
  state,
  getters,
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
