<template>
    <q-page>
        <transition
            enter-active-class="animated slideInLeft"
            mode="out-in" appear
        >
            <reset-password></reset-password>
        </transition>
    </q-page>
</template>

<script>
import ResetPassword from "components/Auth/ResetPassword";
export default {
    components:{
        ResetPassword
    }
}
</script>