<template>
    <b-row class="margin-vert-30">
        <b-col class="col-md-6 col-md-offset-3 col-sm-offset-3">
            <b-form class="login-page">
                <div class="login-header margin-bottom-30">
                    <h2>Redefinir Senha</h2>
                </div>
                <b-alert show variant="success" v-if="changedPassword">
                    Senha alterada com sucesso
                </b-alert>
                <b-alert show variant="danger" v-if="errorChangedPassword">
                    Erro ao alterar a senha
                </b-alert>
                <label for="input-live">Digite sua nova senha:</label>
                <b-form-input v-model="password" type="password" required placeholder="Senha" :state="inputError.password.valid" aria-describedby="input-live-help input-password-feedback"></b-form-input>
                <b-form-invalid-feedback id="input-password-feedback">{{ inputError.password.msgError }}</b-form-invalid-feedback>
                
                <label for="input-live">Confirme a senha:</label>
                <b-form-input v-model="confirmPassword" type="password" required placeholder="Confirme sua senha" :state="inputError.confirmPassword.valid" aria-describedby="input-live-help input-confirmPassword-feedback"></b-form-input>
                <b-form-invalid-feedback id="input-confirmPassword-feedback">{{ inputError.confirmPassword.msgError }}</b-form-invalid-feedback>
               
                <b-row>
                    <b-col class="col-xs-12">
                        <b-button variant="primary" @click="resetPassword" class="pull-right col-xs-12 col-md-4" style="margin-top: 15px">Confirmar</b-button>
                    </b-col>
                </b-row>
            </b-form>
        </b-col>
    </b-row>
</template>

<script>
export default {
    data(){
        return {
            password: "",
            confirmPassword: "",
            changedPassword: false,
            errorChangedPassword: false,
            inputError:{
                password:{
                    msgError: "",
                    valid: null
                },
                confirmPassword:{
                    msgError: "",
                    valid: null
                }
            },
            token: ""
        }
    },
    created(){
        //this.token = this.$route.params.token;
    },
    methods:{
        resetPassword(){
            this.resetValidation();
            if (this.password != this.confirmPassword){
                this.inputError.confirmPassword.msgError = "As senhas não coincidem";
                this.inputError.confirmPassword.valid = false;
            }else{
                axios.post("auth/resetPassword", 
                {
                    email: this.emailResetPassword,
                    password: this.password
                })
                .then(response => {
                    response = response.data;
                    if (response.success) this.changedPassword = true;
                    else this.errorChangedPassword = true;
                }).catch(error => console.error("Erro ao redefinir a senha do usuário: "+error));
            }
        },
        resetValidation(){
            this.chagedPassword = false;
            this.errorChangedPassword = false;
            this.inputError.confirmPassword.msgError = "";
            this.inputError.confirmPassword.valid = null;
        }
    },
    computed:{
        emailResetPassword(){
            return this.$store.state.emailResetPassword;
        }
    }
}
</script>
