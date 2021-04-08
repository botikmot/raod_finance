<template>
    <div>
        <div class="px-5 pb-3">
            <button @click="print">Download PDF</button>
        </div>
        <div class="px-2" id="print" ref="content">
            <div class="row mx-2 border-left border-right border-top">
                <div class="col-4 fw-bold">
                    Monthly Obligation by Activity
                </div>
                <div class="col-2"></div>
                <div class="col-3 text-center text-uppercase">
                    <div class="row">
                        <div class="col-9 text-center text-uppercase border-left border-right totalheading">Obligation</div>
                        <div class="col-3"></div>
                    </div>
                </div>
                <div class="col-3 text-center text-uppercase border-left totalheading">
                    Disbursement
                </div>
            </div>
            <div class="row mx-2 font-12 fw-bold bordered totalheading">
                <div class="col-4">
                    <div class="row">
                        <div class="col-6 pt-2">{{ recurr }}</div>
                        <div class="col-2"></div>
                        <div class="col-2 px-0 text-center font-10 border-left">Allotment</div>
                        <div class="col-2 px-0 text-center font-10 border-left border-right">Allotment Downloaded</div>
                    </div>
                </div>
                <div class="col-2">
                    <div class="row">
                        <div class="col-4 text-center font-10">10% Offered</div>
                        <div class="col-4 text-center font-10 border-left">CNA</div>
                        <div class="col-4 text-center font-10 text-uppercase border-left">Allotment Balanced</div>
                    </div>
                </div>
                <div class="col-3">
                    <div class="row">
                        <div class="col-3 text-center font-10 border-left">This Month</div>
                        <div class="col-3 text-center font-10 border-left">Previous Month</div>
                        <div class="col-3 text-center font-10 border-left">To Date</div>
                        <div class="col-3 text-center font-10 text-uppercase border-left">Allotment Balanced</div>
                    </div>
                </div>
                <div class="col-3">
                    <div class="row">
                        <div class="col-4 text-center font-10 border-left">This Month</div>
                        <div class="col-4 text-center font-10 border-left">To Date</div>
                        <div class="col-4 text-center font-10 border-left">Unpaid Obligation</div>
                    </div>
                </div>
            </div>
            
            <div class="row mx-2 font-12 fw-bold border-left totalheading">
                <div class="col-4">
                    <div class="row">
                        <div class="col-6 text-truncate font-10">{{ details.pap }}</div>
                        <div class="col-2 font-10 text-center border-left">Total</div>
                        <div class="col-2 text-end font-10 border-left px-1">{{ formatNumber((totalAllotMooe + totalAllotCo).toFixed(2)) }}</div>
                        <div class="col-2 text-end font-10 border-left px-1 border-right">{{ formatNumber((getdownloadedMooe + getdownloadedCo).toFixed(2))}}</div>
                    </div>
                </div>
                <div class="col-2">
                    <div class="row">
                        <div class="col-4 text-end font-10 px-1">{{ formatNumber((getofferMooe + getofferCo).toFixed(2)) }}</div>
                        <div class="col-4 text-end font-10 border-left px-1">{{ formatNumber((getCnaMooe + getCnaCo).toFixed(2)) }}</div>
                        <div class="col-4 text-end font-10 border-left px-1">{{ formatNumber((totalMooeAllotmentBalance + totalCoAllotmentBalance).toFixed(2)) }}</div>
                    </div>
                </div>
                <div class="col-3">
                    <div class="row">
                        <div class="col-3 text-end font-10 border-left px-1">{{ formatNumber((totalthisMonth).toFixed(2)) }}</div>
                        <div class="col-3 text-end font-10 border-left px-1">{{ formatNumber((totalprevFilter + totalprevFilterCo).toFixed(2)) }}</div>
                        <div class="col-3 text-end font-10 border-left px-1">{{ formatNumber((totalthisMonth + (totalprevFilter + totalprevFilterCo)).toFixed(2)) }}</div>
                        <div class="col-3 text-end font-10 border-left px-1">{{ formatNumber(overalltotalallotment.toFixed(2)) }}</div>
                    </div>
                </div>
                <div class="col-3">
                    <div class="row">
                        <div class="col-4 text-end font-10 border-left px-1">{{ formatNumber((totalDisMooe + totalDisCo).toFixed(2)) }}</div>
                        <div class="col-4 text-end font-10 border-left px-1">{{ formatNumber((totalprevDisMooe + totalprevDisCo).toFixed(2)) }}</div>
                        <div class="col-4 text-end font-10 border-left px-1 border-right">{{ formatNumber(totalunpaid.toFixed(2)) }}</div>
                    </div>
                </div>
            </div>
            <div class="row mx-2 font-12 fw-bold bordered totalheading">
                <div class="col-4">
                    <div class="row">
                        <div class="col-6 pt-2 text-truncate font-10"></div>
                        <div class="col-2 font-10 text-center border-left">MOOE</div>
                        <div class="col-2 text-end font-10 border-left px-1">{{ formatNumber(totalAllotMooe.toFixed(2)) }}</div>
                        <div class="col-2 text-end font-10 border-left px-1 border-right">{{ getdownloadedMooe != 0 ? formatNumber(getdownloadedMooe.toFixed(2)) : '-' }}</div>
                    </div>
                </div>
                <div class="col-2">
                    <div class="row">
                        <div class="col-4 text-end font-10 px-1">{{ getofferMooe != 0 ? formatNumber(getofferMooe.toFixed(2)) : '-' }}</div>
                        <div class="col-4 text-end font-10 border-left px-1">{{ getCnaMooe != 0 ? formatNumber(getCnaMooe.toFixed(2)) : '-' }}</div>
                        <div class="col-4 text-end font-10 border-left px-1">{{ formatNumber(totalMooeAllotmentBalance.toFixed(2)) }}</div>
                    </div>
                </div>
                <div class="col-3">
                    <div class="row">
                        <div class="col-3 text-end font-10 border-left px-1">{{ formatNumber(totalMooe.toFixed(2)) }}</div>
                        <div class="col-3 text-end font-10 border-left px-1">{{ formatNumber(totalprevFilter.toFixed(2)) }}</div>
                        <div class="col-3 text-end font-10 border-left px-1">{{ formatNumber((totalMooe + totalprevFilter).toFixed(2)) }}</div>
                        <div class="col-3 text-end font-10 border-left px-1">{{ formatNumber((totalMooeAllotmentBalance - (totalMooe + totalprevFilter)).toFixed(2)) }}</div>
                    </div>
                </div>
                <div class="col-3">
                    <div class="row">
                        <div class="col-4 text-end font-10 border-left px-1">{{ formatNumber(totalDisMooe.toFixed(2)) }}</div>
                        <div class="col-4 text-end font-10 border-left px-1">{{ formatNumber(totalprevDisMooe.toFixed(2)) }}</div>
                        <div class="col-4 text-end font-10 border-left px-1">{{ formatNumber(totalunpaidMooe.toFixed(2)) }}</div>
                    </div>
                </div>
            </div>
            <div class="row mx-2 font-12 fw-bold border-bottom border-left totalheading">
                <div class="col-4">
                    <div class="row">
                        <div class="col-6 pt-2 text-truncate font-10"></div>
                        <div class="col-2 font-10 text-center border-left">CO</div>
                        <div class="col-2 text-end font-10 border-left px-1">{{ formatNumber(totalAllotCo.toFixed(2)) }}</div>
                        <div class="col-2 text-end font-10 border-left px-1 border-right">{{ getdownloadedCo != 0 ? formatNumber(getdownloadedCo.toFixed(2)) : '-' }}</div>
                    </div>
                </div>
                <div class="col-2">
                    <div class="row">
                        <div class="col-4 text-end font-10 px-1">{{ getofferCo != 0 ? formatNumber(getofferCo.toFixed(2)) : '-' }}</div>
                        <div class="col-4 text-end font-10 border-left px-1">{{ getCnaCo != 0 ? formatNumber(getCnaCo.toFixed(2)) : '-' }}</div>
                        <div class="col-4 text-end font-10 border-left px-1">{{ formatNumber(totalCoAllotmentBalance.toFixed(2)) }}</div>
                    </div>
                </div>
                <div class="col-3">
                    <div class="row">
                        <div class="col-3 text-end font-10 border-left px-1">{{ formatNumber(totalCo.toFixed(2)) }}</div>
                        <div class="col-3 text-end font-10 border-left px-1">{{ formatNumber(totalprevFilterCo.toFixed(2)) }}</div>
                        <div class="col-3 text-end font-10 border-left px-1">{{ formatNumber((totalCo + totalprevFilterCo).toFixed(2)) }}</div>
                        <div class="col-3 text-end font-10 border-left px-1">{{ formatNumber((totalCoAllotmentBalance - (totalCo + totalprevFilterCo)).toFixed(2)) }}</div>
                    </div>
                </div>
                <div class="col-3">
                    <div class="row">
                        <div class="col-4 text-end font-10 border-left px-1">{{ formatNumber(totalDisCo.toFixed(2)) }}</div>
                        <div class="col-4 text-end font-10 border-left px-1">{{ formatNumber(totalprevDisCo.toFixed(2)) }}</div>
                        <div class="col-4 text-end font-10 border-left px-1 border-right"> {{ formatNumber(totalunpaidCo.toFixed(2)) }}</div>
                    </div>
                </div>
            </div>

            <div v-for="data in mooeFilter" :key="data.activity" class="row mx-2 font-12 border-bottom border-left">
                <div class="col-4">
                    <div class="row">
                        <div class="col-6 text-truncate font-10">{{ data.activity }}</div>
                        <div class="col-2 font-10 text-center border-left">{{ data.allotclass }}</div>
                        <div class="col-2 text-end font-10 border-left px-1">{{ formatNumber(data.allotment.toFixed(2)) }}</div>
                        <div class="col-2 text-end font-10 border-left px-1 border-right">{{ data.downloaded != 0 ? formatNumber(data.downloaded.toFixed(2)) : '-' }}</div>
                    </div>
                </div>
                <div class="col-2">
                    <div class="row">
                        <div class="col-4 text-end font-10 px-1">{{ data.offer != 0 ? formatNumber(data.offer.toFixed(2)) : '-' }}</div>
                        <div class="col-4 text-end font-10 border-left px-1">{{ data.cna != 0 ? formatNumber(data.cna.toFixed(2)) : '-' }}</div>
                        <div class="col-4 text-end font-10 border-left px-1">{{ formatNumber(data.totalallot.toFixed(2)) }}</div>
                    </div>
                </div>
                <div class="col-3">
                    <div class="row">
                        <div class="col-3 text-end font-10 border-left px-1">{{ formatNumber(data.obligation.toFixed(2)) }}</div>
                        <div class="col-3 text-end font-10 border-left px-1">{{ formatNumber(data.prevobligation.toFixed(2)) }}</div>
                        <div class="col-3 text-end font-10 border-left px-1">{{ formatNumber((data.obligation + data.prevobligation).toFixed(2)) }}</div>
                        <div class="col-3 text-end font-10 border-left px-1">{{ formatNumber(data.overallallot.toFixed(2)) }}</div>
                    </div>
                </div>
                <div class="col-3">
                    <div class="row">
                        <div class="col-4 text-end font-10 border-left px-1">{{ formatNumber(data.disbursement.toFixed(2)) }}</div>
                        <div class="col-4 text-end font-10 border-left px-1">{{ formatNumber((data.disbursement + data.prevdisbursement).toFixed(2)) }}</div>
                        <div class="col-4 text-end font-10 border-left px-1 border-right">{{ formatNumber(((data.obligation + data.prevobligation) - (data.disbursement + data.prevdisbursement)).toFixed(2)) }}</div>
                    </div>
                </div>
            </div>

            <div v-for="data in coFilter" :key="data.activity" class="row mx-2 font-12 border-bottom border-left">
                <div class="col-4">
                    <div class="row">
                        <div class="col-6 text-truncate font-10">{{ data.activity }}</div>
                        <div class="col-2 font-10 text-center border-left">{{ data.allotclass }}</div>
                        <div class="col-2 text-end font-10 border-left px-1">{{ formatNumber(data.allotment.toFixed(2)) }}</div>
                        <div class="col-2 text-end font-10 border-left px-1 border-right">{{ data.downloaded != 0 ? formatNumber(data.downloaded.toFixed(2)) : '-' }}</div>
                    </div>
                </div>
                <div class="col-2">
                    <div class="row">
                        <div class="col-4 text-end font-10 px-1">{{ data.offer != 0 ? formatNumber(data.offer.toFixed(2)) : '-' }}</div>
                        <div class="col-4 text-end font-10 border-left px-1">{{ data.cna != 0 ? formatNumber(data.cna.toFixed(2)) : '-' }}</div>
                        <div class="col-4 text-end font-10 border-left px-1">{{ formatNumber(data.totalallot.toFixed(2)) }}</div>
                    </div>
                </div>
                <div class="col-3">
                    <div class="row">
                        <div class="col-3 text-end font-10 border-left px-1">{{ formatNumber(data.obligation.toFixed(2)) }}</div>
                        <div class="col-3 text-end font-10 border-left px-1">{{ formatNumber(data.prevobligation.toFixed(2)) }}</div>
                        <div class="col-3 text-end font-10 border-left px-1">{{ formatNumber((data.obligation + data.prevobligation).toFixed(2)) }}</div>
                        <div class="col-3 text-end font-10 border-left px-1">{{ formatNumber(data.overallallot.toFixed(2)) }}</div>
                    </div>
                </div>
                <div class="col-3">
                    <div class="row">
                        <div class="col-4 text-end font-10 border-left px-1">{{ formatNumber(data.disbursement.toFixed(2)) }}</div>
                        <div class="col-4 text-end font-10 border-left px-1">{{ formatNumber((data.disbursement + data.prevdisbursement).toFixed(2)) }}</div>
                        <div class="col-4 text-end font-10 border-left px-1 border-right">{{ formatNumber(((data.obligation + data.prevobligation) - (data.disbursement + data.prevdisbursement)).toFixed(2)) }}</div>
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
    created() {
        this.$store.dispatch('getTransfer', this.details.year)
        this.$store.dispatch('getActivities')
    },
    computed: {
        raodData(){
            return this.$store.getters.raodData
        },
        transfer() {
            return this.$store.getters.transfer
        },
        totalMooeAllotmentBalance(){
            return (this.totalAllotMooe - this.getdownloadedMooe - this.getofferMooe - this.getCnaMooe)
        },
        totalCoAllotmentBalance() {
            return (this.totalAllotCo - this.getdownloadedCo - this.getofferCo - this.getCnaCo)
        },
        overalltotalallotment() {
            return (this.totalMooeAllotmentBalance + this.totalCoAllotmentBalance) - (this.totalthisMonth + (this.totalprevFilter + this.totalprevFilterCo))
        },
        getdownloadedMooe(){
            let total = 0
            this.mooeFilter.forEach(element => {
                total = total + element.downloaded
            })
            return total
        },
        getofferCo(){
            let total = 0
            this.coFilter.forEach(element => {
                total = total + element.offer
            })
            return total
        },
        getCnaCo(){
            let total = 0
            this.coFilter.forEach(element => {
                total = total + element.cna
            })
            return total
        },
        getCnaMooe(){
            let total = 0
            this.mooeFilter.forEach(element => {
                total = total + element.cna
            })
            return total
        },
        getofferMooe() {
            let total = 0
            this.mooeFilter.forEach(element => {
                total = total + element.offer
            })
            return total
        },
        getdownloadedCo(){
            let total = 0
            this.coFilter.forEach(element => {
                total = total + element.downloaded
            })
            return total
        },
        activities() {
            return this.$store.getters.activities
        },
         details() {
            return this.$route.query
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
        distinctMooe(){
            return [...new Set(this.mooeDetails.map(item => item.activity))]
        },
        distinctCo(){
            return [...new Set(this.coDetails.map(item => item.activity))]
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
                    return (mo === +month) && (this.details.year === year) && (this.details.pap === d.pap) && (d.allotclass !== 'PS')
                }else if(this.details.recur === 'Quarterly'){
                    let q = this.details.time.substring(0, 1)
                    let [year, month] = d.date.split('-');
                    if(q === '1'){
                        return (month < 4) && (this.details.year == year) && (this.details.pap === d.pap) && (d.allotclass !== 'PS')
                    }else if(q === '2'){
                        return (month < 7 && month >= 4) && (this.details.year === year) && (this.details.pap === d.pap) && (d.allotclass !== 'PS')
                    }else if(q === '3'){
                        return (month < 10 && month >= 7) && (this.details.year === year) && (this.details.pap === d.pap) && (d.allotclass !== 'PS')
                    }else {
                        return (month < 13 && month >= 10) && (this.details.year === year) && (this.details.pap === d.pap) && (d.allotclass !== 'PS')
                    }
                }else {
                    let year = d.date.split('-')[0];
                    return (this.details.year === year) && (this.details.pap === d.pap) && (d.allotclass !== 'PS')
                }
            })
        },
        previousMonth(){
            return this.raodData.filter(d => {
                    let mo = ''
                    this.months.map((m, i) => {
                        if(m === this.details.time){
                            mo = i + 1
                        }
                    })
                    let [year, month] = d.date.split('-')

                    return (mo > +month) && (this.details.year === year) && (this.details.pap === d.pap) && (d.allotclass !== 'PS')
            })
        },
        previousMooe(){
            let total = 0
            for (let index = 0; index < this.previousMonth.length; index++) {
                if(this.previousMonth[index].allotclass === 'MOOE'){
                    total = total + this.previousMonth[index].obligation
                }                
            }
            return total
        },
        previousDisMooe(){
            let total = 0
            for (let index = 0; index < this.mooeFilter.length; index++) {
                if(this.mooeFilter[index].allotclass === 'MOOE'){
                    total = total + this.mooeFilter[index].prevdisbursement
                }                
            }
            return total
        },
        previousCo(){
            let total = 0
            for (let index = 0; index < this.previousMonth.length; index++) {
                if(this.previousMonth[index].allotclass === 'CO'){
                    total = total + this.previousMonth[index].obligation
                }                
            }
            return total
        },
        previousDisCo(){
            let total = 0
            for (let index = 0; index < this.coFilter.length; index++) {
                if(this.coFilter[index].allotclass === 'CO'){
                    total = total + this.coFilter[index].prevdisbursement
                }                
            }
            return total
        },
        totalMooe(){
            let total = 0
            for (let index = 0; index < this.filteredData.length; index++) {
                if(this.filteredData[index].allotclass === 'MOOE'){
                    total = total + this.filteredData[index].obligation
                }                
            }
            return total
        },
        totalDisMooe(){
            let total = 0
            for (let index = 0; index < this.filteredData.length; index++) {
                if(this.filteredData[index].allotclass === 'MOOE'){
                    total = total + this.filteredData[index].disbursement
                }                
            }
            return total
        },
        totalCo(){
            let total = 0
            for (let index = 0; index < this.filteredData.length; index++) {
                if(this.filteredData[index].allotclass === 'CO'){
                    total = total + this.filteredData[index].obligation
                }                
            }
            return total
        },
        totalDisCo(){
            let total = 0
            for (let index = 0; index < this.filteredData.length; index++) {
                if(this.filteredData[index].allotclass === 'CO'){
                    total = total + this.filteredData[index].disbursement
                }                
            }
            return total
        },
        totalthisMonth(){
            return this.totalMooe + this.totalCo
        },
        totalprevMonth(){
            return this.previousMooe + this.previousCo
        },
        totalprevDisCo(){
            return this.totalDisCo + this.previousDisCo
        },
        totalprevDisMooe(){
            return this.totalDisMooe + this.previousDisMooe
        },
        totalunpaid(){
            return ((this.totalthisMonth + (this.totalprevFilter + this.totalprevFilterCo))) - (this.totalprevDisMooe + this.totalprevDisCo)
        },
        totalunpaidMooe(){
            return (this.totalMooe + this.totalprevFilter) - (this.totalprevDisMooe)
        },
        totalunpaidCo(){
            return (this.totalCo + this.totalprevFilterCo) - (this.totalprevDisCo)
        },
        mooeDetails(){
            let mooe = []
            for (let index = 0; index < this.filteredData.length; index++) {
                if(this.filteredData[index].allotclass === 'MOOE'){
                    mooe.push(this.filteredData[index])
                }                
            }
            return mooe
        },
        prevmooeDetails(){
            let mooe = []
            for (let index = 0; index < this.previousMonth.length; index++) {
                if(this.previousMonth[index].allotclass === 'MOOE'){
                    mooe.push(this.previousMonth[index])
                }                
            }
            
            return mooe
        },
        prevcoDetails(){
            let co = []
            for (let index = 0; index < this.previousMonth.length; index++) {
                if(this.previousMonth[index].allotclass === 'CO'){
                    co.push(this.previousMonth[index])
                }                
            }
            return co
        },
        coDetails(){
            let co = []
            for (let index = 0; index < this.filteredData.length; index++) {
                if(this.filteredData[index].allotclass === 'CO'){
                    co.push(this.filteredData[index])
                }                
            }
            return co
        },

        totalAllotMooe(){
            let total = 0
            for (let index = 0; index < this.mooeFilter.length; index++) {
                total = total + this.mooeFilter[index].allotment                
            }
            return total
        },
        totalAllotCo(){
            let total = 0
            for (let index = 0; index < this.coFilter.length; index++) {
                total = total + this.coFilter[index].allotment                
            }
            return total
        },
        
        mooeFilter(){
            let mooedata = []
            for (let index = 0; index < this.distinctMooe.length; index++) {
                let totalobligation = 0
                let totaldisbursement = 0
                let totalprevobligation = 0
                let totalprevdisbursement = 0
                let allot = 0
                let downloaded = 0
                let offer = 0
                let cna = 0
                for(let i = 0; i < this.mooeDetails.length; i++){
                    if(this.distinctMooe[index] === this.mooeDetails[i].activity){
                        totalobligation = totalobligation + this.mooeDetails[i].obligation
                        totaldisbursement = totaldisbursement + this.mooeDetails[i].disbursement
                    }
                }   

                for(let z = 0; z < this.prevmooeDetails.length; z++){            
                    if(this.distinctMooe[index] === this.prevmooeDetails[z].activity){
                        totalprevobligation = totalprevobligation + this.prevmooeDetails[z].obligation
                        totalprevdisbursement = totalprevdisbursement + this.prevmooeDetails[z].disbursement
                    }        
                } 

                for(let j = 0; j < this.activities.length; j++){
                    if(this.distinctMooe[index] === this.activities[j].name && this.activities[j].allotclass === 'MOOE' && this.activities[j].pap_name === this.details.pap)
                    {
                        allot = this.activities[j].amount
                    }
                }

                this.transfer.forEach(element => {
                    if(this.distinctMooe[index] === element.activity && element.allotclass === 'MOOE' && element.pap_name === this.details.pap && element.year === this.details.year){
                        if(element.status === 'offered'){
                            offer = offer + element.amount
                        }else if(element.status === 'cna'){
                            cna = cna + element.amount
                        }else{
                            downloaded = downloaded + element.amount
                        }
                    }
                });

                let totalallot = (allot - downloaded - offer - cna )
                let overallallot = totalallot - (totalobligation + totalprevobligation)

                const data = {
                    activity: this.distinctMooe[index],
                    allotclass: 'MOOE',
                    obligation: totalobligation,
                    disbursement: totaldisbursement,
                    prevobligation: totalprevobligation,
                    prevdisbursement: totalprevdisbursement,
                    allotment: allot,
                    downloaded,
                    offer,
                    cna,
                    totalallot,
                    overallallot
                }
                mooedata.push(data)
            }
            return mooedata
        },
        totalprevFilter(){
            let total = 0
            for (let index = 0; index < this.mooeFilter.length; index++) {
                total = total + this.mooeFilter[index].prevobligation
            }
            return total
        },
        totalprevFilterCo(){
            let total = 0
            for (let index = 0; index < this.coFilter.length; index++) {
                total = total + this.coFilter[index].prevobligation
            }
            return total
        },
        coFilter(){
            let codata = []
            for (let index = 0; index < this.distinctCo.length; index++) {
                let totalobligation = 0
                let totaldisbursement = 0
                let totalprevobligation = 0
                let totalprevdisbursement = 0
                let allot = 0
                let downloaded = 0
                let offer = 0
                let cna = 0
                for(let i = 0; i < this.coDetails.length; i++){
                    if(this.distinctCo[index] === this.coDetails[i].activity){
                        totalobligation = totalobligation + this.coDetails[i].obligation
                        totaldisbursement = totaldisbursement + this.coDetails[i].disbursement
                    }
                }   
                for(let z = 0; z < this.prevcoDetails.length; z++){            
                    if(this.distinctCo[index] === this.prevcoDetails[z].activity){
                        totalprevobligation = totalprevobligation + this.prevcoDetails[z].obligation
                        totalprevdisbursement = totalprevdisbursement + this.prevcoDetails[z].disbursement
                    }        
                } 

                for(let j = 0; j < this.activities.length; j++){
                    if(this.distinctCo[index] === this.activities[j].name && this.activities[j].allotclass === 'CO' && this.activities[j].pap_name === this.details.pap)
                    {
                        allot = this.activities[j].amount
                    }
                }

                this.transfer.forEach(element => {
                    if(this.distinctCo[index] === element.activity && element.allotclass === 'CO' && element.pap_name === this.details.pap && element.year === this.details.year){
                        if(element.status === 'offered'){
                            offer = offer + element.amount
                        }else if(element.status === 'cna'){
                            cna = cna + element.amount
                        }else{
                            downloaded = downloaded + element.amount
                        }
                    }
                });

                let totalallot = (allot - downloaded - offer - cna )
                let overallallot = totalallot - (totalobligation + totalprevobligation)

                const data = {
                    activity: this.distinctCo[index],
                    allotclass: 'CO',
                    obligation: totalobligation,
                    disbursement: totaldisbursement,
                    prevobligation: totalprevobligation,
                    prevdisbursement: totalprevdisbursement,
                    allotment: allot,
                    downloaded,
                    offer,
                    cna,
                    totalallot,
                    overallallot
                }
                codata.push(data)
            }
            return codata
        }
    },
    methods: {
        print(){
            let content = document.getElementById('print')
            let opt = {
            margin:       0.10,
            filename:     `RAOD_Activity_${ this.recurr }`,
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2 },
            jsPDF:        { unit: 'in', format: 'legal', orientation: 'landscape' }
            }
            // New Promise-based usage:
            html2pdf().set(opt).from(content).save()
        },
        formatNumber (num) {
            return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
        }

    } 
}
</script>

<style scoped>
.font-12{
    font-size: 12px;
}
.font-10{
    font-size: 10px;
}
.bordered {
    border: 1px solid;
}
.border-right {
    border-right: 1px solid;
}

.border-left {
    border-left: 1px solid;
}

.border-bottom {
    border-bottom: 1px solid !important;
}

.border-top {
    border-top: 1px solid !important;
}

.totalheading {
  background:#92e2b385;
}


</style>