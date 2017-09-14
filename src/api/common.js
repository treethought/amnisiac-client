import axios from 'axios'
// import auth from './auth.js'
import { LocalStorage } from 'quasar'
import store from '../store'

// The object to be passed as a header for authenticated requests
function getAuthHeader () {
  // console.log('Creating tokenString')
  var tokenString = 'Bearer ' + LocalStorage.get.item('accessToken')
  return tokenString
}

const http = axios.create({
  baseURL: process.env.API_URL
})

// Add a request interceptor
http.interceptors.request.use(function (config) {
  // Do something before request is sent
  config.headers = {Authorization: getAuthHeader()}
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

http.interceptors.response.use((response) => { // intercept the global error
  return response
}, function (error) {
  console.log('Intercepting failed unauthorized resposne')
  let originalRequest = error.config
  if (error.response.status === 401 && !originalRequest._retry) { // if the error is 401 and hasent already been retried
    originalRequest._retry = true // now it can be retried
    console.log('about to refresh and redirect')
    return httpRefresh.post('/auth/refresh', null).then((data) => {
      store.commit('auth/setAccessToken', data.data.access_token)
      store.commit('auth/setAuthenticated', true)
      originalRequest.headers['Authorization'] = getAuthHeader() // new header new token
      return http(originalRequest) // retry the request that errored out
    }).catch((error) => {
      for (let i = 0; i < error.response.data.errors.length; i++) {
        if (error.response.data.errors[i] === 'TOKEN-EXPIRED') {
          console.log('FAILED SHOULD LOG OUT')
          return
        }
      }
    })
  }
  if (error.response.status === 404 && !originalRequest._retry) {
    originalRequest._retry = true
    window.location.href = '/'
    return
  }
  // Do something with response error
  return Promise.reject(error)
})

// For refreshing tokens //
function getRefreshHeader () {
  console.log('Creating refresh header')
  var tokenString = 'Bearer ' + LocalStorage.get.item('refreshToken')
  return tokenString
}

const httpRefresh = axios.create({
  baseURL: process.env.API_URL
})

// Add a request interceptor
httpRefresh.interceptors.request.use(function (config) {
  // Do something before request is sent
  config.headers = {Authorization: getRefreshHeader()}
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

export { http, httpRefresh }
