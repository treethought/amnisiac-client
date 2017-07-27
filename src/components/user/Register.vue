<template>
  <div class="login container">
    

  <div v-if='!authenticated' class='container'>
    <h1>{{ error }}</h1>
    <h2>Create an Account</h2>
    <div class="form-group">
        <input
          type="text"
          class="form-control"
          placeholder="Enter your username"
          v-model="username">
        <input
          type="password"
          class="form-control"
          placeholder="Enter your password"
          v-model="password">
    </div>


    <button class="btn btn-primary" @click="submit()">Register</button>
  </div>

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
      auth.register(this, payload)
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
