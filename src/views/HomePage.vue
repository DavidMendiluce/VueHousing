<template>
  <div class="home-container">
    <div class="home-sub-container">
      <div class="home-title-container">
        <h1>{{ homeTitle }}</h1>
        <AddHouseBtnComponent/>
      </div>
      <div class="home-top">
        <SearchBarComponent/>
        <SortingComponent/>
      </div>
      <div class="house-listing-container">
        <HouseListingComponent/>
      </div>
    </div>
  </div>
</template>

<script>
  import AddHouseBtnComponent from '@/components/AddHouseBtnComponent';
  import HouseListingComponent from '@/components/HouseListingComponent';
  import SearchBarComponent from '@/components/SearchBarComponent';
  import SortingComponent from '@/components/SortingComponent';

  export default {
    name: "HomePage",
    components: {
      AddHouseBtnComponent,
      SearchBarComponent,
      SortingComponent,
      HouseListingComponent
    },
    data() {
      return {
        homeTitle: 'Houses'
      }
    },
    watch: {
      $route(currentRoute) {
        if(currentRoute.fullPath === '/myListings') {
          this.homeTitle = 'My Houses';
        } else {
          this.homeTitle = 'Houses';
        }
      }
    }
  }
</script>

<style scoped>
  h1 {
      width: 100%;
  }

  .home-container {
    width: 100%;
    display: inline-flex;
    justify-content: center;
  }

  .home-sub-container {
    margin-top: 130px;
    width: 75%
  }

  .home-title-container {
    display: flex;
    justify-content: space-between;
    margin: auto;
  }

  .home-top {
    width: 100%;
    display: inline-flex;
    justify-content: space-between;
    margin-top: 40px;
  }

@media only screen and (min-width: 320px) 
and (max-width: 812px) {
  .home-sub-container {
    margin-top: 40px;
    padding-bottom: 10rem;
    width: 90%;
  }

  .home-title-container {
    display: inline-flex;
    flex-direction: initial;
    width: 100%;
  }

  .home-title-container h1 {
    font-size: 20px;
    text-align: center;
    width: 100%;
    margin-left: 20px;
    margin-bottom: 1rem;
  }

  .home-top {
    display: flex;
    flex-direction: column;
    margin-top: 0.5rem;
  }
}
</style>