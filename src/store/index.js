import Vue from 'vue' // used for Vue.set if state holds any objects
import Vuex from 'vuex'
import auth from './modules/auth'
import player from './modules/player'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  strict: debug,
  modules: {
    auth,
    player
  }
})
