<template>
  <div>

  <q-modal v-if='!authenticated' ref="loginModal">
  <q-card style="width: 400px" class='text-center'><!--  class=' col-md-4 offset-xs-3 text-center'> -->
    <q-card-title>Log in</q-card-title>
    <q-card-main>
<!--       <q-field  
        icon='account_circle'
        label='Sign up'
        :label-width="3"
        error-label='Something went wrong'
      >
 -->      <q-input
        type='text'
        autofocus
        float-label='Username'
        placeholder='Enter username'
        v-model='username'
      />
      <q-input
        type='password'
        float-label='Password'
        placeholder='Enter password'
        v-model='password'
      />


<!--     </q-field>
 -->
    <q-btn @click="submit()">Login</q-btn>
  </q-card-main>
  </q-card>
  </q-modal>


  <div v-else>
    <h2>Logged in!</h2>
    <div class="container">
      <div class="row">
    
        <div class="col-xs-10">
          Checkout your <router-link to='dashboard'>Dashboard</router-link> for the latest music
        </div>

      </div>
    </div>

  </div>

  </div>
</template>

<script>
// import router from '../../router.js'
import {mapState} from 'vuex'
export default {
  name: 'login',
  mounted () {
    if (!this.authenticated) {
      this.$refs.loginModal.open()
    }
  },
  computed: {
    ...mapState({
      authenticated: state => state.auth.authenticated,
      user: state => state.auth.user
    })
  },
  data () {
    return {
      username: '',
      password: '',
      error: '',
      success: false
    }
  },
  methods: {
    submit () {
      // let self = this
      var payload = {
        username: this.username,
        password: this.password
      }
      this.$store.dispatch('auth/login', payload)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
