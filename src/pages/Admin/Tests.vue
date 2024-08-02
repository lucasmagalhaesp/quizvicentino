<template>
    <q-page>
        <page-title>Testes</page-title>
        <div class="q-pa-lg">
            <test-table v-if="isAdmin" type="all" />
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
        },
        isAdmin(){
            return this.$store.state.isAdmin
        }
    },
    async created(){
        this.$q.loading.show({ message: "Carregando..." });
        setTimeout(() => {
            if (!this.isAdmin) this.$router.push({ name: "index" });
            
            this.$q.loading.hide();
        }, 1000);
       await this.checkLoggedUser();
    }
}
</script>