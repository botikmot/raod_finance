<template>
  <div class="px-5">
    <button @click="print">Download PDF</button>
  </div>
  <div id="print" ref="content" class="px-5">
    <div class="row">
      <div class="col text-center text-uppercase font-weight-bold">
        Registry of Allotments, Obligations and Disbursements 
      </div>
    </div>
    <div class="row">
      <div class="col text-center text-uppercase font-weight-bold">
        {{ aclass }} 
      </div>
    </div>
    <div class="row">
      <div class="col text-center text-uppercase text-decoration-underline font-weight-bold">
        {{ recurr }} 
      </div>
    </div>
    <div class="row medium-text pt-3">
      <div class="col-2">
        Entity Name: 
      </div>
      <div class="col-5 font-weight-bold">
        Department of Environment and Natural Resources
      </div>
      <div class="col-1">
        MFO/PAP: 
      </div>
      <div class="col-4 font-weight-bold">
        {{ pap }}
      </div>
    </div>
    <div class="row medium-text">
      <div class="col-2">
        Fund Cluster: 
      </div>
      <div class="col-5">
        {{ cluster }}
      </div>
      <div class="col-1">
        Fund: 
      </div>
      <div class="col-4">
        {{ fund }}
      </div>
    </div>
    <div class="row medium-text">
      <div class="col-2">
        Legal Basis: 
      </div>
      <div class="col-5">
        {{ basis }}
      </div>
      <div class="col-2">
        Beginning Allotment: 
      </div>
      <div class="col-3">
        {{ formatNumber(beginallot) }}
      </div>
    </div>

    <div class="row bordered header medium-text mt-3">
      <div class="col-3">
        <div class="row bordered">
          <div class="col text-center py-4" @click="sample">
            Reference
          </div>
        </div>
         <div class="row">
           <div class="col-4 text-center bordered py-4">
             Date
           </div>
           <div class="col-8 text-center bordered py-4">
             Serial Number
           </div>
        </div>
      </div>
      <div class="col-1 text-center bordered px-0 py-4">
          UACS Code/ Expenditure
      </div>
      <div class="col-2 text-center bordered pt-5">
          Name
      </div>
      <div class="col-1 text-center bordered px-0 pt-4">
         Allotment Balance
      </div>
      <div class="col-1 text-center bordered px-0 pt-4">
         Obligations
      </div>
      <div class="col-1 text-center bordered px-0 pt-4">
         Unobligated Allotments
      </div>
      <div class="col-1 text-center bordered px-0 pt-4">
         Disbursements
      </div>
      <div class="col-2">
        <div class="row bordered">
          <div class="col text-center font-weight-bold py-4">
            Unpaid Obligations
          </div>
        </div>
         <div class="row">
           <div class="col-6 text-center px-0 bordered pt-2 pb-1">
             Due and Demandable
           </div>
           <div class="col-6 text-center px-0 bordered pt-2 pb-1">
             Not Yet Due and Demandable
           </div>
        </div>
      </div>
    </div>
    <div class="row medium-text totalheading">
      <div class="col-1 bordered"></div>
      <div class="col-2 bordered "></div>
      <div class="col-1 bordered"></div>
      <div class="col-2 bordered "></div>
      <div class="col-1 bordered text-end font-weight-bold"><small>{{ formatNumber(balance.toFixed(2)) }}</small></div>
      <div class="col-1 bordered text-end font-weight-bold"><small>{{ formatNumber(totalObligations.toFixed(2)) }}</small></div>
      <div class="col-1 bordered text-end font-weight-bold"><small>{{ formatNumber(unobligated.toFixed(2)) }}</small></div>
      <div class="col-1 bordered text-end font-weight-bold"><small>{{ formatNumber(totalDisbursements.toFixed(2)) }}</small></div>
      <div class="col-1 bordered"></div>
      <div class="col-1 bordered text-end font-weight-bold"><small>{{ formatNumber(totalDemandable.toFixed(2)) }}</small></div>
    </div>
    <div v-for="item in filteredData" :key="item" class="row">
      <div class="col-1 bordered px-0 text-center small-text"><small>{{ item.date }}</small></div>
      <div class="col-2 bordered px-0 text-center small-text text-truncate"><small>{{ item.serial }}</small></div>
      <div class="col-1 bordered px-0 text-center small-text"><small>{{ item.uacscode }}</small></div>
      <div class="col-2 bordered text-capitalize small-text"><small>{{ item.name }}</small></div>
      <div class="col-1 bordered"></div>
      <div class="col-1 bordered text-end small-text"><small>{{ formatNumber(parseFloat(item.obligation).toFixed(2)) }}</small></div>
      <div class="col-1 bordered"></div>
      <div class="col-1 bordered text-end small-text"><small>{{ item.disbursement !== null ? formatNumber(parseFloat(item.disbursement).toFixed(2)) : '-' }}</small></div>
      <div class="col-1 bordered"></div>
      <div class="col-1 bordered text-end small-text"><small>{{ formatNumber(item.demandable.toFixed(2)) }}</small></div>
    </div>
  </div>
