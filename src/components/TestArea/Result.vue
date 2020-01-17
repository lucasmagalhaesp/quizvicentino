<template>
    <div>
        <h2>Resultado</h2>
        <p>Acertos: {{ hits }}</p>
        <p>Tempo: {{ time }}</p>
        <h4 v-html="resultText"></h4>
        <img src="" alt="">
        <b-button variant="primary" @click="playAgain">Jogar novamente</b-button>
        <b-button variant="info" @click="myTests">Meus testes</b-button>
        <b-button variant="secondary" @click="ranking">Ranking</b-button>
    </div>
</template>

<script>
import testData from "@/mixins/testData"
export default {
    mixins: [testData],
    data(){
        return {
            resultText: ""
        }
    },
    created(){
        axios(`tests/resultText/${this.hits}`).then(response => {
            response = response.data;
            if (response.success) this.resultText = response.data;
        });
    },
    methods:{
        playAgain(){
            this.$store.state.cpActiveTestArea = ""
        },
        myTests(){
            this.$router.push({ name: "tests" });
        },
        ranking(){
            this.$router.push({ name: "ranking" });
        }
    }
}
</script>