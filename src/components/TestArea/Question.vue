<template>
    <div class="row">
        <div class="col">
            <page-title>{{ titleQuestion }}</page-title>
            <section>
                <div class="row justify-center">
                    <div class="col-md-6">
                        <div class="row q-my-md items-center">
                            <div class="col-6 text-center">
                                <test-data></test-data>
                            </div>
                            <div class="col">
                                <timer></timer>
                            </div>
                            <!-- <div class="col-1">
                                <q-btn color="red" size="sm" @click="$store.state.cpActiveTestArea = false" label="Sair" />
                            </div> -->
                        </div>
                        <!-- <div class="row q-mb-md justify-between">
                            
                        </div> -->
                        
                        <div class="column items-center" v-if="betweenQuestions" style="height: 200px">
                            <div class="q-sm-md col-12">
                                <q-spinner-hourglass
                                    color="secondary"
                                    size="7em"
                                />
                            </div>
                        </div>
                        <div class="row q-my-md" v-else>
                            <div class="q-sm-md col-12">
                                <p style="line-height: 20px">{{ currentQuestion.question.description }}</p>
                                <div>
                                    <transition
                                        appear
                                        enter-active-class="animated fadeIn"
                                        leave-active-class="animated fadeOut"
                                    >
                                        <div v-show="!loadConfirm">
                                            <q-option-group
                                                :options="currentQuestion.answers"
                                                label="Notifications"
                                                type="radio"
                                                v-model="userResponse"
                                                name="answer"
                                            />
                                        </div>
                                    </transition>
                                    <q-inner-loading :showing="loadConfirm">
                                       <q-spinner
                                            color="secondary"
                                            size="3em"
                                            :thickness="10"
                                        />
                                    </q-inner-loading>
                                </div>
                            </div>
                        </div>
                        <div class="text-center col-xs-12">
                            <template v-if="!testEnd">
                                <q-btn color="secondary" :loading="loadConfirm" v-if="activateTimer && !betweenQuestions" @click="getCorrectResponse" label="Confirmar" />
                                <!-- <q-btn color="primary" :loading="loadNext" v-if="!activateTimer" @click="numQuestion++" label="Próxima" /> -->
                            </template>
                            <!-- <q-btn color="brown-5" v-else @click="saveTest" class="full-width" label="Resultado" /> -->
                        </div>
                    </div>
                </div>
            </section>            
        </div>
        <q-dialog v-model="resultAlert" persistent>
            <q-card :class="response == 'ok' ? 'bg-secondary' : 'bg-negative'" class="text-white q-py-sm q-px-sm" style="width: 300px">
                <q-card-section>
                    <div class="text-h6 text-center">{{ response == 'ok' ? 'Parabéns!!!' : 'Que pena!!!' }}</div>
                </q-card-section>

                <q-card-section class="q-pt-none q-my-md">
                    {{ response == 'ok' ? 'Você acertou!!!' : 'Você errou!!!' }}
                </q-card-section>

                <q-card-actions align="right">
                    <template v-if="!testEnd">
                        <q-btn label="PRÓXIMA" color="white" :text-color="response == 'ok' ? 'secondary' : 'negative'" @click="numQuestion++" v-close-popup />
                        <q-btn label="SAIR DO TESTE" color="white" :text-color="response == 'ok' ? 'secondary' : 'negative'" @click="$store.state.cpActiveTestArea = false" v-close-popup />
                    </template>
                    <q-btn color="white" :text-color="response == 'ok' ? 'secondary' : 'negative'" v-else @click="saveTest" label="Resultado" />
                </q-card-actions>
            </q-card>
        </q-dialog>
        <q-dialog v-model="timeOver" persistent>
            <q-card class="text-white bg-warning q-py-sm q-px-sm" style="width: 300px">
                <q-card-section>
                    <div class="text-h6 text-center">Atenção!!!</div>
                </q-card-section>

                <q-card-section class="q-pt-none q-my-md">
                    Tempo esgotado para responder essa pergunta
                </q-card-section>

                <q-card-actions align="right">
                    <template v-if="!testEnd">
                        <q-btn label="PRÓXIMA" color="white" text-color="warning" @click="numQuestion++" v-close-popup />
                        <q-btn label="SAIR DO TESTE" color="white" text-color="warning" @click="$store.state.cpActiveTestArea = false" v-close-popup />
                    </template>
                    <q-btn color="white" text-color="warning" v-else @click="saveTest" label="Resultado" />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </div>
