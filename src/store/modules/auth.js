import { LocalStorage } from 'quasar'
import {http} from '../../api/common.js'
import router from '../../router'

const state = {
  authenticated: !!LocalStorage.get.item('access_token'),
  token: LocalStorage.get.item('access_token'),
  user: null,
  fetching: false
}

const getters = {
  favorites: (state) => {
    if (state.user) {
      return state.user.favorites
    }
  }
}

const mutations = {
  login (state) {
    state.authPending = true
  },
  setAuthenticated (state, status) {
    state.authenticated = status
  },
  setToken (state, token) {
    state.token = token
  },
  setUser (state, user) {
    state.user = user
  },
  setFetching (state, status) {
    state.fetching = status
  }
}

const actions = {
  authorize ({commit}, creds) {
    return http.post('auth/login', creds)
      .then(response => {
        console.log('setting tokens')
        LocalStorage.set('access_token', response.data.access_token)
        LocalStorage.set('refresh_token', response.data.refresh_token)
        commit('setToken', response.data.access_token)
        commit('setAuthenticated', true)
      })
      .catch(error => {
        // context.commit('setAuthenticated', false)
        console.log('Auth failed')
        console.log(error.message)
      })
  },
  createUser ({commit}, creds) {
    return http.post('auth/register', creds)
      .then(response => {
        console.log('setting tokens')
        LocalStorage.set('access_token', response.data.access_token)
        LocalStorage.set('refresh_token', response.data.refresh_token)
        commit('setToken', response.data.access_token)
        commit('setAuthenticated', true)
      })
      .catch(error => {
        // context.commit('setAuthenticated', false)
        console.log('Auth failed')
        console.log(error.message)
      })
  },
  fetchUser ({commit, state}) {
    if (!state.user) {
      commit('setFetching', true)
    }
    return http.get('users')
      .then(response => {
        let user = response.data
        commit('setUser', user)
        commit('setFetching', false)
        console.log('user object set')
      }).catch(error => {
        console.log(error)
        commit('setFetching', false)
      })
  },
  login ({dispatch}, creds) {
    return dispatch('authorize', creds).then(() => {
      dispatch('fetchUser').then(router.push('favorites'))
    })
  },
  register ({dispatch}, creds) {
    return dispatch('createUser', creds).then(() => {
      dispatch('fetchUser').then(router.push('favorites'))
    })
  },
  logout ({commit}) {
    LocalStorage.remove('access_token')
    commit('setAuthenticated', false)
    commit('setToken', null)
    commit('setUser', null)
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
    console.log(source)
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
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
