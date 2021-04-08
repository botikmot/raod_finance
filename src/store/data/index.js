import mutations from './mutations.js'
import actions from './actions.js'
import getters from './getters.js'

export default {
  state() {
    return {
      api: '',
      offices: [],
      mooe: [],
      ps: [],
      co: [],
      activities: [],
      uacsCodes: [],
      raodData: [],
      unpaid: 0,
      paid: 0,
      searchKey: '',
      transfer: []
    }
  },
  mutations,
  actions,
  getters
}