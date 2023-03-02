<template>
  <div class="house-details-main">
    <GoBackComponent :detailsMobile="true" :addUpdate="false"/>
    <div class="house-details-container">
      <img id="current-house-img" :src=currentHouse.image />
      <div class="details-mobile-top">
        <div v-show="currentHouse.madeByMe" class="house-btns-container">
          <EditDeleteBtnComponent :id=currentHouse.id />
        </div>
      </div>
      <div class="house-details-subcontainer">
        <div class="details-title">
          <!-- 'v-if' that checks if location object is created before showing its parameters -->
          <h1 v-if="currentHouse.location">{{ currentHouse.location.street }}</h1>
          <div v-show="currentHouse.madeByMe" class="house-desktop-btns house-btns-container">
            <EditDeleteBtnComponent :id=currentHouse.id />
          </div>
        </div>
        <div class="details-info-top">
          <div class="icon-wrapper">
            <div class="location-img-container">
              <img id="location-img" src="@/assets/ic_location@3x.png"/>
            </div>
            <p v-if="currentHouse.location">{{ currentHouse.location.city }} {{ currentHouse.location.zip }}</p> 
          </div>
        </div>
        <div class="details-info-mid">
          <div class="icon-wrapper">
            <img src="@/assets/ic_price@3x.png"/>
            <p>{{ currentHouse.price }}</p>
          </div>
          <div class="icon-wrapper">
            <img src="@/assets/ic_size@3x.png"/>
            <p>{{ currentHouse.size }}</p>
          </div>
          <div class="icon-wrapper">
            <img id="construction-img" src="@/assets/ic_construction_date@3x.png"/>
            <p>{{ currentHouse.constructionYear }}</p>
          </div>
        </div>
        <div class="details-info-bottom">
          <div class="icon-wrapper">
            <img src="@/assets/ic_bed@3x.png"/>
            <p v-if="currentHouse.rooms">{{ currentHouse.rooms.bedrooms }}</p> 
          </div>
          <div class="icon-wrapper">
            <img src="@/assets/ic_bath@3x.png"/>
            <p v-if="currentHouse.rooms">{{ currentHouse.rooms.bathrooms }}</p> 
          </div>
          <div class="icon-wrapper">
            <img src="@/assets/ic_garage@3x.png"/>
            <p>{{ currentHouse.hasGarage ? 'Yes' : 'No'}}</p> 
          </div>
        </div>
        <div class="details-description">
          <p>{{ currentHouse.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import GoBackComponent from './GoBackComponent';
  import EditDeleteBtnComponent from './EditDeleteBtnComponent';

  export default {
    name: 'HouseDetailsComponent',
    methods: {
      ...mapActions(['fetchHouse']),
      editHouse(id) {
        this.$router.push({ name: 'AddUpdateId', params: { id: id } });
      }
    },
    components: {
      GoBackComponent,
      EditDeleteBtnComponent
    },
    computed: {
      ...mapGetters(['currentHouse', 'getIsMobile'])
    },
    created() {
      this.fetchHouse(this.$route.params.id);
    }
  }
</script>

<style scoped>
  .house-desktop-btns {
    display: flex;
  }

  .details-mobile-top {
    display: none;
  }

  .house-details-main {
    display: flex;
    flex-direction: column;
  }
  
  .house-details-container {
    margin-right: 4rem;
    margin-top: 1rem;
    background-color: white;
    padding-bottom: 2rem;
    box-shadow: 0 0 10px #e8e8e8;
  }

  #current-house-img {
    width: 800px;
    height: 600px;
  }

  .house-details-subcontainer {
    margin: 0 1.5rem;
  }

  .details-title {
    margin-bottom: 0.5rem;
    display: inline-flex;
    width: 100%;
    justify-content: space-between;
  }

  .details-title h1 {
    margin-top: 1rem;
  }

  .house-btns-container {
    width: 100%;
    margin-top: 1.5rem;
  }

  .icon-wrapper {
    margin: 0.5rem 0;
    margin-top: 0.5rem;
    margin-right: 1.5rem;
  }

  .icon-wrapper img {
    width: 20px;
    height: 20px;
  }

  .location-img-container {
    width: 20px;
    display: flex;
    justify-content: center;
  }

  #location-img {
    width: 15px;
  }

  #construction-img {
    width: 20px;
    height: 18px;
  }
  .icon-wrapper p {
    font-weight: 600;
    margin-left: 1rem;
    font-family: 'Noto Sans', sans-serif;
    color: #4A4B4C;
    font-size: 15px;
  }

  .details-description p {
    font-family: 'Noto Sans';
    color: #4A4B4C;
    font-weight: 400;
    font-size: 18px;
    line-height: 1.8;
  }

  @media screen 
  and (min-width: 1200px) 
  and (max-width: 1600px)  { 
    #current-house-img {
      width: 600px;
      height: 400px;
    }
  }

  @media only screen and (min-width: 320px) 
  and (max-width: 812px) {
    .house-desktop-btns {
      display: none;
    }

    .details-mobile-top {
      display: flex;
      position: relative;
      bottom: 24.5rem;
    }

    .details-top-container {
      position: fixed;
      top: 0;
      margin-top: 0;
    }

    .house-details-container {
      margin-right: 0;
      padding-bottom: 0;
      height: auto;
      position: relative;
      bottom: 5rem;
    }

    .details-mobile-top {
      width: 100%;
      display: flex;
    }

    #delete-logo {
      width: 15px;
    }

    .house-btns-container {
      margin-top: 1.45rem;
    }

    #current-house-img {
      width: 100%;
      height: 400px;
    }

    .house-details-subcontainer {
      border-radius: 10px 10px 0 0;
      width: 100%;
      position: relative;
      bottom: 4rem;
      background: white;
      margin-left: 0;
    }

    .details-title {
      margin: 0;
    }

    .details-title h1 {
      margin: 0;
      padding-top: 1rem;
      padding-left: 1rem;
      padding-bottom: 0.5rem;
    }

    .details-info-top,
    .details-info-mid,
    .details-info-bottom{
      padding-left: 1rem;
    }

    .details-description {
      width: 20rem;
    }

    .details-description p {
      padding-left: 1rem;
      font-size: 16px;
    }   
  }
</style>
<style>
  @media only screen and (min-width: 320px) 
  and (max-width: 812px) {
    .house-details-main #go-back-container h3 {
      display: none;
    }

    .house-details-main .arrow-img {
      content:url("@/assets/ic_back_white@3x.png");
    }

    .house-details-main .edit-btn {
      content:url("@/assets/ic_edit_white@3x.png");
      width: 20px !important;
      height: 20px !important;
      margin-right: 1rem !important;
    }

    .house-details-main .delete-btn {
      content:url("@/assets/ic_delete_white@3x.png");
      width: 15px !important;
      height: 20px !important;
      margin-right:  1rem !important;
    }

    .house-details-main #go-back-container {
      height: auto;
    }
  }
</style>