<template>
  <div data-cy="house-container" @click="houseDetails(house.id)" class="house-container">
    <div class="house-left-subcontainer">
      <div class="image-wrapper">
        <img :src=house.image />
      </div>
    </div>
    <div class="house-right-subcontainer">
      <div class="house-right-wrapper">
        <div class="house-description-wrapper">
          <h1 v-if="house.location" class="title">{{ house.location.street }}</h1>
          <h3 class="price">{{ house.price }}</h3>
          <p v-if="house.location" class="location">{{ zipCode }}<br><span>{{ house.location.city }}</span></p>
          <div v-if="house.rooms" class="icons-container">
            <div class="icon-wrapper">
              <img id="bedroom-icon" src="@/assets/ic_bed@3x.png"/>
              <p>{{ house.rooms.bedrooms }}</p>
            </div>
            <div class="icon-wrapper">
              <img src="@/assets/ic_bath@3x.png"/>
              <p>{{ house.rooms.bathrooms }}</p>
            </div>
            <div class="icon-wrapper">
              <img src="@/assets/ic_size@3x.png"/>
              <p>{{ house.size }}</p>
            </div>  
          </div>
        </div>
        <div v-show="house.madeByMe" class="house-btns-container">
          <EditDeleteBtnComponent :id=house.id />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import EditDeleteBtnComponent from './EditDeleteBtnComponent';

  export default {
    name: 'HouseComponent',
    props: {
      house: Object
    },
    methods: {
      houseDetails(id) {
        this.$router.push({ name: 'HouseDetails', params: { id: id } });
      }
    },
    computed: {
      zipCode() {
        return this.house.location.zip.split(" ").join("");
      }
    },
    components: {
      EditDeleteBtnComponent
    }
  }
</script>

<style>

  .house-container {
    width: 100%;
    margin: 1rem 0rem;
    display: inline-flex;
    background: white;
    border: none;
    border-radius: 8px;
    box-shadow: 0 0 10px #e8e8e8;
  }


  .house-container:hover {
    cursor: pointer;
    background-color:rgba(260, 260, 260,0.5);
  }

  .house-left-subcontainer img {
    width: 170px;
    height: 170px;
    padding: 1rem;
    border-radius: 30px;
  }

  .house-right-subcontainer {
    display: flex;
    width: 100%;
  }

  .house-right-wrapper {
    display: inline-flex;
    height: 80%;
    margin: auto;
    width: 100%;
  }

  .house-description-wrapper {
    width: 40%;
  }

  .house-description-wrapper .title {
    margin: 0;
    font-size: 20px;
  }

  .house-description-wrapper .price {
    font-weight: 600;
    font-size: 18px;
    color: #4A4B4C;
  }

  .house-description-wrapper .location {
    display: inline-flex;
    width: 100%;
    color: #4A4B4C;
    opacity: 0.7;
    font-family: 'Noto Sans', sans-serif;
    font-size: 18px;
  }

  .house-description-wrapper .location span {
    margin-left: 0.5rem;
  }

  .icons-container {
      display: inline-flex;
  }

  .icon-wrapper {
    display: inline-flex;
  }

  .icon-wrapper img {
    width: 20px;
    height: 20px;
    margin: auto;
  }

  #bedroom-icon {
    height: 16px;
  }

  .icon-wrapper p {
    margin: auto 0.8rem;
  }

  .house-btns-container {
    width: 100%;
  }

  .no-results-container {
    display: flex;
    justify-content: center;
    flex-direction: column;
    height: 50vh;
  }

  .no-results-container img {
    width: 300px;
    margin: auto;
  }
  .no-results-container p {
    text-align: center;
    margin-top: 0;
    margin-bottom: 0;
    font-weight: 300;
    font-family: 'Nunito', sans-serif;
    color: #4A4B4C;
  }

  @media screen 
  and (min-width: 1200px) 
  and (max-width: 1600px)  { 
    .house-description-wrapper h1, .house-description-wrapper .location {
          width: 200px;
    }
  }

  @media only screen and (min-width: 320px) 
  and (max-width: 812px) {
    .listing-container {
      margin-top: 20px;
      overflow-x: scroll;
    }

    .house-container {
      display: inline-flex;
      margin: 0.5rem 0;
      padding: 0;
    }

    .image-wrapper {
      width: 100%;
      height: auto;
      display: inline-flex;
      justify-content: center;
    }

    .image-wrapper img {
      margin: auto;
      width: 100px;
      height: 100px;
      padding: 0.5rem;
    }

    .house-description-wrapper .title,
    .house-description-wrapper .price,
    .house-description-wrapper .location {
      margin: 0;
      font-size: 12px;
    }

    .house-description-wrapper .title {
      width: 100px;
    }

    .house-description-wrapper .location {
      width: 150px;
    }
          
    .house-container .icon-wrapper {
      margin-right: 0.5rem;
    }

    .house-container .icon-wrapper img {
      width: 15px;
      height: 12px;
    }

    .house-container .icon-wrapper p {
      margin-left: 0.5rem;
      font-size: 10px;
    }
  }
</style>