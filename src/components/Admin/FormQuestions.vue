<template>
  <b-row class="justify-content-md-center" v-if="formQuestionActive">
        <b-col md="8">
            <b-form>
                <b-row>
                    <b-col md="12">
                        <label for="question">Pergunta{{ questionID > 0 ? " nº "+questionID : "" }}:</label>
                        <b-form-textarea id="question" v-model="form.description" type="text"></b-form-textarea>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <label for="answerA">Resposta A:</label>
                        <b-form-textarea v-model="form.answers.a" id="answerA"></b-form-textarea>
                    </b-col>
                    <b-col>
                        <label for="answerB">Resposta B:</label>
                        <b-form-textarea v-model="form.answers.b" id="answerB"></b-form-textarea>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <label for="answerC">Resposta C:</label>
                        <b-form-textarea v-model="form.answers.c" id="answerC"></b-form-textarea>
                    </b-col>
                    <b-col>
                        <label for="answerD">Resposta D:</label>
                        <b-form-textarea v-model="form.answers.d" id="answerD"></b-form-textarea>
                    </b-col>
                </b-row>

                <b-row>
                    <b-col>
                        <label for="expiration_date">Data de validade:</label>
                        <b-form-input type="date" v-model="form.expiration_date" id="expiration_date"></b-form-input>
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
                            <b-button variant="success" @click="save">{{ questionID > 0 ? "Atualizar" : "Cadastrar"}}</b-button>
                            <b-button variant="danger" @click="formQuestionActive = false">Cancelar</b-button>
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
        }
    },
    methods:{
        save(){
            if (this.questionID > 0){
                axios.put(`questions/${this.questionID}`, {
                    dados: this.form
                }).then(response => {
                    response = response.data;
                    if (response.success) this.formQuestionActive = false;
                    else console.error(response.msg);
                }).catch(error => console.error("Erro ao atualizar pergunta: "+response));
            }else{
                axios.post("questions", { dados: this.form })
                .then(response => {
                    response = response.data;
                    if (response.success) this.formQuestionActive = false;
                    else console.error(response.msg);
                }).catch(error => console.error("Erro ao cadastrar pergunta: "+response));
            }
        },
        cleanFields(){
            this.form.description = "";
            for (let field in this.form.answers){
                this.form.answers[field] = "";
            }
            this.form.active = true;
            this.form.expiration_date = null;
            this.form.correctAnswer = "a";
        }
    },
    computed:{
        questionID:{
            get(){
                return this.$store.state.questionEditID;
            },
            set(value){
                this.$store.state.questionEditID = value;
            }
        },
        formQuestionActive:{
            get(){
                return this.$store.state.formQuestionActive;
            },
            set(value){
                this.$store.state.formQuestionActive = value;
            }
        }
    },
    watch:{
        questionID(value){
            if (value > 0){
                axios(`questions/${value}/edit`, {params:{ id: value }})
                .then(response => {
                    response = response.data;
                    if (response.success){
                        let question = response.question;
                        let answers = response.answers;
                        let correctAnswer = response.correctAnswer;

                        this.form.description = question.description;
                        this.form.active = question.active == "S";
                        this.form.expiration_date = question.expiration_date;

                        let options = ["a", "b", "c", "d"];
                        answers.forEach((answer, index) => {
                            this.form.answers[options[index]] = answer.description;
                            if (correctAnswer == answer.id) this.form.correctAnswer = options[index];
                        });
                    }
                }).catch(error => console.error(error));
            }else{
                this.cleanFields();
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
