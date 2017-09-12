import { LocalStorage } from 'quasar'
import {http, httpRefresh} from '../../api/common.js'
import router from '../../router'

const state = {
  authenticated: !!LocalStorage.get.item('access_token'),
  token: LocalStorage.get.item('access_token'),
  refresh_token: LocalStorage.get.item('refresh_token'),
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
    console.log('logging in')
    return http.post('auth/login', creds)
      .then(response => {
        LocalStorage.set('access_token', response.data.access_token)
        LocalStorage.set('refresh_token', response.data.refresh_token)
        commit('setToken', response.data.access_token)
        commit('setAuthenticated', true)
        console.log('authroized and tokens set')
      })
      .catch(error => {
        // context.commit('setAuthenticated', false)
        console.log('Auth failed ' + error.message)
      })
  },
  refresh ({commit, dispatch}) {
    console.log('reshreshing token')
    return httpRefresh.post('auth/refresh')
      .then(response => {
        LocalStorage.set('access_token', response.data.access_token)
        commit('setToken', response.data.access_token)
        commit('setAuthenticated', true)
        console.log('tokens refreshed, about to fetch user')
        return dispatch('fetchUser')
      })
      .catch(error => {
        console.log('Failed to refresh tokens ' + error.message)
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
        console.log('Auth failed ' + error.message)
      })
  },
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
        console.log('Failed to fetch user ' + error.message)
        if (state.refresh_token) {
          console.log('about to refresh')
          return dispatch('refresh')
        }
        else {
          console.log('No refresh token, so must login')
          return dispatch('logout').then(router.push('login'))
        }
      })
  },
  login ({dispatch}, creds) {
    return dispatch('authorize', creds).then(() => {
      dispatch('fetchUser').then(router.push('favorites'))
    })
  },
  register ({dispatch}, creds) {
    return dispatch('createUser', creds).then(() => {
      dispatch('fetchUser').then(router.push('manage'))
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
