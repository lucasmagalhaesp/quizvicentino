<template>
    <b-row class="margin-vert-30 quiz-description">
        <b-col md="12">
            <div class="headline" style="margin-bottom: 30px">
                <h2>O que é o Quiz Vicentino?</h2>
            </div>
            <p class="text-justify">
                O QUIZ VICENTINO é um método criado para testar os conhecimentos dos 
                vicentinos sobre a Sociedade de São Vicente de Paulo e outros assuntos relacionados. Ele também 
                tem o objetivo de incentivar os vicentinos a sempre buscarem novas informações sobre a sociedade, 
                pois quanto melhores estivermos informados, melhor poderemos desenvolver o nosso trabalho junto às famílias
                assistidas.
            </p>
            <p class="text-justify">
                Você poderá fazer quantos testes quiser. Cada teste é composto de 5 perguntas,
                cada uma com 4 alternativas. Quando errar uma pergunta, não ficará sabendo naquele momento
                qual seria a alternativa correta, pois em um próximo teste essa pergunta poderá aparecer novamente.
                Após a realização do teste, será exibido o seu desempenho. Independentemente do resultado, faça outros testes
                e melhore cada vez mais o seu conhecimento.
            </p>
            <p class="text-justify">
                Se esse é o seu primeiro acesso ao site, <strong><router-link tag="a" to="/register">faça o seu cadastro</router-link></strong>. Se já é cadastrado,
                <strong><router-link tag="a" to="/login">faça login</router-link></strong> e começe a realizar os seus testes.
            </p>
            <p class="text-justify">
                Envie-nos suas dúvidas, críticas e sugestões para melhorarmos o site através da página de <strong><router-link tag="a" to="/contact">CONTATO</router-link></strong>.
            </p>
            <p class="text-justify">
                Caso você ainda não conheça a SOCIEDADE DE SÃO VICENTE DE PAULO, <strong><a href="http://www.ssvpbrasil.org.br/?pg=sobre_a_ssvp" target="_blank">clique aqui</a></strong> 
                e saiba os trabalhos que desenvolvemos.
            </p>
            <p>
                <strong>
                    MUITO OBRIGADO POR PRESTIGIAR ESSE TRABALHO DESENVOLVIDO COM MUITO CARINHO!!!
                </strong>
            </p>
            <p class="text-success text-center">
                <strong>LOUVADO SEJA O NOSSO SENHOR JESUS CRISTO!!!</strong>
            </p>

        </b-col>
    </b-row>
</template>

<script>
export default {

}
</script>

<style>
    .quiz-description a{
        color: #b3b3b3;
    }
</style>
