<template>
    <div>
        <h2>Instruções</h2>
        <b-button variant="primary" @click="redirectToGame">JOGAR</b-button>
    </div>
</template>

<script>
export default {
    created(){
        this.$store.state.hits = 0;
        this.$store.state.time = 0;
    },
    methods:{
        redirectToGame(){
            this.$store.state.cpActiveTestArea = "question"
        }
    }
}
</script>
