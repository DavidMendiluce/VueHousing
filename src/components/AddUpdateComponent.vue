<template>
  <form @submit="onSubmit">
    <div class="form-control">
      <label>Street name*</label>
      <input type="text" v-model="streetName" name="streetName"
      placeholder="Enter the street name" :class="{ invalid: isSubmitting && !streetName.trim() }"/>
    </div>
    <div class="double-input-container">
      <div class="form-control">
        <label>House number*</label>
        <input type="number" v-model="houseNumber" name="houseNumber"
        placeholder="Enter the house number" :class="{ invalid: isSubmitting && houseNumber === '' }"/>
      </div>
      <div class="form-control">
        <label>Addition (optional)</label>
        <input type="text" v-model="numberAddition" name="numberAddition"
        placeholder="e.g. A"/>
      </div>
    </div> 
    <div class="form-control">
      <label>Postal code*</label>
      <input type="text" v-model="zip" name="zip"
      placeholder="e.g. 1000 AA" :class="{ invalid: isSubmitting && !zip.trim() }"/>
    </div>
    <div class="form-control">
      <label>City*</label>
      <input type="text" v-model="city" name="city"
      placeholder="e.g. Utrecht" :class="{ invalid: isSubmitting && !city.trim() }"/>
    </div>
    <div class="form-control">
      <div v-if="noImage" class="image-upload">
        <label>Upload picture (PNG or JPG)*</label>
        <label for="file-input">
          <img :class="{ invalid: isSubmitting && !fileLoaded }" src='@/assets/ic_upload@3x.png' />
        </label>
        <input @change="uploadImage($event)" name="imageUpload" id="file-input" type="file" />
      </div>
      <div v-else class="preview-image-wrapper">
        <img class="preview-image" :class="{ invalidImg: isSubmitting && !fileLoaded }" :src=imagePreview />
        <img @click="removeImage()" class="closing-icon" src="@/assets/ic_clear_white@3x.png"/>
      </div>
    </div>
    <div class="form-control">
      <label>Price*</label>
      <input type="number" v-model="price" name="price"
      placeholder="e.g. €150.000" :class="{ invalid: isSubmitting && price === '' }"/>
    </div>
    <div class="double-input-container">
      <div class="form-control">
        <label>Size*</label>
        <input type="number" v-model="size" name="size"
        placeholder="e.g. 60m2" :class="{ invalid: isSubmitting && size === '' }"/>
      </div>
      <div class="form-control">
        <label>Garage*</label>
        <div class="select-background" :class="{ invalid: isSubmitting && garage === ''}">
          <select @click="changeOpacity" :style="{opacity: selectOpacity}" name="garage" v-model="garage">
            <option value="" disabled select hidden><span>Select</span></option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
      </div>
    </div> 
    <div class="double-input-container">
      <div class="form-control">
        <label>Bedrooms*</label>
          <input type="number" v-model="bedrooms" name="bedrooms"
          placeholder="Enter amount" :class="{ invalid: isSubmitting && bedrooms === '' }"/>
      </div>
      <div class="form-control">
          <label>Bathrooms*</label>
          <input type="number" v-model="bathrooms" name="bathrooms"
          placeholder="Enter amount" :class="{ invalid: isSubmitting && bathrooms === '' }"/>
      </div>
    </div> 
    <div class="form-control">
      <label>Construction date*</label>
      <input type="number" v-model="constructionYear" name="cosntructionDate"
      placeholder="e.g. 1990" :class="{ invalid: isSubmitting && !constructionYear === '' }"/>
    </div>
    <div class="form-control">
      <label>Description*</label>
      <textarea id="description" type="text" v-model="description" name="description"
      placeholder="Enter description" :class="{ invalid: isSubmitting && !description.trim() }"></textarea>
    </div>
    <div v-show="isError" class="error-message">
      <p>{{ errorMessage }}</p>
    </div>
    <div class="submit-btn-wrapper">
      <input id="submit-btn" type="submit" :value=formBtnText
      class="btn btn-block inactive" :class="isActive"/>
    </div>
  </form>
</template>
    
