<template>
    <q-page>
        <page-title>Quiz Vicentino?</page-title>
        <div class="row q-pa-lg">
            <quiz />
        </div>
    </q-page>
</template>
<script>
import Quiz from "components/About/Quiz"
import PageTitle from "components/Custom/PageTitle"
export default {
    components:{
        Quiz,
        PageTitle
    }
}
</script>