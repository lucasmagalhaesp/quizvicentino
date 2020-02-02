<template>
    <b-row class="justify-content-md-center">
        <b-col md="6">
            <b-form>
                <b-form-input v-model="form.email" type="email" required placeholder="E-mail" :state="inputError.email.valid" aria-describedby="input-live-help input-email-feedback"></b-form-input>
                <b-form-invalid-feedback id="input-email-feedback">{{ inputError.email.msgError }}</b-form-invalid-feedback>
                
                <b-form-input v-model="form.password" type="password" required placeholder="Senha" :state="inputError.password.valid" aria-describedby="input-live-help input-password-feedback"></b-form-input>
                <b-form-invalid-feedback id="input-password-feedback">{{ inputError.password.msgError }}</b-form-invalid-feedback>

                <b-button variant="success" @click="login">Entrar</b-button>
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
