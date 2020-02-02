<template>
  <div>
    <b-container class='mb-3'>
      <h2>Quiz Vicentino!!!</h2>
    </b-container>
    <b-button variant="info" @click="register">Cadastro</b-button>
    <b-button variant="primary" @click="login">Login</b-button>
  </div>
</template>

<script>
export default {
  methods:{
    register(){
      this.$router.push("/register");
    },
    login(){
      this.$router.push("/login");
    }
  }  

}
</script>
