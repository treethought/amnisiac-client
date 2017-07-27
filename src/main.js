// === DEFAULT / CUSTOM STYLE ===
// WARNING! always comment out ONE of the two require() calls below.
// 1. use next line to activate CUSTOM STYLE (./src/themes)
require(`./themes/app.${__THEME}.styl`)
// 2. or, use next line to activate DEFAULT QUASAR STYLE
// require(`quasar/dist/quasar.${__THEME}.css`)
// ==============================

import Vue from 'vue'
import Quasar from 'quasar'
import router from './router/index.js'
import VueYouTubeEmbed from 'vue-youtube-embed'
import VueStash from 'vue-stash'
import store from './store'

Vue.use(Quasar) // Install Quasar Framework
// Vue.use(BootstrapVue)
Vue.use(VueYouTubeEmbed)
Vue.use(VueStash)

Quasar.start(() => {
  /* eslint-disable no-new */
  new Vue({
    el: '#q-app',
    router,
    data: { store },
    render: h => h(require('./App'))
  })
})
