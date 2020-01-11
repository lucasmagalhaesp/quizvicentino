import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Tests from '../views/Tests.vue'
import TestArea from '../views/TestArea.vue'
import Contact from '../views/Contact.vue'
import Admin from '../views/Admin.vue'
import Ranking from '../views/Ranking.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    component: About
  },
  {
    path: '/test-area',
    name: 'test-area',
    component: TestArea
  },
  {
    path: '/tests',
    name: 'tests',
    component: Tests
  },
  {
    path: '/ranking',
    name: 'ranking',
    component: Ranking
  },
  {
    path: '/admin',
    name: 'admin',
    component: Admin
  },
  {
    path: '/contact',
    name: 'contact',
    component: Contact
  }


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
