<template>
  <form>
    <div class="row">
      <div class="col-6">
        <div class="form-group">
          <input 
            type="text"
            v-model.trim="serial" 
            placeholder="Serial Number" 
            class="form-control"
          />
            <!--<small id="serial-number-help" class="form-text text-muted">Error.</small>-->
        </div>
        <div class="form-group">
           <small class="form-text pl-1">Office</small>
          <select class="form-select" v-model="office">
            <option v-for="office in offices" :key="office.id">{{ office.division }}</option>
          </select>
            <!--<small id="serial-number-help" class="form-text text-muted">Error.</small>-->
        </div>
        <div class="form-group">
           <small class="form-text pl-1">Allotment Class</small>
          <select class="form-select" v-model="aClass" @change="changeClass">
            <option v-for="allot in allotclass" :key="allot">{{ allot }}</option>
          </select>
            <!--<small id="serial-number-help" class="form-text text-muted">Error.</small>-->
        </div>
        <div class="form-group">
           <small class="form-text pl-1">PAP's</small>
          <select class="form-select" v-model="papsid" @change="papAmount">
            <option v-for="pap in paps" :key="pap.id" :value="{ id: pap.id, text: pap.name, amount: pap.available_amount }">{{ pap.name }}</option>
          </select>
            <!--<small id="serial-number-help" class="form-text text-muted">Error.</small>-->
        </div>
        <div class="form-group">
          <small class="form-text pl-1">Activity</small>
          <select class="form-select" v-model="act">
            <option v-for="activity in dataAct" :key="activity.id">{{ activity.name }}</option>
          </select>
            <!--<small id="serial-number-help" class="form-text text-muted">Error.</small>-->
        </div>
        <div class="form-group">
           <small class="form-text pl-1">UACS Code/Expenditure</small>
          <select class="form-select" v-model="uacs">
            <option v-for="uac in uacscode" :key="uac.id">{{ uac.code }}</option>
          </select>
            <!--<small id="serial-number-help" class="form-text text-muted">Error.</small>-->
        </div>
      </div>   
      <div class="col-6">
        <div class="form-group">
          <input type="text" placeholder="Name" class="form-control" v-model="name"/>
            <!--<small id="serial-number-help" class="form-text text-muted">Error.</small>-->
        </div>
        <div class="form-group">
          <small class="form-text pl-1">Particulars</small>
          <textarea class="form-control" rows="3" v-model="particulars" ></textarea>
            <!--<small id="serial-number-help" class="form-text text-muted">Error.</small>-->
        </div>
        <div class="form-group">
          <div class="d-flex justify-content-between">
            <small class="form-text pl-1">Obligation</small>
            <small class="form-text pl-1 text-success">{{ amount.toLocaleString() }}</small>
          </div>
          <input 
            type="number" 
            @keyup="watchObligate" 
            class="form-control" 
            v-model="obligation"
            :disabled="amount <= 0"
          />
        </div>
        <div class="form-group">
          <small class="form-text pl-1">Disbursement</small>
          <input type="number" @keyup="watchDisburse" class="form-control" v-model="disbursement" :disabled="amount <= 0"/>
            <!--<small id="serial-number-help" class="form-text text-muted">Error.</small>-->
        </div>
        
        <hr />
        <small v-for="err in errors" :key="err" class="form-text text-danger">You must enter {{ err }}. | </small>
        <div class="form-group pt-3 d-flex justify-content-between">
            <button type="button" @click="cancel" class="btn btn-light">Cancel</button>
            <button type="button" :disabled="loading" @click="submit" class="btn btn-success">{{ loading ? 'Saving..' : 'Save' }}</button>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  props: ['date'],
  data(){
    return {
      office: '',
      serial: '',
      aClass: '',
      allotclass: ['PS','MOOE','CO'],
      papsid: '',
      paps: [],
      act: '',
      uacs: '',
      name: '',
      particulars: '',
      obligation: null,
      disbursement: null,
      status: '',
      validInput: true,
      errors: [],
      amount: 0,
      fieldkey: '',
      loading: false,
      serialkey: '',
      dataAct: []
    }
  },
   watch: {
     getNotify(){
        if(!this.getNotify){
          this.$router.replace('/user')
          this.loading = false
        }
     }
   },
  computed: {
    raodData(){
      return this.$store.getters.raodData
    },
    getNotify(){
        return this.$store.getters.getNotify
    }, 
    getSuccess(){
        return this.$store.getters.getSuccess
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
    offices() {
      return this.$store.getters.offices
    },
    activities() {
      return this.$store.getters.activities
    },
    uacscode() {
      return this.$store.getters.uacsCodes
    },
    getAmount() {
      let d = new Date();
      let n = d.getFullYear();
      let total = 0
      for (let index = 0; index < this.raodData.length; index++) {
        let year = this.raodData[index].date.split('-')[0]
        
        if(this.raodData[index].allotclass === this.aClass && this.raodData[index].pap === this.papsid.text && year == n){
          total = parseFloat(total) + parseFloat(this.raodData[index].obligation)
          console.log(total)
        }
      }
      return total
    }
  },
  methods: {
    watchObligate(){
      if(parseFloat(this.obligation) > parseFloat(this.amount)){
        this.obligation = this.amount
      }
    },
    watchDisburse() {
      if(parseFloat(this.disbursement) > parseFloat(this.obligation)){
        this.disbursement = this.obligation
      }
    },
    papAmount() {
      this.amount = parseFloat(this.papsid.amount) - parseFloat(this.getAmount)
      this.dataAct = []
      for (let index = 0; index < this.activities.length; index++) {
          if(this.activities[index].allotclass === this.aClass && this.papsid.id === this.activities[index].pap_id) {
              this.dataAct.push(this.activities[index])
          }
      }

    },
    changeClass() {

      let temp_serial = this.serial
      
      if(this.aClass === 'MOOE'){
        this.paps = this.mooe
        this.serialkey = '02-1-101101' 
        this.fieldkey = 'mooe'
      }else if(this.aClass === 'PS'){
        this.paps = this.ps
        this.serialkey = '01-1-101101'
        this.fieldkey = 'ps'
      }else if(this.aClass === 'CO'){
        this.paps = this.co
        this.serialkey = '06-1-101101'
        this.fieldkey = 'co'
      }

      if(this.serial !== ''){
        let n = this.serial.length
        if(n > 12){
          let s = this.serial.slice(12, n)
          this.serial = this.serialkey + '-' + s
        }else if(n !== ''){
          this.serial = this.serialkey + '-' + temp_serial
        }else {
          this.serial = this.serialkey
        }
      }else{
        this.serial = this.serialkey
      }
      

    },
    submit(){
      this.loading = true
      this.errors = []
      const data = {
        date: this.date,
        user_id: this.$store.getters.getUserId,
        serial: this.serial,
        office: this.office,
        allotclass: this.aClass,
        pap: this.papsid.text,
        activity: this.act,
        uacscode: this.uacs,
        name: this.name,
        particular: this.particulars,
        obligation: this.obligation,
        disbursement: this.disbursement,
        status: this.status
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
      
      this.validInput = true
      this.$store.dispatch('addData', data)
      /*const amountValue = parseFloat(this.amount) - parseFloat(this.obligation)
      const updata = {
        id: this.papsid.id,
        field: this.fieldkey,
        amount: amountValue
      }
      console.log(updata)
      this.$store.dispatch('adminUpdate', updata)*/
    },
    cancel(){
      this.$router.push('/user')
    }
  }
}
</script>

<style scoped>
::placeholder {
    color: #ced4da;
}
</style>