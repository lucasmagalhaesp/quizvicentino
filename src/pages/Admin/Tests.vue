<template>
    <q-page>
        <page-title>Testes</page-title>
        <div class="q-pa-lg">
            <test-table if="logged" type="all" />
        </div>
    </q-page>
</template>

<script>
import PageTitle from "components/Custom/PageTitle"
import TestTable from "components/Tests/TestTable"
import mixinLogged from "../../mixins/logged"
export default {
    mixins: [mixinLogged],
    components:{
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