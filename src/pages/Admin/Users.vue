<template>
    <q-page>
        <page-title>Usuários</page-title>
        <div class="row q-pa-lg">
            <users if="logged" />
        </div>
    </q-page>
</template>

<script>
import PageTitle from "components/Custom/PageTitle"
import Users from "components/Admin/Users"
import mixinLogged from "../../mixins/logged"
export default {
    mixins: [mixinLogged],
    components:{
        Users,
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