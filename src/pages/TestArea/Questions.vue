<template>
    <q-page>
        <page-title>{{ titleQuestion }}</page-title>
        <div class="row q-pa-lg">
            <div class="col-12">
                <question />
            </div>
        </div>
    </q-page>
</template>

<script>
    import Question from 'components/TestArea/Question'
import PageTitle from "components/Custom/PageTitle"
    export default {
        components:{
            Question,
            PageTitle
        },
        computed:{
            titleQuestion(){
                return `Pergunta ${this.numQuestion}`
            },
            numQuestion(){
                return this.$store.getters.currentQuestionNumber
            }
        }
    }
</script>