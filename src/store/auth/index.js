import mutations from './mutations.js'
import actions from './actions.js'
import getters from './getters.js'

export default {
  state() {
    return {
      user_id: null,
      name: null,
      isAdmin: null,
      token: null,
      users: []
    }
  },
  mutations,
  actions,
  getters
}