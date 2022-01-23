<template>
    <q-linear-progress stripe rounded size="20px" :value="timeLeft == 60 ? 1 : (timeLeft * 1.6) / 100" color="secondary">
        <div class="absolute-full flex flex-center">
            <q-badge color="white" text-color="secondary" :label="timeLeft" />
        </div>
    </q-linear-progress>
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
        //this.$store.state.activateTimer = true;
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