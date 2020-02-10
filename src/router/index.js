import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Tests from '../views/Tests.vue'
import TestArea from '../views/TestArea.vue'
import Contact from '../views/Contact.vue'
import Admin from '../views/Admin.vue'
import Ranking from '../views/Ranking.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Questions from '../views/Admin/Questions.vue'
import Users from '../views/Admin/Users.vue'
import AllTests from '../views/Admin/Tests.vue'
import ResetPassword from '../views/ResetPassword.vue'
import ForgotPassword from '../views/ForgotPassword.vue'

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
  /* {
    path: '/admin',
    //name: 'admin',
    //component: Admin,
    children:[
      {
        path: '',
        //name: 'questions',
        component: Admin,
      },
      {
        path: '/admin/questions',
        //name: 'questions',
        component: Questions,
      },
      {
        path: 'tests',
        //name: 'tests',
        component: Tests,
      },
      {
        path: 'users',
        //name: 'users',
        component: Users,
      }
    ]
  }, */
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

let publicRoutes = ["/", "/contact", "/about", "/login", "/register", "/reset-password", "/forgot-password"];
let privateRoutes = ["/test-area", "/tests", "/ranking", "/admin"];

router.beforeEach((to, from, next) => {
  if (publicRoutes.includes(to.path)){
    next()
  }else{
    axios.get("auth/me", {
      headers: {
          Authorization: 'Bearer '+sessionStorage.getItem("quiz_vtoken")
      }
    }).then(response => {
        if (response.data.id) next()
        else next("/login");
    }).catch(error => {
        next("/login");
        console.error(error);
    });
  }
});

export default router
