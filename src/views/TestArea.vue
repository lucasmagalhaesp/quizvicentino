<template>
    <b-container>
        <transition 
            enter-active-class="animated fadeInLeft"
            mode="out-in" appear>
            <question v-if="cpActiveTestArea == 'question'"></question>
            <result v-else-if="cpActiveTestArea == 'result'"></result>
            <instructions v-else></instructions>
        </transition>
    </b-container>
</template>

<script>
    import Question from '@/components/TestArea/Question.vue'
    import Result from '@/components/TestArea/Result.vue'
    import Instructions from '@/components/TestArea/Instructions.vue'
    export default {
        components:{
            Question, Result, Instructions
        },
        created(){
            this.$store.state.isQuestionArea = false;
        },
        computed:{
            cpActiveTestArea(){
                return this.$store.state.cpActiveTestArea
            }
        },
    }
</script>