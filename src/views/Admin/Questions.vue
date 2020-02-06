<template>
    <b-container>
        <table-questions></table-questions>
        <form-questions></form-questions>
    </b-container>
</template>

<script>
import TableQuestions from "@/components/Admin/TableQuestions";
import FormQuestions from "@/components/Admin/FormQuestions";
export default {
    components:{
        TableQuestions,
        FormQuestions
    }
}
</script>

<style>

</style>
