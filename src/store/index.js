import {createStore} from 'vuex';
import housesModule from './modules/housesModule';

export default createStore({
  modules: {
    housesModule
  }
});