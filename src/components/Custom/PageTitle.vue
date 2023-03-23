<template>
     <q-parallax :height="$q.screen.lt.sm ? 60 : 100" :speed="0.5">
        <template v-slot:media>
            <img src="images/background-titulo-pagina.png">
        </template>

        <h1><slot></slot></h1>
    </q-parallax>
    <!-- <q-banner inline-actions style="padding: 12px 0">
        <h5 style="margin: 10px 0 0; text-align: center; line-height: 1rem">
            <slot></slot>
        </h5>
    </q-banner> -->
</template>

<script>
export default {

}
</script>

<style scoped>
    .q-banner{
        min-height: 0;
        padding: 5px
    }
    .q-parallax img{
        opacity: 0.2;
    }
    .q-parallax h1{
        color: #4D7C8A;
        font-weight: 400;
        font-size: 40px
    }
    @media(max-width: 599px){
        .q-parallax h1{
            font-size: 30px
        }
    }
</style>
