<template>
    <div class="">
    <q-carousel
      arrows
      animated
      v-model="slide"
      height="300px"
    >
      <q-carousel-slide name="first" img-src="images/index/slider1.jpg">
        <div class="absolute-bottom custom-caption">
          <div class="text-h5">Como está seu conhecimento sobre a SSVP e outros assuntos relacionados?</div>
          <!-- <div class="text-subtitle1">Mountains</div> -->
        </div>
      </q-carousel-slide>
      <q-carousel-slide name="second" img-src="images/index/slider2.jpeg">
        <div class="absolute-bottom custom-caption">
          <div class="text-h5">Junte seus familiares e amigos vicentinos e veja quem ficará no topo do ranking</div>
          <!-- <div class="text-subtitle1">Famous City</div> -->
        </div>
      </q-carousel-slide>
      <q-carousel-slide name="third" img-src="images/index/slider3.png">
        <div class="absolute-bottom custom-caption">
          <div class="text-h5">Acesse o quiz de onde estiver, através de notebooks, celulares ou tablets</div>
          <!-- <div class="text-subtitle1">Famous Bridge</div> -->
        </div>
      </q-carousel-slide>
    </q-carousel>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup () {
    return {
      slide: ref('first')
    }
  }
}
</script>

<style>
    .custom-caption{
        text-align: center;
        padding: 12px;
        color: white;
        background-color: rgba(0, 0, 0, .3);
    }
    .q-carousel__slide{
      background-position: initial
    }
</style>
