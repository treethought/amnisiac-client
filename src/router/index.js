import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

function load (component) {
  return () => System.import(`components/${component}.vue`)
}

export default new VueRouter({
  /*
   * NOTE! VueRouter "history" mode DOESN'T works for Cordova builds,
   * it is only to be used only for websites.
   *
   * If you decide to go with "history" mode, please also open /config/index.js
   * and set "build.publicPath" to something other than an empty string.
   * Example: '/' instead of current ''
   *
   * If switching back to default "hash" mode, don't forget to set the
   * build publicPath back to '' so Cordova builds work again.
   */

  routes: [
    { path: '/', component: load('layout') }, // Default,
    { path: '/',
      component: load('layout'),
      children: [
        {
          // UserProfile will be rendered inside User's <router-view>
          // when /user/:id/profile is matched
          path: 'home',
          component: load('Home')
        },
        {
          path: 'listen',
          name: 'Listen',
          component: load('feed/Listen')
        },
        {
          path: 'favorites',
          name: 'Favorites',
          component: load('user/Favorites')
        },
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: load('user/Dashboard')
        },
        {
          path: 'manage',
          name: 'Manage',
          component: load('user/Manage')
        },
        {
          path: 'login',
          name: 'Login',
          component: load('user/Login')
        },
        {
          path: 'register',
          component: load('user/Register')
        }
      ]
    },
    { path: '*', component: load('Error404') } // Not found
  ]
})
