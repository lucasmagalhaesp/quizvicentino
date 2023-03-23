<template>
    <div class="col">
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
                                        <q-btn label="Jogar Novamente" :class="$q.screen.lt.sm ? 'q-mt-md full-width' : ''" icon="fas fa-gamepad" color="primary" @click="playAgain" />
                                        <q-btn v-if="logged" :class="$q.screen.lt.sm ? 'q-mt-md full-width' : ''" label="Relatório" icon="fas fa-print" color="primary" @click="print" class="q-ml-md" />
                                        <q-btn v-if="logged" :class="$q.screen.lt.sm ? 'q-mt-md full-width' : ''" label="Meus Testes" icon="fas fa-list-alt" color="primary" @click="$router.push({ name: 'tests' })" class="q-ml-md" />
                                        <q-btn v-if="logged" :class="$q.screen.lt.sm ? 'q-mt-md full-width' : ''" label="Ranking" icon="fas fa-list-ol" color="primary" @click="$router.push('/ranking')" class="q-ml-md" />
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
import testData from "../../mixins/testData";
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
        this.$store.commit("goToNextQuestion", false);
        this.loadInfos = true;
        axios(`tests/resultText/${this.hits}`)
        .then(response => {
            response = response.data;
            if (response.success) this.resultText = response.data;
        })
        .then(() => this.loadInfos = false);
    },
    methods:{
        playAgain(){
            this.$router.push({ name: "instructions" });
        },
        myTests(){
            this.$router.push({ name: "tests" });
        },
        ranking(){
            this.$router.push({ name: "ranking" });
        },
        print(){
            let id = this.$store.state.lastTestID;
            if (id == null) {
                alert("Número do teste não identificado. Acesse esse relatório através da página 'Meus testes'");
                return false;
            }

            this.$q.loading.show({ message: "Gerando relatório..." });
            axios(`tests/print/${id}`, { responseType: 'blob',
            headers: {
                Authorization: 'Bearer '+this.$store.state.token
            }})
            .then(resposta => {
                let dadosResposta = resposta.data;
                if (!["", undefined, null].includes(dadosResposta)){
                    let blob = new Blob([dadosResposta], {
                        type: 'application/pdf'
                    });

                    let url = window.URL.createObjectURL(blob)
                    window.open(url);
                }else{
                    console.error("erro ao gerar o documento PDF");
                }
            })
            .catch(error => {
                if (error.response.status == 500){
                    this.$q.dialog({
                        title: "Erro",
                        message: "Esse teste não possui relatório",
                        html: true,
                        class: "bg-negative text-white q-py-sm q-px-sm",
                        ok: {
                            push: true,
                            color: "white",
                            textColor: "black",
                            label: "Ok"
                        }
                    });
                }
            })
            .then(() => this.$q.loading.hide());
        }
    },
    computed:{
        img(){
            return `images/result/${this.hits}.png`
        },
        userType(){
            return this.$store.state.user.type
        },
        logged(){
            return this.$store.state.logged
        }
    },
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
