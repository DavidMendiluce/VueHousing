import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ImageKit from "imagekitio-vue"

createApp(App)
.use(router)
.use(store)
.use(ImageKit, {
  urlEndpoint: "your_url_endpoint",
  // publicKey: "your_public_api_key",
  // authenticationEndpoint: "https://www.your-server.com/auth"
})
.mount('#app')
