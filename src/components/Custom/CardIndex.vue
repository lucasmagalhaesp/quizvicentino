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

        <q-separator />

        <q-card-actions>
            <q-btn :label="labelBtn" color="blue-grey-4" class="full-width" :to="linkBtn" />
        </q-card-actions>
    </q-card>
</template>

<script>

export default {
    props: [ "img", "labelBtn", "linkBtn" ]

}
</script>