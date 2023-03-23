<template>
    <div class="row">
        <div class="col-12">
            <div class="q-mt-sm text-justify">
                <div class="row justify-center">
                    <!-- <div class="col-md-5">
                        <img src="images/logo.png" alt="" />
                    </div> -->
                    <div class="col-md-7">
                        <p class="text-success text-center">
                            <strong>LOUVADO SEJA O NOSSO SENHOR JESUS CRISTO!!!</strong>
                        </p>
                        <p>
                            O QUIZ VICENTINO foi criado para testar os conhecimentos dos 
                            vicentinos sobre a Sociedade de São Vicente de Paulo e outros assuntos relacionados. 
                            O principal objetivo é incentivar a busca de novas informações sobre a SSVP, 
                            ajudando assim a melhorar o desenvolvimento do nosso trabalho junto às famílias assistidas.
                        </p>
                        <p>
                            O QUIZ possui muitas perguntas cadastradas. Elas são organizadas dentro de testes, cada um contendo 5 perguntas.
                            Faça quantos testes desejar!
                        </p>
                        <p>
                            Você pode realizar os testes de duas formas: sendo um <strong>usuário cadastrado</strong> ou <strong>usuário visitante</strong>.
                        </p>
                        <p>
                            Um usuário cadastrado tem acesso a todos os seus testes já realizados (inclusive gerar um arquivo PDF do teste), acessar o ranking
                            onde poderá comparar o seu melhor resultado com o de outros usuários, etc.
                        </p>
                        <p>
                            Se esse é o seu primeiro acesso ao site e deseja se cadastrar, <strong><router-link tag="a" to="/cadastrar">Clique aqui</router-link></strong>. Se já é cadastrado,
                            <strong><router-link tag="a" to="/login">Faça login</router-link></strong> e começe a realizar os seus testes.
                        </p>
                        <p>
                            Caso você ainda não conheça a SOCIEDADE DE SÃO VICENTE DE PAULO, <strong><a href="http://www.ssvpbrasil.org.br/" target="_blank">clique aqui</a></strong> 
                            e entenda os trabalhos que desenvolvemos.
                        </p>
                        <p><strong>MUITO OBRIGADO POR PRESTIGIAR ESSE TRABALHO!!!</strong></p>
                    </div>

                </div>
            </div>
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