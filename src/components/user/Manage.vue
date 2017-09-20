<template>
  <div class='text-center'>

  <div>
  <q-card color='secondary' class='text-white' v-for="source in sources" inline style="width: 300px" :key='source'>
  <q-card-title>
    {{source.name}}
    <div slot="right" class="row items-center">
      <q-icon name="headset" />
      <q-icon name="fa-reddit" />
      <q-icon name="fa-trash" v-on:click='deleteSource(source)' />
    </div>
  </q-card-title>


</q-card>

</div>

<hr>
<q-card flat class='text-white'>
  <q-card-title>
    Subscribe to New Sources
  </q-card-title>
</q-card>
<search-field v-model='sourcesToAdd' :onSubmit='addSources'></search-field>

<q-btn color='white' @click.native="addSources">Subscribe</q-btn> 


</div>

  </div>
</template>

<script>
import SearchField from '../Search'
import {mapState} from 'vuex'
export default {
  data () {
    return {
      sourcesToAdd: {reddit: '', sc: ''}
    }
  },
  components: {
    SearchField
  },
  methods: {
    addSources () {
      this.$store.dispatch('user/addSources', this.sourcesToAdd)
    },
    deleteSource (source) {
      console.log('deleting ' + source)
      this.$store.dispatch('user/removeSource', source)
    }
  },
  computed: {
    ...mapState({
      authenticated: state => state.auth.authenticated,
      user: state => state.user.user
    }),
    sources: function () {
      var sources = []
      if (this.user.feeds) {
        for (var i = 0; i < this.user.feeds.length; i++) {
          sources.push(this.user.feeds[i])
        }
      }
      return sources
    }
  },
  beforeCreate () {
    this.$store.dispatch('user/fetchUser')
  }
}
</script>

<style>
</style>
