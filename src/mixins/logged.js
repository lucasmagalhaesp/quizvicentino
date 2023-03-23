export default {
  methods: {
    async checkLoggedUser(){
      let logged = false;
      let token = this.$store.state.token;

      let errorValues = ["", null, undefined];
      if (errorValues.includes(token)) {
        this.$store.state.logged = false;
        this.$router.push("/login");
       }
      else{
        await axios("auth/me", {
          headers: {
              Authorization: 'Bearer '+token
          }
        }).then(response => {
            if (response.data.id) logged = true;
            else logged = false;
        }).catch(error => {
          logged = false;
          console.log(error);
        });
  
       if (!logged) {
        this.$store.state.logged = false;
        this.$router.push("/login");
       }
      }
      

      //return logged;
    }
  },
  /* computed: {
    async logado(){
        let logado = false;
       logado = await axios("auth/me", {
        headers: {
            Authorization: 'Bearer '+sessionStorage.getItem("quiz_vtoken")
        }
      }).then(response => {
          if (response.data.id) return response;
          else return response;
      }).catch(error => {
        return error
      });
      return logado.data.id != null && logado.data.id != undefined;
    }
  } */
}