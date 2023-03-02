<template>
  <HeaderComponent/>
  <router-view></router-view>
</template>

<script>
  import HeaderComponent from './components/HeaderComponent';
  export default {
    name: 'App',
    components: {
      HeaderComponent
    }
  }
</script>

<style>
  body {
    margin: 0;
    background-color: #F6F6F6;
  }

  #app {
    font-family: 'Montserrat', sans-serif;

  }
</style>
