import { LocalStorage } from 'quasar'
import {http} from '../../api/common.js'
import router from '../../router'

const state = {
  authenticated: !!LocalStorage.get.item('accessToken'),
  token: LocalStorage.get.item('accessToken'),
  refreshToken: LocalStorage.get.item('refreshToken')
}

const mutations = {
  setAuthenticated (state, status) {
    state.authenticated = status
  },
  // tokens is an obj {access_token: ..., refresh_token: ...} from response.data
  setTokens (state, tokens) {
    state.token = tokens.access_token
    state.refreshToken = tokens.refresh_token
    LocalStorage.set('accessToken', tokens.access_token)
    LocalStorage.set('refreshToken', tokens.refresh_token)
  },
  setAccessToken (state, token) {
    state.token = token
    LocalStorage.set('accessToken', token)
  }
}

const actions = {
  authorize ({commit}, creds) {
    console.log('logging in')
    return http.post('auth/login', creds)
      .then(response => {
        commit('setTokens', response.data)
        commit('setAuthenticated', true)
        console.log('authroized and tokens set')
      })
      .catch(error => {
        // context.commit('setAuthenticated', false)
        console.log('Auth failed ' + error.message)
      })
  },
  registerUser ({commit}, creds) {
    return http.post('auth/register', creds)
      .then(response => {
        console.log('setting tokens')
        commit('setTokens', response.data)
        commit('setAuthenticated', true)
      })
      .catch(error => {
        console.log('Auth failed ' + error.message)
      })
  },
  login ({dispatch}, creds) {
    return dispatch('authorize', creds).then(() => {
      dispatch('user/fetchUser', null, { root: true }).then(router.push('favorites'))
    })
  },
  register ({dispatch}, creds) {
    return dispatch('registerUser', creds).then(() => {
      dispatch('user/fetchUser', null, { root: true }).then(router.push('manage'))
    })
  },
  logout ({commit}) {
    LocalStorage.remove('accessToken')
    commit('setAccessToken', null)
    commit('setAuthenticated', false)
    commit('user/setUser', null, { root: true })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
