<template>
    <div>
        <b-row>
             <b-col>
                <h2>Pergunta {{ numQuestion }}</h2>
             </b-col>
        </b-row>
        <b-row>
            <b-col md="8">
                <timer></timer>
            </b-col>
            <b-col>
                <test-data></test-data>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <h6>{{ currentQuestion.question.description }}</h6>
                <b-form-group>
                    <b-form-radio v-for="(answer, index) in currentQuestion.answers" :key="index" v-model="userResponse" name="answer" :value="answer.id" :disabled="disableAnswers">{{ answer.description }}</b-form-radio>
                </b-form-group>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-alert show variant="success" v-if="response == 'ok'">VOCÊ ACERTOU!!!</b-alert>
                <b-alert show variant="danger" v-if="response == 'error'">VOCÊ ERROU!!!</b-alert>
            </b-col>
        </b-row>
        <template v-if="!testEnd">
            <b-button variant="success" v-if="activateTimer" @click="getCorrectResponse">Confirmar</b-button>
            <b-button variant="info" v-if="!activateTimer" @click="numQuestion++">Próxima</b-button>
        </template>
        <b-button variant="primary" v-else @click="saveTest">Resultado</b-button>
        <!-- <b-button variant="danger">Sair</b-button> -->
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
        this.numQuestion++;
    },
    computed:{
        activateTimer(){
            return this.$store.state.activateTimer
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
                userID: 1,
                time: this.$store.state.time,
                hits: this.$store.state.hits
            }).then(response => {
                response = response.data;
                if (response.success){
                    alert("Teste cadastrado com sucesso");
                } 
            });
        }
    },
    watch:{
        numQuestion(value){
            if (value > 5){
                console.log('resultado');debugger;
            }

            this.getQuestion();
            this.$store.commit("startTimer", value);
            this.disableAnswers = false;
        }
    }
}
</script>