<template>
    <div class="row justify-center q-pb-lg">
        <div class="col-12 col-md-8 q-mt-lg">
            <div v-if="!showFilters" class="row justify-end">
                <q-btn color="secondary" @click="showFilters = true" label="Filtrar" icon="fas fa-filter"/>
            </div>
            <div class="row q-col-gutter-md items-end" v-else>
                <div class="col-12 col-md-6">
                    <label for="field-name">Filtrar pelo nome:</label>
                    <q-input color="green-4" @keyup="filter.name = filter.name.toUpperCase()" bg-color="white" outlined dense v-model="filter.name" class="q-mt-sm" clearable>
                        <template v-slot:prepend>
                            <q-icon name="fas fa-user" />
                        </template>
                    </q-input>
                </div>
                <div class="col-12 col-md-6" :class="$q.screen.lt.sm ? '' : 'text-right'">
                    <label for="btn-hits">Filtrar pelo número de acertos:</label>
                     <q-btn-toggle
                        v-model="filter.numHits"
                        push
                        glossy
                        toggle-color="primary"
                        :options="filter.optionsHits"
                        class="q-mt-sm"
                    />
                </div>
                <div class="col-12 col-md-4">
                    <label for="field-date">Filtrar pela data:</label>
                    <q-input color="green-4" bg-color="white" outlined dense v-model="filter.date" type="date" class="q-mt-sm" clearable>
                        <template v-slot:prepend>
                            <q-icon name="fas fa-calendar" />
                        </template>
                    </q-input>
                </div>
                <div class="col text-right">
                    <q-btn color="negative" @click="showFilters = false" label="Fechar" icon="fas fa-window-close"/>
                </div>
            </div>
        </div>
        <div class="col-12 col-md-8 q-mt-lg">
            <q-table
                :rows="tests"
                :columns="fields"
                row-key="name"
                :loading="busy"
                card-class="bg-grey-3"
                filter=null
                :filter-method="filtrar"
                :hide-header="$q.screen.lt.sm"
                :rows-per-page-options="[$q.screen.lt.sm ? 5 : 10]"
            >
                <template v-slot:loading>
                    <q-inner-loading showing color="secondary" />
                </template>

                <template v-slot:body-cell-print="props">
                    <q-td class="text-right">
                        <q-btn-group>
                            <q-btn color="info" @click="print(props.row.id)"><i class="fas fa-print"></i></q-btn>
                        </q-btn-group>
                    </q-td>
                </template>
                
                <template v-if="$q.screen.lt.sm" v-slot:body="test">
                    <q-card class="bg-blue-grey-7">
                        <q-card-section class="card-title">
                            <div class="text-h6 text-center">Teste n° {{ type == "all" ? test.row.id : test.row.personalID }}</div>
                        </q-card-section>
                        <q-card-section class="q-mb-md table-data-mobile">
                            <div class="row">
                                <div class="col-6">
                                    <strong>Data/Hora:</strong> 
                                </div>
                                <div class="col-6">
                                    {{ formatDateTimeBR(test.row.created_at) }}
                                </div>
                            </div>
                            <q-separator />
                            <div class="row" v-if="type == 'all'">
                                <div class="col-6">
                                    <strong>Nome:</strong> 
                                </div>
                                <div class="col-6">
                                    {{ test.row.name }}
                                </div>
                            </div>
                            <q-separator />
                            <div class="row">
                                <div class="col-6">
                                    <strong>Acertos:</strong> 
                                </div>
                                <div class="col-6">
                                    {{ test.row.points }}
                                </div>
                            </div>
                            <q-separator />
                            <div class="row">
                                <div class="col-6">
                                    <strong>Tempo:</strong> 
                                </div>
                                <div class="col-6">
                                    {{ convertSecondsinMinutes(test.row.time) }}
                                </div>
                            </div>
                            <q-separator />
                            
                            <div class="row justify-center">
                                <q-btn-group>
                                    <q-btn color="info" label="Imprimir" @click="print(test.row.id)" push icon="fas fa-print" />
                                </q-btn-group>
                            </div>
                        </q-card-section>
                    </q-card>
                </template>
            </q-table>
        </div>
    </div>
</template>

