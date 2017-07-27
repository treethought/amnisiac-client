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
          // UserProfile will be rendered inside User's <router-view>
          // when /user/:id/profile is matched
          path: 'listen',
          component: load('feed/Listen')
        },
        {
          // UserPosts will be rendered inside User's <router-view>
          // when /user/:id/posts is matched
          path: 'favorites',
          component: load('user/Favorites')
        },
        {
          // UserPosts will be rendered inside User's <router-view>
          // when /user/:id/posts is matched
          path: 'dashboard',
          component: load('user/Dashboard')
        },
        {
          // UserPosts will be rendered inside User's <router-view>
          // when /user/:id/posts is matched
          path: 'login',
          component: load('user/Login')
        },
        {
          // UserPosts will be rendered inside User's <router-view>
          // when /user/:id/posts is matched
          path: 'register',
          component: load('user/Register')
        }
      ]
    },
    { path: '*', component: load('Error404') } // Not found
  ]
})

// import Vue from 'vue'
// import Router from 'vue-router'
// // import Hello from '@/components/Hello'
// import Home from '@/components/Home'
// import Feed from '@/components/feed/Index'
// import Login from '@/components/Login'
// import Favorites from '@/components/user/Favorites'
// import Dashboard from '@/components/user/Dashboard'

// Vue.use(Router)

// export default new Router({
//   routes: [
//     {
//       path: '/',
//       name: 'Home',
//       component: Home
//     },
//     {
//       path: '/listen',
//       name: 'Listen',
//       component: Feed
//     },
//     {
//       path: '/login',
//       name: 'Login',
//       component: Login
//     },
//     {
//       path: '/favorites',
//       name: 'Favorites',
//       component: Favorites
//     },
//     {
//       path: '/dashboard',
//       name: 'Dashboard',
//       component: Dashboard
//     }
//   ]
// })
