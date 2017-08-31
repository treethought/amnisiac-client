<template>
  <div class="container ">

<!--     <q-modal ref="basicModal">
  <h4>Basic Modal</h4>
  <q-btn color="primary" @click="$refs.basicModal.close()">Close</q-btn>
</q-modal> -->

  <q-modal v-if='!authenticated' ref="regModal">
  <q-card style="width: 400px" class='text-center'><!--  class=' col-md-4 offset-xs-3 text-center'> -->
    <q-card-title>Create an account</q-card-title>
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
    <q-btn @click="submit()">Register</q-btn>
  </q-card-main>
  </q-card>
  </q-modal>

  </div>
</template>

<script>
import auth from '../../api/auth.js'
// import router from '../router/index.js'
// import api from '../api/api.js'
export default {
  name: 'login',
  mounted () {
    this.$refs.regModal.open()
  },
  computed: {
    authenticated () {
      return this.$store.state.authenticated
    }
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
