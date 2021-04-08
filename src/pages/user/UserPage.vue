<template>
  <div class="container">
    <all-data></all-data>
  </div>
</template>

<script>
import AllData from '@/components/data/AllData'
export default {
  components: {
    AllData
  },
  data() {
    return {
      accountBalance: ''
    }
  },
  computed: {
    balance() {
      return this.$store.getters.balance
    },
    unobligated(){
      return this.$store.getters.paid
    },
    strBalance(){
      return this.$store.getters.strBalance
    }
  },
  created() {
    let d = new Date();
    let n = d.getFullYear();
    this.$store.dispatch('getMooe', n)
    this.$store.dispatch('getPs', n)
    this.$store.dispatch('getCo', n)
    this.$store.dispatch('getOffices')
    this.$store.dispatch('getActivities')
    this.$store.dispatch('getUacsCode')
  }
}
</script>