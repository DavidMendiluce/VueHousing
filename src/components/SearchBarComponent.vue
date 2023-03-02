<template>
  <div class="search-bar-container">
    <input v-on:keyup.enter="onEnter()" 
    v-model="text" @input="startTyping" placeholder="Search for a house" 
    class="search-bar"/>
    <img @click="clearInput" v-show="clearBtn"  src="@/assets/ic_clear@3x.png"/>
  </div>
</template>

<script>
  import {mapActions} from 'vuex';

  export default {
    name: "SearchBarComponent",
    methods: {
      ...mapActions(['filterHouses', 'fetchHouses', 'fetchMyListings']),
      startTyping() {
        this.clearBtn = true;
        if(this.text === '') {
          this.clearBtn = false;
        }
      },
      clearInput() {
        this.text = '';
        this.clearBtn = false;
      }
    },
    watch: {
      text(location) {
        if(!this.text) {
          if(this.currentPath === '/myListings') {
            this.fetchHouses().then(function() {
              this.fetchMyListings();
            }.bind(this));
          } else {
            this.fetchHouses()
          }
        } else {
          const payload = [location, this.currentPath];
          this.filterHouses(payload);
        }
      }
    },
    data() {
      return {
        clearBtn : false,
        text: '',
        currentPath: this.$route.fullPath
      }
    }
  }
</script>

<style>
  .search-bar-container {
    display: flex;
    border-radius: 8px;
    width: 400px;
    border: none;
    background: #E8E8E8;
  }

  .search-bar {
    background: url("@/assets/ic_search@3x.png") left no-repeat;
    padding-left: 17px;
    background-size: 20px;
    background-position-x: 15px;
    padding-left: 50px;
    background-repeat: no-repeat;
    outline: none;
    width: 100%;
    border: none;
    color: #4A4B4C;
    font-family: 'Noto Sans', sans-serif;
    font-size: 16px;
  }

  .search-bar::placeholder {
    opacity: 0.6;
  }

  .search-bar-container img {
    width: 20px;
    height: 20px;
    margin: auto 1rem;
    cursor: pointer;
    opacity: 0.8;
  }

  .search-bar-container img:hover {
    opacity: 1;
  }

  @media only screen and (min-width: 320px) 
  and (max-width: 812px) {
    .search-bar-container {
      width: 100%;
    }

    .search-bar {
      width: 80%;
      height: 30px;
      background-size: 15px;
      font-size: 15px;
    }
  }
</style>