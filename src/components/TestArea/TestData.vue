<template>
    <div>
        <q-chip outline color="primary" text-color="white" icon="fas fa-thumbs-up">
            Acertos: {{ hits }}
        </q-chip>
        <q-chip outline color="primary" text-color="white" icon="fas fa-clock">
            Tempo gasto: {{ time }}
        </q-chip>
    </div>
    
</template>

<script>
import testData from "../../mixins/testData";
//import general from "../../mixins/general";
export default {
    mixins: [testData],
}
</script>