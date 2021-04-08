<template>
  <div class="container">
    <base-card>
      <div class="row px-3">
          Dashboard
      </div>
      <hr/>
      <div class="row">
        <div class="col-6">
          <div class="d-flex justify-content-between">
            <span>{{ toggleAct === 'Add' ? 'Add New Data' : toggleAct === 'Edit' ? 'Edit Data' : 'Delete Data' }}</span>
            <span>
              <button @click="toggleAction('Add')" class="btn btn-outline-success btn-sm" data-toggle="tooltip" data-placement="bottom" title="Add New Data">
                <i class="fa fa-plus"></i>
              </button>
              <button @click="toggleAction('Edit')" class="btn btn-outline-info btn-sm mx-2" data-toggle="tooltip" data-placement="bottom" title="Update Data">
                <i class="fa fa-wrench" aria-hidden="true"></i>
              </button>
              <button @click="toggleAction('Delete')" class="btn btn-outline-danger btn-sm ml-2" data-toggle="tooltip" data-placement="bottom" title="Delete Data">
                <i class="fa fa-trash" aria-hidden="true"></i>
              </button>
            </span>
          </div>
          <hr/>
          <div v-if="toggleAct === 'Add'">
              <div class="form-group">
                <select class="form-select" v-model="dataField" @change="registerData">
                    <option v-for="data in datas" :key="data" >{{ data }}</option>
                </select>
              </div>
              <div v-if="dataField === 'User'">
                  <div class="form-group py-2">
                    <input type="text" placeholder="Name" class="form-control" v-model.trim="name"/>
                      <!--<small id="serial-number-help" class="form-text text-muted">Error.</small>-->
                  </div>
                  <div class="form-group pb-2">
                    <input type="text" placeholder="Username" class="form-control" v-model.trim="username"/>
                      <!--<small id="serial-number-help" class="form-text text-muted">Error.</small>-->
                  </div>
                  <div class="form-group">
                    <input type="password" placeholder="Password" class="form-control" v-model.trim="password"/>
                      <!--<small id="serial-number-help" class="form-text text-muted">Error.</small>-->
                  </div>
              </div>
              <div v-else-if="dataField === 'UACSCode'">
                <div class="form-group py-2">
                  <input type="text" placeholder="Code" class="form-control" v-model.trim="code"/>
                      <!--<small id="serial-number-help" class="form-text text-muted">Error.</small>-->
                </div>
                <div class="form-group">
                  <input type="text" placeholder="Description" class="form-control" v-model.trim="codeDesc"/>
                      <!--<small id="serial-number-help" class="form-text text-muted">Error.</small>-->
                </div>
              </div>
              <div v-else-if="dataField === 'Allotment Class'">
                <div class="form-group py-2">
                  <select class="form-select" v-model="allClass">
                    <option v-for="data in aClass" :key="data" >{{ data }}</option>
                  </select>
                </div>
                <div class="form-group pb-2">
                  <input 
                    type="text" 
                    placeholder="Title" 
                    class="form-control" 
                    v-model.trim="aTitle"
                    :disabled="allClass ===''"  
                  />
                </div>
                <div class="form-group pb-2">
                  <select class="form-select" v-model="year" :disabled="allClass ===''">
                    <option v-for="num in yrItems" :key="num" >{{ num }}</option>
                  </select>
                </div>
                <div class="form-group">
                  <input 
                    type="number" 
                    placeholder="Amount" 
                    class="form-control" 
                    v-model.trim="aAmount"
                    :disabled="allClass ===''"
                  />
                </div>
              </div>
              <div v-else-if="dataField === 'Activity'" >

                <div class="form-group py-2">
                  <select class="form-select" v-model="allClass" @change="upClass">
                      <option v-for="data in aClass" :key="data">{{ data }}</option>
                  </select>
                </div>
                <div class="form-group py-2">
                  <select class="form-select" v-model="actKey" @change="editChange">
                      <option v-for="data in actionData" :key="data" :value="{ id: data.id, text: data.name, amount: data.amount }" >{{ data.year ? data.name + ' - ' + data.amount : data.name }}</option>
                  </select>
                </div>
                <div class="form-group py-2">
                  <input type="text" placeholder="Name" class="form-control" v-model.trim="activityname"/>
                </div>
                <div class="form-group py-2">
                  <input type="number" placeholder="Amount" class="form-control" v-model.trim="activityamount"/>
                </div>

              </div>
              <div v-else>
                <div class="form-group py-2">
                  <input :type="getType" :placeholder="getPlaceholder" class="form-control" v-model.trim="title"/>
                      <!--<small id="serial-number-help" class="form-text text-muted">Error.</small>-->
                </div>
              </div>
              <hr/>
              <small v-if="getNotify" id="serial-number-help" class="form-text text-success pb-3">
                  Successfully saved.
              </small>
              <small v-if="!isValidInput" id="serial-number-help" class="form-text text-danger pb-3">
                  Fields cannot be empty.
              </small>
              <div class="form-group d-flex justify-right">
                <button type="button" @click="submitForm" class="btn btn-success">Save</button>
              </div>

          </div>
          <div v-if="toggleAct === 'Edit'">
             <div class="form-group">
                <select class="form-select" v-model="actField" @change="actData">
                    <option v-for="data in actdatas" :key="data" >{{ data }}</option>
                </select>
              </div>
               <div class="form-group py-2" v-if="actField === 'Allotment Class'">
                <select class="form-select" v-model="allClass" @change="upClass">
                    <option v-for="data in aClass" :key="data">{{ data }}</option>
                </select>
              </div>
              <div class="form-group py-2">
                <select class="form-select" v-model="actKey" @change="editChange">
                    <option v-for="data in actionData" :key="data" :value="{ id: data.id, text: data.name, amount: data.amount }" >{{ data.year ? data.name + ' - ' + data.year : data.name }}</option>
                </select>
              </div>
              <div class="form-group pb-2" v-if="actField === 'Allotment Class'">
                <input type="number" placeholder="amount" class="form-control" v-model="amountValue"/>
              </div>
              <div class="form-group">
                <input :type="actField !== 'Allotment Balance'? 'text' : 'number'" placeholder="New Value" class="form-control" v-model="newValue"/>
              </div>
              <hr/>
              <small v-if="getNotify" id="serial-number-help" class="form-text text-success pb-3">
                  Updated successfully, please reload the page.
              </small>
              <small v-if="!isValidInput" id="serial-number-help" class="form-text text-danger pb-3">
                  Fields cannot be empty.
              </small>
              <div class="form-group d-flex justify-right">
                <button type="button" @click="updateForm" class="btn btn-info">Update</button>
              </div>
          </div>
          <div v-if="toggleAct === 'Delete'">
              <div class="form-group pb-2">
                <select class="form-select" v-model="actField" @change="actData">
                    <option v-for="data in datas" :key="data" >{{ data }}</option>
                </select>
              </div>
              <div class="form-group pb-2" v-if="actField === 'Allotment Class'">
                <select class="form-select" v-model="allClass" @change="upClass">
                    <option v-for="data in aClass" :key="data">{{ data }}</option>
                </select>
              </div>
              <div class="form-group pb-2">
                <select class="form-select" v-model="actKey">
                    <option v-for="data in actionData" :key="data" :value="{ id: data.id, text: data.name }" >{{ data.year ? data.name + ' - ' + data.year : data.name }}</option>
                </select>
              </div>
              <hr/>
              <small v-if="getNotify" id="serial-number-help" class="form-text text-success pb-3">
                  Deleted successfully, please reload the page.
              </small>
              <small v-if="!isValidInput" id="serial-number-help" class="form-text text-danger pb-3">
                  Fields cannot be empty.
              </small>
              <div class="form-group d-flex justify-right">
                <button type="button" @click="showModal = true" class="btn btn-danger">Delete</button>
              </div>
          </div>

        </div>

        <div class="col-6">
          <div class="row pb-3">
            <div class="col-6">
              <span>MOOE:</span>
            </div>
            <div class="col-6">
              <span>{{ formatNumber(totalMooe.toFixed(2)) }}</span>
            </div>
          </div>
          <div class="row pb-3">
            <div class="col-6">
              <span>PS:</span>
            </div>
            <div class="col-6">
              <span>{{ formatNumber(totalPs.toFixed(2)) }}</span>
            </div>
          </div>
          <div class="row pb-3">
            <div class="col-6">
              <span>CO:</span>
            </div>
            <div class="col-6">
              <span>{{ formatNumber(totalCo.toFixed(2)) }}</span>
            </div>
          </div>
          <div class="row pb-3">
            <div class="col-6">
              <span>Payables:</span>
            </div>
            <div class="col-6">
              <span>{{ formatNumber(totalPayables.toFixed(2)) }}</span>
            </div>
          </div>
          <div class="row pb-3">
            <div class="col-6">
              <span>Records:</span>
            </div>
            <div class="col-6">
              <span>{{ raodData.length.toLocaleString() }}</span>
            </div>
          </div>
        </div>
      </div>
    </base-card>
  </div>
  <div v-if="showModal">
    <div id="modal">
        <div class="text-center">
            Are you sure you want to delete this data?
        </div>
        <div class="form-group pt-3 d-flex justify-content-between">
              <button type="button" @click="hide" class="btn btn-light">Cancel</button>
              <button type="button" @click="deleteForm" class="btn btn-danger">Delete</button>
        </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      showModal: false,
      name: '',
      username: '',
      password: '',
      dataField: 'User',
      actField: 'Office',
      deleteField: 'User',
      codeDesc: '',
      code: '',
      title: null,
      validInput: true,
      dataKey: '',
      aClass: ['PS', 'MOOE', 'CO'],
      yrItems: ['2020','2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030'],
      datas: [
          'User',
          'Office',
          'Allotment Class',
          'Activity',
          'UACSCode',
      ],
      actdatas: [
          'Office',
          'Allotment Class',
          'Activity',
          'UACSCode',
      ],
      toggleAct: 'Add',
      actionData: this.offices,
      newValue: '',
      amountValue: 0,
      actKey: '',
      fieldkey: '',
      allClass: '',
      aTitle: '',
      aAmount: '',
      year: '2021',
      activityname: '',
      activityamount: 0
    }
  },
  created() {
    let d = new Date();
    let n = d.getFullYear();
    this.$store.dispatch('getUsers')
    this.$store.dispatch('getOffices')
    this.$store.dispatch('getMooe', n)
    this.$store.dispatch('getPs', n)
    this.$store.dispatch('getCo', n)
    this.$store.dispatch('getActivities')
    this.$store.dispatch('getUacsCode')
  },
  computed: {
    users(){
      return this.$store.getters.getUsers
    },
    isValidInput(){
        return this.validInput
    },
    getNotify(){
        return this.$store.getters.getNotify
    }, 
    getType(){
       return this.dataField === 'Allotment Balance' ? 'number' : 'text'
    },
    getPlaceholder() {
       return this.dataField === 'Allotment Balance' ? 'Balance' : 'Name/Title'
    },
    paid(){
      return this.$store.getters.paid
    },
    unpaid(){
      return this.$store.getters.unpaid
    },
    raodData(){
      return this.$store.getters.raodData
    },
    offices(){
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
    activities() {
      return this.$store.getters.activities
    },
    uacscode() {
      return this.$store.getters.uacsCodes
    },
    totalMooe() {
      let total = 0
      for (let index = 0; index < this.mooe.length; index++) {
        total = total + parseFloat(this.mooe[index].amount)
      }
      return total
    },
    totalPs() {
      let total = 0
      for (let index = 0; index < this.ps.length; index++) {
        total = total + parseFloat(this.ps[index].amount)
      }
      return total
    },
    totalCo() {
      let total = 0
      for (let index = 0; index < this.co.length; index++) {
        total = total + parseFloat(this.co[index].amount)
      }
      return total
    },
    totalPayables() {
      let newdate = new Date()
      let cyear = newdate.getFullYear()
      let total = 0
      let n = 0
      let ndis = null
      for (let index = 0; index < this.raodData.length; index++) {
        let year = this.raodData[index].date.split('-')[0];
        if(cyear > year && this.raodData[index].disbursement <= this.raodData[index].obligation){
          if(this.raodData[index].disbursement === null){
            ndis = 0
          }else{
            ndis = this.raodData[index].disbursement
          }
          n = parseFloat(this.raodData[index].obligation) - parseFloat(ndis)
          total = total + n
        }
      }
      return total
    }
  },
  methods: {
    formatNumber (num) {
      return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
    },
    show() {
       this.showModal = true
    },
    hide(){
       this.showModal = false
    },
    registerData(){
        this.validInput = true
        this.title = null
    },
    editChange() {
       this.newValue = this.actKey.text
       this.amountValue = this.actKey.amount
    },
    upClass() {
      if(this.allClass === 'MOOE'){
        this.actionData = this.mooe
        this.fieldkey = 'mooe'
      }else if(this.allClass === 'PS'){
        this.actionData = this.ps
        this.fieldkey = 'ps'
      }else if(this.allClass === 'CO'){
        this.actionData = this.co
        this.fieldkey = 'co'
      }
    },
    actData() {
      //console.log(this.editField)
      this.validInput = true
      this.newValue = ''
      this.actKey = ''
      this.actionData = []
      if(this.actField === 'User'){
        this.fieldkey = 'deluser'
        this.actionData = this.users
      }else if(this.actField === 'Office') {
        this.fieldkey = 'offices'
        this.actionData = this.offices
        for (let index = 0; index < this.actionData.length; index++) {
            this.actionData[index].name = this.offices[index].division 
        }
      }else if(this.actField === 'Activity'){
        this.fieldkey = 'activity'
        this.actionData = this.activities
      }else if(this.actField === 'UACSCode'){
        this.fieldkey = 'uacscode'
        this.actionData = this.uacscode
        for (let index = 0; index < this.actionData.length; index++) {
            this.actionData[index].name = this.uacscode[index].code 
        }
      }
    },
    toggleAction(action) {
        this.validInput = true
        this.toggleAct = action
    },
    updateForm() {
            
      if(this.newValue === '' || this.newValue === null){
        this.validInput = false
        return
      }

      const data = {
        id: this.actKey.id,
        field: this.fieldkey,
        division: this.newValue,
        name: this.newValue,
        code: this.newValue,
        amount: this.amountValue
      }
      console.log(data)
      this.$store.dispatch('adminUpdate', data)
      this.newValue = null
    },
    deleteForm() {
      this.showModal = false
      if(this.actKey === '' || this.actKey === null){
        this.validInput = false
        return
      }
      const data = {
        id: this.actKey.id,
        field: this.fieldkey
      }
      console.log(data)
      console.log(this.actKey.id + ' - ' + this.actKey.text + ' ' + this.fieldkey)
      this.$store.dispatch('adminDelete', data)
    },
    submitForm(){
        let d = new Date();
        let year = d.getFullYear();
        this.validInput = true
        if(this.dataField === 'User'){
            if(this.name === '' || this.username === '' || this.password === ''){
                this.validInput = false
                return
            }
            const data = {
                name: this.name,
                username: this.username,
                password: this.password
            }
            this.validInput = true
            this.$store.dispatch('signup', data)
            
        }else if(this.dataField === 'Activity') {
            if(this.allClass === '' || this.actKey === '' || this.activityname === '' || this.activityamount === 0 || this.activityamount === ''){
               this.validInput = false
               return
            }else{
              const data = {
                name: this.activityname,
                allotclass: this.allClass,
                pap_id: this.actKey.id,
                pap_name: this.actKey.text,
                amount: this.activityamount,
                year: year
              }
              //console.log(data)
              this.$store.dispatch('activity', data)
            }
        }else if(this.dataField === 'UACSCode'){
            if(this.code === '' || this.codeDesc === ''){
               this.validInput = false
               return 
            }
            const data = {
                code: this.code,
                name: this.codeDesc
            }
            this.validInput = true
            this.$store.dispatch('addUacs', data)
        }else if(this.dataField === 'Allotment Class') {
            if(this.allClass === '' || this.aTitle === '' || this.aAmount === ''){
              this.validInput = false
              return
            }
            let dKey = ''
            if(this.allClass === 'MOOE'){
              dKey = 'addMooe'
            }else if(this.allClass === 'PS'){
              dKey = 'addPs'
            }else {
              dKey = 'addCo'
            }
            const details = {
                    name: this.aTitle,
                    year: this.year,
                    amount: this.aAmount
                }
            console.log(details)
            this.$store.dispatch(dKey, details)
        }else {
            if(this.title === '' || this.title === null){
              this.validInput = false
              return
            }

            let data = {}

            if(this.dataField === 'Office'){
                this.dataKey = 'office'
                data = {
                    division: this.title
                }
            }else if(this.dataField === 'PAPs'){
                this.dataKey = 'paps'
                data = {
                    name: this.title
                }
            }else if(this.dataField === 'Activity'){
                this.dataKey = 'activity'
                data = {
                    name: this.title
                }
            }else if(this.dataField === 'Allotment Balance'){
                this.dataKey = 'allotBalance'
                data = {
                    balance: this.title
                }
            }
            this.$store.dispatch(this.dataKey, data)
        }

    }
  }
}
</script>

<style scoped>
::placeholder {
    color: #ced4da;
}
#modal {
  position:fixed;
  left: calc(50% - 100px);
  top: calc(50% - 100px);
  width: 300px;
  height: 150px;
  background:#d8d4d4;
  z-index: 9999;
  padding: 20px;
  border-radius: 5px;
}
</style>