<script>
  import { mapActions, mapGetters } from 'vuex';

  export default {
    name: "AddUpdateComponent",
    data() {
      return {
        editPath: false,
        streetName: '',
        houseNumber: '',
        numberAddition: '',
        zip: '',
        city: '',
        price: '',
        size: '',
        garage: '',
        bedrooms: '',
        bathrooms: '',
        constructionYear: '',
        description: '',
        formTitle: '',
        isError: false,
        errorMessage: 'Required Field Missing',
        isSubmitting: false,
        imageFile: '',
        imagePreview: require(`@/assets/ic_upload@3x.png`),
        fileLoaded: false,
        noImage: true,
        formBtnText: 'POST',
        selectOpacity: 0.5
      }
    },
    methods: {
      ...mapActions(['addUpdateHouse', 'fetchHouse']),
      onSubmit(e) {
        e.preventDefault();
        var navigation = this.$router;
        this.isSubmitting = true;
        if(this.garage === 'true') {
            this.garage = true
          } else {
            this.garage = false
          }
        const newListing = {
          houseNumber: this.houseNumber,
          numberAddition: this.numberAddition,
          location: {
            street: this.streetName,
            zip: this.zip,
            city: this.city,
          },
          price: this.price,
          size: this.size,
          hasGarage: this.garage,
          rooms: {
            bedrooms: this.bedrooms,
            bathrooms: this.bathrooms,
          },
          constructionYear: this.constructionYear,
          description: this.description,
          madeByMe: true
        }
        if(!this.streetName || !this.houseNumber ||
          !this.zip || !this.city || !this.price || !this.size ||
          this.garage === '' || !this.bedrooms || !this.bathrooms ||
          !this.constructionYear || !this.description || !this.imageFile) {
          this.isError = true;
        } else {
          let id;
          if(this.$route.params.id) {
            id = this.$route.params.id;
          }
          /*send data to the 'add/update' action,
          *and relocate the user to the new created house*/
          const postPayload = [newListing, this.imageFile, id]
          this.addUpdateHouse(postPayload).then(function(id) {
            navigation.push({ name: 'HouseDetails', params: { id: id } });
          })
        }
      },
      async uploadImage(event) {
        this.imageFile = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(this.imageFile);
        reader.onload = function() {
          this.imagePreview = reader.result;
        }.bind(this)
        if(event.target.files.length) {
          this.fileLoaded = true;
          this.noImage = false;
        }
      },
      removeImage() {
        this.noImage = true;
      },
      changeOpacity() {
        this.selectOpacity = 1;
      },
      calculateNumberAddition(streetString) {
        var streetArray = streetString.split("");
        var additionArray = [];
        for(let i = streetArray.length; i>=0;i--) {
          if(!this.isNumber(streetArray[i])) {
            additionArray.push(streetArray[i]);
          } else {
            i = 0;
          }
        }
        return additionArray.join('').toString();
      },
      isNumber(n) { return !isNaN(parseFloat(n)) && !isNaN(n - 0) }
    },
    computed: {
      ...mapGetters(['currentHouse']),
      //checks if the form fields have been filled
      isActive() {
        return {
          active: this.streetName && this.houseNumber && 
          this.zip &&this.city && this.price && 
          this.size && this.bedrooms && 
          this.bathrooms && this.constructionYear && 
          this.description && this.imageFile 
        }
      }
    },
    created() {
      //Fills the form inputs if the user edits a listing
      if(this.$route.params.id) {
        this.editPath = true;
        this.noImage = false;
        this.formTitle = 'Edit Listing';
        this.formBtnText = 'SAVE';
        this.fetchHouse(this.$route.params.id).then(function() {
          if(this.currentHouse.location) {
            var streetName =  this.currentHouse.location.street.match(/[a-zA-Z]+/g);    
            this.streetName = streetName.toString().replaceAll(",", " ");
            this.houseNumber = this.currentHouse.houseNumber;
            this.numberAddition = this.calculateNumberAddition(this.currentHouse.location.street);
            this.zip = this.currentHouse.location.zip.toString();
            this.city = this.currentHouse.location.city.toString();
            this.price = this.currentHouse.price.toString();
            this.size = this.currentHouse.size.toString();
            this.garage = this.currentHouse.hasGarage.toString();
            this.bedrooms = this.currentHouse.rooms.bedrooms.toString();
            this.bathrooms = this.currentHouse.rooms.bathrooms.toString();
            this.constructionYear = this.currentHouse.constructionYear.toString();
            this.description = this.currentHouse.description.toString();
            this.imagePreview = this.currentHouse.image;
            this.imageFile = this.currentHouse.image;
            this.fileLoaded = true
          }
        }.bind(this)) 
      } else {
          this.formTitle = 'Create New Listing';
      }
    }
  }
