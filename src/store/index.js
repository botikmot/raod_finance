import { createStore } from 'vuex'
import authModule from './auth/index.js'
import dataModule from './data/index.js'

export default createStore({
  state: {
    notify: false,
    success: null,
    message: '',
  },
  getters: {
    getNotify(state){
      return state.notify
    },
    getSuccess(state){
      return state.success
    },
    getMessage(state){
      return state.message
    }
  },
  mutations: {
    setNotify(state, payload){
      return state.notify = payload
    },
    setSuccess(state, payload){
      return state.success = payload
    },
    setMessage(state, payload){
      return state.success = payload
    }
  },
  actions: {
    notification(context, payload){
      context.commit('setNotify', payload.notif)
      context.commit('setSuccess', payload.success)
      //context.commit('setMessage', payload.message)
      //localStorage.setItem('notifmessage', payload.message)
      setTimeout(function() {
        context.commit('setNotify', false)
      },3000)
    }
  },
  modules: {
    auth: authModule,
    data: dataModule
  }
})
