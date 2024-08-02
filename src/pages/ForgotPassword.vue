<template>
    <q-page>
        <page-title>Recuperar Senha</page-title>
        <div class="row justify-center items-center q-pa-lg">
            <forgot-password />
        </div>
    </q-page>
</template>

<script>
import PageTitle from "components/Custom/PageTitle"
import ForgotPassword from "components/Auth/ForgotPassword";
export default {
    components:{
        ForgotPassword,
        PageTitle
    }
}
</script>