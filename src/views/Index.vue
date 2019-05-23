<template>
  <v-layout row wrap>
    <v-flex xs6>
      <editor />
    </v-flex>

    <v-flex xs6>
      <graph class="graph" />
    </v-flex>

    <v-flex xs12>
      <settings />
    </v-flex>
  </v-layout>
</template>

<script>
import Graph from '@/components/Graph'
import Settings from '@/components/Settings'
import Editor from '@/components/Editor'

export default {
  components: {
    Graph,
    Settings,
    Editor
  }
}

/*
let isSorted = false
while (!isSorted) {
  isSorted = true
  for (let i = 1; i < array.length; i++) {
    if (array.less(i, i - 1)) {
      const tmp = array[i]
      array[i] = array[i - 1]
    array[i - 1] = tmp
    }
  }
}
*/
</script>

<style lang="scss" scoped>
.graph {
  min-height: 500px;
}
</style>
