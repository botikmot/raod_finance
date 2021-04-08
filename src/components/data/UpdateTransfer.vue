<template>
  <div v-if="showModal">
    <div id="modal">
      <div class="d-flex justify-content-between">
        <span>Edit</span>
        <span class="close--btn" @click="hide"><i class="fa fa-times"></i></span>
      </div>
      <hr/>
      <div class="row">
        <div class="col-6">
            <div class="form-group">
                <small>Allotment Class</small>
                <select class="form-select" v-model="allotclass" @change="changeClass">
                    <option v-for="allot in allotment" :key="allot">{{ allot }}</option>
                </select>
                </div>
            <div class="form-group">
                <small>MFO/PAP:</small>
                <select class="form-select" v-model="papsid">
                    <option v-for="pap in paps" :key="pap.id" :value="{id: pap.id, name: pap.name}">{{ pap.name }}</option>
                </select>
            </div>
        </div>
        <div class="col-6">
          <div class="form-group">
             <small class="form-text pl-1">Office</small>
            <input type="text" placeholder="Name" class="form-control" v-model="office"/>
          </div>
          <div class="form-group">
            <small class="form-text pl-1">Amount</small>
            <input type="number" placeholder="Amount" class="form-control" v-model="amount"/>
          </div>
        
          <div class="form-group pt-3 d-flex justify-content-between">
              <button type="button" @click="hide" class="btn btn-light">Cancel</button>
              <button type="button" @click="update" class="btn btn-success">Update</button>
          </div>
        </div>
      </div>
    </div> 
  </div>
</template>

<script>
 export default {
   props: ['data', 'mfopap'],
   data() {
     return {
        showModal: false,
        allotclass: this.data.allotclass,
        papsid: this.mfopap,
        office: this.data.office,
        amount: this.data.amount,
        allotment: ['PS', 'MOOE', 'CO'],
        //loading: false,
        balance: 0,
     }
   },
   watch: {
     getNotify(){
       this.showModal = false
     }
   },
   computed: {
    getNotify() {
        return this.$store.getters.getNotify
    },
    mooe() {
      return this.$store.getters.mooe
    },
    ps() {
      return this.$store.getters.ps
    },
    co() {
      return this.$store.getters.co
    },
    paps(){
      return this.allotclass === 'MOOE' ? this.mooe : this.allotclass === 'PS' ? this.ps : this.co
    }
   },
   methods: {
     show() {
      this.showModal = true
     },
     hide(){
      this.showModal = false
     },
     update(){
        //this.loading = true
        //this.errors = []
        const data = {
          id: this.data.id,
          allotclass: this.allotclass,
          pap_id: this.papsid.id,
          pap_name: this.papsid.name,
          office: this.office,
          amount: this.amount
        }
        console.log(data)
        this.$store.dispatch('updateTransfer', data)
     }
   }
 }
</script>

<style scoped>
#modal {
  position:fixed;
  left: calc(30% - 100px);
  top: calc(25% - 100px);
  width: 800px;
  height: 275px;
  background:#d8d4d4;
  z-index: 9999;
  padding: 20px;
  border-radius: 5px;
}
.close--btn:hover {
  cursor: pointer;
}
</style>