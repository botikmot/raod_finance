import axios from 'axios'
import { API_URL } from '../../constants'

export default {
  addapi(context, payload){
    localStorage.setItem('raod_api', payload)
    context.commit('setApi', payload)
  },
  tryGetApi(context){
    const dataAPI = localStorage.getItem('raod_api')
    if(dataAPI){
      context.commit('setApi', dataAPI)
    }
  },
  async addData(context, payload){
        await axios.post(`${ API_URL }/raod`, payload).then(response => {
            console.log(response.data.raod)
            const data = response.data.raod
            context.commit('insertData', data)
            const notif = {
              notif: true,
              success: true
            }
            context.dispatch('notification', notif)
        }).catch(error => {
            console.log(error)
        })
    },
  async getData(context){
    await axios.get(`${ API_URL }/raod`).then(response => {
        const data = response.data
        
        let paid = 0
        let unpaid = 0
        for (let index = 0; index < data.length; index++) {
            if(data[index].status === 'paid'){
                paid = paid + data[index].obligation
            }else if(data[index].status === 'unpaid'){
                unpaid = unpaid + data[index].obligation
            }     
        }
        context.commit('setData', data)
        context.commit('setPaid', paid)  
        context.commit('setUnpaid', unpaid)   
    }).catch(error => {
        console.log(error)
    })
  },
  async addUacs(context, payload){
    await axios.post(`${ API_URL }/uacscode`, payload).then(response => {
      console.log(response)
      const notif = {
        notif: true,
        success: true
      }
      context.dispatch('notification', notif)
    }).catch(error => {
      console.log(error)
    })
  },
  async office(context, payload){
    await axios.post(`${ API_URL }/offices`, payload).then(response => {
      console.log(response)
      const notif = {
        notif: true,
        success: true
      }
      context.dispatch('notification', notif)
    }).catch(error => {
      console.log(error)
    }) 
  },
  /*async getTransfer(context, payload){
    await axios.post(`${ API_URL }/fundtransfer/${ payload.aclass }/${ payload.pap_id }`).then(response => {
      console.log(response)
      context.dispatch('notification', true)
    }).catch(error => {
      console.log(error)
    }) 
  },*/
  async addMooe(context, payload){
    await axios.post(`${ API_URL }/mooe`, payload).then(response => {
      console.log(response)
      const notif = {
        notif: true,
        success: true
      }
      context.dispatch('notification', notif)
    }).catch(error => {
      console.log(error)
    }) 
  },
  async addCo(context, payload){
    await axios.post(`${ API_URL }/co`, payload).then(response => {
      console.log(response)
      const notif = {
        notif: true,
        success: true
      }
      context.dispatch('notification', notif)
    }).catch(error => {
      console.log(error)
    }) 
  },
  async addPs(context, payload){
    await axios.post(`${ API_URL }/ps`, payload).then(response => {
      console.log(response)
      const notif = {
        notif: true,
        success: true
      }
      context.dispatch('notification', notif)
    }).catch(error => {
      console.log(error)
    }) 
  },
  async fundTransfer(context, payload){
    await axios.post(`${ API_URL }/transfer`, payload).then(response => {
      console.log(response)
      const data = response.data.fundtransfer
      const notif = {
        notif: true,
        success: true,
        message: 'Fund transfered successfully..'
      }
      context.dispatch('notification', notif)
      context.commit('setTransferData' , data)
    }).catch(error => {
      console.log(error)
    }) 
  },
  async getTransfer(context,payload){
    await axios.get(`${ API_URL }/transfer/${payload}`).then(response => {
        const data = response.data
        context.commit('setTransfer' , data)
    }).catch(error => {
        console.log(error)
    })
  },
  async activity(context, payload){
    await axios.post(`${ API_URL }/activity`, payload).then(response => {
      console.log(response)
      const notif = {
        notif: true,
        success: true
      }
      context.dispatch('notification', notif)
    }).catch(error => {
      console.log(error)
    }) 
  },
  
  async getOffices(context){
    await axios.get(`${ API_URL }/offices`).then(response => {
        const data = response.data
        context.commit('setOffices' , data)
    }).catch(error => {
        console.log(error)
    })
  },
  async getMooe(context, payload){
    await axios.get(`${ API_URL }/mooetransfer/${payload}`).then(response => {
        //console.log(response.data.transfer)
        const data = response.data.transfer
        context.commit('setMooe' , data)
    }).catch(error => {
        console.log(error)
    })
  },
  async getPs(context, payload){
    console.log(payload)
    await axios.get(`${ API_URL }/pstransfer/${payload}`).then(response => {
        const data = response.data.transfer
        context.commit('setPs' , data)
    }).catch(error => {
        console.log(error)
    })
  },
  async getCo(context,payload){
    await axios.get(`${ API_URL }/cotransfer/${payload}`).then(response => {
        const data = response.data.transfer
        context.commit('setCo' , data)
    }).catch(error => {
        console.log(error)
    })
  },
  async getFundTransfer(context,payload){
    await axios.get(`${ API_URL }/transfer/${payload}`).then(response => {
        const data = response.data
        console.log(response)
        context.commit('setFundTransfer' , data)
    }).catch(error => {
        console.log(error)
    })
  },
  async getActivities(context){
    await axios.get(`${ API_URL }/activity`).then(response => {
        const data = response.data
        context.commit('setActivity' , data)
    }).catch(error => {
        console.log(error)
    })
  },
  async getUacsCode(context){
    await axios.get(`${ API_URL }/uacscode`).then(response => {
        const data = response.data
        context.commit('setUacsCode' , data)
    }).catch(error => {
        console.log(error)
    })
  },
 
  async updateData(context, payload){
    await axios.put(`${ API_URL }/raod/${payload.id}`,payload).then(response => {
      const data = response.data.raod
      const notif = {
        notif: true,
        success: true
      }
      context.dispatch('notification', notif)
      context.commit('setUpdatedData' , data)
    }).catch(error => {
        console.log(error)
    })
  },
  async updateTransfer(context, payload){
    await axios.put(`${ API_URL }/transfer/${payload.id}`,payload).then(response => {
      const data = response.data.fundtransfer
      console.log(data)
      const notif = {
        notif: true,
        success: true
      }
      context.dispatch('notification', notif)
      context.commit('setUpdatedTransfer' , data)
    }).catch(error => {
        console.log(error)
    })
  },
  async deleteData(context, payload){
    await axios.delete(`${ API_URL }/raod/${payload}`).then(response =>{
      console.log(response)
      context.commit('setDeletedData' , payload)
    }).catch(error => {
      console.log(error)
    })
  },
  async deleteTransfer(context, payload){
    await axios.delete(`${ API_URL }/transfer/${payload}`).then(response =>{
      console.log(response)
      context.commit('setDeletedTransfer' , payload)
    }).catch(error => {
      console.log(error)
    })
  },
  async adminUpdate(context, payload) {
    await axios.put(`${ API_URL }/${payload.field}/${payload.id}`,payload).then(response => {
      console.log(response)
      const notif = {
        notif: true,
        success: true
      }
      context.dispatch('notification', notif)
    }).catch(error => {
        console.log(error)
    })
  },
  async adminDelete(context, payload) {
    await axios.delete(`${ API_URL }/${payload.field}/${payload.id}`).then(response => {
      console.log(response)
      const notif = {
        notif: true,
        success: true
      }
      context.dispatch('notification', notif)
    }).catch(error => {
        console.log(error)
    })
  },

}