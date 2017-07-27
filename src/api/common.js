import axios from 'axios'
// import auth from './auth.js'

 // The object to be passed as a header for authenticated requests
function getAuthHeader () {
  // var tokenString = 'Bearer ' + window.localStorage.getItem('access_token')
  console.log('Creating tokenString')
  var tokenString = 'Bearer ' + localStorage.getItem('access_token')
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

export { http }
