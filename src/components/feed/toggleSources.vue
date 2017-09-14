<template>
<!--  <q-tabs v-model="activeSource" align='center'>
    <q-tab slot='title' name='all' icon='all' label='all'></q-tab>

    <q-tab v-for='source in sources':key='source'
      slot='title'
      :name='source'
      icon="filter_center_focus"
      :label='source'
      color='white'>
    </q-tab>
  </q-tabs>
 -->

  <q-select
      dark
      filter
      align='center'
      color='primary'
      v-model="activeSource"
      :options="selectOptions"
    />

</template>

<script>
import { QSelect } from 'quasar'
import { mapState } from 'vuex'
export default {
  name: 'toggle-source',
  props: ['sources'],
  components: {
    QSelect
  },
  data () {
    return {
      activeSource: this.selectedSource || 'all'
    }
  },
  computed: {
    ...mapState({
      selectedSource: state => state.session.selectedSource
    }),
    selectOptions () {
      let options = [{label: 'all', value: 'all'}]
      for (var i = 0; i < this.sources.length; i++) {
        let source = this.sources[i]
        options.push({label: source, value: source})
      }
      return options
    }
  },
  watch: {
    activeSource () {
      console.log('setting source')
      this.$store.commit('session/setSelectedSource', this.activeSource)
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
