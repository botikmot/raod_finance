export default {
    setOffices(state, payload) {
        state.offices = payload
    },
    setMooe(state, payload) {
        state.mooe = payload
    },
    setPs(state, payload) {
        state.ps = payload
    },
    setCo(state, payload) {
        state.co = payload
    },
    setActivity(state, payload){
        state.activities = payload
    },
    setUacsCode(state, payload){
        state.uacsCodes = payload
    },
    setData(state, payload){
        for (let index = 0; index < payload.length; index++) {
            state.raodData.unshift(payload[index]);    
        }
    },
    insertData(state, payload){
       state.raodData.unshift(payload);    
    },
    setTransfer(state, payload){
       state.transfer = payload
    },
    setTransferData(state, payload) {
        state.transfer.unshift(payload)
    },
    /*setBalance(state, payload){
      state.balance = payload
    },
    setStrBalance(state, payload){
      state.strBalance = payload
    },*/
    setPaid(state, payload){
      state.paid = payload
    },
    setUnpaid(state, payload){
      state.unpaid = payload
    },
    setSearchKey(state, payload){
        state.searchKey = payload
    },
    setUpdatedData(state, payload){
        const index = state.raodData.findIndex(item => item.id === payload.id)
        if (index !== -1){
            state.raodData.splice(index, 1, payload)
        }
    },
    setUpdatedTransfer(state, payload){
        const index = state.transfer.findIndex(item => item.id === payload.id)
        if (index !== -1){
            state.transfer.splice(index, 1, payload)
        }
    },
    setDeletedData(state, payload){
        const index = state.raodData.findIndex(item => item.id === payload)
        if (index !== -1){
            state.raodData.splice(index, 1)
        } 
    },
    setDeletedTransfer(state, payload){
        const index = state.transfer.findIndex(item => item.id === payload)
        if (index !== -1){
            state.transfer.splice(index, 1)
        }
    },

    setApi(state, payload){
        state.api = payload
    }
}