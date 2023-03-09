<template>
  <div class="back" id="go-back-container">
    <router-link to="/">
      <img class="arrow-img"/>
    </router-link>
    <h3>Back to Overview</h3>
  </div>
</template>

<script>

export default {
  name: 'GoBackComponent',
  data() {
    return {
      addUpdateTitle: 'Create New Listing',
      currentRoute : this.$route.name,
      whiteBack: false
      }
  },
  props: {
    detailsMobile: Boolean,
    addUpdate: Boolean
  },
  created() {
    if(this.currentRoute === 'AddUpdateId') {
      this.addUpdateTitle = 'Edit Listing';
    } else {
      this.addUpdateTitle = 'Create New Listing'
    }
  }
}
</script>

<style>
  .arrow-img {
    content:url("@/assets/ic_back_grey@3x.png");
  }

  #go-back-container {
    display: inline-flex;
  }

  #go-back-container a {
    display: flex;
  }

  #go-back-container img {
    width: 25px;
    height: 25px;
    margin: 0 auto;
  }

  #go-back-container h3 {
    margin: 0 1rem;
    font-family: 'Nunito', sans-serif;
    font-weight: 650;
  }

  @media only screen and (min-width: 320px) 
  and (max-width: 812px) {
    #go-back-container {
      z-index: 5;
      position: relative;
      height: 400px;
    }

    #go-back-container-add-update {
      display: flex;
      height: auto;
    }

    #go-back-container-add-update img {
      width: 20px;
      height: 20px;
    }

    #go-back-container-add-update h3 {
      margin: 1rem 2rem;
      width: 55%;
      text-align: center;
    }

    #go-back-container-add-update a {
      margin: auto 1rem;
    }

    #go-back-container a {
      padding: 1rem;
    }
  }
    
</style>
