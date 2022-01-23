import { store } from 'quasar/wrappers'
import { createStore } from 'vuex'


export default store(function (/* { ssrContext } */) {
  const Store = createStore({
    modules: {
      // example
    },

    state: {
      activateTimer: false,
      timeLeft: 60,
      hits: 0,
      time: 0,
      isQuestionArea: false,
      cpActiveTestArea: 'instructions',
      //cpActiveTestArea: 'result',
      questionEditID: 0,
      formQuestionActive: false,
      logged: false,
      isAdmin: false,
      emailResetPassword: ""
    },
    getters:{
  
  
    },
    mutations: {
      startTimer(state, numQuestion){
        state.timeLeft = 60;
        /* if (numQuestion > 1)
          state.activateTimer = true; */
      },
      stopTimer(state){
        state.activateTimer = false;
        this.commit("addTestTime");
      },
      addHit(state){
        state.hits++;
      },
      addTestTime(state){
        state.time += 60 - state.timeLeft;
      },
    },
    actions: {
  
  
    },

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    //strict: process.env.DEBUGGING
  })

  return Store
})
