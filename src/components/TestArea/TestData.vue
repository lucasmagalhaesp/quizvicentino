<template>
    <div>
        <b-badge variant="primary" style="margin-right: 10px">Acertos: {{ hits }}</b-badge>
        <b-badge variant="primary">Tempo gasto: {{ time }}</b-badge>
    </div>
    
</template>

<script>
import testData from "@/mixins/testData";
import general from "@/mixins/general";
export default {
    mixins: [testData, general],
}
</script>