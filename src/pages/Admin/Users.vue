<template>
    <q-page>
        <page-title>Usuários</page-title>
        <div class="row q-pa-lg">
            <users v-if="isAdmin" />
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