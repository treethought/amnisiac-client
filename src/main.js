// === DEFAULT / CUSTOM STYLE ===
// WARNING! always comment out ONE of the two require() calls below.
// 1. use next line to activate CUSTOM STYLE (./src/themes)
require(`./themes/app.${__THEME}.styl`)
// 2. or, use next line to activate DEFAULT QUASAR STYLE
// require(`quasar/dist/quasar.${__THEME}.css`)
// ==============================

// Uncomment the following lines if you need IE11/Edge support
// require(`quasar/dist/quasar.ie`)
// require(`quasar/dist/quasar.ie.${__THEME}.css`)

import Vue from 'vue'
import Quasar, {
  QLayout,
  QToolbar,
  QToolbarTitle,
  QSideLink,
  QList,
  QItem,
  QItemMain,
  QItemTile,
  QItemSide,
  QListHeader,
  QBtn,
  QTabs,
  QTab,
  QRouteTab,
  QTabPane,
  QIcon,
  QInnerLoading,
  QCard,
  QCardTitle,
  QCardMain,
  QCardMedia,
  QCardActions,
  QVideo,
  QField,
  QInput,
  QAlert,
  QModal,
  QSlider
}
  from 'quasar' // use this
import router from './router'
// import router from './router/index.js'
import VueYouTubeEmbed from 'vue-youtube-embed'
import VueStash from 'vue-stash'
// import Vuex from 'vuex'

import store from './store'

// import Quasar, * as All from 'quasar' // for quick test

Vue.config.productionTip = false
// Vue.use(Vuex)
Vue.use(Quasar, {
  components: {
    QLayout,
    QToolbar,
    QToolbarTitle,
    QSideLink,
    QList,
    QItem,
    QItemMain,
    QItemTile,
    QItemSide,
    QListHeader,
    QBtn,
    QTabs,
    QTab,
    QRouteTab,
    QTabPane,
    QIcon,
    QInnerLoading,
    QCard,
    QCardTitle,
    QCardMain,
    QCardMedia,
    QCardActions,
    QVideo,
    QField,
    QInput,
    QAlert,
    QModal,
    QSlider
  }
}) // Install Quasar Framework
Vue.use(VueYouTubeEmbed)
Vue.use(VueStash)

if (__THEME === 'mat') {
  require('quasar-extras/roboto-font')
}
import 'quasar-extras/material-icons'
// import 'quasar-extras/ionicons'
import 'quasar-extras/fontawesome'
// import 'quasar-extras/animate'

Quasar.start(() => {
  /* eslint-disable no-new */
  new Vue({
    el: '#q-app',
    data: { store },
    router,
    render: h => h(require('./App'))
  })
})