</script>

<style scoped>
  form {
    margin-top: 2rem;
  }
  
  .image-upload>input {
    display: none;
  }

  .error-message p {
    color: red;
  }
  
  .inactive {
    opacity: 0.2;
  }
  
  .active {
    opacity: 0.9;
  }

  .active:hover {
    opacity: 1;
  }

  .invalid {
    border: 1px solid red;
  }

  .double-input-container {
    display: flex;
    justify-content: space-between;
  }

  .double-input-container .form-control {
    width: 48%;
  }

  .form-control {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
  }

  label {
    font-size: 14px;
    font-weight: 600;
    color: #4A4B4C;
    margin-bottom: 0.5rem;
  }

  input, select, textarea {
    padding-left: 1rem;
    height: 50px;
    border: none;
    outline: none;
    border-radius: 8px;
    font-family: 'Noto Sans';
  }

  select {
    background: transparent;
    width: 95%;
  }

  .select-background {
    background-color: white;
    border-radius: 8px;
  }

  input::placeholder, select::placeholder, textarea::placeholder {
    opacity: 0.7;
  }

  #description {
    height: 120px;
    padding: 1rem;
  }

  .image-upload {
    display: flex;
    flex-direction: column;
  }

  .image-upload img {
    padding: 3rem;
    background-image: repeating-linear-gradient(-17deg, #b8b8b8, #b8b8b8 15px, transparent 15px, transparent 26px, #b8b8b8 26px), repeating-linear-gradient(73deg, #b8b8b8, #b8b8b8 15px, transparent 15px, transparent 26px, #b8b8b8 26px), repeating-linear-gradient(163deg, #b8b8b8, #b8b8b8 15px, transparent 15px, transparent 26px, #b8b8b8 26px), repeating-linear-gradient(253deg, #b8b8b8, #b8b8b8 15px, transparent 15px, transparent 26px, #b8b8b8 26px);
    background-size: 1px 100%, 100% 1px, 1px 100% , 100% 1px;
    background-position: 0 0, 0 0, 100% 0, 0 100%;
    background-repeat: no-repeat;
    width: 30px;
  }

  .preview-image-wrapper {
    display: inline-block;
    position: relative;
    width: 150px;
    padding-top: 1rem;
    padding-right: 1rem;
  }

  .preview-image {
    width: 150px;
    height: 150px;
    border-radius: 8px;
  }
  
  .closing-icon {
    position: absolute;
    width: 30px;
    top: 0;
    right: 0;
    cursor: pointer;
  }

  .submit-btn-wrapper {
    display: inline-flex;
    justify-content: end;
    width: 100%;
    margin-top: 1rem;
    margin-bottom: 3rem;
  }

  #submit-btn {
    width: 220px;
    height: 50px;
    background-color: #3a73c1;
    color: white;
    display: inline-flex;
    justify-content: center;
    border: none;
    border-radius: 10px;
    font-weight: 600;
    font-size: 18px;
    font-family: 'Nunito', sans-serif;
    cursor: pointer;
  }


  @media only screen and (min-width: 320px) 
  and (max-width: 812px) { 
    form {
      margin: 1rem;
    }

    form label {
      font-size: 12px;
    }

    form input {
      height: 40px;
      font-size: 12px;
    }

    .submit-btn-wrapper {
      margin-bottom: 7rem;
    }

    #submit-btn {
      width: 100%;
    }
  }
</style>
