<template>
    <b-row class="justify-content-md-center">
        <b-col md="6">
            <b-form>
                <b-form-input v-model="form.name" type="text" required placeholder="Nome" :state="inputError.name.valid" aria-describedby="input-live-help input-name-feedback"></b-form-input>
                <b-form-invalid-feedback id="input-name-feedback">{{ inputError.name.msgError }}</b-form-invalid-feedback>
                
                <b-form-input v-model="form.state" type="text" required placeholder="Estado" :state="inputError.state.valid" aria-describedby="input-live-help input-state-feedback" maxlength="2"></b-form-input>
                <b-form-invalid-feedback id="input-state-feedback">{{ inputError.state.msgError }}</b-form-invalid-feedback>
                
                <b-form-input v-model="form.city" type="text" required placeholder="Cidade" :state="inputError.city.valid" aria-describedby="input-live-help input-city-feedback"></b-form-input>
                <b-form-invalid-feedback id="input-city-feedback">{{ inputError.city.msgError }}</b-form-invalid-feedback>

                <b-form-input v-model="form.email" type="email" required placeholder="E-mail" :state="inputError.email.valid" aria-describedby="input-live-help input-email-feedback"></b-form-input>
                <b-form-invalid-feedback id="input-email-feedback">{{ inputError.email.msgError }}</b-form-invalid-feedback>
                
                <b-form-input v-model="form.password" type="password" required placeholder="Senha" :state="inputError.password.valid" aria-describedby="input-live-help input-password-feedback"></b-form-input>
                <b-form-invalid-feedback id="input-password-feedback">{{ inputError.password.msgError }}</b-form-invalid-feedback>
                
                <b-form-input v-model="form.confirmPassword" type="password" required placeholder="Confirme sua senha" :state="inputError.confirmPassword.valid" aria-describedby="input-live-help input-confirmPassword-feedback"></b-form-input>
                <b-form-invalid-feedback id="input-confirmPassword-feedback">{{ inputError.confirmPassword.msgError }}</b-form-invalid-feedback>
                
                <b-button variant="success" @click="register">Cadastrar</b-button>
            </b-form>
        </b-col>
    </b-row>
</template>

<script>
export default {
    data(){
        return {
            form:{
                name: "",
                city: "",
                state: "",
                email: "",
                password: "",
                confirmPassword: ""
            },
            inputError:{
                name:{
                    valid: null,
                    msgError: ""
                },
                city: {
                    valid: null,
                    msgError: ""
                },
                state: {
                    valid: null,
                    msgError: ""
                },
                email: {
                    valid: null,
                    msgError: ""
                },
                password: {
                    valid: null,
                    msgError: ""
                },
                confirmPassword: {
                    valid: null,
                    msgError: ""
                }
            }
            
        }
    },
    methods:{
        register(){
            this.cleanErrors();
            axios.post("users", { dados: this.form })
            .then(response => {
                response = response.data;
                if (response.success) alert("Usuário cadastrado com sucesso");
                else console.error(response.msg);
            }).catch(error => {
                let errors = error.response.data.errors ? error.response.data.errors : null;
                if (errors != null){
                    for (let campo in errors){
                        this.inputError[campo.split(".")[1]].valid = false;
                        this.inputError[campo.split(".")[1]].msgError = errors[campo][0];
                    }
                }else{
                    console.error("Erro ao cadastrar usuário: "+response);
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
