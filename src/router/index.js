import { route } from 'quasar/wrappers'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.MODE === 'ssr' ? void 0 : process.env.VUE_ROUTER_BASE)
  })

  let publicRoutes = ["/", "/contact", "/about", "/login", "/register", "/reset-password", "/forgot-password", "/test-area"];
  let privateRoutes = ["/tests", "/ranking", "/admin"];

  /* Router.beforeEach((to, from, next) => {
    if (!privateRoutes.includes(to.path)){
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
  }); */

  return Router
})
