<template>
        <div class="row justify-center">
            <div class="col-md-6">
                <div class="row q-my-md items-center">
                    <div class="col-12 col-md-6 text-center">
                        <test-data></test-data>
                    </div>
                    <div class="col-12 col-md" :class="$q.screen.lt.sm ? 'q-mt-md' : ''">
                        <timer></timer>
                    </div>
                    <!-- <div class="col-1">
                        <q-btn color="red" size="sm" @click="$store.state.cpActiveTestArea = false" label="Sair" />
                    </div> -->
                </div>
                
                <div class="row justify-center items-center" v-if="betweenQuestions" style="height: 200px">
                    <div class="q-sm-md col-12 text-center">
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
                <div v-if="!testEnd" class="row">
                    <div class="col-12 text-center" :class="$q.screen.lt.sm ? '' : 'q-gutter-md'">
                        <q-btn v-if="activateTimer && !betweenQuestions" label="Confirmar" color="secondary" icon="fas fa-check" :loading="loadConfirm" @click="getCorrectResponse" :class="$q.screen.lt.sm ? 'full-width' : ''" />
                        <q-btn v-if="activateTimer && !betweenQuestions" label="SAIR DO TESTE" color="negative" icon="fas fa-ban" @click="exitTest" :class="$q.screen.lt.sm ? 'full-width q-mt-md' : ''" />
                    </div>
                </div>
            </div>
        </div>        
        <q-dialog v-model="resultAlert" persistent>
            <q-card :class="response == 'ok' ? 'bg-secondary' : 'bg-negative'" class="text-white q-py-sm q-px-sm" style="width: 300px">
                <q-card-section>
                    <div class="text-h6 text-center">{{ response == 'ok' ? 'Parabéns!!!' : 'Que pena!!!' }}</div>
                </q-card-section>

                <q-card-section class="q-pt-none q-my-md text-center">
                    <i v-if="response == 'ok'" class="fas fa-thumbs-up fa-5x"></i>
                    <i v-else class="fas fa-thumbs-down fa-5x"></i>
                </q-card-section>

                <q-card-section class="q-pt-none q-my-md text-center">
                    {{ response == 'ok' ? 'Você acertou!!!' : 'Você errou!!!' }}
                </q-card-section>

                <q-card-actions align="center">
                    <template v-if="!testEnd">
                        <q-btn label="PRÓXIMA" icon-right="fas fa-arrow-right" color="white" :text-color="response == 'ok' ? 'secondary' : 'negative'" @click="$store.commit('goToNextQuestion', true)" v-close-popup />
                        <!-- <q-btn label="SAIR DO TESTE" icon="fas fa-ban" color="white" :text-color="response == 'ok' ? 'secondary' : 'negative'" @click="exitTest" v-close-popup /> -->
                    </template>
                    <q-btn label="Resultado" color="white" icon="fas fa-poll-h" :text-color="response == 'ok' ? 'secondary' : 'negative'" v-else @click="saveTest" />
                </q-card-actions>
            </q-card>
        </q-dialog>
        <q-dialog v-model="timeOver" persistent>
            <q-card class="text-white bg-warning q-py-sm q-px-sm" style="width: 300px">
                <q-card-section>
                    <div class="text-h6 text-center">Atenção!!!</div>
                </q-card-section>

                <q-card-section class="q-pt-none q-my-md text-center">
                    <i class="fas fa-hourglass-end fa-5x"></i>
                </q-card-section>

                <q-card-section class="q-pt-none q-my-md">
                    Tempo esgotado para responder essa pergunta
                </q-card-section>

                <q-card-actions align="center">
                    <template v-if="!testEnd">
                        <q-btn label="PRÓXIMA" color="white" icon-right="fas fa-arrow-right" text-color="warning" @click="$store.commit('goToNextQuestion', true)" v-close-popup />
                        <!-- <q-btn label="SAIR DO TESTE" color="white" icon="fas fa-ban" text-color="warning" @click="exitTest" v-close-popup /> -->
                    </template>
                    <q-btn label="Resultado" color="white" icon="fas fa-poll-h" text-color="warning" v-else @click="saveTest" />
                </q-card-actions>
            </q-card>
        </q-dialog>
