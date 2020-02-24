<template>
    <b-progress :value="timeLeft" :max="max" show-value animated></b-progress>
</template>

<script>
export default {
    data(){
        return {
            max: 60,
            interval: "",
        }
    },
    created(){
        console.log("created timer");
        //this.$store.state.timeLeft = 60;
        this.$store.state.activateTimer = true;
    },
    computed:{
        activateTimer(){
            return this.$store.state.activateTimer
        },
        timeLeft:{
            get(){
                return this.$store.state.timeLeft;
            },
            set(value){
                this.$store.state.timeLeft = value
            }
        },
    },
    watch:{
        activateTimer(value){
            value ? this.cronometro() : this.pararCronometro()
        }
    },
    methods:{
        cronometro(){
            this.interval = setInterval(this.contador, 1000);
        },
        contador(){
            console.log(this.timeLeft);
            if (this.timeLeft == 0){
                this.$store.commit("stopTimer");
            }else this.timeLeft--;
        },
        pararCronometro(){
            clearInterval(this.interval);
        }
    },
    beforeDestroy(){
        this.pararCronometro();
    }
}
</script>