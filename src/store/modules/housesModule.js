import axios from "axios";
import apiPath from '/src/assets/apiPath.txt';
import auth from '/src/assets/auth.txt';
import imageApi from '/src/assets/imageApi.txt';

const state = {
  houses: [],
  userHouse: {},
  sortingType: 'price',
  mobile: Boolean,
  resultNumber: Boolean
};

const getters = {
  allHouses: (state) => state.houses,
  currentHouse: (state) => state.userHouse,
  getResultNumber: (state) => state.resultNumber,
  getIsMobile: (state) => state.mobile
};

const actions = {
  async fetchHouses({commit, state}) {
    const currentSortingType = state.sortingType;
    const data = await getHouses();
    commit('setHouses', data);
    commit('setSortHouses', currentSortingType);
    commit('toggleResultNumber', false);   
  },
  //Fetch a single house with a given id
  async fetchHouse({commit}, id) {
    const data = await getHouses();
    const userHouse = data.filter(function(house) {
        return house.id === id
    });
    const userHouseObject = userHouse[0];
    commit('setHouse', userHouseObject);
  },
  //Add or edit a house depending on the payload
  async addUpdateHouse({commit}, payload) {
    const house = payload[0];
    const image = payload[1];
    let houseId = payload[2];
    let imageType = typeof(image);
    //Edit listing
    if(houseId) {
      //No change in image file
      if(imageType === 'string') {
        await axios.put(apiPath + "/" + houseId, house)
        .then(async function () {
          commit('newHouse', house);
        })    
        .catch(function (error) {
          console.log(error);
        })
      } else {
      //Added new image
        await uploadImage(image).then(function(imagePath) {
          house.image = imagePath;
        }).then(async function() {
          await axios.put(apiPath + "/" + houseId, house)
          .then(async function () {
            commit('newHouse', house);
          })    
          .catch(function (error) {
            console.log(error);
          })
        })
      }
    } else {
      //Add listing
      await uploadImage(image).then(function(imagePath) {
        house.image = imagePath;
      }).then(async function() {
        await axios.post(apiPath, house)
        .then(async function (response) {
          const data = response.data;
          houseId = data.id;
          commit('newHouse', house);
        })    
        .catch(function (error) {
          console.log(error);
        })
      })
    }
    return houseId;
  },
  async deleteHouse({commit}, id) {
    await axios.delete(apiPath + "/" + id)
    .catch(function (error) {
        console.log(error);
    })
    commit('removeHouse', id);
  },
  async fetchMyListings({commit}) {
    commit('setMyListings')
  },
  /*
  *Filter houses array depending on location,
  *previously sorted,
  *and setting previous filters such as houses made byh me,
  */
  async filterHouses({commit, state}, payload) {
    const location = payload[0];
    const currentPath = payload[1];
    const currentSortingType = state.sortingType;
    const data = await getHouses();
    commit('setHouses', data);
    if(currentPath === '/myListings') {
      commit('setMyListings');
    }
    commit('setFilterHouses', location);
    commit('setSortHouses', currentSortingType);
    commit('toggleResultNumber', true);
  },
  async sortHouses({commit}, type) {
    commit('setSortHouses', type);
    commit('setSortingType', type);
  },
  //Check if its a mobile device
  async toggleMobile({commit}, screen) {
    if(screen === 'mobile') {
        commit('setMobile', true)
    } else {
        commit('setMobile', false)
    }
  } 
}

const mutations = { 
  setHouses(state, houses) {
    return state.houses = houses
  },
  newHouse(state, house) {
    return state.houses.unshift(house)
  },
  removeHouse(state, id) {
    return state.houses = state.houses.filter(function(house) {
      return house.id !== id
    })
  },
  setMyListings(state) {
    return state.houses = state.houses.filter(function(house) {
      return house.madeByMe === true 
    })
  },
  setFilterHouses(state, location) {
    return state.houses = state.houses.filter(function(house) {
      return house.location.city.toLowerCase().includes(location.toLowerCase()) 
    })
  },
  setSortHouses(state, type) {
    state.houses = state.houses.sort(function(a, b) {
      return a[type] - b[type]
    })
  },
  setSortingType(state, type) {
    return state.sortingType = type
  },
  setHouse(state, userHouse) {
    return state.userHouse = userHouse
  },
  setMobile(state, mobile) {
    return state.mobile = mobile
  },
  toggleResultNumber(state, resultNumber) {
    return state.resultNumber = resultNumber
  }
}

async function getHouses() {
  return await axios.get(apiPath)
  .then(async function (response) {
    const data = response.data;
    return data;
  })
  .catch(function (error) {
    console.log(error);
  })
}

async function uploadImage(imageFile) {
  let filePath = '';
  var formData = new FormData();
  formData.append("image", imageFile);
  await axios.post(imageApi, formData, {
    headers: {
      Authorization: 'Bearer ' + auth
    }
  }).then(async function(response) {
    const data = response.data;
    filePath = data.files[0].fileUrl
  })
  .catch(function (error) {
    console.log(error);
  })
  return filePath
}

export default {
  state,
  getters,
  actions,
  mutations
}