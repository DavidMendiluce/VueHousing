<template>
  <div v-show="deleteConfirmation" class="grey-layer">
    <div class="confirm-box">
      <div class="confirm-wrapper">
        <h1>Delete listing</h1>
        <div class="confirm-text">
          <p>Are you sure you want to delete this listing?</p>
          <p>This action cannot be undone.</p>
        </div>
        <input @click="confirmDelete($event, id)" type="submit" value="YES, DELETE"/>
        <input id="go-back-btn" @click="goBack($event)" type="submit" value="GO BACK"/>
      </div>
    </div>
  </div>
  <div class="house-btns-wrapper">
    <img class="edit-btn" @click="editHouse($event, id)" src="@/assets/ic_edit@3x.png" />
    <img class="delete-btn" @click="removeHouse($event, id)" src="@/assets/ic_delete@3x.png" />
  </div> 
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';

  export default {
    name: 'EditDeleteBtnComponent',
    data() {
      return {
        editLogo: require(`@/assets/ic_edit@3x.png`),
        deleteLogo: require(`@/assets/ic_delete@3x.png`),
        whiteDeleteLogo: false,
        currentPath: this.$route.name,
        deleteConfirmation: false
      }
    },
    props: {
          id: String
    },
    methods: {
      ...mapActions(['deleteHouse']),
      removeHouse(e) {
        e.stopPropagation();
        this.deleteConfirmation = true;
      },

      editHouse(e, id) {
        e.stopPropagation();
        this.$router.push({ name: 'AddUpdateId', params: { id: id } });
      },

      confirmDelete(e, id) {
        e.stopPropagation();
        const navigation = this.$router;
        const path = this.currentPath;
        this.deleteHouse(id).then(function() {
          if(path.includes('HouseDetails')) {
            navigation.push({ name: 'HomePage'});
          }
        })
      },

      goBack(e) {
        e.stopPropagation();
        this.deleteConfirmation = false;
      }
    },
    computed: {
      ...mapGetters(['getIsMobile'])
    }
  }
</script>

<style scoped>
  .grey-layer {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 5;
    background-color: rgba(125, 125, 125,0.5);
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .confirm-box {
    display: inline-flex;
    flex-direction: inl;
    justify-content: center;
    height: 400px;
    width: 700px;
    margin: auto;
    background: white;
    border-radius: 8px;
  }

  .confirm-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0 auto;
    width: 65%;
  }

  .confirm-wrapper h1 {
    text-align: center;
    font-size: 25px;
    margin-bottom: 2rem;
  }

  .confirm-text {
    margin-bottom: 3rem;
  }

  .confirm-wrapper p {
    text-align: center;
    font-size: 18px;
    margin: 0;
    font-family: 'Noto Sans';
    opacity: 0.9;
  }

  .confirm-wrapper input {
    margin-bottom: 1.5rem;
    width: 80%;
    height: 45px;
    background-color: #3a73c1;
    color: white;
    display: inline-flex;
    justify-content: center;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    font-size: 16px;
    font-family: 'Nunito', sans-serif;
    cursor: pointer;
    opacity: 0.9;
    margin-left: auto;
    margin-right: auto;
  }

  .confirm-wrapper input:hover {
    opacity: 1;
  }

  #go-back-btn {
    background-color: #4A4B4C;
  }

  .house-btns-wrapper {
    width: 100%;
    display: inline-flex;
    justify-content: end;
  }

  .house-btns-wrapper img {
    width: 20px;
    height: 20px;
    margin-right: 1rem;
    opacity: 0.9;
    cursor: pointer;
    z-index: 1;
  }

  .house-btns-wrapper img:hover {
    opacity: 1;
  }

  .house-btns-wrapper .white-delete-icon, .house-btns-wrapper .white-edit-icon {
    height: 20px;
    margin-right: 1rem;
  }
  .house-btns-wrapper .white-delete-icon {
    width: 15px;
  }

  .house-btns-wrapper .white-edit-icon {
    width: 20px;
  }

  @media only screen and (min-width: 320px) 
  and (max-width: 812px) {
    .house-btns-wrapper img {
      width: 15px;
      height: 15px;
      margin-right: 0.5rem;
    } 
  }

</style>