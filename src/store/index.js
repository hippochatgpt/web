import Vue from 'vue'
import Vuex from 'vuex'

import { logout } from '@api'
import login from '../components/login'

Vue.use(Vuex)

const token = sessionStorage.getItem('token') || ''
export default new Vuex.Store({
  state: {
    mode: 'dark',
    fold: false,
    token: token,
    activeConversation: {}
  },
  mutations: {
    updateMode(state, mode) {
      state.mode = mode
    },
    updateFold(state, fold) {
      state.fold = fold
    },
    updateToken(state, token) {
      state.token = token
    },
    updateActiveConversation(state, activeConversation) {
      state.activeConversation = activeConversation
    }
  },
  actions: {
    logStatus({ state, commit }) {
      if (state.token) {
        logout().then(() => {
          commit('updateToken', '')
          sessionStorage.removeItem('token')
          commit('updateActiveConversation', {})
        })
      } else {
        login()
      }
    }
  }
})
