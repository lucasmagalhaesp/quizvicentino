<template>
    <b-row class="justify-content-md-center">
        <b-col md="6">
            <b-form>
                <b-alert show variant="primary" v-if="informEmailAlert">
                    Seu cadastro foi encontrado com sucesso. 
                    A partir agora, você precisará informar o seu e-mail para recuperar a senha e fazer login.
                </b-alert>
                <b-alert show variant="success" v-if="sendedEmail">
                    As instruções para redefinir sua senha foram envidas para o seu e-mail.
                </b-alert>
                <label for="input-live" v-else>Informe o e-mail ou nome de usuário cadastrado para recuperar sua senha:</label>
                <b-form-input v-model="email" type="email" required placeholder="E-mail" :state="valid" aria-describedby="input-live-help input-email-feedback"></b-form-input>
                <b-form-invalid-feedback id="input-email-feedback">{{ msgError }}</b-form-invalid-feedback>
                <b-button variant="primary" @click="forgotPassword">Recuperar Senha</b-button>
            </b-form>
        </b-col>
    </b-row>
</template>

<script>
export default {
    data(){
        return {
            email: "",
            valid: null,
            msgError: "",
            informEmailAlert: false,
            changeUsername: false,
            oldUsername: "",
            sendedEmail: false
        }
    },
    methods:{
        forgotPassword(){
            this.informEmailAlert = false;
            this.sendedEmail = false;
            this.valid = null;
            this.msgError = "";
            axios.post("auth/forgotPassword", 
            {
                email: this.email, 
                changeUsername: this.changeUsername,
                oldUsername: this.oldUsername
            })
            .then(response => {
                response = response.data;
                if (response.success) {
                    if (response.changeUsername != undefined){
                        this.informEmailAlert = true;
                        this.changeUsername = true;
                        this.oldUsername = this.email;
                        this.email = "";
                    }else{
                        this.sendedEmail = true;
                    }
                }else{
                    this.valid = false;
                    this.msgError = response.msg;
                } 
            }).catch(error => console.error("Erro ao recuperar a senha do usuário: "+error));
        }
    }
}
</script>
