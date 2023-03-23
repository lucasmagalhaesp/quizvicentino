<template>
    <q-page>
        <page-title>Perguntas</page-title>
        <div class="row q-pa-lg">
            <table-questions if="logged" />
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
        }
    },
    async created(){
       await this.checkLoggedUser();
    }
}
</script>
