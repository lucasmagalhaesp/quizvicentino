export default {
    computed:{
        hits(){
            return this.$store.state.hits
        },
        time(){
            let timeInSeconds = this.$store.state.time;
            let minutes = Math.floor(timeInSeconds / 60);
            let seconds = timeInSeconds - (minutes * 60);
            return minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');
        },
    }
}