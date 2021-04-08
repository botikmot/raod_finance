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
                <small>Serial:</small>
                <input 
                    type="text"
                    v-model.trim="serial" 
                    placeholder="Serial Number" 
                    class="form-control"
                />
                </div>
            <div class="form-group">
                <small>Office:</small>
                <select class="form-control" v-model="office">
                <option v-for="office in offices" :key="office.id">{{ office.division }}</option>
                </select>
            </div>
            <div class="form-group">
                <small class="form-text pl-1">Allotment Class</small>
                <select class="form-control" v-model="allotclass">
                    <option v-for="allot in allotment" :key="allot">{{ allot }}</option>
                </select>
            </div>
            <div class="form-group">
                <small class="form-text pl-1">PAP's</small>
                <select class="form-control" v-model="papsid">
                    <option v-for="pap in paps" :key="pap.id" >{{ pap.name }}</option>
                </select>
            </div>
            <div class="form-group">
                <small class="form-text pl-1">Activity</small>
                <select class="form-control" v-model="act">
                    <option v-for="activity in activities" :key="activity.id">{{ activity.name }}</option>
                </select>
            </div>
            <div class="form-group">
                <small class="form-text pl-1">UACS Code/Expenditure</small>
                <select class="form-control" v-model="uacs">
                    <option v-for="uac in uacscode" :key="uac.id">{{ uac.code }}</option>
                </select>
            </div>
        </div>
        <div class="col-6">
          <div class="form-group">
             <small class="form-text pl-1">Name</small>
            <input type="text" placeholder="Name" class="form-control" v-model="name"/>
          </div>
          <div class="form-group">
            <small class="form-text pl-1">Particulars</small>
            <textarea class="form-control" rows="3" v-model="particulars" ></textarea>
          </div>
          <div class="form-group">
            <div class="d-flex justify-content-between">
              <small class="form-text pl-1">Obligation</small>
            </div>
            <input type="number" class="form-control" v-model="obligation"/>
          </div>
          <div class="form-group">
            <small class="form-text pl-1">Disbursement</small>
            <input type="number" class="form-control" v-model="disbursement"/>
          </div>
          <!--<div class="form-check form-check-inline">
                <input class="form-check-input" v-model="status" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="paid">
                <label class="form-check-label" for="inlineRadio1">Paid</label>
            </div>
            <div class="form-check form-check-inline pl-3">
                <input class="form-check-input" v-model="status" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="unpaid">
                <label class="form-check-label" for="inlineRadio2">Unpaid</label>
            </div>-->
            <hr/>
            <small v-for="err in errors" :key="err" class="form-text text-danger">You must enter {{ err }}.</small>
            <div class="form-group pt-3 d-flex justify-content-between">
              <button type="button" @click="hide" class="btn btn-light">Cancel</button>
              <button type="button" :disabled="loading" @click="update" class="btn btn-success">{{ loading ? 'Updating...' : 'Update' }}</button>
          </div>
        </div>
      </div>
    </div> 
  </div>
</template>

<script>
 export default {
   props: ['data'],
   data() {
     return {
      showModal: false,
      office: this.data.office,
      serial: this.data.serial,
      allotclass: this.data.allotclass,
      papsid: this.data.pap,
      act: this.data.activity,
      uacs: this.data.uacscode,
      name: this.data.name,
      particulars: this.data.particular,
      obligation:this.data.obligation,
      status: this.data.status,
      disbursement: this.data.disbursement,
      errors: [],
      allotment: ['PS', 'MOOE', 'CO'],
      amount: 0,
      loading: false
     }
   },
   watch: {
     getNotify(){
        if(!this.getNotify){
          this.showModal = false
          this.loading = false
        }
     }
   },
   computed: {
    getNotify(){
      return this.$store.getters.getNotify
    },
     offices() {
      return this.$store.getters.offices
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
    },
    activities() {
      return this.$store.getters.activities
    },
    uacscode() {
      return this.$store.getters.uacsCodes
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
        this.loading = true
        this.errors = []
        const data = {
          id: this.data.id,
          serial: this.serial,
          office: this.office,
          allotclass: this.allotclass,
          pap: this.papsid,
          activity: this.act,
          uacscode: this.uacs,
          name: this.name,
          particular: this.particulars,
          obligation: this.obligation,
          disbursement: this.disbursement
        }
        if(this.serial === '' || this.serial === null){
          this.errors.push('a Serial')
        }
        if(this.act === '' || this.act === null){
          this.errors.push('an Activity')
        }
        if(this.uacs === '' || this.uacs === null){
          this.errors.push('a UACS Code')
        }
        if(this.name === '' || this.name === null){
          this.errors.push('a Name')
        }
        if(this.particulars === '' || this.particulars === null){
          this.errors.push('a Particulars')
        }
        if(this.obligation === '' || this.obligation === null){
          this.errors.push('an Obligation')
        }
        if(this.errors.length > 0){
          this.loading = false
          return
        }
        this.$store.dispatch('updateData', data)
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
  height: 530px;
  background:#d8d4d4;
  z-index: 9999;
  padding: 20px;
  border-radius: 5px;
}
.close--btn:hover {
  cursor: pointer;
}
</style>