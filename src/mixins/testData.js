import general from "./general";
export default {
    mixins: [general],
    computed:{
        hits(){
            return this.$store.state.hits
        },
        time(){
            return this.convertSecondsinMinutes(this.$store.state.time);
        }
    },
}