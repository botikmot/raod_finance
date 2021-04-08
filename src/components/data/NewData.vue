<template>
  <base-card>
    <div class="row d-flex justify-content-between">
        <div class="col-3 pt-2"> 
          <span>Insert New Data</span>
        </div>
        <div class="col-4">
          <div class="input-group">
              <span class="input-group-text">Date</span>
              <input type="date" v-model="date" class="form-control">
          </div>
        </div>
    </div>
    <hr />
    <data-form :date="date"></data-form>
  </base-card>
</template>

<script>
import DataForm from  './DataForm'
export default {
  components: {
    DataForm
  },
  data() {
    return {
      date: new Date().toISOString().slice(0,10),
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

<style scoped>
.form-header{
  display: flex;
  justify-content: space-between;
}
</style>