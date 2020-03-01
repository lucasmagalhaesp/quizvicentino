<template>
    <b-row class="margin-vert-30">
        <b-col md="12">
            <h2 class="item-title" style="margin-bottom: 20px">Como funciona o jogo?</h2>
            <ul class="list-unstyled">
                <li><i class="fa fa-chevron-circle-right"></i> Cada teste possue 5 perguntas, cada uma com 4 alternativas, mas apenas <strong>UMA</strong> estará correta. Você terá 1 minuto para responder a cada uma.</li>
                <li><i class="fa fa-chevron-circle-right"></i> <strong>Caso você erre a questão, não saberá naquele momento qual a resposta correta</strong>, pois poderá encontrar a mesma pergunta
                    em um outro teste, tendo uma nova oportunidade de acertar.</li>
                <li><i class="fa fa-chevron-circle-right"></i> Após o fim do teste, será exibido o resultado com o seu desempenho.</li>
                <!-- <li><i class="fa fa-chevron-circle-right"></i> Para sair do jogo antes do término, presione o botão <strong>SAIR</strong>.</li> -->
<!--                     <li><i class="fa fa-chevron-circle-right"></i> Após pressionar o botão <strong>CONFIRMAR</strong> e saber se acertou ou não a pergunta, você deve pressionar o botão <strong>PRÓXIMA</strong> para ir para a próxima pergunta.</li>-->
            </ul>
        </b-col>
        <b-row>
            <b-col class="col-xs-12">
                <b-button variant="primary" @click="redirectToGame" class="pull-right col-xs-12 col-md-1" style="margin-top: 15px">Iniciar</b-button>
            </b-col>
        </b-row>
    </b-row>
</template>

<script>
export default {
    created(){
        console.log("instruções");
        this.$store.state.hits = 0;
        this.$store.state.time = 0;
        this.$store.state.activateTimer = false;
        this.$store.state.timeLeft = 60;
    },
    methods:{
        redirectToGame(){
            this.$store.state.isQuestionArea = true;
            this.$store.state.cpActiveTestArea = "question";
        }
    },
}
</script>
