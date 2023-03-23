<template>
  <q-layout view="lHh Lpr lff" class="shadow-2 geral">
    <q-header elevated class="row items-center">
      <q-toolbar>

        <template v-if="$q.screen.lt.sm">
          <q-toolbar-title>
            <img src="images/logo.png" alt="" style="height: 70px; margin-bottom: -10px" />
          </q-toolbar-title>
          <q-btn
            round
            icon="fas fa-bars"
            aria-label="Menu"
            @click="leftDrawerOpen = !leftDrawerOpen"
            style="font-size: 1.2em"
          />
        </template>

        <div v-else class="row" style="width: 100%; align-items: center">
          <div class="col-md-2">
            <q-toolbar-title>
              <img src="images/logo.png" alt="" style="height: 70px; margin-bottom: -10px" />
            </q-toolbar-title>
          </div>
          <!-- <q-space /> -->
        <div class="col-md-9">
          <q-tabs v-model="tab" shrink stretch class="desktop-only" inline-label>
            <template v-for="linkMenu in essentialLinks" :key="linkMenu.link">
              <q-route-tab v-if="(linkMenu.view == 'both') || (logged && linkMenu.view == 'logged') || (!logged && linkMenu.view == 'notLogged')" :label="linkMenu.title" :icon="linkMenu.icon" :to="linkMenu.link" exact />
            </template>
            <q-btn-dropdown v-if="isAdmin" class="menus-person" style="color: #D8E9E1" flat icon="fas fa-unlock-alt" label="Área restrita">
              <q-list>
                <q-item clickable @click="$router.push({ name: 'users' })">
                  <q-item-section>
                    <q-icon color="secondary" name="fas fa-users" />
                  </q-item-section>
                  <q-item-section>USUÁRIOS</q-item-section>
                </q-item>

                <q-item clickable @click="$router.push({ name: 'all-tests' })">
                  <q-item-section>
                    <q-icon color="secondary" name="fas fa-list-alt" />
                  </q-item-section>
                  <q-item-section>TESTES</q-item-section>
                </q-item>

                <q-item clickable @click="$router.push({ name: 'questions' })">
                  <q-item-section>
                    <q-icon color="secondary" name="fas fa-question" />
                  </q-item-section>
                  <q-item-section>PERGUNTAS</q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
          </q-tabs>
        </div>

            <div class="col-md-1 desktop-only text-right" v-if="logged">
              <!-- <q-space /> -->
              <q-btn color="negative" size="sm" icon="fas fa-sign-out-alt" label="SAIR" @click="logoff" />
            </div>
          </div>

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

    <!-- <q-footer elevate class="mobile-only">
      <q-toolbar class="text-white shadow-2 justify-center">
        <q-tabs
          inline-label
        >
        <template v-if="logged">
          <q-route-tab label="Jogar" icon="fas fa-play" to="/jogar/instrucoes" exact />
          <q-route-tab label="Meus testes" icon="fas fa-list-alt" to="/testes" exact />
          <q-route-tab label="Ranking" icon="fas fa-list-ol" to="/ranking" exact />
        </template>

        <template v-else>
          <q-route-tab label="Cadastro" icon="fas fa-user-plus" to="/cadastrar" exact />
          <q-route-tab label="Login" icon="fas fa-sign-in-alt" to="/login" exact />
          <q-route-tab label="Contato" icon="fas fa-address-card" to="/contato" exact />
        </template>
          
        </q-tabs>
      </q-toolbar>
    </q-footer> -->

    <q-footer elevate class="">
      <q-toolbar class="text-white shadow-2 justify-center">
        <div class="row">
          Quiz Vicentino {{ new Date().getFullYear() }} - Todos os direitos reservados
        </div>
      </q-toolbar>
    </q-footer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'

export default {
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
          view: 'both'
        },
        {
          title: 'Sobre',
          caption: 'quasar.dev',
          icon: 'fas fa-question',
          link: '/sobre',
          view: 'both'
        },
        {
          title: 'Jogar',
          caption: 'github.com/quasarframework',
          icon: 'fas fa-play',
          link: '/jogar/instrucoes',
          view: 'both'
        },
        {
          title: 'Cadastro',
          caption: 'chat.quasar.dev',
          icon: 'fas fa-user-plus',
          link: '/cadastrar',
          view: 'notLogged'
        },
        {
          title: 'Login',
          caption: 'forum.quasar.dev',
          icon: 'fas fa-sign-in-alt',
          link: '/login',
          view: 'notLogged'
        },
        {
          title: 'Testes',
          caption: 'forum.quasar.dev',
          icon: 'fas fa-list-alt',
          link: '/testes',
          view: 'logged'
        },
        {
          title: 'Ranking',
          caption: 'forum.quasar.dev',
          icon: 'fas fa-list-ol',
          link: '/ranking',
          view: 'logged'
        },
        {
          title: 'Contato',
          caption: '@QuasarFramework',
          icon: 'fas fa-address-card',
          link: '/contato',
          view: 'both'
        },
      ]
    }
  },

  mounted(){
    document.querySelectorAll(".q-tab__content").forEach(comp => {
      comp.style = "align-self: inherit";
    })
  },
  computed:{
    logged(){
      	return this.$store.state.logged
    },
    isAdmin(){
      	return this.$store.state.isAdmin
    }
  },
  methods:{
    logoff(){
		this.$q.dialog({
			title: "Sair?",
			message: "Deseja realmente sair?",
			html: true,
			class: "bg-negative text-white q-py-sm q-px-sm",
			ok: {
				push: true,
				color: "white",
				textColor: "black",
				label: "SIM"
			},
			cancel: {
				push: true,
				color: "white",
				textColor: "red",
				label: "NÃO"
			}
		})
		.onOk(() => {
			axios(`auth/logout`,{
				headers: {
					Authorization: 'Bearer '+this.$store.state.token
				}
			})
			.then(response => {
				//response = response.data;
			/*  if (response.success) {

				} */
			}).catch(error => console.error(error))
			.then(() => {
				this.$store.commit("logout");
				this.$router.push({ name: "index" });
			});
		})
		.onCancel(() => {});
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
      /* padding: 0 50px */
    }
    header{
      height: 80px;
      padding: 0 50px;
    }


  }

  
</style>
