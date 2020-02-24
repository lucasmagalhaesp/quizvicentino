<template>
    <b-row class="margin-vert-30">
        <b-col md="12">
            <div class="headline">
                <h2>Perguntas</h2>
            </div>
        </b-col>
        
        <b-col md="12" v-if="!formQuestionActive">
            <div>
                <b-table
                    :fields="fields"
                    :items="questions"
                    :current-page="pagination.currentPage"
                    :per-page="pagination.perPage"
                    striped bordered small responsive :busy="busy"
                >
                    <template v-slot:table-busy>
                        <div class="text-center text-info my-2">
                            <b-spinner class="align-middle"></b-spinner>
                            <strong>Carregando...</strong>
                        </div>
                    </template>

                    <template v-slot:cell(edtExc)="row">
                        <b-button-group size="sm" style="width: 80px">
                            <b-button variant="primary" title="Editar" @click="edit(row.item.id)"><i class="fas fa-edit"></i></b-button>
                            <b-button variant="danger" title="Excluir" @click="remove(row.item.id)"><i class="fas fa-trash-alt"></i></b-button>
                        </b-button-group>
                    </template>
                </b-table>

                <!-- Paginação -->
                <b-row class="mt-3">
                    <b-col md="5">
                        <b-pagination
                            v-model="pagination.currentPage"
                            :total-rows="pagination.totalRecords"
                            :per-page="pagination.perPage"
                            align="fill"
                            class="my-0"
                            md="6"
                        ></b-pagination>
                    </b-col>
                    <b-col md="2" class="col-md-offset-5 text-right">
                        <b-button variant="info" @click="newQuestion" class="addQuestion"><i class="fas fa-plus"></i> Pergunta</b-button>
                    </b-col>
                </b-row>
                <!-- Modal para confirmação de exclusão -->
                <b-modal id="md-delete" title="Excluir empresa" button-size="sm"
                    :header-bg-variant="'danger'" 
                    :header-text-variant="'light'"
                    :footer-bg-variant="'danger'"
                    >
                    <p>Deseja realmente excluir esse registro?</p>
                    <template v-slot:modal-footer="{ ok, cancel }">
                        <b-button variant="success" @click="remove(questionRemoveID, true)">
                            OK
                        </b-button>
                        <b-button variant="light" @click="cancel()">
                            Cancelar
                        </b-button>
                    </template>
                </b-modal>
            </div>
        </b-col>
    </b-row>
</template>

<script>
import general from "@/mixins/general";
export default {
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
                { key: "edtExc", label: "" },
                { key: "id", label: "Cód.", sortable: true },
                { key: "description", label: "Descrição", sortable: true, class: "text-left",
                    formatter: (value, key, item) => {
                        return `${value.substr(0, 100)}...`;
                    }
                },
                { key: "active", label: "Ativa", sortable: true,
                    formatter: (value, key, item) => {
                        return value == "S" ? "Sim" : "Não";
                    }
                },
                { key: "expiration_date", label: "Expira em:", sortable: true, class: "text-nowrap",
                    formatter: (value, key, item) => {
                        return this.formatDateBR(value);
                    }
                },
                { key: "created_at", label: "Cadastrada em", sortable: true, class: "text-nowrap",
                    formatter: (value, key, item) => {
                        return this.formatDateBR(value);
                    } 
                },
            ],
            busy: false,
            questionRemoveID: 0
        }
    },/* 
    created(){
        this.questionList();
    }, */
    methods:{
        questionList(){
            this.busy = true;
            axios("questions").then(response => {
                let resposta = response.data;
                if (resposta.success){
                    this.questions = resposta.questions;
                    this.pagination.totalRecords = this.questions.length;
                }
                this.busy = false;
            });
        },
        newQuestion(){
            this.questionID = 0;
            this.formQuestionActive = true
        },
        edit(id){
            this.$store.state.questionEditID = id;
            this.formQuestionActive = true;
        },
        remove(id, confirmacao = false){
            if (!confirmacao){
                this.questionRemoveID = id;
                this.$bvModal.show("md-delete");
                return false;
            }else{
                axios.delete(`questions/${id}`)
                .then(response => {
                    let resposta = response.data;
                    if (resposta.success)
                        this.questionList();
                    
                    this.$bvModal.hide("md-delete");
                })
                .then(response => console.error(response));
            }
        },
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
                let formQuestionActive = this.$store.state.formQuestionActive;
                if (!formQuestionActive) this.questionList();
                return formQuestionActive;
            },
            set(value){
                this.$store.state.formQuestionActive = value;
            }
        }
    }

}
</script>
<style>
    .addQuestion{
        margin: 20px 0
    }
</style>
