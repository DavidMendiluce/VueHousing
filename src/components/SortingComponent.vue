<template>
  <div class="sorting-btns-wrapper">
    <button class="sortPriceBtn" :class="priceActive ? 'sort-btn-active': 'sort-btn-inactive'" @click="sortPriceBtnClick(allHouses)">
      <span>Price</span>
    </button>
    <button class="sortSizeBtn" :class="priceActive ? 'sort-btn-inactive': 'sort-btn-active'" @click="sortSizeBtnClick(allHouses)">
      <span>Size</span>
    </button>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex';

  export default {
    name: "SortingComponent",
    data() {
      return {
        priceActive: true
      }
    },
    methods: {
      ...mapActions(['sortHouses']),
      sortPriceBtnClick() {
        this.priceActive = true;
        this.sortHouses('price');
      },

      sortSizeBtnClick() {
        this.priceActive = false; 
        this.sortHouses('size');
      }
    },
    computed: mapGetters(['allHouses'])
  }
</script>

<style>
  .sorting-btns-wrapper {
    width: 300px;
  }

  .sorting-btns-wrapper button {
    width: 50%;
    height: 45px;
    border: 0;
    font-weight: 600;
    font-size: 18px;
    font-family: 'Nunito', sans-serif;
    color: white;
    cursor: pointer;
  }

  .sortSizeBtn {
    border-radius: 0px 8px 8px 0px;
  }

  .sortPriceBtn {
    border-radius: 8px 0px 0px 8px;
  }

  .sort-btn-active {
    background-color: #3a73c1;
  }

  .sort-btn-inactive {
    background-color: #C3C3C3;
  }
  
  @media only screen and (min-width: 320px) 
  and (max-width: 812px) {
    .sorting-btns-wrapper {
      margin-top: 1rem;
      display: flex;
      width: 100%;
    }

    .sorting-btns-wrapper button {
      height: 35px;
      display: flex;
    }

    .sorting-btns-wrapper button span {
      margin: auto;
      font-size: 12px;
    }
  }
</style>