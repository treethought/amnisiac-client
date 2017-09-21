<template>

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
export default {
  name: 'toggle-source',
  props: {
    value: {
      type: String,
      required: true
    },
    sources: {
      type: Array,
      required: true
    }
  },
  components: {
    QSelect
  },
  data () {
    return {
      activeSource: 'all'
    }
  },
  computed: {
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
    activeSource (source) {
      console.log('setting source')
      this.$emit('input', source)
    }
  }
}
</script>

<style>
</style>
