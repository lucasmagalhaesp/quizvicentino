<template>
    <div>
        <b-jumbotron class="page-title headline" header="Ranking"></b-jumbotron>
        <b-row class="margin-vert-30">
            <b-col md="12">
                <b-table
                    :fields="fields"
                    :items="ranking"
                    :current-page="pagination.currentPage"
                    :per-page="pagination.perPage"
                    striped bordered small responsive :busy="busy"
                    :tbody-tr-class="userResult"
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
    </div>
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
                { key: "testNum", label: "Pos.", class: "text-center" },
                { key: "name", label: "Nome", class: "text-center" },
                { key: "points", label: "Acertos", class: "text-center" },
                { key: "time", label: "Tempo", class: "text-center",
                    formatter: (value, key, item) => {
                        return this.convertSecondsinMinutes(value);
                    }
                },
                { key: "email", label: "E-mail", class: "text-center" },
                { key: "city", label: "Cidade", class: "text-center" },
                { key: "created_at", label: "Data/Hora", class: "text-center",
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
    },
    computed:{
        userEmail(){
            return sessionStorage.getItem("quiz_vemail");
        }
    },
    methods:{
        userResult(item, type) {
            console.log(item.email, this.userEmail);
            //if (!item || type !== 'row') return
            if (item.email == this.userEmail) return 'bg-row-user'
        }
    }

}
</script>

<style>
    .bg-row-user{
        font-weight: 600;
        color: #008148
    }
</style>
