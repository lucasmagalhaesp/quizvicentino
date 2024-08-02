<template>
  <q-page class="">
    <transition
      enter-active-class="animated slideInLeft"
      mode="out-in" appear
    >
      <div>
        <div class="row" v-if="!$q.screen.lt.sm">
          <div class="col-12">
            <carousel />
          </div>
        </div>
        <section class="q-my-md">
          <div class="row justify-center">
            <div class="col-9 col-md-3 q-px-md">
              <card-index img="images/index/quiz.png" linkBtn="/sobre" labelBtn="Sobre" />
            </div>
            <div class="col-9 col-md-3 q-px-md" v-if="!logged">
              <card-index img="images/index/registro.png" linkBtn="/cadastrar" labelBtn="Cadastre-se" />
            </div>
            <div class="col-9 col-md-3 q-px-md" v-if="!logged">
              <card-index img="images/index/login.png" linkBtn="/login" labelBtn="Login" />
            </div>
            <div class="col-9 col-md-3 q-px-md">
              <card-index img="images/index/jogar.png" linkBtn="/jogar/instrucoes" labelBtn="Jogar" />
            </div>
            <div class="col-9 col-md-3 q-px-md" v-if="logged">
              <card-index img="images/index/testes.png" linkBtn="/testes" labelBtn="Meus Testes" />
            </div>
            <div class="col-9 col-md-3 q-px-md" v-if="logged">
              <card-index img="images/index/ranking.png" linkBtn="/ranking" labelBtn="Ranking" />
            </div>
          </div>
        </section>
        <!-- <section style="padding: 0" class="q-mb-lg">
            <ssvp />
        </section> -->
      </div>  
    </transition>
  </q-page>
</template>

<script>
import CardIndex from '../components/Custom/CardIndex';
import Carousel from '../components/Home/Carousel';
import Ssvp from '../components/Home/SSVP';
export default {
    components:{
      CardIndex,
      Carousel,
      Ssvp
    },
    data(){
        return { logo: 'statics/images/logo.png'}
    },
    computed:{
        logged(){
            return this.$store.getters.logged
        }
    }
}
</script>
<style scoped>
  @media(min-width: 599px){
    section{
      padding: 0 50px
    }
  }
  
</style>
