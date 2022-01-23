<template>
    <div class="col">
        <page-title>Resultado</page-title>
        <transition
            appear
            enter-active-class="animated fadeIn"
            leave-active-class="animated fadeOut"
        >
            <div v-show="!loadInfos">
                <div class="row justify-center q-mt-md">
                    <img :src="img" alt="" style="max-height: 200px">
                </div>
                <div class="row">
                    <div class="col-xs-12">
                        <div class="panel panel-primary text-center" style="padding: 40px 0">
                            <div class="panel-body result-datas">
                                <q-chip outline color="primary" text-color="white" icon="fas fa-thumbs-up">
                                    Acertos: {{ hits }}
                                </q-chip>
                                <q-chip outline color="primary" text-color="white" icon="fas fa-clock">
                                    Tempo gasto: {{ time }}
                                </q-chip>
                                
                                <p v-html="resultText" class="result-text"></p>
                                <div class="row btns-result">
                                    <div class="col-xs-12" style="margin-bottom: 10px">
                                        <q-btn color="primary" @click="playAgain" label="Jogar Novamente" />
                                    </div>
                                </div>
                                <!--     <div class="col-xs-12" style="margin-bottom: 10px">
                                        <q-btn color="orange" @click="myTests" class="full-width" label="Meus testes" />
                                    </div>
                                    <div class="col-xs-12">
                                        <q-btn color="negative" @click="ranking" class="full-width" label="Ranking" />
                                    </div>
                                </div> -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <q-inner-loading :showing="loadInfos">
            <q-spinner
                color="secondary"
                size="3em"
                :thickness="10"
            />
        </q-inner-loading>
        
    </div>  
</template>

<script>
import testData from "../../mixins/testData";;
import PageTitle from '../Custom/PageTitle';
export default {
    components:{ PageTitle },
    mixins: [testData],
    data(){
        return {
            resultText: "",
            loadInfos: false
        }
    },
    created(){
        this.$store.state.isQuestionArea = false;
        this.loadInfos = true;
        axios(`tests/resultText/${this.hits}`).then(response => {
            response = response.data;
            if (response.success) this.resultText = response.data;
        })
        .then(() => this.loadInfos = false);
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
    },
    beforeDestroy(){
        this.$store.state.cpActiveTestArea = "";
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