</template>

<script>
import Timer from 'components/TestArea/Timer.vue';
import TestData from 'components/TestArea/TestData.vue';
import PageTitle from '../Custom/PageTitle.vue';
export default {
    components:{
        Timer, TestData, PageTitle
    },
    data(){
        return {
            currentQuestion: [],
            numQuestion: 0,
            userResponse: 0,
            disableAnswers: false,
            idQuestions: [],
            response: "",
            testEnd: false,
            loadConfirm: false,
            loadNext: false,
            resultAlert: false,
            betweenQuestions: false,
            timeBetweenQuestions: 2000
        }
    },
    created(){
        if (!this.isQuestionArea) this.$store.state.cpActiveTestArea = "";
        this.$store.state.hits = 0;
        this.$store.state.time = 0;
        this.numQuestion++;
    },
    computed:{
        activateTimer(){
            return this.$store.state.activateTimer
        },
        isQuestionArea:{
            get(){
                return this.$store.state.isQuestionArea;
            },
            set(value){
                this.$store.state.isQuestionArea = value;
            }
            
        },
        titleQuestion(){
            return `Pergunta ${this.numQuestion}`;
        },
        timeOver(){
            return this.$store.state.timeLeft == 0
        }
    },
    methods:{
        getQuestion(){
            this.betweenQuestions = true;
            setTimeout(() => {
                this.loadNext = true;
                this.response = "";
                axios.post(`tests/selectTestQuestion`, { idQuestions: this.idQuestions } )
                .then(response => {
                    response = response.data;
                    if (response.success){
                        this.betweenQuestions = false;
                        this.currentQuestion = response.data;
                        this.alterAnswerObj();
                        this.idQuestions.push(response.indexQuestion);
                        this.$store.state.activateTimer = true;
                    }
                    this.loadNext = false;
                });
            }, this.timeBetweenQuestions);
        },
        alterAnswerObj(){
            this.currentQuestion.answers.forEach(answer => {
                answer.label = answer.description;
                answer.value = answer.id;
                
                delete answer.description;
                delete answer.id;
            });
        },
        getCorrectResponse(){
            this.loadConfirm = true;
            this.$store.commit("stopTimer");
            let idQuestion = this.currentQuestion.question.id;
            axios(`tests/correctAnswer/${idQuestion}`).then(response => {
                response =  response.data;
                if (response.success) this.checkResponse(response.idCorrectAnswer);
            })
            .then(() => this.loadConfirm = false);
        },
        checkResponse(idCorrectAnswer){
            if (idCorrectAnswer == this.userResponse){
                this.response = "ok";
                this.$store.commit("addHit");
            }else{
                this.response = "error";
            }

            this.resultAlert = true;

            this.testEnd = this.numQuestion >= 5 ? true : false;
            this.disableAnswers = true;
        },
        saveTest(){
            let loggedUser = sessionStorage.getItem("quiz_vtoken") || null;
            //verifica se é um usuário logado para que seu teste seja gravado
            if (loggedUser != null){
                axios.post(`tests`, {
                    token: sessionStorage.getItem("quiz_vtoken"),
                    time: this.$store.state.time,
                    hits: this.$store.state.hits, 
                    headers: {
                        Authorization: 'Bearer '+sessionStorage.getItem("quiz_vtoken")
                    }
                }).then(response => {
                    response = response.data;
                    if (response.success) this.$store.state.cpActiveTestArea = "result"
                }).catch(response => {
                    console.error("Erro ao salvar teste");
                    this.$store.state.cpActiveTestArea = "instructions"
                });
            }else{
                this.$store.state.cpActiveTestArea = "result";
            }
        }
    },
    watch:{
        numQuestion(value){
            this.getQuestion();
            this.$store.commit("startTimer", value);
            this.disableAnswers = false;
        },
        timeOver(value){
            if (value){
                this.testEnd = this.numQuestion >= 5 ? true : false;
                this.disableAnswers = true;
            }
        }
    }
}
</script>
<style>
    .question-options input{
        margin-right: 5px
    }

    .question-options label{
        display: initial !important;
    }
</style>
