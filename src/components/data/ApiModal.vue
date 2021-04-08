<template>
  <div v-if="showModal">
    <div id="modal">
        <div class="text-center">
           Please Enter Database URL.
          <div class="form-group">
            <input type="text" placeholder="http://127.0.0.1/raoddb" class="form-control" v-model="apiKey"/>
          </div>  
        </div>
        <div class="form-group d-flex justify-content-between">
              <button type="button" @click="hide" class="btn btn-light">Cancel</button>
              <button type="button" @click="saveData" class="btn btn-success">Save</button>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['dataid'],
  data() {
    return {
       showModal: false,
       apiKey: ''
    }
  },
  methods: {
     show() {
      this.showModal = true
     },
     hide(){
      this.showModal = false
     },
     saveData(){
       localStorage.removeItem('raod_api')
       this.$store.dispatch('addapi', this.apiKey)
       this.showModal = false
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
