<template>
  <!-- <div>
    <b-container class='mb-3'>
      <h2>Quiz Vicentino!!!</h2>
    </b-container>
    <b-button variant="info" @click="register">Cadastro</b-button>
    <b-button variant="primary" @click="login">Login</b-button>
  </div> -->


<div class="container no-padding">
        <!-- === END HEADER === -->
        <!-- === BEGIN CONTENT === -->
        <div class="row">
            <!-- Carousel Slideshow -->
            <div id="carousel-example" class="carousel slide hidden-xs" data-ride="carousel">
                <!-- Carousel Indicators -->
                <ol class="carousel-indicators">
                    <li data-target="#carousel-example" data-slide-to="0" class="active"></li>
                    <li data-target="#carousel-example" data-slide-to="1"></li>
                    <li data-target="#carousel-example" data-slide-to="2"></li>
                </ol>
                <!-- End Carousel Indicators -->
                <!-- Carousel Images -->
                <div class="carousel-inner">
                    <div class="item active" style="position: relative">
                        <img src="images/index/slide1.jpg">
                        <p class="text-slider">Como está seu conhecimento sobre a SSVP e outros assuntos relacionados?</p>
                    </div>
                    <div class="item">
                        <img src="images/index/slide2.jpg">
                        <p class="text-slider">Junte seus amigos vicentinos e veja quem ficará no top do ranking</p>
                    </div>
                    <div class="item">
                        <img src="images/index/slide3.jpg">
                        <p class="text-slider">Acesse o quiz de onde estiver, através de notebooks, celulares e tablets</p>
                    </div>
                </div>
                <!-- End Carousel Images -->
                <!-- Carousel Controls -->
                <a class="left carousel-control" href="#carousel-example" data-slide="prev">
                    <span class="glyphicon glyphicon-chevron-left"></span>
                </a>
                <a class="right carousel-control" href="#carousel-example" data-slide="next">
                    <span class="glyphicon glyphicon-chevron-right"></span>
                </a>
                <!-- End Carousel Controls -->
            </div>
        </div>
        <div class="row">
            <div class="tabs-dark" style="padding:0;margin-top: 30px">
                <div class="col-md-3 col-sm-6">
                    <div class="panel panel-primary invert">
                        <div class="panel-heading">
                            <h3 class="panel-title text-center">
                                Quiz Vicentino?
                            </h3>
                        </div>
                        <div class="panel-body text-justify">
                            <div class="text-center">
                                <img src="images/index/quiz.png" alt="" class="img-responsive img-card-index">
                            </div>
                            Descubra o que é o Quiz Vicentino e o objetivo da criação dessa ferramenta.
                        </div>
                        <div class="panel-footer text-center row" style="margin: 0">
                          <router-link tag="a" to="/about" class="btn btn-aqua col-xs-12">Conheça</router-link>
                        </div>
                    </div>
                </div>
                <div class="col-md-3 col-sm-6">
                    <div class="panel panel-primary invert">
                        <div class="panel-heading">
                            <h3 class="panel-title text-center">
                                Cadastro
                            </h3>
                        </div>
                        <div class="panel-body text-justify">
                            <div class="text-center">
                                <img src="images/index/registro.png" alt="" class="img-responsive img-card-index">
                            </div>
                            Caso ainda não seja cadastrado no site, clique no botão abaixo. O cadastro é bem rápido.
                        </div>
                        <div class="panel-footer text-center row" style="margin: 0">
                            <router-link tag="a" to="/register" class="btn btn-aqua col-xs-12">Cadastre-se</router-link>
                        </div>
                    </div>
                </div>
                <div class="col-md-3 col-sm-6">
                    <div class="panel panel-primary invert">
                        <div class="panel-heading">
                            <h3 class="panel-title text-center">
                                Login
                            </h3>
                        </div>
                        <div class="panel-body text-justify">
                            <div class="text-center">
                                <img src="images/index/login.png" alt="" class="img-responsive img-card-index">
                            </div>
                           Caso já tenha se cadastrado no site, faça o login e começe a realizar os seus testes.
                        </div>
                        <div class="panel-footer text-center row" style="margin: 0">
                            <router-link tag="a" to="/login" class="btn btn-aqua col-xs-12">Faça login</router-link>
                        </div>
                    </div>
                </div>
                <div class="col-md-3 col-sm-6">
                    <div class="panel panel-primary invert">
                        <div class="panel-heading">
                            <h3 class="panel-title text-center">
                                Jogar
                            </h3>
                        </div>
                        <div class="panel-body text-justify">
                            <div class="text-center">
                                <img src="images/index/jogar.png" alt="" class="img-responsive img-card-index">
                            </div>
                            Começe a jogar!!! Acesse a Área de Perguntas e começe a realizar os testes. Boa sorte!
                        </div>
                        <div class="panel-footer text-center row" style="margin: 0">
                            <router-link tag="a" to="/test-area" class="btn btn-aqua col-xs-12">Jogar</router-link>
                        </div>
                    </div>
                </div>
                <!-- End Tab Panes -->
            </div>
            </div>
            <div class="clearfix"></div>
            <!-- End Main Article -->
        </div>

</template>

<script>
export default {
  methods:{
    register(){
      this.$router.push("/register");
    },
    login(){
      this.$router.push("/login");
    }
  }  

}
</script>
<style>
    .text-slider{
        position: absolute;
        bottom: 60px;
        left: 20%;
        width: 60%;
        background: #473d4f;
        color: #FFF;
        border-radius: 3px;
        padding: 5px;
        font-size: 18px;
        margin: 0 auto;
        text-align: center;
        line-height: 25px
    }
</style>
