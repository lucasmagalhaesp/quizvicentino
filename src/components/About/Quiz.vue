<template>
    <div class="row">
        <div class="col-12">
            <page-title>Quiz Vicentino?</page-title>
            <section class="q-mt-sm text-justify">
                <div class="row">
                    <div class="col-md-5">
                        <img src="images/logo.png" alt="" />
                    </div>
                    <div class="col-md-7">
                        <p class="text-success text-center">
                            <strong>LOUVADO SEJA O NOSSO SENHOR JESUS CRISTO!!!</strong>
                        </p>
                        <p>
                            O QUIZ VICENTINO foi criado para testar os conhecimentos dos 
                            vicentinos sobre a Sociedade de São Vicente de Paulo e outros assuntos relacionados. 
                            O principal objetivo é incentivar a busca novas informações sobre a SSVP, 
                            ajudando assim a melhorar o desenvolvimento do nosso trabalho junto às famílias assistidas.
                        </p>
                        <p>
                            O QUIZ possui muitas perguntas cadastradas. Elas são organizadas dentro de testes, cada um contendo 5 perguntas.
                            Faça quantos testes desejar!
                        </p>
                        <p>
                            Se esse é o seu primeiro acesso ao site, <strong><router-link tag="a" to="/register">faça o seu cadastro</router-link></strong>. Se já é cadastrado,
                            <strong><router-link tag="a" to="/login">faça login</router-link></strong> e começe a realizar os seus testes.
                        </p>
                        <p>
                            Caso você ainda não conheça a SOCIEDADE DE SÃO VICENTE DE PAULO, <strong><a href="http://www.ssvpbrasil.org.br/" target="_blank">clique aqui</a></strong> 
                            e saiba os trabalhos que desenvolvemos.
                        </p>
                        <p> MUITO OBRIGADO POR PRESTIGIAR ESSE TRABALHO!!!</p>
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

}
</script>

<style scoped>
    img{
        width: 100%;
        padding-right: 40px
    }
</style>