import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    activateTimer: false,
    timeLeft: 60,
    hits: 0,
    time: 0,
    cpActiveTestArea: 'instructions',
    questionEditID: 0,
    formQuestionActive: false,
    logged: false,
    isAdmin: false
  },
  getters:{


  },
  mutations: {
    startTimer(state, numQuestion){
      state.timeLeft = 60;
      if (numQuestion > 1)
        state.activateTimer = true;
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
    }

  },
  actions: {


  },
  modules: {

  }
})
