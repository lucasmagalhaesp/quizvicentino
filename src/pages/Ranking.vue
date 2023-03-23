<template>
    <q-page>
        <transition
            enter-active-class="animated slideInLeft"
            mode="out-in" appear
        >
            <ranking-table if="logged"></ranking-table>
        </transition>
    </q-page>
</template>

<script>
import RankingTable from "components/Ranking/RankingTable.vue";
import mixinLogged from "../mixins/logged"
export default {
    mixins: [mixinLogged],
    components: {
        RankingTable
    },
    computed: {
        logged(){
            return this.$store.state.logged
        }
    },
    async created(){
       await this.checkLoggedUser();
    }
}
</script>