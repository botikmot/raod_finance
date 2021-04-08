<template>
  <div class="container">
    <div class="row">
      <div class="col-6">
          <div class="row">
            <div class="col ps-3 py-3">
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" v-model="type" name="inlineRadioOptions" id="inlineRadio1" value="option1">
                <label class="form-check-label" for="inlineRadio1">COA Required</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" v-model="type" name="inlineRadioOptions" id="inlineRadio2" value="option2">
                <label class="form-check-label" for="inlineRadio2">Obligation</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" v-model="type" name="inlineRadioOptions" id="inlineRadio4" value="option4">
                <label class="form-check-label" for="inlineRadio4">Disbursement</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" v-model="type" name="inlineRadioOptions" id="inlineRadio3" value="option3">
                <label class="form-check-label" for="inlineRadio3">by Activity</label>
              </div>
            </div>
          </div>
              <div class="row">
                <div class="col-5">
                  <small>Recurrence</small>
                  <select class="form-select" v-model="recur" @change="filterData">
                      <option v-for="filtered in recurrence" :key="filtered">{{ filtered }}</option>
                  </select>
                </div>
                <div class="col-7 pt-4">
                    <div class="row">
                        <div v-if="recur !== 'Annual'" class="col-6">
                            <select class="form-select" v-model="timefilter">
                            <option v-for="filtered in recurData" :key="filtered">{{ filtered }}</option>
                            </select>
                        </div>
                        <div class="col-6">
                            <select class="form-select" v-model="year" @change="changeYear">
                            <option v-for="filtered in years" :key="filtered">{{ filtered }}</option>
                            </select>
                        </div>
                    </div>
                </div>
              </div>

          <div v-if="type == 'option3'">
                <div class="col-7">
                  <small>MFO/PAP</small>
                    <select class="form-select" v-model="papReport">
                      <option v-for="pap in distinctArray" :key="pap">{{ pap }}</option>
                    </select>
                </div>
                <div class="col-3 pt-4">
                  <button type="button" @click="submit" class="btn btn-success btn-block">Submit</button>
                </div>
          </div>
         
          <div v-else-if="type == 'option1'">
              <div class="row pt-2">
                <div class="col-5">
                  <small>Allotment Class</small>
                    <select class="form-select" v-model="filter" @change="changeClass">
                      <option v-for="filtered in filters" :key="filtered">{{ filtered }}</option>
                    </select>
                </div>
                <div class="col-7">
                  <small>MFO/PAP</small>
                    <select class="form-select" v-model="filterPap">
                      <option v-for="pap in paps" :key="pap.id" :value="{ id: pap.id, text: pap.name, amount: pap.amount, avail_amount: pap.available_amount }">{{ pap.name }}</option>
                    </select>
                </div>
              </div>
              <div class="row pt-2">
                <div class="col-5">
                  <small>Fund</small>
                  <input type="text" placeholder="101" class="form-control" v-model="fund"/>
                </div>
                <div class="col-7">
                  <small>Fund Cluster</small>
                  <input type="text" placeholder="" class="form-control" v-model="cluster"/>
                </div>
              </div>
              <div class="row pt-2">
                <div class="col-5">
                  <small>Legal Basis</small>
                  <input type="text" placeholder="" class="form-control" v-model="legal"/>
                </div>
                <div class="col-3 pt-4">
                  <button type="button" :disabled="isDisabled" @click="submit" class="btn btn-success btn-block">Submit</button>
                </div>
              </div>

          </div>
          <div v-else class="pt-3">
              <button type="button" @click="submit" class="btn btn-success btn-block">Submit</button>
          </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      type: 'option1',
      legal: '',
      fund: '',
      cluster: '',
      filter: '',
      recur: '',
      year: '',
      timefilter: '',
      //recurrence: ['Monthly', 'Quarterly', 'Annual'],
      monthly:[
          'January', 
          'February', 
          'March', 
          'April', 
          'May', 
          'June', 
          'July', 
          'August', 
          'September',
          'October',
          'November',
          'December',
        ],
      quarterly: ['1st', '2nd', '3rd', '4th'],
      years: ['2020','2021','2022','2023','2024','2025','2026','2027','2028','2029','2030'],
      filters: ['MOOE', 'PS', 'CO'],
      recurData: [],
      paps: [],
      filterPap: '',
      papReport: ''
    }
  },
  computed: {
    raodData(){
            return this.$store.getters.raodData
    },
    distinctArray(){
            return [...new Set(this.raodData.map(item => item.pap))]
    },
    recurrence(){
      return this.type === 'option3' ? ['Monthly'] : ['Monthly', 'Quarterly', 'Annual']
    },
    isActivity(){
      return this.type === 'option3' ? true : false
    },
    filteredDetails(){
      return this.raodData.filter(d => {
        return (d.allotclass === 'MOOE') || (d.allotclass === 'CO')
      })
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
    isDisabled() {
      if(this.recur === '' || this.year === '' || this.filter === '' || this.filterPap === ''){
        return true
      }else {
        return false
      }
    }
  },
  methods: {
    filterData(){
      if(this.recur === 'Monthly'){
        this.recurData = this.monthly
      }else if(this.recur === 'Quarterly'){
        this.recurData = this.quarterly
      }else {
         this.recurData = []
      }
    },
    changeYear(){
      this.paps = []
      this.$store.dispatch('getMooe', this.year)
      this.$store.dispatch('getPs', this.year)
      this.$store.dispatch('getCo', this.year)
    },
    changeClass(){
      if(this.filter === 'MOOE'){
        this.paps = this.mooe
      }else if(this.filter === 'PS'){
        this.paps = this.ps
      }else {
        this.paps = this.co
      }
    },
    submit(){
      if(this.type === 'option1'){
        this.$router.push({
            path: '/reports/details',
            query: { 
              class: this.filter,
              recur: this.recur,
              time: this.timefilter,
              year: this.year,
              pap: this.filterPap.text,
              beginallot: this.filterPap.amount,
              balance: this.filterPap.avail_amount,
              fund: this.fund,
              cluster: this.cluster,
              basis: this.legal
            }
          })
      }else if(this.type === 'option2'){
        this.$router.push({
          path: '/reports/obligation',
          query: {
            type: this.type,
            recur: this.recur,
            time: this.timefilter,
            year: this.year,
          }
        })
      }else if(this.type === 'option4'){
        this.$router.push({
          path: '/reports/disbursement',
          query: {
            type: this.type,
            recur: this.recur,
            time: this.timefilter,
            year: this.year,
          }
        })
      }else {
        this.$router.push({
          path: '/reports/activity',
          query: {
            type: this.type,
            recur: this.recur,
            time: this.timefilter,
            year: this.year,
            pap: this.papReport
          }
        })
      }
    }
  }
}
</script>