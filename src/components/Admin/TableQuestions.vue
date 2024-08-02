<template>
    <div class="col-12 q-mb-md">
        <div v-if="!showFilters" class="row justify-end q-gutter-sm q-mb-md">
            <q-btn color="info" @click="newQuestion" label="Pergunta" icon="fas fa-plus" />
            <q-btn color="secondary" @click="showFilters = true" label="Filtrar" icon="fas fa-filter"/>
        </div>
        <div class="row q-col-gutter-md items-end q-mb-md" v-else>
            <div class="col-12 col-md-4">
                <label for="field-name">Filtrar pela descrição:</label>
                <q-input color="green-4" bg-color="white" outlined :dense="!$q.screen.lt.sm" v-model="filter.description" class="q-mt-sm" clearable>
                    <template v-slot:prepend>
                        <q-icon name="fas fa-list" />
                    </template>
                </q-input>
            </div>
            <div class="col-12 col-md-2">
                <label for="field-hits">Perguntas Ativas?</label><br />
                <q-btn-toggle
                    v-model="filter.active"
                    push
                    glossy
                    toggle-color="primary"
                    :options="[
                        { value: '', label: 'Geral' },
                        { value: 'S', label: 'Sim' },
                        { value: 'N', label: 'Não' }
                    ]"
                    class="q-mt-sm"
                />
            </div>
            <div class="col-12 col-md-2">
                <label for="field-date">Filtrar pela data de cadastro:</label>
                <q-input color="green-4" bg-color="white" outlined :dense="!$q.screen.lt.sm" v-model="filter.created_at" type="date" class="q-mt-sm" clearable>
                    <template v-slot:prepend>
                        <q-icon name="fas fa-calendar" />
                    </template>
                </q-input>
            </div>
            <div class="col-12 col-md-2">
                <label for="field-date">Filtrar pela data de expiração:</label>
                <q-input color="green-4" bg-color="white" outlined :dense="!$q.screen.lt.sm" v-model="filter.expiration_date" type="date" class="q-mt-sm" clearable>
                    <template v-slot:prepend>
                        <q-icon name="fas fa-calendar" />
                    </template>
                </q-input>
            </div>
            <div class="col-12 col-md-2 text-right">
                <q-btn color="negative" @click="showFilters = false" label="Fechar" icon="fas fa-window-close"/>
            </div>
        </div>
        <q-table
            :rows="questions"
            :columns="fields"
            row-key="name"
            :loading="busy"
            card-class="bg-grey-3"
            :hide-header="$q.screen.lt.sm"
            :rows-per-page-options="[$q.screen.lt.sm ? 5 : 10]"
            filter=null
            :filter-method="filtrar"
        >
            <template v-slot:loading>
                <q-inner-loading showing color="secondary" />
            </template>

            <template v-slot:body-cell-edtExc="props">
                <q-td>
                    <q-btn-group>
                        <q-btn color="primary" title="Editar" @click="edit(props.row.id)" icon="fas fa-edit" />
                        <q-btn color="negative" title="Excluir" @click="remove(props.row.id)" icon="fas fa-trash-alt" />
                    </q-btn-group>
                </q-td>
            </template>
            <template v-if="$q.screen.lt.sm" v-slot:body="question">
                <q-card class="bg-blue-grey-7">
                    <q-card-section class="card-title">
                        <div class="text-h6 text-center">Pergunta {{ question.row.id }}</div>
                    </q-card-section>
                    <q-card-section class="q-mb-md table-data-mobile">
                        <div class="row">
                            <div class="col-4">
                                <strong>Descrição:</strong> 
                            </div>
                            <div class="col-8">
                                {{ question.row.description }}
                            </div>
                        </div>
                        <q-separator />
                        <div class="row">
                            <div class="col-4">
                                <strong>Ativa?</strong> 
                            </div>
                            <div class="col-8">
                                {{ question.row.active == "S" ? "Sim" : "Não" }}
                            </div>
                        </div>
                        <q-separator />
                        <div class="row">
                            <div class="col-4">
                                <strong>Cadastrado em:</strong> 
                            </div>
                            <div class="col-8">
                                {{ formatDateTimeBR(question.row.created_at) }}
                            </div>
                        </div>
                        <q-separator />
                        <div class="row">
                            <div class="col-4">
                                <strong>Expira em:</strong> 
                            </div>
                            <div class="col-8">
                                {{ formatDateBR(question.row.expiration_date) }}
                            </div>
                        </div>
                        <q-separator />
                        
                        <div class="row justify-center">
                            <q-btn-group>
                                <q-btn color="primary" label="Editar" @click="edit(question.row.id)" push icon="fas fa-edit" />
                                <q-btn color="negative" label="Excluir" @click="remove(question.row.id)" push icon="fas fa-trash" />
                            </q-btn-group>
                        </div>
                    </q-card-section>
                </q-card>
            </template>

        </q-table>
    
    </div>
    
    <!-- modal com o formulário para adicionar/editar perguntas -->
    <q-dialog ref="mdPerguntas">
        <q-card style="width: 800px">
            <q-card-section class="row items-center q-pb-none bg-primary text-white">
                <div class="text-h6">{{ questionID > 0 ? 'Atualizar' : 'Cadastrar' }} pergunta</div>
                <q-space />
                <q-btn icon="close" flat round :dense="!$q.screen.lt.sm" v-close-popup />
            </q-card-section>
            <q-card-section class="q-my-md q-mx-sm">
                <div class="row">
                    <div class="col-12">
                        <form-questions :question-i-d="questionID" />
                    </div>
                </div>
            </q-card-section>
            <q-card-actions class="justify-end bg-primary text-white">
                <q-btn v-close-popup @click="save" text-color="white" label="Salvar" icon="fas fa-save" color="positive" />
                <q-btn v-close-popup text-color="white" label="Cancelar" icon="fas fa-ban" color="negative"  />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script>
