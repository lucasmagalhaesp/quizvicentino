<template>
    <div>
        <question></question>
        <timer></timer>
    </div>
</template>

<script>
    import Question from '@/components/TestArea/Question.vue'
    import Timer from '@/components/TestArea/Timer.vue'
    export default {
        components:{
            Question,
            Timer
        }
    }
</script>