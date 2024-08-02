<template>
    <div class="row justify-center items-center">
        <div class="col-12 col-md-4 q-mt-lg">
            <div class="row q-mb-md">
                <div class="col-12">
                    Ainda não é cadastrado? <q-btn :dense="!$q.screen.lt.sm" to="/cadastrar" color="primary" flat label="Cadastre-se" no-caps />.
                </div>
            </div>
            <q-form @submit.prevent.stop="login" lazy-rules class="col">
                <!-- <q-chip color="red" class="full-width" square text-color="white" icon="fas fa-exclamation-circle" v-if="invalidLogin">E-mail e/ou senha inválidos</q-chip> -->

                <div class="row q-col-gutter-sm">
                    <div class="col-12">
                        <q-input color="green-4" bg-color="white" outlined :dense="!$q.screen.lt.sm" v-model="form.email" label="E-mail" type="email" :rules="[val => !!val || 'Informe seu e-mail']">
                            <template v-slot:prepend>
                                <q-icon name="fas fa-at" />
                            </template>
                        </q-input>
                    </div>
                
                    <div class="col-12">
                        <q-input color="green-4" bg-color="white" outlined :dense="!$q.screen.lt.sm" v-model="form.password" label="Senha" type="password" :rules="[val => !!val || 'Informe sua senha']">
                            <template v-slot:prepend>
                                <q-icon name="fas fa-key" />
                            </template>
                        </q-input>
                    </div>

                </div>
            
                <div class="row justify-between" style="margin: 15px 0">
                    <q-btn @click="$router.push({name: 'forgotPassword'})" color="primary" flat label="Esqueci minha senha" no-caps :class="$q.screen.lt.sm ? 'full-width' : ''" :style="$q.screen.lt.sm ? 'order: 2' : 'order: 1'" />
                    <q-btn :loading="load" color="secondary" icon="fas fa-sign-in-alt" type="submit" label="Entrar" :class="$q.screen.lt.sm ? 'full-width' : ''" :style="$q.screen.lt.sm ? 'order: 1' : 'order: 2'" />
                </div>
            </q-form>
        </div>
    </div>
    <q-dialog v-model="msgError">
        <q-card class="text-white bg-negative q-py-sm q-px-sm" style="width: 300px">
            <q-card-section>
                <div class="text-h6 text-center">Erro!!!</div>
            </q-card-section>

            <q-card-section class="q-pt-none q-my-md">
                E-mail e/ou senha inválidos
            </q-card-section>

            <q-card-actions align="right">
                <q-btn label="OK" color="white" text-color="black" v-close-popup />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script>
export default {
    data(){
        return {
            form:{
                email: "",
                password: ""
            },
            invalidLogin: false,
            load: false,
            tab: "register",
            msgError: false
        }
    },
    methods:{
        login(){
            this.load = true;
            this.invalidLogin = false;
            axios.post("auth/login", { dados: this.form })
            .then(response => {
                response = response.data;
                if (response.success) { 
                    this.$store.commit("login", response);
                    this.$router.push({ name: "instructions" });
                }else {
                    this.invalidLogin = true;
                    this.msgError = true;
                }
            })
            .catch(error => {
                this.$q.dialog({
                    title: "Erro",
                    message: "Erro ao tentar fazer login. Tente novamente mais tarde",
                    html: true,
                    class: "bg-negative text-white q-py-sm q-px-sm",
                    ok: {
                        push: true,
                        color: "white",
                        textColor: "black",
                        label: "Ok"
                    }
                });
            })
            .then(() => this.load = false);
        },
    }
}
</script>
<style>
    .q-card__section--vert {
        padding: 5px
    }

    .register-link{
        cursor: pointer
    }
</style>
