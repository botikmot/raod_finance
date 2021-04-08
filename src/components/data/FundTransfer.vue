<template>
    <div class="container">
        <base-card>
            <div>Transfer of Funds</div>
            <hr />
            <div class="row">
                <div class="col-6">
                   
                        <div class="input-group mx-auto">
                            <span class="input-group-text">Allotment Class</span>
                            <select class="form-select" aria-label="Default select example" v-model="aclass" @change="changeClass">
                                <option selected>PS</option>
                                <option>MOOE</option>
                                <option>CO</option>
                            </select>
                        </div>
                        <div class="input-group py-3 mx-auto">
                            <span class="input-group-text">MFO/PAP</span>
                            <select class="form-select" v-model="pap" @change="changePap">
                                <option v-for="item in paps" :key="item.id" :value="{ id: item.id, text: item.name, amount: item.available_amount.toFixed(2), year: item.year }" >{{ item.name }}</option>
                            </select>
                        </div>
                        <div class="input-group mx-auto">
                            <span class="input-group-text">Activity</span>
                            <select class="form-select" v-model="activity" @change="changeactivity">
                                <option v-for="item in activities" :key="item.id" :value="{ text: item.name, amount: item.amount.toFixed(2) }">{{ item.name }}</option>
                            </select>
                        </div>
                        <div class="pt-2 mx-auto">
                            Balance: <span class="font-weight-bold text-success">&nbsp;{{ formatNumber(balance) }}</span>
                        </div>
                    
                </div>
                <div class="col-6">
                    <div class="input-group mx-auto">
                        <span class="input-group-text">Transfer to</span>
                        <input type="text" v-model.trim="office" id="disabledTextInput" class="form-control" placeholder="Office">
                    </div>
                    <div class="input-group py-3 mx-auto">
                        <span class="input-group-text">Amount</span>
                        <input type="number" :disabled="balance <= 0" v-model="amount" id="disabledTextInput" @keyup="watchAmount" class="form-control">
                    </div>
                    <div class="input-group pt-1 mx-auto">
                        <div class="col ps-3">
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" v-model="status" name="inlineRadioOptions" id="inlineRadio1" value="downloaded">
                                <label class="form-check-label" for="inlineRadio1">Downloaded</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" v-model="status" name="inlineRadioOptions" id="inlineRadio2" value="offered">
                                <label class="form-check-label" for="inlineRadio2">10% Offered</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" v-model="status" name="inlineRadioOptions" id="inlineRadio3" value="cna">
                                <label class="form-check-label" for="inlineRadio3">CNA</label>
                            </div>
                        </div>
                    </div>
                    <hr/>
                    <small v-if="isSuccess" class="form-text pl-1 text-success">Transfered successfully..</small>
                    <div class="d-flex justify-content-between mx-auto">
                        <button type="button" @click="cancel" class="btn btn-light">Cancel</button>
                        <button 
                            type="submit" 
                            :disabled="isDisabled"
                            @click="submit" 
                            class="btn btn-success"
                        >{{ loading ? 'Loading..' : 'Submit' }}</button>
                    </div>
                </div>
            </div>
        </base-card>
        <div class="card">
            <table class="table">
                <thead>
                    <tr>
                    <th scope="col"><small>#</small></th>
                    <th scope="col"><small>Allotment Class</small></th>
                    <th scope="col"><small>MFO/PAP</small></th>
                    <th scope="col"><small>Activity</small></th>
                    <th scope="col"><small>Office</small></th>
                    <th scope="col" style="text-align:right"><small>Amount</small></th>
                    <th scope="col" style="text-align:right"><small>Actions</small></th>
                    </tr>
                </thead>
                <tbody v-if="transfer.length > 0">
                    <transfer-item v-for="(data, index) in transfer" :key="data.id" :data="data" :num="index"></transfer-item>
                </tbody>
                <tbody v-else>
                    <tr><td colspan="7" class="text-center">No Data</td></tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import TransferItem from './TransferItem'

export default {
    components: {
        TransferItem
    },
    data() {
        return {
            aclass: '',
            pap:'',
            paps: [],
            balance: 0,
            office: '',
            amount: null,
            year: null,
            loading: false,
            isSuccess: false,
            activities: [],
            activity: null,
            status: 'downloaded'
        }
    },
    watch: {
        getNotify(){
            this.isSuccess = true
            this.loading = false
            this.office = ''
            this.amount = null
        }
    },
    computed: {
        getNotify(){
            return this.$store.getters.getNotify
        },
        getActivities() {
            return this.$store.getters.activities
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
        transfer() {
            return this.$store.getters.transfer
        },
        isDisabled() {
            if(this.aclass === '' || this.pap === '' || this.office === '' || this.amount === null || this.loading){
                return true
            }else {
                return false
            }
        }
    },
    methods: {
        cancel() {
            this.$router.push('/user')
        },
        changeClass(){
            if(this.aclass === 'PS'){
                this.paps = this.ps
            }else if(this.aclass === 'MOOE'){
                this.paps = this.mooe
            }else {
                this.paps = this.co
            }
        },
        changeactivity() {
            this.balance = this.activity.amount
        },
        changePap(){
            //this.balance = this.pap.amount
            this.year = this.pap.year
            this.activities = []
            this.getActivities.forEach(element => {
                if(element.allotclass === this.aclass && element.pap_id === this.pap.id){
                    const data = {
                        name: element.name,
                        amount: element.amount
                    }
                    this.activities.push(data)
                }
            });
            
        },
        watchAmount() {
            if(parseFloat(this.amount) > parseFloat(this.balance)){
                this.amount = this.balance
            }
        },
        formatNumber (num) {
            return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
        },
        submit(){
            this.loading = true
            const data = {
                allotclass: this.aclass,
                pap_id: this.pap.id,
                pap_name: this.pap.text,
                activity: this.activity.text,
                office: this.office,
                status: this.status,
                amount: this.amount,
                year: this.year
            }
            this.$store.dispatch('fundTransfer', data)
        }
    },
    created() {
    let d = new Date();
    let n = d.getFullYear();
    this.$store.dispatch('getTransfer', n)
    this.$store.dispatch('getActivities')
  }
}
</script>

<style scoped>
.card {
  padding: 1.5rem;
  margin: 2rem auto;
  max-width: 60rem;
}
.text-right {
    text-align: right !important;
}
</style>