<template>
    <q-page>
        <transition
            enter-active-class="animated slideInLeft"
            mode="out-in" appear
        >
            <forgot-password></forgot-password>
        </transition>
    </q-page>
</template>

<script>
import ForgotPassword from "components/Auth/ForgotPassword";
export default {
    components:{
        ForgotPassword
    }
}
</script>