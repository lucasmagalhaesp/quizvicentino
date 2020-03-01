<template>
    <transition
        enter-active-class="animated fadeInLeft"
        mode="out-in" appear
    >
        <b-container>
            <contact-form></contact-form>
        </b-container>
    </transition>
</template>

<script>
import ContactForm from "@/components/Contact/ContactForm";
export default {
    components:{
        ContactForm
    }
}
</script>