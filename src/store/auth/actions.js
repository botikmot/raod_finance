import axios from 'axios'
import { API_URL } from '../../constants'
import router from '../../router'

export default {
  async login(context, payload) {
    await axios.post(`${ API_URL }/login`, payload).then(response => {
      const data = response.data.success
      let url = response.data.success.level === 0 ? '/user' : '/admin'

      localStorage.setItem('dataToken', JSON.stringify(data))

      context.commit('setUser', data)
      const notif = {
        notif: true,
        success: true
      }
      context.dispatch('notification', notif)
      router.replace(url)
    }).catch(error => {
      const notif = {
        notif: true,
        success: false
      }
      context.dispatch('notification', notif)
      console.log(error)
    })
  },
  logout(context) {
    localStorage.removeItem('dataToken')
    const data = {
      name: null,
      isAdmin: null,
      token: null
    }
   context.commit('setUser', data)
  },
  tryLogin(context) {
    const dataToken = JSON.parse(localStorage.getItem('dataToken'))
    if(dataToken){
        const data = {
          id: dataToken.id,
          name: dataToken.name,
          level: dataToken.level,
          token: dataToken.token
        }
        context.commit('setUser', data)
    }
  },
  async signup(context,payload) {
    await axios.post(`${ API_URL }/register`, payload).then(response => {
      console.log(response)
      context.dispatch('notification', true)
    }).catch(error => {
      console.log(error)
    })
  },
  async getUsers(context) {
    await axios.get(`${ API_URL }/users`).then(response => {
      //console.log(response.data)
      const data = response.data
      context.commit('usersList', data)
    }).catch(error => {
      console.log(error)
    })
  }
}