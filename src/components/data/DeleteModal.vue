<template>
  <div v-if="showModal">
    <div id="modal">
        <div class="text-center">
            Are you sure you want to delete this data?
        </div>
        <div class="form-group pt-3 d-flex justify-content-between">
              <button type="button" @click="hide" class="btn btn-light">Cancel</button>
              <button type="button" @click="deleteData" class="btn btn-danger">Delete</button>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['dataid', 'comp'],
  data() {
    return {
       showModal: false
    }
  },
  methods: {
     show() {
      this.showModal = true
     },
     hide(){
      this.showModal = false
     },
     deleteData(){
       console.log(this.dataid)
       if(this.comp === 'transfer'){
         this.$store.dispatch('deleteTransfer', this.dataid)
       }else{
         this.$store.dispatch('deleteData', this.dataid)
       }    
     }
  }
}
</script>

<style scoped>
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
