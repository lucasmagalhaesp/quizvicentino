<template>
    <div>
        <b-jumbotron class="page-title headline" :header="titleQuestion"></b-jumbotron>
        <b-row class="margin-vert-30">
            <b-row style="margin: 0">
                <b-col md="8">
                    <timer></timer>
                </b-col>
                <b-col md="3" class="text-right col-xs-10">
                    <test-data></test-data>
                </b-col>
                <b-col md="1" class="col-xs-2">
                    <b-button size="sm" variant="warning" @click="$store.state.cpActiveTestArea = false">Sair</b-button>
                </b-col>
            </b-row>
           
            <b-col md="12">
                <h6 style="line-height: 20px">{{ currentQuestion.question.description }}</h6>
                <b-form-group>
                    <b-form-radio v-for="(answer, index) in currentQuestion.answers" :key="index" v-model="userResponse" name="answer" :value="answer.id" :disabled="disableAnswers" class="question-options">{{ answer.description }}</b-form-radio>
                </b-form-group>
            </b-col>
            <b-col md="4" class="text-center col-md-offset-4">
                <b-alert show variant="success" v-if="response == 'ok'">VOCÊ ACERTOU!!!</b-alert>
                <b-alert show variant="danger" v-if="response == 'error'">VOCÊ ERROU!!!</b-alert>
            </b-col>
            <b-col class="text-center col-xs-12">
                <template v-if="!testEnd">    
                    <b-button variant="success" class="col-md-offset-5 col-xs-12 col-md-2" v-if="activateTimer" @click="getCorrectResponse">Confirmar</b-button>
                    <b-button variant="info" class="col-md-offset-5 col-xs-12 col-md-2" v-if="!activateTimer" @click="numQuestion++">Próxima</b-button>
                </template>
                <b-button variant="primary" class="col-md-offset-5 col-xs-12 col-md-2" v-else @click="saveTest">Resultado</b-button>
            </b-col>
            
            <!-- <b-button variant="danger">Sair</b-button> -->
        </b-row>
    </div>

</template>

<script>
import Timer from '@/components/TestArea/Timer.vue'
import TestData from '@/components/TestArea/TestData.vue'
export default {
    components:{
        Timer, TestData
    },
    data(){
        return {
            currentQuestion: [],
            numQuestion: 0,
            userResponse: 0,
            disableAnswers: false,
            idQuestions: [],
            response: "",
            testEnd: false
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
        }
    },
    methods:{
        getQuestion(){
            this.response = "";
            axios.post(`tests/selectTestQuestion`, { idQuestions: this.idQuestions } ).then(response => {
                response = response.data;
                if (response.success){
                    this.currentQuestion = response.data;
                    this.idQuestions.push(response.indexQuestion);
                } 
            });
        },
        getCorrectResponse(){
            this.$store.commit("stopTimer");
            let idQuestion = this.currentQuestion.question.id;
            axios(`tests/correctAnswer/${idQuestion}`).then(response => {
                response =  response.data;
                if (response.success) this.checkResponse(response.idCorrectAnswer);
            });
        },
        checkResponse(idCorrectAnswer){
            if (idCorrectAnswer == this.userResponse){
                this.response = "ok";
                this.$store.commit("addHit");
            }else{
                this.response = "error";
            }

            this.testEnd = this.numQuestion >= 5 ? true : false;
            this.disableAnswers = true;
        },
        saveTest(){
            axios.post(`tests`, { 
                token: sessionStorage.getItem("quiz_vtoken"),
                time: this.$store.state.time,
                hits: this.$store.state.hits, 
               /*  headers: {
                    Authorization: 'Bearer '+sessionStorage.getItem("quiz_vtoken")
                } */
            }).then(response => {
                response = response.data;
                if (response.success) this.$store.state.cpActiveTestArea = "result"
            });
        }
    },
    watch:{
        numQuestion(value){
            this.getQuestion();
            this.$store.commit("startTimer", value);
            this.disableAnswers = false;
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
