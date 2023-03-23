<template>
    <div class="row justify-center">
        <div class="col-12 col-md-6 q-mt-lg">
            <div class="row q-mb-md">
                <div class="col-12 text-center">
                    Já é cadastrado? <q-btn dense to="/login" color="primary" flat label="Faça login" no-caps />.
                </div>
            </div>
            <q-form @submit.prevent.stop="register" lazy-rules >
                <div class="row q-col-gutter-sm">
                    <div class="col-12">
                        <q-input color="green-4" bg-color="white" outlined dense v-model="form.name" label="Nome" :rules="[val => !!val || 'Informe seu nome']">
                            <template v-slot:prepend>
                                <q-icon name="fas fa-user" />
                            </template>
                        </q-input>
                    </div>
                    
                    <div class="col-12 col-md-4">
                        <q-select color="green-4" bg-color="white" outlined dense v-model="selectedState" :options="states" label="UF" :rules="[val => !!val || 'Informe seu estado']">
                            <template v-slot:prepend>
                                <q-icon name="fas fa-map-marker-alt" />
                            </template>
                        </q-select>
                    </div>
                    
                    <div class="col-12 col-md-8">
                        <q-select color="green-4" bg-color="white" outlined dense v-model="selectedCity" :options="cities" label="Cidade" :rules="[val => !!val || 'Informe sua cidade']">
                            <template v-slot:prepend>
                                <q-icon name="fas fa-map-marker-alt" />
                            </template>
                        </q-select>
                    </div>

                    <div class="col-12">
                        <q-input color="green-4" bg-color="white" outlined dense v-model="form.email" label="E-mail" type="email" :rules="[val => !!val || 'Informe seu e-mail', val => uniqueEmail == 1 || 'E-mail já cadastrado']">
                            <template v-slot:prepend>
                                <q-icon name="fas fa-at" />
                            </template>
                        </q-input>
                    </div>
                    
                    <div class="col-12 col-md-6">
                        <q-input color="green-4" bg-color="white" outlined dense v-model="form.password" label="Senha" type="password" :rules="[val => !!val || 'Informe sua senha', val => val.length > 5 || 'A senha deve ter no mínimo 6 caracteres']">
                            <template v-slot:prepend>
                                <q-icon name="fas fa-key" />
                            </template>
                        </q-input>
                    </div>
                    
                    <div class="col-12 col-md-6">
                        <q-input color="green-4" bg-color="white" outlined dense v-model="form.confirmPassword" label="Confirme sua senha" type="password" :rules="[val => !!val || 'Confirme a senha digitada acima', val => val == form.password || 'Senhas não coincidem']">
                            <template v-slot:prepend>
                                <q-icon name="fas fa-key" />
                            </template>
                        </q-input>
                    </div>
                    
                </div>
                
                <div class="row justify-center" style="margin-top: 15px">
                    <q-btn color="secondary" type="submit" label="Cadastrar" icon="fas fa-save" />
                </div>
            </q-form>
        </div>
    </div>
</template>

<script>
import brazilCities from "../../mixins/cities"
export default {
    mixins: [ brazilCities ],
    data(){
        return {
            form:{
                name: "",
                city: "",
                state: null,
                email: "",
                password: "",
                confirmPassword: ""
            },
            selectedState: null,
            selectedCity: null,
            states: [
                { value: null, label: "Selecione seu estado" },
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
            cities: [],
            defaultCity: "",
            uniqueEmail: 1,
        }
    },
    created(){
        //console.log(this.brazilCities.AP);
    },
    methods:{
        register(){
            this.uniqueEmail = 1;
            axios.post("users", { dados: this.form })
            .then(response => {
                response = response.data;
                if (response.success) this.$router.push({ name: "login" });
                else {
                    this.$q.dialog({
                        title: "Erro",
                        message: "Erro ao realizar o cadastro! Tente novamente mais tarde",
                        html: true,
                        class: "bg-negative text-white q-py-sm q-px-sm",
                        ok: {
                            push: true,
                            color: "white",
                            textColor: "black",
                            label: "Ok"
                        }
                    });
                    console.error(response.msg);
                }
            }).catch(error => {
                let errors = error.response.data.errors ? error.response.data.errors : null;
                if (errors != null){
                    if (errors.hasOwnProperty("dados.email")) this.uniqueEmail = 0
                }else{
                    console.error("Erro ao cadastrar usuário: "+response);
                }
                this.$q.dialog({
                    title: "Erro",
                    message: "Erro ao realizar o cadastro! Tente novamente mais tarde",
                    html: true,
                    class: "bg-negative text-white q-py-sm q-px-sm",
                    ok: {
                        push: true,
                        color: "white",
                        textColor: "black",
                        label: "Ok"
                    }
                });
            });
        },
    },
    watch: {
        "selectedState"(obj){
            this.cities = this.brazilCities[obj.value].cities.map(city => {
                return { value: city, label: city };
            });

            this.form.state = obj.value;
            this.form.city = this.defaultCity;
        },
        "selectedCity"(obj){
            console.log(obj);
            if (typeof obj == "object") this.form.city = obj.value;
        },
        uniqueEmail(value){
            console.log(value);
        }
    },
}
</script>
<style scoped>
    input, select{
        margin-top: 15px;
    }

    .q-field--error.q-field--highlighted >>> .q-field__control {
       /*  background: #C10015 !important;
        color: #FFF; */
        border-color: #C10015
    }

    .q-field--highlighted >>> .q-field__label {
        /* color: #FFF; */
    }
</style>
