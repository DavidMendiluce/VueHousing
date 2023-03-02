<template>
  <div class="details-page-container">
    <div class="details-page-subcontainer">
      <GoBackComponent v-show="!getIsMobile" :detailsMobile="false" :addUpdate="false"/>
      <div class="details-top-container">
        <HouseDetailsComponent/>
        <div class="recommended-container">
          <h1>Recommended for you</h1>
          <HouseComponent :house="house" :key="house.id" v-for="house in allHouses" class="house-container"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import HouseComponent from '../components/HouseComponent';
  import GoBackComponent from '@/components/GoBackComponent';
  import HouseDetailsComponent from '@/components/HouseDetailsComponent';


  export default {
    name: "HouseDetailsPage",
    methods: {
      ...mapActions(['fetchHouses']),
    },
    computed: {
      ...mapGetters(['allHouses', 'getIsMobile'])     
    },
    components: {
      HouseDetailsComponent,
      GoBackComponent,
      HouseComponent
    },
    created() {
      this.fetchHouses();
      window.scrollTo(0,0);
    }
  }
</script>

<style scoped>
  h1 {
      margin: 0;
  }

  .details-page-container {
    width: 100%;
    display: inline-flex;
    justify-content: center;
  }

  .details-page-subcontainer {
    margin-top: 130px;
    width: 75%;
  }

  .details-top-container {
    display: inline-flex;
    margin-top: 2rem;
  }

  .recommended-container {
    scale: 0.7;
    transform-origin: top;
  }

  @media only screen and (min-width: 320px) 
  and (max-width: 812px) {
    .details-page-subcontainer {
      margin-top: 40px;
      padding-bottom: 10rem;
      width: 100%;
      display: flex;
      flex-direction: column;
      margin-top: 0;
    }

    .details-top-container {
      margin-top: 0;
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    .recommended-container {
      scale: 1;
      transform-origin: auto;
      margin-top: 2rem;
      font-size: 22px;
    }

    .recommended-container h1 {
      font-size: 22px;
    }
  }
</style>