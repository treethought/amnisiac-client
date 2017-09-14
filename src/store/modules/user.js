import {http} from '../../api/common.js'
// const state = {
//   user
// }

const getters = {
  favorites: (state) => {
    if (state.user) {
      return state.user.favorites
    }
  }
}

const actions = {
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
  // state,
  getters,
  // mutations,
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
