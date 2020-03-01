<template>
  <transition
      enter-active-class="animated fadeInLeft"
      mode="out-in" appear
  >
    <b-container class='mb-3'>
      <login></login>
    </b-container>
  </transition>
</template>

<script>
import Login from "@/components/Auth/Login.vue";
export default {
  components: {
    Login
  }
}
</script>
