<template>
    <div>
        <b-jumbotron class="page-title headline" header="Contato"></b-jumbotron>
        <b-row class="margin-vert-30">
            <b-col md="8">
                <p>Entre em contato conosco. Envie dúvidas, críticas ou sugestões para melhorarmos o site.</p>
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
                </b-form>
                <b-row>
                    <b-col class="col-xs-12">
                        <b-button variant="primary" @click="send" class="pull-right col-xs-12 col-md-3" style="margin: 15px 0">Enviar</b-button>
                    </b-col>
                </b-row>
            </b-col>
            <b-col md="4">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title">Outras formas de contato</h3>
                    </div>
                    <div class="panel-body">
                        <p>Além do formulário abaixo, você também pode entrar em contato diretamente conosco através dos meios abaixo:</p>
                        <ul class="list-unstyled">
                            <li>
                                <i class="fa-phone color-primary"></i>(31) 99158-4150</li>
                            <li>
                                <i class="fa-envelope color-primary"></i>contato@quizvicentino.com.br</li>
                            <li>
                                <i class="fa-home color-primary"></i>http://www.quizvicentino.com.br</li>
                        </ul>
                    </div>
                </div>
            </b-col>
        </b-row>
    </div>
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
