<template>
    <transition
        enter-active-class="animated fadeInUp"
        mode="out-in" appear
    >
        <b-container>
            <ranking-table></ranking-table>
        </b-container>
    </transition>
</template>

<script>
import RankingTable from "@/components/Ranking/RankingTable.vue";
export default {
    components: {
        RankingTable
    }
}
</script>