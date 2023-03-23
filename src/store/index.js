import { store } from 'quasar/wrappers'
import { createStore } from 'vuex'

import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
  storage: window.sessionStorage,
});


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
      emailResetPassword: "",


      logged: false,
      isAdmin: false,
      token: null,
      user: {
        name: "",
        email: "",
        type: null // visitor or registered
      },

      currentQuestionNumber: 0,
      questionsIds: [],
      answersIds: [],
      lastTestID: null,

      formQuestions: {
        description: "",
        answers: {
            a: "",
            b: "",
            c: "",
            d: "",
        },
        correctAnswer: "a",
        expiration_date: "",
        active: true
      }

    },
    getters:{
      currentQuestionNumber(state){
        return state.currentQuestionNumber
      },
      questionEditID(state){
        return state.questionEditID;
      },

      formQuestions(state){
        return state.formQuestions
      },

      userData(state){
        return state.user
      },

      logged(state){
        return state.logged
      }
  
    },
    mutations: {
      login(state, data){
        state.logged = true;
        state.isAdmin = data.isAdmin == "S" ? true : false;
        state.token = data.access_token;
        state.user.name = data.name;
        state.user.email = data.email;
        state.user.type = "registered";
      },
      logout(state){
        state.logged = false;
        state.isAdmin = false;
        state.token = null;
        state.user.name = "";
        state.user.email = "";
        state.user.type = null;
      },
      cpActiveTestArea(state, cp = "instructions"){
        state.cpActiveTestArea = cp;
      },
      isQuestionArea(state, value = false){
        state.isQuestionArea = value;
      },
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
      addTestTime(state, addOneMinute = false){
        if (!addOneMinute) state.time += 60 - state.timeLeft;
        else state.time += 60;
      },
      resetTestData(state){
        state.hits = 0;
        state.time = 0;
        state.activateTimer = false;
        state.timeLeft = 60;
        state.currentQuestionNumber = 0;
        state.lastTestID = null;
        /* state.isQuestionArea = false;
        state.cpActiveTestArea = "instructions"; */
      },
      addQuestionId(state, id){
        if (id == null) state.questionsIds = [];
        else state.questionsIds.push(id);
      },
      addAnswerId(state, id){
        if (id == null) state.answersIds = [];
        else state.answersIds.push(id);
      },
      goToNextQuestion(state, advance = true){
        if (!advance) state.currentQuestionNumber = 0;
        else state.currentQuestionNumber = ++state.currentQuestionNumber;
      },
      questionEditID(state, id){
        state.questionEditID = id;
      },
      formQuestions(state, dados){
        state.formQuestions.description = dados.description;
        state.formQuestions.answers = dados.answers;
        state.formQuestions.correctAnswer = dados.correctAnswer;
        state.formQuestions.expiration_date = dados.expiration_date;
        state.formQuestions.active = dados.active;
      },
      clearFormQuestions(state){
        state.formQuestions = {
          description: "",
          answers: {
              a: "",
              b: "",
              c: "",
              d: "",
          },
          correctAnswer: "a",
          expiration_date: "",
          active: true
        }
      }
      
    },
    actions: {
  
  
    },

    
    plugins: [vuexLocal.plugin],

    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    //strict: process.env.DEBUGGING
  })

  return Store
})
