<template>
    <q-page>
        <page-title>Perguntas</page-title>
        <div class="row q-pa-lg">
            <table-questions v-if="isAdmin" />
        </div>
    </q-page>
</template>

<script>
import TableQuestions from "components/Admin/TableQuestions";
import PageTitle from 'components/Custom/PageTitle'
import mixinLogged from "../../mixins/logged"
export default {
    mixins: [mixinLogged],
    components:{
        TableQuestions,
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
