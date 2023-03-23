<template>
  <q-item
    clickable
    @click="$router.replace(link)"
    v-ripple
    v-if="view == 'both' || (logged && view == 'logged') || (!logged && view == 'notLogged')"
  >
    <q-item-section
      v-if="icon"
      avatar
    >
      <q-icon :name="icon" style="color: #00796b" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
      <!-- <q-item-label caption>
        {{ caption }}
      </q-item-label> -->
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },

    caption: {
      type: String,
      default: ''
    },

    link: {
      type: String,
      default: '#'
    },

    icon: {
      type: String,
      default: ''
    },

    view: {
      type: String,
      default: 'notLogged'
    }
  },
  computed:{
    logged(){
      return this.$store.getters.logged
    }
  }
}
</script>
<style>
  .q-tab__icon{
    font-size: inherit;
    width: inherit;
  }
</style>
