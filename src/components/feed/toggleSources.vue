<template>
<div class='card'>
  <q-tabs :refs="$refs" v-model="selectedSource">
    <q-tab name='all' icon='all'>all</q-tab>

    <q-tab v-for='source in sources' :key='source'
      :name='source'
      icon="message">
      {{source}}
    </q-tab>
  </q-tabs>
<!-- <div ref="xtab-1">...</div>
<div ref="xtab-2">...</div>
<div ref="xtab-3">...</div> -->
</div>


</template>

<script>
  export default {
    name: 'toggle-source',
    props: ['sources'],
    store: ['selectedSource'],
    computed: {
      sourceList: function () {
        var sources = []
        for (var i = 0; i < this.user.favorites.length; i++) {
          var s = this.user.favorites[i].subreddit
          sources.push(s)
        }
        return [...new Set(sources)]
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
