<template>
  <b-row class="justify-content-md-center">
        <b-col md="8">
            <b-form>
                <b-row>
                    <b-col md="12">
                        <label for="question">Pergunta:</label>
                        <b-form-textarea id="question" v-model="form.description" type="text" required :state="inputError.description.valid" aria-describedby="input-live-help input-description-feedback"></b-form-textarea>
                        <b-form-invalid-feedback id="input-description-feedback">{{ inputError.description.msgError }}</b-form-invalid-feedback>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <label for="answerA">Resposta A:</label>
                        <b-form-textarea v-model="form.answers.a" id="answerA" required :state="inputError.answerA.valid" aria-describedby="input-live-help input-answerA-feedback"></b-form-textarea>
                        <b-form-invalid-feedback id="input-answerA-feedback">{{ inputError.answerA.msgError }}</b-form-invalid-feedback>
                    </b-col>
                    <b-col>
                        <label for="answerB">Resposta B:</label>
                        <b-form-textarea v-model="form.answers.b" id="answerB" required :state="inputError.answerB.valid" aria-describedby="input-live-help input-answerB-feedback"></b-form-textarea>
                        <b-form-invalid-feedback id="input-answerB-feedback">{{ inputError.answerB.msgError }}</b-form-invalid-feedback>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <label for="answerC">Resposta C:</label>
                        <b-form-textarea v-model="form.answers.c" id="answerC" required :state="inputError.answerC.valid" aria-describedby="input-live-help input-answerC-feedback"></b-form-textarea>
                        <b-form-invalid-feedback id="input-answerC-feedback">{{ inputError.answerC.msgError }}</b-form-invalid-feedback>
                    </b-col>
                    <b-col>
                        <label for="answerD">Resposta D:</label>
                        <b-form-textarea v-model="form.answers.d" id="answerD" required :state="inputError.answerD.valid" aria-describedby="input-live-help input-answerD-feedback"></b-form-textarea>
                        <b-form-invalid-feedback id="input-answerD-feedback">{{ inputError.answerD.msgError }}</b-form-invalid-feedback>
                    </b-col>
                </b-row>

                <b-row>
                    <b-col>
                        <label for="expiration_date">Data de validade:</label>
                        <b-form-input type="date" v-model="form.expiration_date" id="expiration_date" :state="inputError.expirationDate.valid" aria-describedby="input-live-help input-expirationDate-feedback"></b-form-input>
                        <b-form-invalid-feedback id="input-expirationDate-feedback">{{ inputError.expirationDate.msgError }}</b-form-invalid-feedback>
                    </b-col>
                    <b-col>
                        <b-form-group label="Resposta Certa:">
                            <b-form-radio-group
                                id="correct_answer"
                                v-model="form.correctAnswer"
                                :options="answers"
                                buttons
                                button-variant="outline-primary"
                                name="radio-btn-stacked"
                            ></b-form-radio-group>
                        </b-form-group>
                    </b-col>
                    <b-col>
                        <b-form-checkbox v-model="form.active" switch size="lg">Ativa?</b-form-checkbox>
                    </b-col>
                    <b-col>
                        <b-button-group>
                            <b-button variant="success" @click="save">Cadastrar</b-button>
                            <b-button variant="danger" @click="''">Cancelar</b-button>
                        </b-button-group>
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
            form:{
                description: "",
                answers: {
                    a: "",
                    b: "",
                    c: "",
                    d: "",
                },
                correctAnswer: "a",
                expiration_date: "",
                active: true
            },
            answers: [
                { text: 'A', value: 'a' },
                { text: 'B', value: 'b' },
                { text: 'C', value: 'c' },
                { text: 'D', value: 'd' }
            ],
            inputError:{
                description:{
                    valid: null,
                    msgError: ""
                },
                answerA: {
                    valid: null,
                    msgError: ""
                },
                answerB: {
                    valid: null,
                    msgError: ""
                },
                answerC: {
                    valid: null,
                    msgError: ""
                },
                answerD: {
                    valid: null,
                    msgError: ""
                },
                expirationDate:{
                    valid: null,
                    msgError: ""
                }
            }
        }
    },
    methods:{
        save(){
            this.cleanErrors();
            axios.post("questions", { dados: this.form })
            .then(response => {
                response = response.data;
                if (response.success) alert("Pergunta cadastrada com sucesso");
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
    textarea{
        margin-bottom: 15px;
    }
</style>
