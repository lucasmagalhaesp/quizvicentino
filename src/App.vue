<template>
    <div>
        <div class="hidden-lg hidden-md">
            <div class="logo">
                <router-link to="/" tag="a">
                    <img src="/images/logo.png" alt="Logo" style="height:80px" />
                </router-link>
            </div>
            <div class="menu-responsivo"></div>
            <p class="site-slogan" v-if="logged" style="position: inherit; background: #008148">
                {{ name }} - <a href="#" @click="logoff">Fazer Logoff</a>
            </p>
        </div>
        <div id="body_bg">
            <div class="primary-container-group padding-top-menu">
                <!-- Background -->
                <div class="primary-container-background" style="height: 80%">
                    <div class="primary-container"></div>
                    <div class="clearfix"></div>
                </div>
                <div class="primary-container">
                    <div id="container_hornav" class="container no-padding">
                        <!-- End Logo -->
                        <!-- Slogan -->
                        <p class="site-slogan hidden-xs" v-if="logged">
                            {{ name }} - <a href="#" @click="logoff">Fazer Logoff</a>
                        </p>
                        <!-- End Slogan -->
                        <!-- Top Menu -->
                        <div class="row  hidden-xs">
                            
                        <div class="logo">
                            <router-link to="/" tag="a">
                                <img src="/images/logo.png" alt="Logo" style="height:80px" />
                            </router-link>
                        </div>
                            <div class="hornav-block">
                                <div id="hornav" class="pull-right">
                                    <ul id="hornavmenu" class="nav navbar-nav">
                                        <li><router-link to="/" tag="a">Home</router-link></li>
                                        <li><router-link to="/about" tag="a">Sobre</router-link></li>
                                        <li><router-link to="/test-area" tag="a">Jogar</router-link></li>
                                        <li v-if="logged"><router-link to="/tests" tag="a">Testes</router-link></li>
                                        <li v-if="logged"><router-link to="/ranking" tag="a">Ranking</router-link></li>
                                        <li class="dropdown" v-if="isAdmin">
                                                <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
                                                    Área restrita
                                                </a>
                                                <ul class="dropdown-menu" role="menu">
                                                    <li><router-link to="/admin/users">Usuários</router-link></li>
                                                    <li><router-link to="/admin/tests">Testes</router-link></li>
                                                    <li><router-link to="/admin/questions">Perguntas</router-link></li>
                                                </ul>
                                            </li>
                                        <li><router-link to="/contact" tag="a">Contato</router-link></li>
                                    </ul>
                                </div>
                            </div>
                            <div class="clearfix"></div>
                        </div>
                        <!-- End Top Menu -->
                    </div>

                    <router-view/>
                    
                    <div id="base" class="container padding-vert-30">
                        <div class="row">
                            <!-- Disclaimer -->
                            <div class="col-md-6">
                                <h3 class="margin-bottom-10">Sobre o QUIZ</h3>
                                <p style="text-align: justify">
                                    O QUIZ VICENTINO é um método criado para testar como estão os conhecimentos dos vicentinos sobre a Sociedade de São Vicente de Paulo e outros assuntos relacionados.
                                </p>
                                <!--<p>
                                    Ele também tem o objetivo de incentivar os membros da SSVP em sempre buscarem novas informações sobre a mesma, pois quanto melhores estivermos informados, melhor desenvolveremos o nosso trabalho junto às famílias necessitadas.
                                </p>-->
                                <div class="clearfix"></div>
                            </div>
                            <div class="col-md-3">
                                <h3 class="margin-bottom-10">Começe a jogar!</h3>
                                <ul class="menu">
                                    <li>
                                        <router-link tag="a" class="fa-tasks" style="display: initial; padding: 16px 5px" to="/register">Cadastre-se</router-link>
                                    </li>
                                    <li>
                                        <router-link tag="a" class="fa-users" style="display: initial; padding: 16px 5px" to="/login">Faça login</router-link>
                                    </li>
                                    <li>
                                        <router-link tag="a" class="fa-signal" style="display: initial; padding: 16px 5px" to="/test-area">Começe a jogar</router-link>
                                    </li>
                                </ul>
                                <div class="clearfix"></div>
                            </div>
                            <div class="col-md-3">
                                <h3 class="margin-bottom-10">Contato</h3>
                                <p>
                                    <i class="fa-envelope color-primary"></i><a href="mailto:contato@quizvicentino.com.br">contato@quizvicentino.com.br</a>
                                </p>
                                <p><i class="fa-whatsapp color-primary"></i> (31) 99158-4150
                                </p>
                            </div>
                            <!-- End Sample Menu -->
                            <div class="clearfix"></div>
                        </div>
                    </div>
                    <!-- Footer Menu -->
                    <div id="footermenu" class="container">
                        <div class="row">
                            <ul class="list-unstyled list-inline">
                                <li>
                                    <a href="https://www.ssvpglobal.org/pt-pt/" target="_blank" title="Conselho Geral Internacional">CGI</a>
                                </li>
                                <li>
                                    <a href="http://www.ssvpbrasil.org.br/" target="_blank" title="Conselho Nacional do Brasil">CNB</a>
                                </li>
                                <li>
                                    <a href="http://cmcontagemssvp.org.br/" target="_blank" title="Conselho Metropolitano de Contagem">CMC</a>
                                </li>
                                <li>
                                    <a href="https://pt-br.facebook.com/ccsaopedrodeibirite/" target="_blank" title="Conselho Central São Pedro de Ibirité">CC São Pedro de Ibirité</a>
                                </li>
                            </ul>
                            <div class="clearfix"></div>
                        </div>
                    </div>
                    <!-- End Footer Menu -->
                </div>
            </div>
            <div class="container padding-vert-30">
                <div class="row">
                    <div id="copyright">
                        <p><span id="ano-atual"></span> - Todos os direitos reservados</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
  export default {
    computed:{
        isAdmin(){
            return this.$store.state.isAdmin
        },
        logged(){
            console.log("logado: "+this.$store.state.logged+" "+sessionStorage.getItem("quiz_vlogged"));
            return this.$store.state.logged || sessionStorage.getItem("quiz_vlogged") != null
        },
        name(){
            return sessionStorage.getItem("quiz_vname").split(" ")[0]
        }
    },
    methods:{
        logoff(){
            axios(`auth/logout`,{
                headers: {
                    Authorization: 'Bearer '+sessionStorage.getItem("quiz_vtoken")
                }
            }).then(response => {
                response = response.data;
                if (response.success) {
                    sessionStorage.removeItem("quiz_vtoken");
                    sessionStorage.removeItem("quiz_vname");
                    sessionStorage.removeItem("quiz_vemail");
                    sessionStorage.removeItem("quiz_vlogged");
                    this.$store.state.isAdmin = false;
                    this.$store.state.logged = false;
                    this.$router.push({ name: "home" });
                }
            }).catch(error => console.error(error));
        }
    }
  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
