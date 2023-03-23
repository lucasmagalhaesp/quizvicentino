<template>
    <q-page>
      <page-title>Login</page-title>
      <div class="q-pa-lg">
        <login />
      </div>
    </q-page>
</template>

<script>
import Login from "components/Auth/Login.vue"
import PageTitle from "components/Custom/PageTitle"
export default {
  components: {
    Login,
    PageTitle
  }
}
</script>
