<template>
    <b-row class="margin-vert-30">
        <b-col class="col-md-6 col-md-offset-3 col-sm-offset-3">
            <b-form class="login-page">
                <h2>Login</h2>
                <p>Ainda não é cadastrado? Clique
                    <router-link to="/register" tag="a" class="color-green">AQUI</router-link> e cadastre-se.
                </p>
                <b-form-input v-model="form.email" type="email" required placeholder="E-mail" :state="inputError.email.valid" aria-describedby="input-live-help input-email-feedback"></b-form-input>
                <b-form-invalid-feedback id="input-email-feedback">{{ inputError.email.msgError }}</b-form-invalid-feedback>
                
                <b-form-input v-model="form.password" type="password" required placeholder="Senha" :state="inputError.password.valid" aria-describedby="input-live-help input-password-feedback"></b-form-input>
                <b-form-invalid-feedback id="input-password-feedback">{{ inputError.password.msgError }}</b-form-invalid-feedback>

                <b-row>
                    <b-col>
                        <b-button variant="primary" @click="login" class="pull-right" style="margin: 15px">Entrar</b-button>
                    </b-col>
                </b-row>
                
                <h4>Esqueceu sua senha?</h4>
                <p><router-link to="/forgot-password" tag="a" class="color-green">Clique aqui</router-link> para recuperá-la</p>
            </b-form>    
        </b-col>
    </b-row>
</template>

<script>
export default {
    data(){
        return {
            form:{
                email: "",
                password: ""
            },
            inputError:{
                email: {
                    valid: null,
                    msgError: ""
                },
                password: {
                    valid: null,
                    msgError: ""
                }
            }
        }
    },
    methods:{
        login(){
            this.cleanErrors();
            axios.post("auth/login", { dados: this.form })
            .then(response => {
                response = response.data;
                if (response.success) { 
                    sessionStorage.setItem("quiz_vtoken", response.access_token);
                    this.$router.push({ name: "test-area" });
                }else console.error(response.msg);
            }).catch(error => {
                let errors = error.response.data.errors ? error.response.data.errors : null;
                if (errors != null){
                    if (errors == "Unauthorized"){
                        this.inputError.password.valid = false;
                        this.inputError.password.msgError = "Usuário e/ou senha incorretos";
                    }else{
                        for (let campo in errors){
                            this.inputError[campo.split(".")[1]].valid = false;
                            this.inputError[campo.split(".")[1]].msgError = errors[campo][0];
                        }
                    }
                }else{
                    console.error("Erro ao cadastrar usuário: "+error);
                }
            });
        },
        cleanErrors(){
            for (let campo in this.inputError){
                this.inputError[campo].valid = null;
                this.inputError[campo].msgError = "";
            }
        }
    }
}
</script>
<style scoped>
    input{
        margin-top: 15px;
    }
</style>
