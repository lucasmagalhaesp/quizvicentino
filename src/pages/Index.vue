<template>
  <q-page class="">
    <transition
      enter-active-class="animated slideInLeft"
      mode="out-in" appear
    >
      <div>
        <div class="row">
          <div class="col-12">
            <carousel />
          </div>
        </div>
        <div class="row">
          <div class="col-12 col-md-3 q-pr-md">
            <card-index img="https://quizvicentino.com.br/images/index/quiz.png" linkBtn="/about" labelBtn="Sobre">
              
            </card-index>
          </div>
          <div class="col-12 col-md-3 q-pr-md">
            <card-index img="https://quizvicentino.com.br/images/index/registro.png" linkBtn="/register" labelBtn="Cadastre-se">
              
            </card-index>
          </div>
          <div class="col-12 col-md-3 q-pr-md">
            <card-index img="https://quizvicentino.com.br/images/index/login.png" linkBtn="/login" labelBtn="Login">
              
            </card-index>
          </div>
          <div class="col-12 col-md-3 q-pr-md">
            <card-index img="https://quizvicentino.com.br/images/index/jogar.png" linkBtn="/test-area" labelBtn="Jogar">
             
            </card-index>
          </div>
        </div>
      </div>  
    </transition>
  </q-page>
</template>

<script>
import CardIndex from '../components/Custom/CardIndex';
import Carousel from '../components/Home/Carousel';
export default {
    components:{
      CardIndex,
      Carousel
    },
  name: 'PageIndex',
  data(){
    return { logo: 'statics/images/logo.png'}
  }
}
</script>
