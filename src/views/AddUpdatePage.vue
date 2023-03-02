<template>
  <div class="add-update-container">
    <div class="add-update-subcontainer">
      <div class="add-update-wrapper">
        <GoBackComponent/>
        <AddUpdateComponent/>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';

  import GoBackComponent from '@/components/GoBackComponent';
  import AddUpdateComponent from '@/components/AddUpdateComponent';


  export default {
    name: "AddUpdatePage",
    computed: {
      ...mapGetters(['getIsMobile'])
    },
    components: { GoBackComponent, AddUpdateComponent }
  }
</script>

<style>
  .add-update-container {
    width: 100%;
    display: inline-flex;
    justify-content: center;
    background: url('@/assets/img_background@3x.png');
    background-size: cover;
  }

  .add-update-subcontainer {
    margin-top: 130px;
    width: 75%
  }

  .add-update-wrapper {
    width: 400px;
  }

  @media only screen and (min-width: 320px) 
  and (max-width: 812px) {
    .add-update-subcontainer {
      width: 100%;
      margin-top: 10px;
      display: flex;
      justify-content: center;
    }

    .add-update-wrapper {
      width: 95%;
    }
  }
</style>