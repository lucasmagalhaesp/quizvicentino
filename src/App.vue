<template>
    <div id="body_bg">
        <div id="container_header" class="container">
            <div id="header" class="row">
                <div class="col-md-12 margin-top-15">
                    <!-- Header Social Icons -->
                    <ul class="social-icons circle pull-right">
                        <li class="social-facebook">
                            <a href="#" target="_blank" title="Facebook"></a>
                        </li>
                        <li class="social-rss">
                            <a href="#" target="_blank" title="Whatsapp"></a>
                        </li>
                        <li class="social-twitter">
                            <a href="#" target="_blank" title="E-mail"></a>
                        </li>
                    </ul>
                    <!-- End Header Social Icons -->
                </div>
                <div class="clear"></div>
            </div>
        </div>
        
        <div class="primary-container-group">
            <!-- Background -->
            <div class="primary-container-background">
                <div class="primary-container"></div>
                <div class="clearfix"></div>
            </div>
            <div class="primary-container">
                <div id="container_hornav" class="container no-padding">
                    <!-- Logo --> 
                    <div class="logo">
                        <a href="#">
                            <img src="/images/logo.png" alt="Logo" style="height:50px" />
                        </a>
                    </div>
                    <!-- End Logo -->
                    <!-- Slogan -->
                <!--  <p class="site-slogan">
                        @if (Auth::check())
                            {{ Auth::user()->name }} - <a href="{{ url('/logout') }}"><i class="fa fa-btn fa-sign-out"></i>Fazer Logoff</a>
                        @endif
                    </p> -->
                    <!-- End Slogan -->
                    <!-- Top Menu -->
                    <div class="row">
                        <div class="hornav-block">
                            <div id="hornav" class="pull-right">
                                <ul id="hornavmenu" class="nav navbar-nav">
                                    <li><router-link to="/" tag="a">Home</router-link></li>
                                    <li><router-link to="/test-area">Jogar</router-link></li>
                                    <li><router-link to="/tests">Testes</router-link></li>
                                    <li><router-link to="/ranking">Ranking</router-link></li>
                                    <li><router-link to="/contact">Contato</router-link></li>
                                    <li><router-link to="/about">Sobre</router-link></li>
                                        <!-- <li class="dropdown">
                                            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
                                                Área restrita
                                            </a>
                                            <ul class="dropdown-menu" role="menu">
                                                <li><a href="#"><i class="fa fa-btn fa-user"></i>Usuários</a></li>
                                                <li><a href="#"><i class="fa fa-btn fa-file-pdf-o"></i>Testes</a></li>
                                                <li><a href="#"><i class="fa fa-btn fa-question"></i>Perguntas</a></li>
                                            </ul>
                                        </li> -->
                                    <!-- <li class="logoff-mobile"><a href="#">Sair</a></li> -->
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

</template>

<script>
  import Content from "@/components/Body.vue";
  export default {
    components: { Content } 
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
