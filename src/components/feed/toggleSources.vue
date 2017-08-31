<template>

 <q-tabs v-model="activeSource" align='center'> <!-- class='toolbar justified bg-tertiary text-primary'> -->
    <q-tab slot='title' name='all' icon='all' label='all'></q-tab>

    <q-tab v-for='source in sources':key='source'
      slot='title'
      :name='source'
      icon="filter_center_focus"
      :label='source'>
    </q-tab>
  </q-tabs>

</template>

<script>
  export default {
    name: 'toggle-source',
    props: ['sources'],
    ready () {
      this.activeSource = this.selectedSource
    },
    data () {
      return {
        activeSource: null
      }
    },
    computed: {
      selectedSource () {
        return this.$store.state.player.selectedSource
      }
    },
    watch: {
      activeSource () {
        console.log('setting source')
        this.$store.commit('player/setSelectedSource', this.activeSource)
      }
    }
  }
</script>

<style>
  button.btn.toggle-filter {
  color: purple;
  background-color: white;
  border-color: purple;


}

button.btn.toggle-filter.active {
  color: gray;
  border-color: grey;
  /*background-color: white;*/
}
</style>
