<template>
    <div class="row q-mb-md">
        <div class="col-12 col-md-6 offset-md-3">
            <p>Envie dúvidas, críticas ou sugestões para melhorarmos o quiz através do formulário abaixo.</p> 
            <p>Você também pode utilizar o e-mail: <a href="mailto:contato@quizvicentino.com.br">contato@quizvicentino.com.br</a></p>
        </div>
        <div class="col-12 col-md-6 offset-md-3">
            <q-form class="col">
                <div class="row q-col-gutter-sm">
                    <div class="col-12">
                        <q-input ref="name" color="green-4" bg-color="white" outlined :dense="!$q.screen.lt.sm" v-model="form.name" label="Nome" :rules="[val => !!val || 'Informe seu nome']" :disable="logged">
                            <template v-slot:prepend>
                                <q-icon name="fas fa-user" />
                            </template>
                        </q-input>
                    </div>
                    
                    <div class="col-12">
                        <q-input ref="email" type="email" color="green-4" bg-color="white" outlined :dense="!$q.screen.lt.sm" v-model="form.email" label="E-mail" :rules="[val => !!val || 'Informe seu e-mail']" :disable="logged">
                            <template v-slot:prepend>
                                <q-icon name="fas fa-at" />
                            </template>
                        </q-input>
                    </div>
                
                    <div class="col-12">
                        <q-input ref="subject" color="green-4" bg-color="white" outlined :dense="!$q.screen.lt.sm" v-model="form.subject" label="Assunto" :rules="[val => !!val || 'Informe o assunto']">
                            <template v-slot:prepend>
                                <q-icon name="fas fa-clipboard-list" />
                            </template>
                        </q-input>
                    </div>

                    <div class="col-12">
                        <q-input ref="message" color="green-4" bg-color="white" outlined :dense="!$q.screen.lt.sm" v-model="form.message" rows="3" type="textarea" label="Mensagem" :rules="[val => !!val || 'Escreva a mensagem']">
                            <template v-slot:prepend>
                                <q-icon name="fas fa-envelope" />
                            </template>
                        </q-input>
                    </div>
                </div>
                <div class="row justify-center" style="margin-top: 15px">
                    <q-btn color="secondary" icon="fas fa-envelope" :loading="load" @click="send" label="Enviar" :class="$q.screen.lt.sm ? 'full-width' : ''" />
                </div>
            </q-form>
        </div>            
    </div>

    <q-dialog v-model="seamless" seamless position="right">
        <q-card style="width: 350px" class="bg-primary text-white">
            <q-card-section class="row items-center no-wrap">
            <div>
                <h6 style="margin: 5px">Outras formas de contato:</h6>
                <ul style="list-style: none" class="list-contact">
                    <li><q-icon name="fab fa-whatsapp"></q-icon> (31) 99158-4150</li>
                    <li><q-icon name="far fa-envelope"></q-icon> contato@quizvicentino.com.br</li>
                    <li><q-icon name="fas fa-home"></q-icon> http://www.quizvicentino.com.br</li>
                </ul>
            </div>

            <q-btn flat round icon="close" v-close-popup />
            </q-card-section>
        </q-card>
    </q-dialog>

    <q-dialog v-model="msgSuccess" persistent transition-show="scale" transition-hide="scale">
        <q-card class="bg-teal text-white q-py-sm q-px-sm" style="width: 300px">
            <q-card-section>
                <div class="text-h6">Confirmação</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
                Mensagem enviada com sucesso! Responderemos em breve
            </q-card-section>

            <q-card-actions align="right">
                <q-btn label="OK" color="white" text-color="secondary" v-close-popup />
            </q-card-actions>
        </q-card>
    </q-dialog>
    <q-dialog v-model="msgError" persistent transition-show="scale" transition-hide="scale">
        <q-card class="bg-negative text-white q-py-sm q-px-sm" style="width: 300px">
            <q-card-section>
                <div class="text-h6">Erro</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
                Erro ao enviar mensagem! Favor tentar novamente
            </q-card-section>

            <q-card-actions align="right">
                <q-btn label="OK" color="white" text-color="negative" v-close-popup />
            </q-card-actions>
        </q-card>
    </q-dialog>
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
            msgError: false,
            msgSuccess: false,
            load: false,
            seamless: false
        }
    },
    created(){
        if (this.logged){
            let userData = this.$store.getters.userData;
            this.form.name = userData.name;
            this.form.email = userData.email;
        }
    },
    computed:{
        logged(){
            return this.$store.getters.logged;
        }
    },
    methods:{
        send(){
            const refName = this.$refs.name;
            const refEmail = this.$refs.email;
            const refSubject = this.$refs.subject;
            const refMessage = this.$refs.message;

            refName.validate();
			refEmail.validate();
			refSubject.validate();
			refMessage.validate();
			
            if (refName.hasError || refEmail.hasError || refSubject.hasError || refMessage.hasError) return false;

            this.load = true;
            axios.post("contact/send", { dados: this.form })
            .then(response => {
                response = response.data;
                if (response.success) {
                    this.msgSuccess = true;
                    for (let prop in this.form){
                        this.form[prop] = "";
                    }
                }
                else this.msgError = true;
                
                this.load = false;
            }).catch(error => {
                //this.msgError = true;
                this.load = false;
                console.error("Erro ao enviar contato: "+error);
            });
        },
    }
}
</script>

<style scoped>
    input, textarea{
        margin-top: 15px;
    }
    .list-contact li{
        margin-bottom: 5px;
        font-size: initial
    }
</style>
