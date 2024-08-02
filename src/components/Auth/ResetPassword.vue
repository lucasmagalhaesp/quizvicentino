<template>
    <section class="col-12 col-md-5 q-mt-lg">
        <q-form class="col" @submit.prevent.stop="resetPassword" lazy-rules>
                <q-input color="green-4" bg-color="white" v-model="password" outlined dense label="Digite sua nova senha" type="password" :rules="[val => !!val || 'Informe sua nova senha', val => val.length > 5 || 'A senha deve ter no mínimo 6 caracteres']">
                <template v-slot:prepend>
                    <q-icon name="fas fa-key" />
                </template>
            </q-input>
            
            <q-input color="green-4" bg-color="white" v-model="confirmPassword" outlined dense label="Confirme sua senha" type="password" :rules="[val => !!val || 'Confirme a senha digitada acima', val => val == password || 'Senhas não coincidem']">
                <template v-slot:prepend>
                    <q-icon name="fas fa-key" />
                </template>
            </q-input>
            <div class="row justify-center" style="margin-top: 15px">
                <q-btn color="secondary" icon="fas fa-check" :loading="load" type="submit" label="Confirmar" />
            </div>
        </q-form>
    </section>
</template>

<script>
import PageTitle from '../Custom/PageTitle';
export default {
    components: { PageTitle },
    data(){
        return {
            password: "",
            confirmPassword: "",
            errorChangedPassword: false,
            token: "",
            load: false,
        }
    },
    methods:{
        resetPassword(){
            this.load = true;
            axios.post("auth/resetPassword", 
            {
                email: this.emailResetPassword,
                password: this.password
            })
            .then(response => {
                response = response.data;
                if (response.success) this.$router.push("/login");
                else this.errorChangedPassword = true;
                
                this.load = false;
            }).catch(error => console.error("Erro ao redefinir a senha do usuário: "+error));
        },
    },
    computed:{
        emailResetPassword(){
            return this.$store.state.emailResetPassword;
        }
    }
}
</script>