</template>

<script>
//import html2canvas from 'html2canvas'
import html2pdf from 'html2pdf.js'
//import { jsPDF } from 'jspdf'

export default {
  data() {
    return {
      months:[
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
    }
  },
  computed: {
    raodData(){
      return this.$store.getters.raodData
    },
    details() {
      return this.$route.query
    },
    unobligated() {
        return parseFloat(this.balance) - parseFloat(this.totalObligations)
    },
    cluster() {
      return this.details.cluster
    },
    fund() {
      return this.details.fund
    },
    basis() {
      return this.details.basis
    },
    pap() {
      return this.details.pap
    },
    aclass() {
      return this.details.class === 'MOOE' ? 'Maintenance and Other Operating Expenses' : this.details.class === 'PS' ? 'Personnel Services' : 'Capital Outlay'
    },
    netObligation(){   
        if(this.details.recur === 'Monthly'){
            let total = 0 
            for (let index = 0; index < this.raodData.length; index++) {
                let mo = ''
                this.months.map((m, i) => {
                    if(m === this.details.time){
                        mo = i + 1
                    }
                })
                let [year, month] = this.raodData[index].date.split('-')
                if(month < mo && year === this.details.year && this.raodData[index].allotclass === this.details.class && this.raodData[index].pap === this.details.pap){
                    total = total + parseFloat(this.raodData[index].obligation)
                }
                
            }
            return total
        }else if(this.details.recur === 'Quarterly'){
            let total = 0
            let q = this.details.time.substring(0, 1)
            for (let index = 0; index < this.raodData.length; index++) {
                let [year, month] = this.raodData[index].date.split('-')
                if(q === '1'){
                    return total
                }else if(q === '2'){
                    if(month < 4 && this.details.year == year && this.raodData[index].allotclass === this.details.class && this.raodData[index].pap === this.details.pap){
                       total = total + parseFloat(this.raodData[index].obligation)
                    }
                }else if(q === '3'){
                    if(month < 7 && this.details.year == year && this.raodData[index].allotclass === this.details.class && this.raodData[index].pap === this.details.pap){
                       total = total + parseFloat(this.raodData[index].obligation)
                    }
                }else {
                    if(month < 10 && this.details.year == year && this.raodData[index].allotclass === this.details.class && this.raodData[index].pap === this.details.pap){
                       total = total + parseFloat(this.raodData[index].obligation)
                    }
                }        
            }
            return total
        }else {
            return 0
        }
    },
    filteredData() {
      return this.raodData.filter(d => {
          if(this.details.recur === 'Monthly'){
              let mo = ''
              this.months.map((m, i) => {
                  if(m === this.details.time){
                    mo = i + 1
                  }
              })
              if(d.disbursement !== null){
                d.demandable = parseFloat(d.obligation) - parseFloat(d.disbursement)
              }else {
                d.demandable = parseFloat(d.obligation)
              }
              let [year, month] = d.date.split('-')
              return (mo === +month) && (this.details.year === year) && (d.allotclass === this.details.class) && (d.pap === this.details.pap)
          }else if(this.details.recur === 'Quarterly'){
             if(d.disbursement !== null){
                d.demandable = parseFloat(d.obligation) - parseFloat(d.disbursement)
              }else {
                d.demandable = parseFloat(d.obligation)
              }
             let q = this.details.time.substring(0, 1)
             let [year, month] = d.date.split('-');
             if(q === '1'){
                return (month < 4) && (this.details.year == year) && (d.allotclass === this.details.class) && (d.pap === this.details.pap)
             }else if(q === '2'){
                return (month < 7 && month >= 4) && (this.details.year === year) && (d.allotclass === this.details.class) && (d.pap === this.details.pap)
             }else if(q === '3'){
                return (month < 10 && month >= 7) && (this.details.year === year) && (d.allotclass === this.details.class) && (d.pap === this.details.pap)
             }else {
                return (month < 13 && month >= 10) && (this.details.year === year) && (d.allotclass === this.details.class) && (d.pap === this.details.pap) 
             }
          }else {
              if(d.disbursement !== null){
                d.demandable = parseFloat(d.obligation) - parseFloat(d.disbursement)
              }else {
                d.demandable = parseFloat(d.obligation)
              }
              let year = d.date.split('-')[0];
              //console.log(month)
              return (this.details.year === year) && (d.allotclass === this.details.class) && (d.pap === this.details.pap)
          }
      })
    },
    totalObligations() {
        let total = 0
        for (let index = 0; index < this.filteredData.length; index++) {
           total = total + parseFloat(this.filteredData[index].obligation)
        }
        return total
    },
    totalDisbursements() {
        let total = 0
        for (let index = 0; index < this.filteredData.length; index++) {
           if(this.filteredData[index].disbursement !== null){
              total = total + parseFloat(this.filteredData[index].disbursement)
           }
        }
        return total
    },
    totalDemandable() {
        let total = 0
        for (let index = 0; index < this.filteredData.length; index++) {
            total = total + parseFloat(this.filteredData[index].demandable)
        }
        return total
    },
    recurr() {
      if(this.details.recur === 'Monthly'){
        return this.details.time + ' ' + this.details.year
      }else if(this.details.recur === 'Quarterly'){
        return this.details.time + ' Quarter ' + this.details.year
      }else {
        return 'FY ' + this.details.year
      }
    },
    balance(){
        return this.details.balance - this.netObligation
    },
    beginallot() {
        return this.details.beginallot
    }
  },
  methods: {
    print () {
      let content = document.getElementById('print');
      /*html2canvas(content).then(function(content){
          let imgData = content.toDataURL('image/png', 1.0)
          const doc = new jsPDF('landscape', 'mm', 'a4')
          const imgProps= doc.getImageProperties(imgData);
          const pdfWidth = doc.internal.pageSize.getWidth();
          const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
          doc.addImage(imgData, 'JPEG', 0, 10, pdfWidth, pdfHeight, undefined,'FAST');
          doc.save('output.pdf')
      })*/
      let opt = {
        margin:       0.10,
        filename:     `RAOD_${ this.recurr }`,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'in', format: 'legal', orientation: 'landscape' }
        }
        // New Promise-based usage:
        html2pdf().set(opt).from(content).save()

    },
    formatNumber (num) {
      return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
    },
    sample() {
      console.log(this.sortedArray())
    }
  }
}
</script>

<style scoped>
.text-decoration-underline {
  text-decoration: underline !important;
}
.medium-text {
  font-size: 15px;
}
.w-140 {
  width: 140px;
}
.w-285 {
  width: 285px;
}

.w-246 {
  width: 246px;
}
.w-106 {
  width: 106px;
}
.font-12 {
  font-size: 12px;
}
.font-10 {
  font-size: 10px;
}
.small-text {
  font-size: 13px;
}
.bordered {
  border: 1px solid black;
}
.header {
  font-size: 13px;
}
.totalheading {
  background:#92e2b3;
}

.beforeClass{
  background: green;
}
</style>