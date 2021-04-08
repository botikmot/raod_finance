<template>
  <div class="container">
    Accounts Payable
    <div v-if="filterResult.length > 0">
    <div v-if="payable" class="text-center">Accounts Payable</div>
    <data-item v-for="data in filterResult" :key="data.id" :data="data"></data-item>
    </div>
    <div v-else>
        <base-card>No Data.</base-card>
    </div>
  </div>
</template>

<script>
import BaseCard from '../ui/BaseCard.vue'
import DataItem from './DataItem'
export default {
  components: {
    DataItem,
    BaseCard
  },
  computed: {
    raodData(){
      return this.$store.getters.raodData
    },
    filterResult(){
      let newdate = new Date()
      let cyear = newdate.getFullYear()
      return this.raodData.filter(d => {   
        let year = d.date.split('-')[0];
        return (cyear > year && d.disbursement <= d.obligation)
      })
    }
  }
}
</script>