<template>
    <div class="row">
        <div class="col-12">
            <page-title>Instruções</page-title>
            <section>
                <div class="row">
                    <div class="col-7">
                        <p>Antes de fazer o seu primeiro teste, leia as instruções abaixo:</p>
                        <q-list class="text-justify">
                            <q-item>
                                <q-item-section avatar>
                                    <q-icon color="secondary" name="check" />
                                </q-item-section>
                                <q-item-section>
                                    Cada teste possue 5 perguntas, cada uma com 4 alternativas, mas apenas UMA estará correta. Você terá 1 minuto para responder a cada uma.
                                </q-item-section>
                            </q-item>

                            <q-separator spaced inset />

                            <q-item>
                                <q-item-section avatar>
                                    <q-icon color="secondary" name="check" />
                                </q-item-section>
                                <q-item-section>
                                    <q-item-label>
                                        Caso você erre a questão, <span class="text-weight-bold">não saberá naquele momento qual a resposta correta</span>, pois poderá encontrar a mesma pergunta
                                        em um outro teste, tendo uma nova oportunidade de acertar.
                                    </q-item-label>
                                </q-item-section>
                            </q-item>

                            <q-separator spaced inset />

                            <q-item>
                                <q-item-section avatar>
                                    <q-icon color="secondary" name="check" />
                                </q-item-section>
                                <q-item-section>
                                    Após o fim do teste, será exibido o resultado com o seu desempenho.
                                </q-item-section>
                            </q-item>
                        </q-list>
                    </div>
                    <div class="col-5">
                        <q-card class="">
                            <q-card-section class="bg-primary text-white">
                                <div class="text-h6 text-center">Usuário</div>
                            </q-card-section>

                            <q-separator />

                            <q-card-section align="justify" class="texto-card-section">
                                <p>Você pode realizar os testes de duas formas: sendo um usuário cadastrado ou usuário visitante.</p>
                                <p>Um usuário cadastrado tem acesso a todos os seus testes já realizados (inclusive gerar um arquivo PDF do teste), acessar o ranking
                                    onde poderá comparar o seu melhor resultado com o de outros usuários, etc.
                                </p>
                                <p>Escolha abaixo a opção desejada:</p>
                                <div class="row justify-center" style="margin-top: 15px">
                                    <q-btn color="secondary" @click="redirectToGame('registered')" label="Usuário cadastrado" />
                                    <q-btn color="secondary" @click="redirectToGame('visitor')" label="Usuário visitante" class="q-ml-md" />
                                </div>
                            </q-card-section>
                        </q-card>
                    </div>
                </div>
            </section>
            
        </div>
    </div>
</template>

<script>
import PageTitle from '../Custom/PageTitle';
export default {
    components:{
        PageTitle
    },
    created(){
        this.$store.state.hits = 0;
        this.$store.state.time = 0;
        this.$store.state.activateTimer = false;
        this.$store.state.timeLeft = 60;
    },
    methods:{
        redirectToGame(userType = "visitor"){
            let loggedUser = sessionStorage.getItem("quiz_vtoken") || null;
            if (userType == "registered" && loggedUser == null){
                this.$router.push({ name: "login" });
            }else{
                this.$store.state.isQuestionArea = true;
                this.$store.state.cpActiveTestArea = "question";
            }
        }
    },
}
</script>

<style scoped>
    .q-card__section.texto-card-section{
        padding: 20px 10px
    }
</style>
