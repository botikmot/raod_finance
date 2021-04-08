<template>
  <div v-if="isLoggedIn" class="row d-flex justify-content-between">
    <div class="w-25">
      <div class="input-group">
        <span class="input-group-text">Filter</span>
        <select class="form-select" id="inputGroupSelect01" v-model="filter">
          <option selected>This Month</option>
          <option>Allotment Class</option>
        </select>
      </div>
    </div>
    <div class="mr-3 w-25">
      <input 
        class="form-control py-2 rounded-pill search-bar" 
        type="search" 
        placeholder="Search.."
        v-model="search"
        @keyup="searchFilter"
      >
    </div>
  </div>
  <div v-if="filter === 'Allotment Class'" class="pt-3 d-flex">
    <div style="width: 200px;">
      <select class="form-select" aria-label="Default select example" v-model="aclass">
        <option selected>PS</option>
        <option>MOOE</option>
        <option>CO</option>
      </select>
    </div>
    <div style="width: 300px;" class="input-group px-3">
      <span class="input-group-text">Activity</span>
      <select class="form-select" id="inputGroupSelect01" v-model="activity">
        <option v-for="item in activities" :key="item.id">{{ item.name }}</option>
      </select>
    </div>
    <div style="width: 200px;" class="input-group px-3">
      <span class="input-group-text">Year</span>
      <select class="form-select" id="inputGroupSelect01" v-model="year">
        <option v-for="item in years" :key="item">{{ item }}</option>
      </select>
    </div>
    <div class="pt-2">
       Total Records: {{ filterResult.length }}
    </div>
  </div>

  <hr v-if="isLoggedIn"/>
  <div v-if="displayedPosts.length > 0">
    <data-item v-for="data in displayedPosts" :key="data.id" :data="data"></data-item>
  </div>
  <div v-else>
      <base-card>No Data.</base-card>
  </div>
  <base-card v-if="filterResult.length > 5">
  <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item">
          <button type="button" class="page-link" v-if="page != 1" @click="page--"> Previous </button>
        </li>
        <li class="page-item">
          <button 
            type="button" 
            class="page-link" 
            v-for="pageNumber in pages.slice(page-1, page+5)" 
            :key="pageNumber"
            @click="page = pageNumber"
          > {{pageNumber}} </button>
        </li>
        <li class="page-item">
          <button type="button" @click="page++" v-if="page < pages.length" class="page-link"> Next </button>
        </li>
      </ul>
    </nav>
  </base-card>
</template>

<script>
import BaseCard from '../ui/BaseCard.vue'
import DataItem from './DataItem'

export default {
  components: {
    DataItem,
    BaseCard
  },
  data(){
    return {
      activity: '',
      dateFrom: null,
      dateTo: null,
      filter: 'This Month',
      selectedFilter: null,
      filterOffice: '',
      datas: [],
      status: '',
      page: 1,
      perPage: 5,
      pages: [],
      search: '',
      payable: false,
      aclass: 'PS',
      year: '2021',
      years: ['2020','2021','2022','2023','2024','2025','2026','2027','2028','2029',]
    }
  },
   watch: {
    filterResult() {
      console.log(this.filterResult.length)
      this.setPages();
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated
    },
    raodData(){
      return this.$store.getters.raodData
    },
    totalObligation(){
      let paid = 0
      for (let index = 0; index < this.filterResult.length; index++) {
        if(this.filterResult[index].status === 'paid'){
          let obli = this.filterResult[index].obligation.split(',').join('');
          paid = paid + parseFloat(obli)
        } 
      }
      return paid
    },
    balance() {
      return this.$store.getters.balance
    },
    activities() {
      return this.$store.getters.activities
    },
    unobligated(){
      return this.$store.getters.paid
    },
    searchKey(){
      return this.search
    },
    filterResult(){
      let startDate = null
      let endDate = null
      if(this.selectedFilter === 'Date'){
        startDate = new Date(this.dateFrom)
        endDate = new Date(this.dateTo)
      }else {
        let newdate = new Date(), y = newdate.getFullYear(), m = newdate.getMonth();
        startDate = new Date(y, m, 1);
        endDate = new Date(y, m + 1, 0);
      }
      return this.raodData.filter(d => {
        //d.obligation = d.obligation.toLocaleString()
        if(this.searchKey !== ''){
          return (d.name.toLowerCase().includes(this.searchKey.toLowerCase()) || d.particular.toLowerCase().includes(this.searchKey.toLowerCase()) || d.serial.includes(this.searchKey))
        }else if(this.filter === 'Allotment Class'){
          let year = d.date.split('-')[0]
          if(this.aclass === 'PS'){
            if(this.activity !== ''){
              return (d.allotclass === 'PS' && d.activity === this.activity && year === this.year)
            }else{
              return (d.allotclass === 'PS' && year === this.year)
            }
          }else if(this.aclass === 'MOOE'){
            if(this.activity !== ''){
              return (d.allotclass === 'MOOE' && d.activity === this.activity && year === this.year)
            }else{
              return (d.allotclass === 'MOOE' && year === this.year)
            }
          }else {
            if(this.activity !== ''){
              return (d.allotclass === 'CO' && d.activity === this.activity && year === this.year)
            }else{
              return (d.allotclass === 'CO' && year === this.year)
            }
          }    
        }else if(this.selectedFilter === 'Status'){
          return (d.status === this.status)
        }else{
          let date = new Date(d.date)
          return (date >= startDate && date <= endDate)
        }
      })
    },
    displayedPosts () {
      return this.paginate(this.filterResult);
    }
  },
  methods: {
    filterData(){
      this.selectedFilter = this.filter
    },
    setPages () {
      this.pages = []
      let numberOfPages = Math.ceil(this.filterResult.length / this.perPage);
      for (let index = 1; index <= numberOfPages; index++) {
        this.pages.push(index);
      }
    },
    paginate (posts) {
      let page = this.page;
      let perPage = this.perPage;
      let from = (page * perPage) - perPage;
      let to = (page * perPage);
      return  posts.slice(from, to);
    }
  }
}
</script>

<style scoped>
button.page-link {
  display: inline-block;
}
button.page-link {
    font-size: 12px;
    color: #00C853;
    font-weight: 500;
}
.offset{
  width: 500px !important;
  margin: 20px auto;  
}
</style>