<template>
    <div>
        <b-badge variant="primary">Acertos: {{ hits }}</b-badge>
        <b-badge variant="primary">Tempo gasto: {{ time }}</b-badge>
    </div>
    
</template>

<script>
import testData from "@/mixins/testData"
export default {
    mixins: [testData]
}
</script>