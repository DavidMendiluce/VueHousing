import {createRouter, createWebHistory} from 'vue-router'

import HomePage from '../views/HomePage'
import AboutPage from '../views/AboutPage'
import HouseDetailsPage from '../views/HouseDetailsPage'
import AddUpdatePage from '../views/AddUpdatePage'

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage
  },
  {
    path: '/about',
    name: 'AboutPage',
    component: AboutPage
  },
  {
    path: '/myListings',
    name: 'MyListingsPage',
    component: HomePage
  },
  {
    path: '/houseDetails/:id',
    name: 'HouseDetails',
    component: HouseDetailsPage
  }, 
  {
    path: '/addUpdate/:id',
    name: 'AddUpdateId',
    component: AddUpdatePage
  },
  {
    path: '/addUpdate',
    name: 'AddUpdate',
    component: AddUpdatePage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router