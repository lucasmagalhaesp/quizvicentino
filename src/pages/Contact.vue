<template>
    <q-page>
        <page-title>Contato</page-title>
        <div class="row q-pa-lg">
            <contact-form />
        </div>
    </q-page>
</template>

<script>
import ContactForm from "components/Contact/ContactForm"
import PageTitle from "components/Custom/PageTitle"
export default {
    components:{
        ContactForm,
        PageTitle
    }
}
</script>