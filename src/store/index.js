import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    activateTimer: false,
    timeLeft: 60,

  },
  getters:{


  },
  mutations: {
    startTimer(state){
      state.timeLeft = 60;
      state.activateTimer = true;
    },
    stopTimer(state){
      state.activateTimer = false;
    }

  },
  actions: {


  },
  modules: {

  }
})
