<template>
    <q-page>
        <page-title>Cadastre-se</page-title>
        <div class="q-pa-lg">
          <register />
        </div>
    </q-page>
</template>

<script>
import Register from "components/Auth/Register.vue"
import PageTitle from "components/Custom/PageTitle"
export default {
  components: {
    Register,
    PageTitle
  }
}
</script>
