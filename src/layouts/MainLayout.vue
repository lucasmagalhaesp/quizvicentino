<template>
  <q-layout view="lHh Lpr lFf" class="shadow-2 geral">
    <q-header elevated class="row items-center">
      <q-toolbar>

        <q-toolbar-title>
          <img src="https://quizvicentino.com.br/images/logo.png" alt="" style="height: 70px; margin-bottom: -10px" />
        </q-toolbar-title>
      <q-space />

      <q-tabs v-model="tab" shrink stretch class="desktop-only" inline-label>
        <q-route-tab v-for="linkMenu in essentialLinks" :key="linkMenu.link" :label="linkMenu.title" :icon="linkMenu.icon" :to="linkMenu.link" exact />
      </q-tabs>
        
      <q-btn
        flat
        dense
        round
        icon="menu"
        aria-label="Menu"
        @click="leftDrawerOpen = !leftDrawerOpen"
        class="mobile-only"
      />

        <!-- <div v-if="logged" style="padding-right: 10px"><q-btn color="deep-orange" size="xs" @click="logoff" icon="fas fa-sign-out-alt" label="Sair" /></div> -->
      </q-toolbar>
    </q-header>

    <q-drawer
      class="mobile-only"
      v-model="leftDrawerOpen"
      bordered
      content-class="bg-grey-3"
      :width="250"
      :breakpoint="700"
    >
      <!-- <q-img src="~assets/images/logo.png" style="width: 240px" /> -->
      <div class="row justify-center" style="background: #e0e0e0">
        <img src="https://quizvicentino.com.br/images/logo.png" alt="" style="width: 190px" />
      </div>
      
      <q-separator />
      <q-list padding>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
        <template v-if="logged">
          <q-separator />
          <!-- botão logoff -->
          <q-item
            clickable
            @click="logoff"
            v-ripple
          >
            <q-item-section avatar>
              <q-icon name="fas fa-sign-out-alt" style="color: #00796b"/>
            </q-item-section>

            <q-item-section>
              <q-item-label>Sair</q-item-label>
            </q-item-section>
          </q-item>
        </template>

      </q-list>
    </q-drawer>

    <q-footer elevate class="mobile-only">
      <q-toolbar class="text-white shadow-2 justify-center">
        <q-tabs
          inline-label
        >
        <template v-if="logged">
          <q-route-tab label="Jogar" icon="fas fa-play" to="/test-area" exact />
          <q-route-tab label="Meus testes" icon="fas fa-list-alt" to="/tests" exact />
          <q-route-tab label="Ranking" icon="fas fa-list-ol" to="/ranking" exact />
        </template>

        <template v-else>
          <q-route-tab label="Cadastro" icon="fas fa-user-plus" to="/register" exact />
          <q-route-tab label="Login" icon="fas fa-sign-in-alt" to="/login" exact />
          <q-route-tab label="Contato" icon="fas fa-address-card" to="/contact" exact />
        </template>
          
        </q-tabs>
      </q-toolbar>
    </q-footer>

    <q-page-container style="margin: 80px 0 0; padding-top: 40px">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink'

export default {
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  data () {
    return {
      tab: "",
      logo: 'statics/images/logo.png', 
      leftDrawerOpen: false,
      essentialLinks: [
        {
          title: 'Home',
          caption: 'github.com/quasarframework',
          icon: 'fas fa-home',
          link: '/',
        },
        {
          title: 'Sobre',
          caption: 'quasar.dev',
          icon: 'fas fa-question',
          link: '/about'
        },
        {
          title: 'Jogar',
          caption: 'github.com/quasarframework',
          icon: 'fas fa-play',
          link: '/test-area',
        },
        {
          title: 'Cadastro',
          caption: 'chat.quasar.dev',
          icon: 'fas fa-user-plus',
          link: '/register',
        },
        {
          title: 'Login',
          caption: 'forum.quasar.dev',
          icon: 'fas fa-sign-in-alt',
          link: '/login',
        },
        {
          title: 'Testes',
          caption: 'forum.quasar.dev',
          icon: 'fas fa-list-alt',
          link: '/tests',
        },
        {
          title: 'Ranking',
          caption: 'forum.quasar.dev',
          icon: 'fas fa-list-ol',
          link: '/ranking'
        },
        {
          title: 'Contato',
          caption: '@QuasarFramework',
          icon: 'fas fa-address-card',
          link: '/contact'
        },
      ]
    }
  },
  computed:{
    logged(){
      return this.$store.state.logged || sessionStorage.getItem("quiz_vlogged") != null
    }
  },
  methods:{
    logoff(){
      axios(`auth/logout`,{
        headers: {
            Authorization: 'Bearer '+sessionStorage.getItem("quiz_vtoken")
        }
      }).then(response => {
        response = response.data;
        if (response.success) {
            sessionStorage.removeItem("quiz_vtoken");
            sessionStorage.removeItem("quiz_vname");
            sessionStorage.removeItem("quiz_vemail");
            sessionStorage.removeItem("quiz_vlogged");
            this.$store.state.isAdmin = false;
            this.$store.state.logged = false;
            this.$router.push({ name: "index" });
        }
      }).catch(error => console.error(error));
    }
  }
}
</script>
<style scoped>
  .q-tab__label {
    font-size: 12px
  }

  @media(min-width: 599px){
    .geral{
      padding: 0 50px
    }

    header{
      height: 80px;
      padding: 0 50px;
    }


  }

  
</style>
