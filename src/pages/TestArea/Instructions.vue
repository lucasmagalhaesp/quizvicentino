<template>
    <q-page>
        <page-title>Instruções</page-title>
        <div class="row q-pa-lg">
            <instructions />
        </div>
    </q-page>
</template>

<script>
    import PageTitle from 'components/Custom/PageTitle'
    import Instructions from 'components/TestArea/Instructions.vue'
    export default {
        components:{
            Instructions,
            PageTitle
        }
    }
</script>