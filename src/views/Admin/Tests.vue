<template>
    <transition
        enter-active-class="animated bounceInUp"
        mode="out-in" appear
    >
        <b-container>
            <test-table type="all"></test-table>
        </b-container>
    </transition>
</template>

<script>
import TestTable from "@/components/Tests/TestTable.vue"
export default {
    components:{
        TestTable
    }
}
</script>

<style>

</style>
