<template>
    <b-row class="margin-vert-30">
        <b-col md="12">
            <div class="headline">
                <h2>Resultado</h2>
            </div>
        </b-col>
        <b-row>
            <b-col md="4">
                <img :src="img" alt="">
            </b-col>
            <b-col md="8">
                <div class="panel panel-primary text-center" style="padding: 40px 0">
                    <!-- <div class="panel-heading">
                        <h3 class="panel-title">Primary Panel</h3>
                    </div> -->
                    <div class="panel-body result-datas">
                        <b-badge variant="primary" style="margin-right: 10px">Acertos: {{ hits }}</b-badge>
                        <b-badge variant="primary">Tempo gasto: {{ time }}</b-badge>
                        
                        <h4 v-html="resultText" class="result-text lead"></h4>
                        <div class="btns-result">
                            <b-button variant="primary" @click="playAgain">Jogar novamente</b-button>
                            <b-button variant="info" @click="myTests">Meus testes</b-button>
                            <b-button class="btn-aqua" @click="ranking">Ranking</b-button>
                        </div>
                        
                    </div>
                </div>
                
            </b-col>
        </b-row>
    </b-row>
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
        this.$store.state.isQuestionArea = false;
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
    },
    computed:{
        img(){
            return `images/result/${this.hits}.png`;
        }
    }
}
</script>
<style>
    .result-datas .badge{
        font-size: 17px;
        padding: 10px
    }
    .result-text{
        margin: 30px 0
    }
    .btns-result .btn{
        margin-left: 15px
    }
</style>
