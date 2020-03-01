<template>
   <transition
      enter-active-class="animated fadeInLeft"
      mode="out-in" appear
  >
    <b-container class='mb-3'>
      <register></register>
    </b-container>
   </transition>
</template>

<script>
import Register from "@/components/Auth/Register.vue";
export default {
  components: {
    Register
  }
}
</script>
