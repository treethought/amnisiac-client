<template>
<!-- <div class='card-title'>
 -->
 <!-- <div> -->
  <!-- <q-toolbar> -->
 <q-tabs v-model="selectedSource" align='center'> <!-- class='toolbar justified bg-tertiary text-primary'> -->
    <q-tab slot='title' name='all' icon='all' label='all'></q-tab>

    <q-tab v-for='source in sources':key='source'
      slot='title'
      :name='source'
      icon="filter_center_focus"
      :label='source'>
    </q-tab>
  </q-tabs>
<!-- </q-toolbar> -->

<!-- </div> -->

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
