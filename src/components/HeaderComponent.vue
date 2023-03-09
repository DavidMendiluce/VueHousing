<template>
  <header>
    <nav class="desktopNav">
      <ul>
        <li><router-link id="logo-link" to="/"><img src="@/assets/logo.png"/></router-link></li>
        <li><router-link data-cy="house-link" @click="showAllHouses" :class="[currentRoute !== '/about' &&  currentRoute !== '/myListings' ? 'router-link-active' : '']" to="/">Houses</router-link></li>
        <li><router-link data-cy="about-link" to="/about">About</router-link></li>
      </ul>
    </nav>
    <nav class="mobileNav">
      <ul>
        <li class="house-icon"><router-link :class="[currentRoute !== '/about' ? 'router-link-active' : '']" to="/"></router-link></li>
        <li class="info-icon"><router-link to="/about"></router-link></li>
      </ul>
    </nav>
  </header>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';


  export default {
    name: 'HeaderComponent',
    methods: {
      isMobile() {
        if(( window.innerWidth <= 800 ) && ( window.innerHeight <= 950 )) {
          this.toggleMobile('mobile');
          return true;
        } else {
          this.toggleMobile('desktop');
          return false;
        }  
      },
      showAllHouses() {
        this.fetchHouses()
      },
      ...mapActions(['toggleMobile', 'fetchMyListings', 'fetchHouses'])
    },
    computed: {
      currentRoute() {
        return this.$route.fullPath;
      },
      ...mapGetters(['getIsMobile'])
    }
  }
</script>

<style>
  .desktopNav {
    display: flex;
  }

  .mobileNav {
    display: none;
  }

  nav {
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: center;
    background-color: white;
    box-shadow: 0 4px 2px -2px #e8e8e8;
    position: fixed;
    overflow: hidden;
    top: 0;
    z-index: 5;
  }

  header ul {
    display: inline-flex;
    width: 75%;
    padding-left: 0;
    height: 100%;
    margin: 0;
  }

  header li {
    list-style-type: none;
    justify-content: center;
    display: flex;
    flex-direction: column;
  }

  header img {
    height: 60px;
    cursor: pointer;
  }

  #logo-link {
    opacity: 1;
    margin: 0;
    height: 60px;
  }

  header a {
    text-decoration: none;
    margin-left: 4rem;
    color: #000000;
    opacity: 0.3;
    font-size: 18px;
    font-weight: 500;
  }

  header a:hover {
    opacity: 0.4;
  }

  header .router-link-active {
    font-weight: 500;
    opacity: 1;
  }

  header .router-link-active:hover {
    opacity: 1;
  }

  /*Media query for mobile*/
  @media only screen and (min-width: 320px) 
  and (max-width: 812px) {
    .desktopNav {
      display: none;
    }
    
    .mobileNav {
      display: flex;
    }

    header nav {
      bottom: 0;
      top: auto;
      border-top: 1px solid rgba(240, 240, 240,0.9);
    }

    header ul {
      justify-content: space-around;
      width: 100%;
    }

    header a {
      margin-left: 0;
    }

    header img {
      height: 35px;
    }

    header .house-icon a {
      background-image: url('~@/assets/ic_mobile_navigarion_home_active@3x.png');
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
      width: 35px;
      height: 35px;
    }

    header .info-icon a {
      background-image: url('~@/assets/ic_mobile_navigarion_info_active@3x.png');
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
      width: 35px;
      height: 35px;
    }
  }

</style>
