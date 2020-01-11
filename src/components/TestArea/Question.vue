<template>
    <div>
        <h2>Pergunta {{ numQuestion }}</h2>
        <h6>{{ questions[numQuestion - 1].question.description }}</h6>
        <b-form-group>
            <b-form-radio v-for="(answer, index) in questions[numQuestion - 1].answers" :key="index" v-model="userResponse" name="answer" :value="answer.id" :disabled="disableAnswers">{{ answer.description }}</b-form-radio>
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
            questions: [],
            numQuestion: 1,
            userResponse: 0,
            disableAnswers: false,
        }
    },
    created(){
        axios("tests/createTest").then(response => {
            response =  response.data;
            if (response.success){
                this.questions = response.data;
                this.$store.commit("startTimer");
            } 
        });
    },
    methods:{
        getCorrectResponse(){
            this.$store.commit("stopTimer");
            let idQuestion = this.questions[this.numQuestion - 1].question.id;
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
            this.$store.commit("startTimer");
            this.disableAnswers = false;
        }
    }
}
</script>

<style>

</style>
