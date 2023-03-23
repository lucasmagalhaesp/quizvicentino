<template>
    <q-page>
        <page-title>Meus testes</page-title>
        <div class="q-pa-lg">
            <test-table if="logged" type="user" />
        </div>
    </q-page>
</template>

<script>
import TestTable from "components/Tests/TestTable";
import mixinLogged from "../mixins/logged"
import PageTitle from "components/Custom/PageTitle"
export default {
    mixins: [mixinLogged],
    components: {
        TestTable,
        PageTitle
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