</template>

<script>
import Timer from 'components/TestArea/Timer'
import TestData from 'components/TestArea/TestData'
export default {
    components:{
        Timer, TestData
    },
    data(){
        return {
            currentQuestion: [],
            //numQuestion: 0,
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
        this.$store.commit("goToNextQuestion", true);
        /* this.$store.state.hits = 0;
        this.$store.state.time = 0; */

        /* this.$store.commit("resetTestData");
        this.$store.commit("addQuestionId", null);
        this.$store.commit("addAnswerId", null); */
    },
    unmounted(){
       // this.$store.commit("isQuestionArea", false)
    },
    computed:{
        activateTimer(){
            return this.$store.state.activateTimer
        },
        titleQuestion(){
            return `Pergunta ${this.numQuestion}`
        },
        timeOver(){
            return this.$store.state.timeLeft == 0
        },
        token(){
            return this.$store.state.token
        },
        userType(){
            return this.$store.state.user.type
        },
        numQuestion(){
            return this.$store.getters.currentQuestionNumber
        }
    },
    methods:{
        getQuestion(){
            this.betweenQuestions = true;
            setTimeout(() => {
                this.loadNext = true;
                this.response = "";
                //axios.post(`tests/selectTestQuestion`, { idQuestions: this.idQuestions } )
                axios.post(`tests/selectTestQuestion`, { idQuestions: this.$store.state.questionsIds } )
                .then(response => {
                    response = response.data;
                    if (response.success){
                        this.betweenQuestions = false;
                        this.currentQuestion = response.data;
                        this.alterAnswerObj();
                        //this.idQuestions.push(response.indexQuestion);
                        this.$store.commit("addQuestionId", response.indexQuestion);
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
            axios(`tests/correctAnswer/${idQuestion}`)
            .then(response => {
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

            this.$store.commit("addAnswerId", this.userResponse);
            this.resultAlert = true;

            this.testEnd = this.numQuestion >= 5 ? true : false;
            this.disableAnswers = true;
        },
        saveTest(){
            let loggedUser = this.token || null;

            //verificar se o usuário tentou responder todas as perguntas ou "pulou" alguma. Caso tenha pulado adicionar 60 segundos a cada pergunta.
            this.checkAnswersGiven();

            //verifica se é um usuário logado para que seu teste seja gravado
            if (loggedUser != null){
                axios.post(`tests`, {
                    token: this.token,
                    time: this.$store.state.time,
                    hits: this.$store.state.hits,
                    questionsIds: this.$store.state.questionsIds,
                    answersIds: this.$store.state.answersIds,
                    headers: {
                        Authorization: 'Bearer '+this.token
                    }
                }).then(response => {
                    response = response.data;
                    if (response.success) {
                        this.$store.state.lastTestID = response.data.id;
                        this.$router.push({ name: "result" });
                    }
                }).catch(response => {
                    console.error("Erro ao salvar teste");
                    this.$router.push({ name: "instructions" });
                });
            }else{
                this.$router.push({ name: "result" });
            }
        },
        exitTest(){
            this.$q.dialog({
                title: "Sair?",
                message: "Deseja realmente sair do teste?",
                html: true,
                class: "bg-negative text-white q-py-sm q-px-sm",
                ok: {
                    push: true,
                    color: "white",
                    textColor: "black",
                    label: "SIM"
                },
                cancel: {
                    push: true,
                    color: "white",
                    textColor: "red",
                    label: "NÃO"
                }
            })
            .onOk(() => this.$router.push({ name: "instructions" }))
            .onCancel(() => {
            });
        },
        checkAnswersGiven(){
            let numResponses = this.$store.state.answersIds.length;
            if (numResponses < 5){
                for(let i = numResponses; i < 5; i++){
                    this.$store.commit("addTestTime", true);
                }
            }
        }
    },
    watch:{
        numQuestion(value){
            if (value > 5) this.$router.push({ name: "instructions" });
            else {
                this.getQuestion();
                this.$store.commit("startTimer", value);
                this.disableAnswers = false;
            }
        },
        timeOver(value){
            if (value){
                this.$store.commit("addAnswerId", 0);
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
