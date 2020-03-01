<template>
    <transition
      enter-active-class="animated fadeInLeft"
      mode="out-in" appear
    >
        <b-container>
            <forgot-password></forgot-password>
        </b-container>
    </transition>
</template>

<script>
import ForgotPassword from "@/components/Auth/ForgotPassword";
export default {
    components:{
        ForgotPassword
    }
}
</script>