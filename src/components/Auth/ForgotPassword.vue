<template>
    <section class="col-12 col-md-5 q-mt-lg">
        <template v-if="!sendedEmail">
            <q-form class="col" @submit.prevent.stop="forgotPassword" lazy-rules>
                <q-chip v-if="informEmailAlert" id="email" color="info" class="full-width" square text-color="white">
                    Seu cadastro foi encontrado com sucesso. 
                    A partir de agora, você precisará informar o seu e-mail para recuperar a senha e fazer login.
                </q-chip>
                <label for="email-reset-password">Informe o e-mail ou nome de usuário cadastrado para recuperar sua senha:</label>
                <q-input class="q-mt-md" color="green-4" bg-color="white" v-model="email" outlined dense type="email" error-message="Usuário não encontrado" :error="userNotFound">
                    <template v-slot:prepend>
                        <q-icon name="fas fa-at" />
                    </template>
                </q-input>
            
                <div class="row justify-center" style="margin-top: 15px">
                    <q-btn color="secondary" :loading="load" icon="fas fa-bookmark" type="submit" label="Recuperar Senha" />
                </div>
            </q-form>
        </template>
        <template v-else>
            <q-form class="col" @submit.prevent.stop="checkSecurityCode" lazy-rules>
                <q-chip class="bg-primary text-white full-width q-my-sm" square style="font-size: 0.9em">
                    Informe o código de segurança no campo abaixo:
                </q-chip>
                <q-input color="green-4" bg-color="white" v-model="securityCode" outlined dense label="Código de Segurança" error-message="Código de segurança inválido" :error="errorSecurityCode">
                    <template v-slot:prepend>
                        <q-icon name="fas fa-code" />
                    </template>
                </q-input>
                <div class="row justify-center" style="margin-top: 15px">
                    <q-btn color="secondary" :loading="load" icon="fas fa-check" type="submit" label="Confirmar" />
                </div>
            </q-form>
        </template>
    </section>
</template>

<script>
import PageTitle from '../Custom/PageTitle';
export default {
    components: { PageTitle },
    data(){
        return {
            email: "",
            informEmailAlert: false,
            changeUsername: false,
            oldUsername: "",
            sendedEmail: false,
            securityCode: "",
            userNotFound: false,
            errorSecurityCode: false,
            load: false,
        }
    },
    methods:{
        forgotPassword(){
            this.load = true;
            this.informEmailAlert = false;
            this.sendedEmail = false;
            this.userNotFound = false;
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
                    this.userNotFound = true;   
                }
                this.load = false;
            }).catch(error => console.error("Erro ao recuperar a senha do usuário: "+error));
        },
        checkSecurityCode(){
            this.load = true;
            this.errorSecurityCode = false;
            axios.post("auth/checkSecurityCode", 
            {
                email: this.email,
                securityCode: this.securityCode
            })
            .then(response => {
                response = response.data;
                if (response.success) {
                    this.$store.state.emailResetPassword = this.email;
                    this.$router.push({ name: "resetPassword" });
                }else{
                    this.errorSecurityCode = true;
                }
                this.load = false;
            }).catch(error => console.error("Erro ao validar código de segurança: "+error));
        }
    }
}
</script>