import general from "../../mixins/general";
import PageTitle from '../Custom/PageTitle';
import FormQuestions from './FormQuestions.vue';
export default {
    components:{
        PageTitle,
        FormQuestions
    },
    mixins: [general],
    data(){
        return {
            questions: [],
            pagination:{
                currentPage: 1,
                perPage: 10,
                totalRecords: 1,
            },
            fields: [
                { field: "edtExc", name: "edtExc", label: "" },
                { field: "id", name: "id", label: "Cód.", sortable: true, align: "left" },
                { field: "description", name: "description", label: "Descrição", align: "left",
                    format: value => {
                        return `${value.substr(0, 100)}...`;
                    }
                },
                { field: "active", name: "active", label: "Ativa", sortable: true, align: "left",
                    format: value => {
                        return value == "S" ? "Sim" : "Não";
                    }
                },
                { field: "created_at", name: "created_at", label: "Cadastrada em", sortable: true, align: "left",
                    format: value => {
                        return this.formatDateTimeBR(value).split(" ")[0];
                    } 
                },
                { field: "expiration_date", name: "expiration_date", label: "Expira em:", align: "left",
                    format: value => {
                        return this.formatDateBR(value);
                    }
                },
            ],
            busy: false,
            questionRemoveID: 0,
            questionID: 0,
            showFilters: false,
            filter: {
                description: "",
                active: "",
                created_at: "",
                expiration_date: ""
            }
        }
    },
    created(){
        this.questionList();
    },
    methods:{
        filtrar(row){
            return row.filter(r => {
                let description = this.filter.description;
                let active = this.filter.active;
                let created_at = this.filter.created_at;
                let expiration_date = this.filter.expiration_date;

                if (description != "" && description != null && !((r.description.toUpperCase()).includes(description.toUpperCase()))) return false;
                if (active != "" && active != r.active) return false;
                if (created_at != "" && created_at != null && created_at != r.created_at.split(" ")[0]) return false;
                if (expiration_date != "" && expiration_date != null && expiration_date != r.expiration_date) return false;

                return true;
            });
        },
        questionList(){
            this.busy = true;
            axios("questions")
            .then(response => {
                let resposta = response.data;
                if (resposta.success){
                    this.questions = resposta.questions;
                }
                this.busy = false;
            });
        },
        newQuestion(){
            this.questionID = 0;
            this.$store.commit("clearFormQuestions");
            this.$refs.mdPerguntas.show();
        },
        save(){
            this.$q.loading.show({ message: "Salvando pergunta..." });
            if (this.questionID > 0){
                axios.put(`questions/${this.questionID}`, {
                    dados: this.form
                })
                .then(response => {
                    response = response.data;
                    if (response.success) this.formQuestionActive = false;
                    else console.error(response.msg);
                }).catch(error => console.error("Erro ao atualizar pergunta: "+error))
                .then(() => {
                    this.questionList();
                    this.$q.loading.hide();
                    this.$store.commit("clearFormQuestions");
                });
            }else{
                axios.post("questions", { dados: this.form })
                .then(response => {
                    response = response.data;
                    if (response.success) this.formQuestionActive = false;
                    else console.error(response.msg);
                }).catch(error => console.error("Erro ao cadastrar pergunta: "+error))
                .then(() => {
                    this.$q.loading.hide();
                    this.questionList();
                    this.$store.commit("clearFormQuestions");
                });
            }
        },
        edit(id){
            this.questionID = id;
            let question = this.questions.find(quest => quest.id == id);
            let answers = question.answers;
            let correctAnswer = question.correct_answer.answer_id;
            let form = {};

            form.description = question.description;
            form.active = question.active == "S";
            form.expiration_date = question.expiration_date;

            let options = ["a", "b", "c", "d"];
            form.answers = {a: "", b: "", c: "", d:""};
            answers.forEach((answer, index) => {
                form.answers[options[index]] = answer.description;
                if (correctAnswer == answer.id) form.correctAnswer = options[index];
            });

            this.$store.commit("formQuestions", form);

            this.$refs.mdPerguntas.show();
        },
        remove(id){
            this.$q.dialog({
                title: "Excluir",
                message: "Deseja realmente excluir a pergunta?",
                html: true,
                class: "bg-negative text-white q-py-sm q-px-sm",
                ok: {
                    push: true,
                    color: "white",
                    textColor: "black",
                    label: "SIM"
                },
                cancel: {
                    push: true,
                    color: "white",
                    textColor: "red",
                    label: "NÃO"
                }
            })
            .onOk(() => {
                this.questionRemoveID = id;
                axios.delete(`questions/${id}`)
                .then(response => {
                    let resposta = response.data;
                    if (resposta.success) this.questionList();
                    
                    this.$bvModal.hide("md-delete");
                })
                .then(response => console.error(response));
            })
            .onCancel(() => {});
        }
    },
    computed:{
        form(){
            return this.$store.state.formQuestions
        },
        formQuestionActive:{
            get(){
                let formQuestionActive = this.$store.state.formQuestionActive;
                if (!formQuestionActive) this.questionList();
                return formQuestionActive;
            },
            set(value){
                this.$store.state.formQuestionActive = value;
            }
        }
    },
    watch:{
        showFilters(value){
            if (!value) {
                this.filter.description = ""; 
                this.filter.active = "";
                this.filter.created_at = "";
                this.filter.expiration_date = "";
            }
        }
    }

}
</script>
<style scoped>
    .addQuestion{
        margin: 20px 0
    }
    .q-card__section{
        background: #DCE4E3 
    }
    .card-title{
        background: #00916E;
        color: #FFF
    }
</style>
