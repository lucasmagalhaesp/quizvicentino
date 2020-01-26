<template>
  <div>
    <b-container class='mb-3'>
      <component :is="comp"></component>
    </b-container>
    <b-button variant="info" @click="comp = 'Register'">Cadastro</b-button>
    <b-button variant="primary" @click="comp = 'Login'">Login</b-button>
  </div>
</template>

<script>
import Register from "@/components/Auth/Register.vue";
import Login from "@/components/Auth/Login.vue";
export default {
  name: 'home',
  components: {
    Register, Login
  },
  data(){
    return {
      comp: "Login"
    }
  }
}
</script>
