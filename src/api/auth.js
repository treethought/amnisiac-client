// import router from '../router/index.js'
import {http} from './common.js'
import { LocalStorage } from 'quasar'
// import api from './api.js'
// import {Bus} from '../event-bus.js'

// const LOGIN_URL = process.env.BASE_URL + '/api/auth'
// const SIGNUP_URL = process.env.API_URL + 'api/users'

export default {

  login (context, creds) {
    console.log('requesting jwt')
    return http.post('auth', creds)
      .then(response => {
        console.log(response)
        LocalStorage.set('access_token', response.data.access_token)
        LocalStorage.set('refresh_token', response.data.refresh_token)
        context.$store.authenticated = true
        console.log('User was authenticated')
      })
      .catch(error => {
        console.log('Failed to authenticate user')
        context.error = error.message
        context.$store.authenticated = false
      })
  },
  register (context, creds) {
    console.log('Registering user')
    return http.post('register', creds)
      .then(response => {
        console.log(response)
        LocalStorage.set('access_token', response.data.access_token)
        LocalStorage.set('refresh_token', response.data.refresh_token)
        context.$store.authenticated = true
        console.log('User was created and authenticated')
      })
      .catch(error => {
        console.log('Failed to register user')
        context.error = error
        context.$store.authenticated = false
      })
  },
  refresh (retry, redirect) {
    console.log('reshreshing token')
    http.post('refresh', {
      headers: {
        Authorization: 'Bearer ' + LocalStorage.get.item('refresh_token')
      }})
      .then(response => {
        LocalStorage.set('access_token', response.data.access_token)
        retry()
      })
  },
  logout (context) {
    console.log('Logging out user')
    LocalStorage.remove('access_token')
    console.log('token is now ' + LocalStorage.get.item('access_token'))
    context.$store.authenticated = false
    context.$store.user = null
  },
  checkAuth () {
    console.log('Auth status: ' + !!LocalStorage.get.item('access_token'))
    return !!LocalStorage.get.item('access_token')
  },
  // The object to be passed as a header for authenticated requests
  getAuthHeader () {
    var tokenString = 'Bearer ' + LocalStorage.get.item('access_token')
    let head = {
      Authorization: 'Bearer ' + LocalStorage.get.item('access_token')
    }
    console.log('HEADER IS')
    console.log(head)
    return tokenString
  }
}
