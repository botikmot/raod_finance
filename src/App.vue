<template>
  <the-header class="mb-3"></the-header>
    <router-view/>
  <api-modal  ref="apimodal"></api-modal>
</template>

<script>
import ApiModal from './components/data/ApiModal'
import TheHeader from './components/layout/TheHeader'
export default {
  components: {
    TheHeader,
    ApiModal
  },
  created() {
    this.$store.dispatch('tryGetApi')
    this.$store.dispatch('tryLogin')
    this.$store.dispatch('getData')
    //this.$store.dispatch('getBalance')
  },
  mounted() {
    const dataAPI = localStorage.getItem('raod_api')
    if(!dataAPI){
      this.$refs.apimodal.show()
    }
  }
}
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@500&display=swap");

body {
  margin: 0;
}

#app {
  font-family: 'Poppins', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

</style>
