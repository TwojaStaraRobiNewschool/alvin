<template>
  <div class="index">
    <textarea
      v-model="code"
      class="editor"
    />

    <graph class="graph" />

    <settings class="settings" />
  </div>
</template>

<script>
import Graph from '@/components/Graph'
import Settings from '@/components/Settings'

export default {
  components: {
    Graph,
    Settings
  },

  data () {
    return {
      code: ''
    }
  },

  methods: {
    run () {
      // TODO: Run sorting algorithm
    }
  }
}

/*
let isSorted = false
while (!isSorted) {
  isSorted = true
  for (let i = 1; i < array.length; i++) {
    if (array[i - 1] > array[i]) {
      const tmp = array[i]
      array[i] = array[i - 1]
      array[i - 1] = tmp
    }
  }
}
*/
</script>

<style lang="scss" scoped>
.index {
  display: grid;

  grid-template-columns: 1fr 1fr;
  grid-template-rows: 3fr 1fr;
  grid-template-areas:
    'editor   graph'
    'settings settings';

  width: 100vw;
  height: 100vh;
}

.editor {
  grid-area: editor;
  resize: none;
}

.graph {
  grid-area: graph;
}

.settings {
  grid-area: settings;
}
</style>
