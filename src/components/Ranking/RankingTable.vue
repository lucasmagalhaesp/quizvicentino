<template>
    <div class="row justify-center">
        <div class="col-12">
            <page-title>Ranking</page-title>
        </div>
        <div class="col-10 q-mt-lg">
            <div v-if="!showFilters" class="row justify-end">
                <q-btn color="secondary" @click="showFilters = true" label="Filtrar" icon="fas fa-filter"/>
            </div>
            <div class="row q-col-gutter-md items-end" v-else>
                <div class="col-12 col-md-3">
                    <label for="field-name">Filtrar pelo nome:</label>
                    <q-input color="green-4" @keyup="filter.name = filter.name.toUpperCase()" bg-color="white" outlined :dense="!$q.screen.lt.sm" v-model="filter.name" clearable class="q-mt-sm">
                        <template v-slot:prepend>
                            <q-icon name="fas fa-user" />
                        </template>
                    </q-input>
                </div>
                <div class="col-12 col-md-4">
                    <label for="field-hits">Filtrar pelo número de acertos:</label>
                     <q-btn-toggle
                        v-model="filter.numHits"
                        push
                        glossy
                        toggle-color="primary"
                        :options="filter.optionsHits"
                        hint="Acertos"
                        class="q-mt-sm"
                    />
                </div>
                <div class="col-12 col-md-3">
                    <label for="field-date">Filtrar pela data:</label>
                    <q-input color="green-4" bg-color="white" outlined :dense="!$q.screen.lt.sm" v-model="filter.date" type="date" class="q-mt-sm" clearable>
                        <template v-slot:prepend>
                            <q-icon name="fas fa-calendar" />
                        </template>
                    </q-input>
                </div>
                <div class="col-12 col-md-2 text-right">
                    <q-btn color="negative" @click="showFilters = false" label="Fechar" icon="fas fa-window-close"/>
                </div>
            </div>
        </div>
        <div class="col-10 q-my-lg">
            <q-table
                :rows="ranking"
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

                <template v-slot:body="props">
                    <q-tr
                        :props="props"
                        :class="(props.row.email==userEmail)?'bg-primary text-white':''"
                    >
                        <q-td v-for="col in props.cols" :key="col.name" :props="props">{{ col.value }}</q-td>
                    </q-tr>
                </template>
                <template v-if="$q.screen.lt.sm" v-slot:body="user">
                    <q-card class="bg-blue-grey-7">
                        <q-card-section class="card-title">
                            <div class="text-h6 text-center">{{ user.row.testNum }}</div>
                        </q-card-section>
                        <q-card-section class="q-mb-md table-data-mobile">
                            <div class="row">
                                <div class="col-4">
                                    <strong>Nome:</strong> 
                                </div>
                                <div class="col-8">
                                    {{ user.row.name }}
                                </div>
                            </div>
                            <q-separator />
                            <div class="row">
                                <div class="col-4">
                                    <strong>Acertos:</strong> 
                                </div>
                                <div class="col-8">
                                    {{ user.row.points }}
                                </div>
                            </div>
                            <q-separator />
                            <div class="row">
                                <div class="col-4">
                                    <strong>Tempo:</strong> 
                                </div>
                                <div class="col-8">
                                    {{ convertSecondsinMinutes(user.row.time) }}
                                </div>
                            </div>
                            <q-separator />
                            <div class="row">
                                <div class="col-4">
                                    <strong>E-mail:</strong> 
                                </div>
                                <div class="col-8">
                                    {{ user.row.email }}
                                </div>
                            </div>
                            <q-separator />
                            <div class="row">
                                <div class="col-4">
                                    <strong>Cidade:</strong> 
                                </div>
                                <div class="col-8">
                                    {{ user.row.city }}
                                </div>
                            </div>
                            <q-separator />
                            <div class="row">
                                <div class="col-4">
                                    <strong>Data/Hora:</strong> 
                                </div>
                                <div class="col-8">
                                    {{ dateFormatMobile(user.row.created_at) }}
                                </div>
                            </div>
                            <!-- <q-separator />
                            
                            <div class="row justify-center">
                                <q-btn-group>
                                    <q-btn color="info" label="Imprimir" @click="print(test.row.id)" push icon="fas fa-print" />
                                </q-btn-group>
                            </div> -->
                        </q-card-section>
                    </q-card>
                </template>

            </q-table>
        </div>
    </div>
</template>

<script>
import general from "../../mixins/general";
import PageTitle from '../Custom/PageTitle';
export default {
    components:{
        PageTitle
    },
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
                { name: "testNum", field: "testNum", label: "Pos.", align: "center" },
                { name: "name", field: "name", label: "Nome", align: "center", style: { fontWeight: "bold", textTransform: "uppercase" } },
                { name: "points", field: "points", label: "Acertos", align: "center" },
                { name: "time", field: "time", label: "Tempo", align: "center",
                    format: (value, key, item) => {
                        return this.convertSecondsinMinutes(value);
                    }
                },
                { name: "email", field: "email", label: "E-mail", align: "center" },
                { name: "city", field: "city", label: "Cidade", align: "center" },
                { name: "created_at", field: "created_at", label: "Data/Hora", align: "center",
                    format: (value, key, item) => {
                        let dateTime = this.formataDataTimeBR(value).split(":");
                        dateTime.pop();
                        return dateTime.join(":").replace(",", "");
                    }
                },
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
        this.busy = true;
        axios("ranking", {
            headers: {
                Authorization: 'Bearer '+this.$store.state.token
            }
        })
        .then(response => {
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
            return this.$store.state.user.email
        }
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
    .bg-row-user{
        font-weight: 600;
        color: #008148
    }
    .q-card__section{
        background: #DCE4E3 
    }
    .card-title{
        background: #00916E;
        color: #FFF
    }
</style>