<script>
import general from "../../mixins/general"
import testData from "../../mixins/testData"
import PageTitle from '../Custom/PageTitle';
export default {
    components:{
        PageTitle
    },
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
                { name: "created_at", field: "created_at", label: "Data/Hora", align: "center",
                    format: (value, key, item) => {
                        /* let dateTime = this.formatDateBR(value).split(":");
                        dateTime.pop();
                        return dateTime.join(":").replace(",", ""); */

                        return this.formatDateTimeBR(value);
                    } 
                },
                { name: "name", field: "name", label: "Nome", align: "center", headerClasses: this.type != "all" ? "hidden" : "", classes: this.type != "all" ? "hidden" : "" },
                { name: "points", field: "points", label: "Acertos", align: "center" },
                { name: "time", field: "time", label: "Tempo", align: "center",
                    format: (value, key, item) => {
                        return this.convertSecondsinMinutes(value);
                    } 
                },
                { name: "print", field: "print", label: "" }
            ],
            busy: false,
            showFilters: false,
            filter:{
                numHits: null,
                date: "",
                name: "",
                optionsHits:[
                    { value: null, label: 'Todos' },
                    { value: 0, label: '0' },
                    { value: 1, label: '1' },
                    { value: 2, label: '2' },
                    { value: 3, label: '3' },
                    { value: 4, label: '4' },
                    { value: 5, label: '5' },
                ]
            }
        }
    },
    created(){
        let url, fieldID;
        if (this.type == "all"){
            url = "tests";
            fieldID = { name: "id", field: "id", label: "Núm.", align: "center" };
        }else{
            url = "tests/myTests";
            fieldID = { name: "personalID", field: "personalID", label: "Núm.", align: "center" };
        }
        this.fields.unshift(fieldID);

        this.busy = true;
        axios(url, {
            headers: {
                Authorization: 'Bearer '+this.$store.state.token
            }
        })
        .then(response => {
            let dataResponse = response.data;
            if (dataResponse.success){
                this.tests = dataResponse.tests;
                /* this.tests = tests.map((item, index) => {
                    item.testNum = ++index;
                    return item;
                }); */
                this.pagination.totalRecords = this.tests.length;
            }
            this.busy = false;
        });
    },
    methods:{
        filtrar(row){
            return row.filter(r => {
                let ret = true;
                let numHits = this.filter.numHits;
                let date = this.filter.date;
                let name = this.filter.name;

                if (numHits != null && numHits != r.points) return false;
                if (date != "" && date != null && date != r.created_at.split(" ")[0]) return false;
                if (name != "" && name != null && !((r.name.toUpperCase()).includes(name.toUpperCase()))) return false;

                return true;
            });
        },
        print(id){
            console.log(id);
            this.$q.loading.show({ message: "Gerando relatório..." });
            axios(`tests/print/${id}`, { responseType: 'blob',
            headers: {
                Authorization: 'Bearer '+this.$store.state.token
            }})
            .then(resposta => {
                let dadosResposta = resposta.data;
                if (!["", undefined, null].includes(dadosResposta)){
                    let blob = new Blob([dadosResposta], {
                        type: 'application/pdf'
                    });

                    let url = window.URL.createObjectURL(blob)
                    window.open(url);
                }else{
                    console.error("erro ao gerar o documento PDF");
                }
            })
            .catch(error => {
                if (error.response.status == 500){
                    this.$q.dialog({
                        title: "Erro",
                        message: "Esse teste não possui relatório",
                        html: true,
                        class: "bg-negative text-white q-py-sm q-px-sm",
                        ok: {
                            push: true,
                            color: "white",
                            textColor: "black",
                            label: "Ok"
                        }
                    });
                }
            })
            .then(() => this.$q.loading.hide());
        }
    },
    watch:{
        showFilters(value){
            if (!value) {
                this.filter.numHits = null; 
                this.filter.date = "";
                this.filter.name = "";
            }
        }
    },

}
</script>
<style scoped>
    /* .q-card__section{
        background: #DCE4E3 
    } */
    .card-title{
        background: #00916E;
        color: #FFF
    }
    .q-card__section{
        background: #DCE4E3 
    }
    .card-title{
        background: #00916E;
        color: #FFF
    }
</style>
