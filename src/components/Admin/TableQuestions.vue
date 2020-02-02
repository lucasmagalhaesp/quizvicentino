<template>
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
        </b-table>

        <!-- Paginação -->
        <b-row class="mt-3">
            <b-col md="4">
                <b-pagination
                    v-model="pagination.currentPage"
                    :total-rows="pagination.totalRecords"
                    :per-page="pagination.perPage"
                    align="fill"
                    class="my-0"
                    md="6"
                ></b-pagination>
            </b-col>
        </b-row>
    </div>
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
                { key: "expiration_date", label: "Expira em:", sortable: true,
                    formatter: (value, key, item) => {
                        return this.formatDateBR(value);
                    }
                },
                { key: "created_at", label: "Cadastrada em", sortable: true,
                    formatter: (value, key, item) => {
                        return this.formatDateBR(value);
                    } 
                },
            ],
            busy: false
        }
    },
    created(){
        this.busy = true;
        axios("questions").then(response => {
            let resposta = response.data;
            if (resposta.success){
                this.questions = resposta.questions;
                this.pagination.totalRecords = this.questions.length;
            }
            this.busy = false;
        });
    }

}
</script>