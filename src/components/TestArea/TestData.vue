<template>
    <div>
        <b-badge variant="primary">Acertos: {{ hits }}</b-badge>
        <b-badge variant="primary">Tempo gasto: {{ time }}</b-badge>
    </div>
    
</template>

<script>
export default {
    data(){
        return {
            
        }
    },
    computed:{
        hits:{
            get(){
                return this.$store.state.hits
            },
            set(value){
                this.$store.state.hits = value
            }
        },
        time:{
            get(){
                let timeInSeconds = this.$store.state.time;
                let minutes = Math.floor(timeInSeconds / 60);
                let seconds = timeInSeconds - (minutes * 60);
                return minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');
            },
            set(value){
                this.$store.state.time = value
            }
        },
    }
}
</script>