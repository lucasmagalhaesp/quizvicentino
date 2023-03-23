<template>
    <div class="col-12 col-md-10 offset-md-1 q-mt-lg">
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
            <div class="col-12 col-md-6">
                <label for="field-name">Filtrar pelo e-mail:</label>
                <q-input color="green-4" bg-color="white" outlined dense v-model="filter.email" class="q-mt-sm" clearable>
                    <template v-slot:prepend>
                        <q-icon name="fas fa-at" />
                    </template>
                </q-input>
            </div>
            <div class="col-12 col-md-4">
                <label for="field-date">Filtrar pelo estado:</label>
                <q-select color="green-4" bg-color="white" outlined dense v-model="selectedState" :options="states" class="q-mt-sm">
                    <template v-slot:prepend>
                        <q-icon name="far fa-map" />
                    </template>
                </q-select>
            </div>
            <div class="col-12 col-md-4">
                <label for="field-date">Filtrar pela cidade:</label>
                <q-input color="green-4" bg-color="white" outlined dense v-model="filter.city" class="q-mt-sm" clearable>
                    <template v-slot:prepend>
                        <q-icon name="fas fa-map-marker-alt" />
                    </template>
                </q-input>
            </div>
            <div class="col text-right">
                <q-btn color="negative" @click="showFilters = false" label="Fechar" icon="fas fa-window-close"/>
            </div>
        </div>
    </div>
    <div class="col-12 col-md-10 q-my-lg offset-md-1">
        <q-table
            :rows="users"
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
            <template v-if="$q.screen.lt.sm" v-slot:body="user">
                <q-card class="bg-blue-grey-7">
                    <q-card-section class="card-title">
                        <div class="text-h6 text-center">Cód. {{ user.row.id }}</div>
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
                                <strong>UF:</strong> 
                            </div>
                            <div class="col-8">
                                {{ user.row.state }}
                            </div>
                        </div>
                        <q-separator />
                        <div class="row">
                            <div class="col-4">
                                <strong>Cadastrado em:</strong> 
                            </div>
                            <div class="col-8">
                                {{ dateFormatMobile(user.row.created_at) }}
                            </div>
                        </div>
                    </q-card-section>
                </q-card>
            </template>
        </q-table>
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
            users: [],
            fields: [
                { name: "id", field: "id", label: "Cód.", align: "center" },
                { name: "name", field: "name", label: "Nome", align: "center" },
                { name: "email", field: "email", label: "E-mail", align: "center" },
                { name: "city", field: "city", label: "Cidade", align: "center" },
                { name: "state", field: "state", label: "UF", align: "center" },
                { name: "created_at", field: "created_at", label: "Cadastrado em", align: "center",
                    format: value => this.formatDateTimeBR(value)
                },
            ],
            filter: {
                name: "",
                email: "",
                city: "",
                state: ""
            },
            selectedState: "",
            states: [
                { value: "", label: "Selecione seu estado" },
                { value: "AC", label: "Acre" },
                { value: "AL", label: "Alagoas" },
                { value: "AP", label: "Amapá" },
                { value: "AM", label: "Amazonas" },
                { value: "BA", label: "Bahia" },
                { value: "CE", label: "Ceará" },
                { value: "DF", label: "Distrito Federal" },
                { value: "ES", label: "Espírito Santo" },
                { value: "GO", label: "Goiás" },
                { value: "MA", label: "Maranhão" },
                { value: "MT", label: "Mato Grosso" },
                { value: "MS", label: "Mato Grosso do Sul" },
                { value: "MG", label: "Minas Gerais" },
                { value: "PA", label: "Pará" },
                { value: "PB", label: "Paraíba" },
                { value: "PR", label: "Paraná" },
                { value: "PE", label: "Pernambuco" },
                { value: "PI", label: "Piauí" },
                { value: "RJ", label: "Rio de Janeiro" },
                { value: "RN", label: "Rio Grande do Norte" },
                { value: "RS", label: "Rio Grande do Sul" },
                { value: "RO", label: "Rondônia" },
                { value: "RR", label: "Roraima" },
                { value: "SC", label: "Santa Catarina" },
                { value: "SP", label: "São Paulo" },
                { value: "SE", label: "Sergipe" },
                { value: "TO", label: "Tocantins" }
            ],
            showFilters: false,
            busy: false
        }
    },
    created(){
        this.busy = true;
        axios("users")
        .then(response => {
            let resposta = response.data;
            if (resposta.success){
                this.users = resposta.users;
            }
            this.busy = false;
        });
    },
    methods:{
        filtrar(row){
            return row.filter(r => {
                let name = this.filter.name;
                let email = this.filter.email;
                let city = this.filter.city;
                let state = this.filter.state;

                if (name != "" && name != null && !((r.name.toUpperCase()).includes(name.toUpperCase()))) return false;
                if (email != "" && email != null && !((r.email).includes(email))) return false;
                if (city != "" && city != null && !((r.city).includes(city))) return false;
                if (state != "" && state != null && !((r.state).includes(state))) return false;

                return true;
            });
        }
    },
    watch:{
        showFilters(value){
            if (!value) {
                this.filter.name = ""; 
                this.filter.email = "";
                this.filter.city = "";
                this.filter.state = "";
            }
        },
        selectedState(state){
            this.filter.state = state.value;
        }
    },

}
</script>
<style scoped>
    .q-card__section{
        background: #DCE4E3 
    }
    .card-title{
        background: #00916E;
        color: #FFF
    }
</style>