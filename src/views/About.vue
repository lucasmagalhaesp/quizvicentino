<template>
    <transition
        enter-active-class="animated fadeInLeft"
        mode="out-in" appear
    >
        <b-container>
            <quiz></quiz>
        </b-container>
    </transition>
</template>
<script>
import Quiz from "@/components/About/Quiz";
export default {
    components:{
        Quiz
    }
}
</script>