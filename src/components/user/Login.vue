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
import auth from '../../api/auth.js'
// import router from '../router/index.js'
// import api from '../api/api.js'
export default {
  name: 'login',
  store: ['authenticated'],
  mounted () {
    this.$refs.loginModal.open()
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
      // We need to pass the component's this context
      // to properly make use of http in the auth service
      // login method will update this/context's $store
      auth.login(this, payload)
      // .then(api.fetchUser(this, 'dashboard'))
      // .then(router.push('favorites'))
      // api.fetchUser(this, 'dashboard')
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
