<template>
  <div class="container">  
    <base-card>
      <div class="row">
        <div class="col-4 offset-4">
          <span class="d-flex justify-content-center">Login</span>
          <hr />
          <form @submit.prevent="submitForm" class="">
            <div class="form-group">
            <input type="text" placeholder="Username" class="form-control" v-model.trim="username"/>
                <!--<small id="serial-number-help" class="form-text text-muted">Error.</small>-->
            </div>
            <div class="form-group py-2">
            <input type="password" placeholder="Password" class="form-control" v-model.trim="password"/>
                <!--<small id="serial-number-help" class="form-text text-muted">Error.</small>-->
            </div>
            <small v-if="!formIsValid" id="serial-number-help" class="form-text text-danger text-center">
                Please enter a valid Username/Password
            </small>
            <hr />
            <div class="form-group pt-3 d-flex justify-content-between">
                <button type="button" class="btn btn-light">Cancel</button>
                <button type="submit" :disabled="loading" class="btn btn-success">{{ loading ? 'Loading..' : 'Login' }}</button>
            </div>
          </form>
        </div>
      </div>
    </base-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      formIsValid: true,
      loading: false
    }
  },
  watch:{
    getNotify(){
        this.loading = false
        if(!this.getSuccess){
          this.formIsValid = false
        }
     }
  },
  computed:{
    getNotify(){
        return this.$store.getters.getNotify
    },
    getSuccess(){
        return this.$store.getters.getSuccess
    }
  },
  methods: {
    submitForm(){
        this.loading = true
        if(this.username === '' || this.password === ''){
            this.formIsValid = false
            this.loading = false
            return
        }
        const data = {
            username: this.username,
            password: this.password
        }
        this.$store.dispatch('login', data)  
    }
  }
}
</script>