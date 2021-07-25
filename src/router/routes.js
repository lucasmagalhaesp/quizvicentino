import About from 'pages/About.vue'
import Tests from 'pages/Tests.vue'
import TestArea from 'pages/TestArea.vue'
import Contact from 'pages/Contact.vue'
import Ranking from 'pages/Ranking.vue'
import Login from 'pages/Login.vue'
import Register from 'pages/Register.vue'
import Questions from 'pages/Admin/Questions.vue'
import Users from 'pages/Admin/Users.vue'
import AllTests from 'pages/Admin/Tests.vue'
import ResetPassword from 'pages/ResetPassword.vue'
import ForgotPassword from 'pages/ForgotPassword.vue'

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { 
        path: '', 
        name: 'index',
        component: () => import('pages/Index.vue')
      },
      {
        path: '/about',
        name: 'about',
        component: About
      },
      {
        path: '/login',
        name: 'login',
        component: Login
      },
      {
        path: '/register',
        name: 'register',
        component: Register
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
        path: '/reset-password',
        name: 'resetPassword',
        component: ResetPassword
      },
      {
        path: '/forgot-password',
        name: 'forgotPassword',
        component: ForgotPassword
      },
      {
        path: '/admin/questions',
        name: 'questions',
        component: Questions
      },
      {
        path: '/admin/users',
        name: 'users',
        component: Users
      },
      {
        path: '/admin/tests',
        name: 'all-tests',
        component: AllTests
      },
      {
        path: '/contact',
        name: 'contact',
        component: Contact
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
