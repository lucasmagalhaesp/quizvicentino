<template>
    <q-card class="my-card q-my-md">
        <q-card-section>
            <q-img
                class="col-5"
                :src="img"
            />

            <!-- <q-card-section class="self-center text-justify q-mr-md">
                <slot></slot>
            </q-card-section> -->
        </q-card-section>

        <!-- <q-separator /> -->

        <q-card-actions>
            <q-btn :label="labelBtn" class="full-width" :to="linkBtn" />
        </q-card-actions>
    </q-card>
</template>

<script>

export default {
    props: [ "img", "labelBtn", "linkBtn" ]

}
</script>
<style scoped>
    .q-card__section{
        background: #DCE4E3 
    }
    .q-btn{
        background: #00916E;
        color: #FFF
    }
</style>
