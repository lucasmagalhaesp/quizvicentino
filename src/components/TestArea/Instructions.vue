<template>
    <div class="row">
        <div class="col-12">
            <div class="row q-col-gutter-md">
                <div class="col-12 col-md-8">
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
                <div class="col-12 col-md-4">
                    <q-card v-if="userType == undefined || userType == null">
                        <q-card-section class="bg-primary text-white">
                            <div class="text-h6 text-center">Usuário</div>
                        </q-card-section>

                        <q-separator />

                        <q-card-section align="justify" class="texto-card-section">
                            <p>Você pode realizar os testes de duas formas: sendo um <strong>usuário cadastrado</strong> ou <strong>usuário visitante</strong>.</p>
                            <p style="font-weight: 500">Um usuário cadastrado tem acesso a todos os seus testes já realizados (inclusive gerar um arquivo PDF do teste), acessar o ranking
                                onde poderá comparar o seu melhor resultado com o de outros usuários, etc.
                            </p>
                            <p>Escolha abaixo a opção desejada:</p>
                            <div class="row justify-center" :class="$q.screen.lt.sm ? '' : 'q-gutter-md'" style="margin-top: 15px">
                                <q-btn color="secondary" icon="fas fa-user-check" :class="$q.screen.lt.sm ? 'q-mt-md full-width' : 'col'" @click="redirectToGame('registered')" label="Cadastrado" />
                                <q-btn color="secondary" icon="fas fa-user" :class="$q.screen.lt.sm ? 'q-mt-md full-width' : 'col'" @click="redirectToGame('visitor')" label="Visitante" />
                            </div>
                        </q-card-section>
                    </q-card>
                    <template v-else>
                        <img v-if="!$q.screen.lt.sm" src="images/instructions/play.jpg" alt="Começar o teste" class="full-width">
                    </template>
                </div>
            </div>
            <div class="row justify-center q-gutter-lg" style="margin-top: 15px" v-if="userType != undefined && userType != null">
                <q-btn color="secondary" icon="fas fa-gamepad" @click="play" label="Iniciar" class="q-ml-md" />
                <q-btn v-if="!logged" @click="$router.push({ name: 'register'})" icon="fab fa-wpforms" flat color="primary" label="CADASTRAR-SE" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    created(){
        this.$store.commit("resetTestData");
        this.$store.commit("addQuestionId", null);
        this.$store.commit("addAnswerId", null);
    },
    computed:{
        userType: {
            get(){
                return this.$store.state.user.type
            },
            set(value){
                this.$store.state.user.type = value
            }
        },
        logged(){
            return this.$store.state.logged
        }
    },
    methods:{
        redirectToGame(userType = "visitor"){
            let loggedUser = this.$store.state.token || null;
            this.userType = userType;
            
            if (userType == "registered" && loggedUser == null){
                this.$router.push({ name: "login" });
            }else{
                /* this.$store.commit("isQuestionArea", true);
                this.$store.commit("cpActiveTestArea", "question"); */
                this.$router.push({ name: "test-area" });
            }
        },
        play(){
            /* this.$store.commit("isQuestionArea", true);
            this.$store.commit("cpActiveTestArea", "question"); */
            this.$router.push({ name: "test-area" });
        }
    },
}
</script>

<style scoped>
    .q-card__section.texto-card-section{
        padding: 20px 10px
    }
</style>
