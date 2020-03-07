<template>
    <div>
        <b-jumbotron class="page-title headline" header="Testes"></b-jumbotron>
        <b-row class="margin-vert-30">
            <b-col class="col-md-12">
                <b-button v-b-toggle.collapse-1 variant="primary" style="margin-bottom: 15px">Filtros</b-button>
                <b-collapse id="collapse-1" class="mt-2">
                    <b-card>
                        <b-row>
                            <b-col md="3">
                                <b-form-group
                                    class="mb-0"
                                    label="Data:"
                                    label-for="date"
                                >
                                    <b-form-input
                                        id="date"
                                        type="date"
                                        v-model="filter.date"
                                    ></b-form-input>
                                </b-form-group>
                            </b-col>
                            <b-col md="2">
                                <b-form-group
                                    class="mb-0"
                                    label="Núm. Acertos:"
                                    label-for="hits"
                                >
                                    <b-form-select v-model="filter.numHits" :options="filter.optionsHits" size="sm" class="form-control"></b-form-select>
                                </b-form-group>
                            </b-col>
                        </b-row>
                    </b-card>
                </b-collapse>
            </b-col>
            <b-col md="12">
                <b-table
                    :fields="fields"
                    :items="tests"
                    :current-page="pagination.currentPage"
                    :per-page="pagination.perPage"
                    striped bordered small responsive :busy="busy" show-empty
                    head-variant="dark"
                    filter=null
                    :filter-function="processFilters"
                    @filtered="onFiltered"
                    empty-filtered-text="Nenhum registro encontrado"
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
                { key: "testNum", label: "Núm.", sortable: true, class: "text-center" },
                { key: "created_at", label: "Data/Hora", sortable: true, class: "text-center",
                    formatter: (value, key, item) => {
                        return this.formatDateTimeBR(value);
                    } 
                },
                { key: "user.name", label: "Nome", sortable: true, class: this.type == "all" ? "text-center" : "text-center hidden" },
                { key: "points", label: "Acertos", sortable: true, class: "text-center" },
                { key: "time", label: "Tempo", sortable: true, class: "text-center",
                    formatter: (value, key, item) => {
                        return this.convertSecondsinMinutes(value);
                    } 
                },
            ],
            busy: false,
            filter:{
                numHits: null,
                date: "",
                optionsHits:[
                    { value: null, text: 'Selecione' },
                    { value: 0, text: '0' },
                    { value: 1, text: '1' },
                    { value: 2, text: '2' },
                    { value: 3, text: '3' },
                    { value: 4, text: '4' },
                    { value: 5, text: '5' },
                ]
            }
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
    },
    methods:{
        processFilters(row){
            let testDate = row.created_at.split(" ")[0];
            if (this.filter.date != "" && this.filter.date != null){
                if (testDate != this.filter.date) return false;
            }

            if (this.filter.numHits != null){
                if (row.points != this.filter.numHits) return false;
            }

            return true;
        },
        onFiltered(filteredItems){
            this.pagination.totalRecords = filteredItems.length;
            this.pagination.currentPage = 1;
        }
    }

}
</script>
