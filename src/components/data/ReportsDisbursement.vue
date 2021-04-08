<template>
    <div>
        <div class="px-5 pb-3">
            <button @click="print">Download PDF</button>
        </div>
        <div class="container" id="print" ref="content">
            <div class="text-center text-uppercase fw-bold">{{ details.recur }} Disbursement</div>
            <div class="row mt-4 ps-4 bg-mint bordered">
                <div class="col-6 text-center text-uppercase fw-bold" @click="sample">
                    {{ recurr }}
                </div>
                <div class="col-2 text-center text-uppercase fw-bold br-left">
                    PS
                </div>
                <div class="col-2 text-center text-uppercase fw-bold br-left">
                    MOOE
                </div>
                <div class="col-2 text-center text-uppercase fw-bold br-left">
                    CO
                </div>
            </div>
            <div class="row ps-4 bordered bg-mint">
                <div class="col-6 fw-bold d-flex justify-content-between pe-4" @click="sample">
                    <span>Grand Total</span>
                    <span> &#8369; {{ grandtotal != null || grandtotal != '' ? formatNumber(grandtotal.toFixed(2)) : 0 }}</span>
                </div>
                <div class="col-2 fw-bold br-left text-end">
                    {{ totalps != null || totalps != '' ? formatNumber(totalps.toFixed(2)) : 0 }}
                </div>
                <div class="col-2 fw-bold br-left text-end">
                    {{ totalmooe != null || totalmooe != '' ? formatNumber(totalmooe.toFixed(2)) : 0 }}
                </div>
                <div class="col-2 fw-bold br-left text-end">
                    {{ totalco != null || totalco != '' ? formatNumber(totalco.toFixed(2)) : 0 }}
                </div>
            </div>
            <div v-for="item in subtotals" :key="item" class="row ps-4 bordered">
                <div class="col-6 fw-bold br-bottom br-left bg-lmint">
                    {{ item.pap }}
                </div>
                <div class="col-2 font-weight-bold br-bottom br-left bg-lmint text-end">
                    {{ item.totalps != null || item.totalps != '' ? formatNumber(item.totalps.toFixed(2)) : 0 }}
                </div>
                <div class="col-2 font-weight-bold br-bottom br-left bg-lmint text-end">
                    {{ item.totalmooe != null || item.totalmooe != '' ? formatNumber(item.totalmooe.toFixed(2)) : 0 }}
                </div>
                <div class="col-2 font-weight-bold br-bottom br-left bg-lmint text-end">
                    {{ item.totalco != null || item.totalco != '' ? formatNumber(item.totalco.toFixed(2)) : 0 }}
                </div>

                <div v-for="data in finalSorted" :key="data.id" class="br-right"> 
                    <div v-if="item.pap === data.pap && data.disbursement !== null && !isNaN(data.disbursement)" class="row">
                        <div class="col-6 ps-4 br-bottom br-left">
                            {{ data.uacscode }}
                        </div>
                        <div class="col-2 br-bottom br-left text-end">
                            {{ data.allotclass === 'PS' ?  formatNumber(data.disbursement.toFixed(2)) : ''}}
                        </div>
                        <div class="col-2 br-bottom br-left text-end">
                            {{ data.allotclass === 'MOOE' ?  formatNumber(data.disbursement.toFixed(2)) : ''}}
                        </div>
                        <div class="col-2 br-bottom br-left text-end">
                            {{ data.allotclass === 'CO' ? formatNumber(data.disbursement.toFixed(2)) : ''}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import html2pdf from 'html2pdf.js'

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
        distinctArray(){
            return [...new Set(this.filteredData.map(item => item.pap))]
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
        sortedArray() {
            return this.filteredData.slice().sort(function(a, b){
                return (a.pap > b.pap) ? 1 : -1;
            });
        },
        finalSorted() {
            return this.sortDataByCode.slice().sort(function(a, b){
                return (a.allotclass < b.allotclass) ? 1 : -1;
            })
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
                    let [year, month] = d.date.split('-')
                    return (mo === +month) && (this.details.year === year)
                }else if(this.details.recur === 'Quarterly'){
                    let q = this.details.time.substring(0, 1)
                    let [year, month] = d.date.split('-');
                    if(q === '1'){
                        return (month < 4) && (this.details.year == year)
                    }else if(q === '2'){
                        return (month < 7 && month >= 4) && (this.details.year === year)
                    }else if(q === '3'){
                        return (month < 10 && month >= 7) && (this.details.year === year)
                    }else {
                        return (month < 13 && month >= 10) && (this.details.year === year)
                    }
                }else {
                    let year = d.date.split('-')[0];
                    return (this.details.year === year)
                }
            })
        },
        totalps() {
            let total = 0
            for (let index = 0; index < this.sortedArray.length; index++) {
                if(this.sortedArray[index].allotclass === 'PS'){
                    let disbursement = this.sortedArray[index].disbursement !== null || this.sortedArray[index].disbursement !== '' ? this.sortedArray[index].disbursement : 0
                    //total = total + this.sortedArray[index].disbursement
                    total = total + disbursement
                }           
            }
            return total
        },
        totalmooe() {
            let total = 0
            for (let index = 0; index < this.sortedArray.length; index++) {
                if(this.sortedArray[index].allotclass === 'MOOE'){
                    let disbursement = this.sortedArray[index].disbursement !== null || this.sortedArray[index].disbursement !== '' ? this.sortedArray[index].disbursement : 0
                    //total = total + this.sortedArray[index].disbursement
                    total = total + disbursement
                }           
            }
            return total
        },
        totalco() {
            let total = 0
            for (let index = 0; index < this.sortedArray.length; index++) {
                if(this.sortedArray[index].allotclass === 'CO'){
                    let disbursement = this.sortedArray[index].disbursement !== null || this.sortedArray[index].disbursement !== '' ? this.sortedArray[index].disbursement : 0
                    //total = total + this.sortedArray[index].disbursement
                     total = total + disbursement
                }           
            }
            return total
        },
        grandtotal(){
            return this.totalps + this.totalmooe + this.totalco
        },
        subtotals(){
            let subDisbursement = []
            for (let index = 0; index < this.distinctArray.length; index++) {
                let totalps = 0
                let totalmooe = 0
                let totalco = 0
               for(let i = 0; i < this.sortedArray.length; i++){
                   if(this.distinctArray[index] === this.sortedArray[i].pap && this.sortedArray[i].allotclass === 'PS'){
                       let disbursement = this.sortedArray[i].disbursement !== null || this.sortedArray[i].disbursement !== '' ? this.sortedArray[i].disbursement : 0
                       //totalps = totalps + this.sortedArray[i].disbursement
                       totalps = totalps + disbursement
                   }else if(this.distinctArray[index] === this.sortedArray[i].pap && this.sortedArray[i].allotclass === 'MOOE'){
                       let disbursement = this.sortedArray[i].disbursement !== null || this.sortedArray[i].disbursement !== '' ? this.sortedArray[i].disbursement : 0
                       //totalmooe = totalmooe + this.sortedArray[i].disbursement
                       totalmooe = totalmooe + disbursement
                   }else if(this.distinctArray[index] === this.sortedArray[i].pap && this.sortedArray[i].allotclass === 'CO'){
                       let disbursement = this.sortedArray[i].disbursement !== null || this.sortedArray[i].disbursement !== '' ? this.sortedArray[i].disbursement : 0
                       //totalco = totalco + this.sortedArray[i].disbursement
                       totalco = totalco + disbursement
                   }
               }
               const data = {
                   pap: this.distinctArray[index],
                   totalps,
                   totalmooe,
                   totalco
               }          
               subDisbursement.push(data)
            }
            return subDisbursement
        },
        sortDataByCode(){
            let holder = []
            this.filteredData.forEach(index => {
                //let disbursement = index.disbursement !== null || index.disbursement !== '' ? index.disbursement : 0
                const data = holder.find( i => i.pap === index.pap && i.allotclass === index.allotclass && i.uacscode === index.uacscode )
                if(!data){
                    holder.push({
                        pap:index.pap,
                        disbursement:index.disbursement,
                        allotclass: index.allotclass,
                        uacscode: index.uacscode
                    })
                }else{
                    let dataDisbursement = data.disbursement !== null || data.disbursement !== '' ? data.disbursement : 0
                    let indexDisbursement = index.disbursement !== null || index.disbursement !== '' ? index.disbursement : 0
                    data.disbursement = parseFloat(dataDisbursement) + parseFloat(indexDisbursement)
                }
            })
            return holder
        }
    },
    methods: {
        sample () {
            console.log(this.sortDataByCode)
        },
        formatNumber (num) {
            return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
        },
        print() {
            let content = document.getElementById('print')
            let opt = {
            margin:       [0.30, 0, 0.30, 0.30], //top, left, buttom, right,
            filename:     `RAOD_Disbursement_${ this.recurr }`,
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2 },
            jsPDF:        { unit: 'in', format: 'legal', orientation: 'portrait' }
            }
            // New Promise-based usage:
            html2pdf().set(opt).from(content).save()
        }
    }
}
</script>

<style scoped>
.bg-mint {
    background: #92e2b3;
}
.bg-lmint {
    background:#7af7ae75;
}
.bordered {
    border: 1px solid;
}
.br-left {
    border-left: 1px solid;
}
.br-bottom {
    border-bottom: 1px solid;
}
.br-right {
    border-right: 1px solid;
}

</style>