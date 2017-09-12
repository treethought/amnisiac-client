<template>
<q-toolbar slot='header'>

  <!-- opens drawer below -->
  <q-btn flat @click="layout.toggleLeft()">
    <img src="../../assets/icons/mtn-stream.png" width="30" height="30" alt="">
  </q-btn>
  <div class='mobile-hide cordova-hide text-left'>
    <big>amnis<span>!ac</span></big>
  </div>


    <q-toolbar-title v-if="!currentItem || $q.platform.is.desktop" class='text-center no-margin' :padding="2">
        <div class='text-center text-primary'>
          {{title}}
        </div>
    </q-toolbar-title>


    <q-toolbar-title v-else class='text-center justify-center no-margin multiline'>
        <div class="col-6">
        {{currentItem.raw_title}}
        </div>
        <span slot="subtitle" class='text-white'>
          {{currentItem.subreddit}}
        </span>
    </q-toolbar-title>

    <div v-if='user'>
      <span class="text-primary mobile-hide cordova-hide">
        {{user.username}}
      </span>
      <router-link to='manage'>
        <q-btn flat small icon='account_circle' color='primary' />
      </router-link>
    </div>

    <div v-else class='text-primary'>
      <router-link to='login'>
        <q-btn flat small icon-right='account_circle' color='primary'>
        login
        </q-btn>
      </router-link>
    </div>

</q-toolbar> 


    
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'app-header',
  inject: ['layout'],
  computed: {
    title () {
      return this.$route.name
    },
    ...mapState({
      authenticated: state => state.auth.authenticated,
      user: state => state.auth.user,
      currentItem: state => state.player.currentItem
    })
  }
}
</script>

<style>
.layout-view {
    margin:0;
    padding:0;
}

/*.layout-aside {
  background: #555
}*/

h4 {
  /*color: purple !important;*/
  font-family: 'Comfortaa', cursive;
    /*font-size: 60px;*/

}
span {
  color: black !important;
  /*color: white !important;*/
}

/*h4 {
  font-family: Comfortaa;
}*/
</style>
