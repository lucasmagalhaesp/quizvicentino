<template>
    <q-page>
        <page-title>Recuperar Senha</page-title>
        <div class="row justify-center items-center q-pa-lg">
            <reset-password />
        </div>
    </q-page>
</template>

<script>
import PageTitle from "components/Custom/PageTitle"
import ResetPassword from "components/Auth/ResetPassword";
export default {
    components:{
        ResetPassword,
        PageTitle
    }
}
</script>