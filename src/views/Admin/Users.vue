<template>
    <transition
        enter-active-class="animated bounceInUp"
        mode="out-in" appear
    >
        <b-container>
            <users></users>    
        </b-container>
    </transition>
</template>

<script>
import Users from "@/components/Admin/Users"
export default {
    components:{
        Users
    }
}
</script>

<style>

</style>
