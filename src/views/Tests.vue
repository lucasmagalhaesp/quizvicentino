<template>
    <transition
        enter-active-class="animated fadeInUp"
        mode="out-in" appear
    >
        <b-container>
            <test-table type="user"></test-table>
        </b-container>
    </transition>
</template>

<script>
import TestTable from "@/components/Tests/TestTable.vue";
export default {
    components: {
        TestTable
    }
}
</script>