import About from 'pages/About.vue'
import Tests from 'pages/Tests.vue'
import Instructions from 'pages/TestArea/Instructions.vue'
import TestArea from 'pages/TestArea/Questions.vue'
import Result from 'pages/TestArea/Result.vue'
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
        path: '/sobre',
        name: 'about',
        component: About
      },
      {
        path: '/login',
        name: 'login',
        component: Login
      },
      {
        path: '/cadastrar',
        name: 'register',
        component: Register
      },
      {
        path: '/jogar/instrucoes',
        name: 'instructions',
        component: Instructions
      },
      {
        path: '/jogar/area-teste',
        name: 'test-area',
        component: TestArea
      },
      {
        path: '/jogar/resultado',
        name: 'result',
        component: Result
      },
      {
        path: '/testes',
        name: 'tests',
        component: Tests
      },
      {
        path: '/ranking',
        name: 'ranking',
        component: Ranking
      },
      {
        path: '/recuperar-senha',
        name: 'resetPassword',
        component: ResetPassword
      },
      {
        path: '/esqueci-minha-senha',
        name: 'forgotPassword',
        component: ForgotPassword
      },
      {
        path: '/admin/perguntas',
        name: 'questions',
        component: Questions
      },
      {
        path: '/admin/usuarios',
        name: 'users',
        component: Users
      },
      {
        path: '/admin/testes',
        name: 'all-tests',
        component: AllTests
      },
      {
        path: '/contato',
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
