<template>
    <b-row class="justify-content-md-center">
        <b-col md="6">
            <b-form>
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
               
                <b-button variant="primary" @click="resetPassword">Confirmar</b-button>
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
        this.token = this.$route.params.token;
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
                    password: this.password,
                    token: this.token
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
    }
}
</script>
