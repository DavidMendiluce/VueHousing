<template>
  <div id="desktopAddBtn" class="btn-add-container">
    <button @click="addHouse()">
      <div class="plus-icon-wrapper">
        <img src="@/assets/ic_plus_white@3x.png"/>
      </div>
      <span>CREATE NEW</span>
    </button>
  </div>
  <div id="mobileAddBtn" class="btn-add-container-mobile">
    <img @click="addHouse()" src="@/assets/ic_plus_grey@3x.png"/>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'AddHouseBtnComponent',
    methods: {
      addHouse() {
        this.$router.push({ name: 'AddUpdate'});
      }
    },
    computed: {
      ...mapGetters(['getIsMobile'])     
    },
  }
</script>

<style scoped>
  #desktopAddBtn {
    display: flex;
  }

  #mobileAddBtn {
    display: none;
  }

  .btn-add-container {
    width: 100%;
    display: inline-flex;
    justify-content: end;
  }

  .btn-add-container button {
    width: 210px;
    height: 50px;
    background-color: #3a73c1;
    color: white;
    display: inline-flex;
    justify-content: center;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    opacity: 0.9;
  }

  .btn-add-container button:hover {
    opacity: 1;
  }

  .btn-add-container .plus-icon-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 25%;
    height: 100%;
  }

  .btn-add-container button span {
    width: 75%;
    margin: auto 0;
    text-align: start;
    font-weight: 600;
    font-size: 18px;
    font-family: 'Nunito', sans-serif;
  }

  .btn-add-container button img {
    width: 18px;
    height: 18px;
    margin: 0 auto;
  }

  .btn-add-container-mobile {
    display: flex;
  }

  .btn-add-container-mobile img {
    width: 20px;
    height: 20px;
    margin: auto;
  }


  @media only screen and (min-width: 320px) 
  and (max-width: 812px) {
    #desktopAddBtn {
      display: none;
    }
    
    #mobileAddBtn {
      display: flex;
    }

    .btn-add-container {
      width: 50px;
    }

    .btn-add-container button {
        height: 35px;
    }
      
  }

</style>