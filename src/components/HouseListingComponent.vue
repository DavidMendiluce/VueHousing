<template>
  <div class="no-results-container" v-if="noResults" v-show="noResults">
    <img src="@/assets/img_empty_houses@3x.png"/>
    <p>No results found</p>
    <p>Please try another keyword</p>
  </div>
  <div v-else class="listing-container">
    <h2 v-if="getResultNumber">{{ numberOfHouses }} results found</h2>
    <HouseComponent :house="house" :key="house.id" v-for="house in allHouses" class="house-container"/>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex';
  import HouseComponent from './HouseComponent';
  
  export default {
    name: "HouseListingComponent",
    components: {
      HouseComponent
    },
    methods: {
      ...mapActions(['fetchHouses', 'fetchMyListings'])
    },
    data() {
      return {
        numberOfHouses: 0,
        noResults: false
      }
    },
    computed: mapGetters(['allHouses', 'getResultNumber']),
    watch: {
      allHouses: {
        handler(newFilteredResult) {
        //shows the empty house image in case of no results
          if(newFilteredResult.length === 0) {
            this.noResults = true;
          } else if(newFilteredResult.length > 0) {
            this.noResults = false;
            this.numberOfHouses = newFilteredResult.length;
          }
        }
      }
    },
    created() {
      const currentPath = this.$route.fullPath;
      if(currentPath === '/myListings') {
        this.fetchHouses().then(function() {
              this.fetchMyListings();
            }.bind(this));
      } else {
        this.fetchHouses();
      }
    }
  }
</script>

<style>

</style>