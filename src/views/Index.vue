<template>
  <div class="index">
    <textarea class="editor" />

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
  }
}
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
}

.graph {
  grid-area: graph;
}

.settings {
  grid-area: settings;
}
</style>
