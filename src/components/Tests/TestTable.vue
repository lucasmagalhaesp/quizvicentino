<template>
    <div>
        <b-table
            :fields="fields"
            :items="tests"
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
import testData from "@/mixins/testData";
export default {
    mixins: [general, testData],
    props:["type"],
    data(){
        return {
            tests: [],
            pagination:{
                currentPage: 1,
                perPage: 10,
                totalRecords: 1,
            },
            fields: [
                { key: "testNum", label: "Núm.", sortable: true },
                { key: "created_at", label: "Data/Hora", sortable: true,
                    formatter: (value, key, item) => {
                        return this.formatDateTimeBR(value);
                    } 
                },
                { key: "points", label: "Acertos", sortable: true },
                { key: "time", label: "Tempo", sortable: true,
                    formatter: (value, key, item) => {
                        return this.convertSecondsinMinutes(value);
                    } 
                },
            ],
            busy: false
        }
    },
    created(){
        let url = this.type == "all" ? "tests": "tests/myTests";
        this.busy = true;
        axios(url, {
                headers: {
                    Authorization: 'Bearer '+sessionStorage.getItem("quiz_vtoken")
                }
            }).then(response => {
            let resposta = response.data;
            if (resposta.success){
                this.tests = resposta.tests;
                this.pagination.totalRecords = this.tests.length;
                this.tests = this.tests.map((item, index) => {
                    item.testNum = ++index;
                    return item;
                });
            }
            this.busy = false;
        });
    }

}
</script>