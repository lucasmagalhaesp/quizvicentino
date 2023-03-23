<template>
    <div class="row">
        <div class="col-12">
            <div class="row q-mb-md">
                <div class="col-12 col-md-12">
                    <q-input outlined :label="questionID > 0 ? `Pergunta nº ${questionID}` : 'Pergunta:'" autogrow id="question" v-model="form.description" />
                </div>
            </div>
            <div class="row q-mb-md q-col-gutter-md">
                <div class="col-12 col-md-6">
                    <q-input outlined autogrow label="Resposta A:" v-model="form.answers.a" id="answerA" />
                </div>
                <div class="col-12 col-md-6">
                    <q-input outlined autogrow label="Resposta B:" v-model="form.answers.b" id="answerB" />
                </div>
            </div>
            <div class="row q-mb-md q-col-gutter-md">
                <div class="col-12 col-md-6">
                    <q-input outlined autogrow label="Resposta C:" v-model="form.answers.c" id="answerC" />
                </div>
                <div class="col-12 col-md-6">
                    <q-input outlined autogrow label="Resposta D:" v-model="form.answers.d" id="answerD" />
                </div>
            </div>

            <div class="row q-mb-md q-col-gutter-md">
                <div class="col-12 col-md-4">
                    <label class="q-field__label" for="expiration_date">Data de validade:</label>
                    <q-input type="date" v-model="form.expiration_date" id="expiration_date" />
                </div>
                <div class="col-12 col-md-4">
                    <label class="q-field__label" for="expiration_date">Resposta Certa:</label><br />
                    <q-btn-toggle
                        v-model="form.correctAnswer"
                        toggle-color="primary"
                        :options="answers"
                    />
                </div>
                <div class="col-12 col-md-4">
                    <label class="q-field__label" for="expiration_date">Ativa?</label><br />
                    <q-btn-toggle
                        v-model="form.active"
                        toggle-color="primary"
                        :options="[{ value: true, label: 'Sim' }, { value: false, label: 'Não' }]"
                    />
                </div>
                <q-inner-loading
                    :showing="loadQuestion"
                    label="Carregando pergunta..."
                    label-class="text-primary"
                    label-style="font-size: 1.1em"
                />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ["questionID"],
    data(){
        return {
            answers: [
                { label: 'A', value: 'a' },
                { label: 'B', value: 'b' },
                { label: 'C', value: 'c' },
                { label: 'D', value: 'd' }
            ],
            loadQuestion: false,
        }
    },
    computed:{
        form(){
            return this.$store.state.formQuestions;
        },
        formQuestionActive:{
            get(){
                return this.$store.state.formQuestionActive;
            },
            set(value){
                this.$store.state.formQuestionActive = value;
            }
        }
    }
}
</script>
<style scoped>
    textarea{
        margin-bottom: 15px;
    }
    p.q-field__label{
        font-size: 14px
    }
</style>
