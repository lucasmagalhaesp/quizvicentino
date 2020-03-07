<template>
    <div>
        <b-jumbotron class="page-title headline" header="Usuários"></b-jumbotron>
        <b-row class="margin-vert-30">
            <b-col md="12">
                <b-table
                    :fields="fields"
                    :items="users"
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
                </b-row>
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
            users: [],
            pagination:{
                currentPage: 1,
                perPage: 10,
                totalRecords: 1,
            },
            fields: [
                { key: "id", label: "Cód.", sortable: true, class: "text-center" },
                { key: "name", label: "Nome", sortable: true, class: "text-center" },
                { key: "email", label: "E-mail", sortable: true, class: "text-center" },
                { key: "city", label: "Cidade", sortable: true, class: "text-center" },
                { key: "state", label: "UF", sortable: true, class: "text-center" },
                { key: "created_at", label: "Cadastrado em", sortable: true, class: "text-center",
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
        axios("users").then(response => {
            let resposta = response.data;
            if (resposta.success){
                this.users = resposta.users;
                this.pagination.totalRecords = this.users.length;
            }
            this.busy = false;
        });
    }

}
</script>