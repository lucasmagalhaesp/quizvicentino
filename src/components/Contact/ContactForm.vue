<template>
    <b-row class="justify-content-md-center">
        <b-col md="6">
            <b-alert show variant="success" v-if="msgSuccess">Mensagem enviada com sucesso! Responderemos em breve</b-alert>
            <b-alert show variant="danger" v-if="msgError">Erro ao enviar mensagem! Favor tentar novamente</b-alert>
            <b-form>
                <b-form-input v-model="form.name" type="text" required placeholder="Nome" :state="inputError.name.valid" aria-describedby="input-live-help input-name-feedback"></b-form-input>
                <b-form-invalid-feedback id="input-name-feedback">{{ inputError.name.msgError }}</b-form-invalid-feedback>
                
                <b-form-input v-model="form.email" type="email" required placeholder="E-mail" :state="inputError.email.valid" aria-describedby="input-live-help input-email-feedback"></b-form-input>
                <b-form-invalid-feedback id="input-email-feedback">{{ inputError.email.msgError }}</b-form-invalid-feedback>
                
                <b-form-input v-model="form.subject" type="text" required placeholder="Assunto" :state="inputError.subject.valid" aria-describedby="input-live-help input-subject-feedback"></b-form-input>
                <b-form-invalid-feedback id="input-subject-feedback">{{ inputError.subject.msgError }}</b-form-invalid-feedback>

                <b-form-textarea v-model="form.message" required placeholder="Mensagem" :state="inputError.message.valid" aria-describedby="input-live-help input-message-feedback"></b-form-textarea>
                <b-form-invalid-feedback id="input-message-feedback">{{ inputError.message.msgError }}</b-form-invalid-feedback>

                <b-button variant="success" @click="send">Enviar</b-button>
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
                email: "",
                subject: "",
                message: ""
            },
            inputError:{
                name:{
                    valid: null,
                    msgError: ""
                },
                email:{
                    valid: null,
                    msgError: ""
                },
                subject:{
                    valid: null,
                    msgError: ""
                },
                message:{
                    valid: null,
                    msgError: ""
                },
            },
            msgError: false,
            msgSuccess: false,
        }
    },
    methods:{
        send(){
            this.cleanErrors();
            axios.post("contact/send", { dados: this.form })
            .then(response => {
                response = response.data;
                if (response.success) {
                    for (let prop in this.form){ this.form[prop] = "" }
                    this.msgSuccess = true;
                }
                else this.msgError = true;
            }).catch(error => {
                let errors = error.response.data.errors ? error.response.data.errors : null;
                if (errors != null){
                    for (let campo in errors){
                        this.inputError[campo.split(".")[1]].valid = false;
                        this.inputError[campo.split(".")[1]].msgError = errors[campo][0];
                    }
                }else{
                    this.msgError = true;
                    console.error("Erro ao enviar contato: "+response);
                }
            });
        },
        cleanErrors(){
            this.msgSuccess = false;
            this.msgError = false;
            for (let campo in this.inputError){
                this.inputError[campo].valid = null;
                this.inputError[campo].msgError = "";
            }
        }
    }
}
</script>

<style scoped>
    input, textarea{
        margin-top: 15px;
    }
</style>
