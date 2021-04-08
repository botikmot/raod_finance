<template>
  <header>
    <img class="header_logo" alt="DENR logo" :src="image" width="45" />
    <nav>
      <router-link to="/user">Registry of Allotments, Obligation and Disbursements</router-link>
      <ul>
        <li v-if="isLoggedIn && isAdmin === 0"><router-link to="/newdata">New Data</router-link></li>
        <li v-if="isLoggedIn && isAdmin === 0"><router-link to="/report">Report</router-link></li>
        <li v-if="isLoggedIn && isAdmin === 0"><router-link to="/fundtransfer">Fund Transfer</router-link></li>
        <li v-if="isLoggedIn && isAdmin === 0"><router-link to="/payable">Payables</router-link></li>
        <li v-if="!isLoggedIn"><router-link to="/login">Login</router-link></li>
        <li v-else><button @click="logout" class="btn btn-text text-white">Logout</button></li>
      </ul>
    </nav>
  </header>
</template>
<script>
export default {
  data() {
    return {
      search: '',
      image: require('@/assets/static/img/logopng.png')
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated
    },
    isAdmin() {
      return this.$store.getters.isAdmin
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
      this.$router.replace('/user')
    },
    searchFilter() {
      this.$store.commit('setSearchKey', this.search)
    }
  }
}
</script>

<style scoped>
header {
  width: 100%;
  height: 4rem;
  background-color: #00C853;
  display: flex;
  justify-content: center;
  align-items: center;
}

header a {
  text-decoration: none;
  color: #fff;
  display: inline-block;
  padding: 0.5rem 1rem;
  border: 1px solid transparent;
}

a:active,
a:hover,
a.router-link-active {
  /*border: 1px solid #f391e3;*/
  color: #0d0dec8c;
}

h1 {
  margin: 0;
}

h1 a {
  color: white;
  margin: 0;
}

h1 a:hover,
h1 a:active,
h1 a.router-link-active {
  border-color: transparent;
}

header nav {
  width: 90%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header_logo {
  margin-left: 50px;
  margin-right: -30px;
}

header ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

::placeholder {
    color: #ced4da;
}

.search-bar {
  margin-right: -220px !important;
}
</style>