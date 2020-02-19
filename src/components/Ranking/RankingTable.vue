<template>
    <b-row class="margin-vert-30">
        <b-col md="12">
            <div class="headline">
                <h2>Ranking</h2>
            </div>
        </b-col>
        
        <b-col md="12">
            <b-table
                :fields="fields"
                :items="ranking"
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
        </b-col>

        <!-- Paginação -->
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
</template>

<script>
import general from "@/mixins/general";
export default {
    mixins: [general],
    data(){
        return {
            ranking: [],
            pagination:{
                currentPage: 1,
                perPage: 10,
                totalRecords: 1,
            },
            fields: [
                { key: "testNum", label: "Núm." },
                { key: "name", label: "Nome" },
                { key: "email", label: "E-mail" },
                { key: "city", label: "Cidade" },
                { key: "points", label: "Acertos" },
                { key: "time", label: "Tempo",
                    formatter: (value, key, item) => {
                        return this.convertSecondsinMinutes(value);
                    }
                },
                { key: "created_at", label: "Data/Hora",
                    formatter: (value, key, item) => {
                        return this.formatDateTimeBR(value);
                    }
                },
            ],
            busy: false
        }
    },
    created(){
        this.busy = true;
        axios("ranking").then(response => {
            let resposta = response.data;
            if (resposta.success){
                this.ranking = resposta.ranking;
                this.pagination.totalRecords = this.ranking.length;
                this.ranking = this.ranking.map((item, index) => {
                    item.testNum = `${++index}º`;
                    return item;
                });
            }
            this.busy = false;
        });
    }

}
</script>