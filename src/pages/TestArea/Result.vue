<template>
    <q-page>
        <page-title>Resultado</page-title>
        <div class="row q-pa-lg">
            <result />
        </div>
    </q-page>
</template>

<script>
    import Result from "components/TestArea/Result"
import PageTitle from "components/Custom/PageTitle"
    export default {
        components:{
            Result,
            PageTitle
        }
    }
</script>