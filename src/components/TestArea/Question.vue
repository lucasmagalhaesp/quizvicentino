<template>
    <div>
        <h2>Pergunta {{ numQuestion }}</h2>
        <h6>{{ currentQuestion.question.description }}</h6>
        <b-form-group>
            <b-form-radio v-for="(answer, index) in currentQuestion.answers" :key="index" v-model="userResponse" name="answer" :value="answer.id" :disabled="disableAnswers">{{ answer.description }}</b-form-radio>
        </b-form-group>
        <b-button-group>
            <b-button variant="success" @click="getCorrectResponse">Confirmar</b-button>
            <b-button variant="info" @click="numQuestion++">Próxima</b-button>
            <b-button variant="danger">Sair</b-button>
        </b-button-group>
    </div>

</template>

<script>
export default {
    data(){
        return {
            currentQuestion: [],
            numQuestion: 0,
            userResponse: 0,
            disableAnswers: false,
            idQuestions: []
        }
    },
    created(){
        this.numQuestion = 1;
    },
    methods:{
        getQuestion(){
            axios.post(`tests/selectTestQuestion`, { idQuestions: this.idQuestions } ).then(response => {
                response =  response.data;
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
                if (response.success){
                    this.checkResponse(response.idCorrectAnswer);
                }
                    
            });
        },
        checkResponse(idCorrectAnswer){
            if (idCorrectAnswer == this.userResponse){
                console.log("Certa resposta");
            }else{
                console.log("Certa incorreta");
            }
            this.disableAnswers = true;
        }
    },
    watch:{
        numQuestion(value){
            if (value > 5){
                console.log('resultado');debugger;
            }

            this.getQuestion();
            this.$store.commit("startTimer");
            this.disableAnswers = false;
        }
    }
}
</script>

<style>

</style>
