<template>
  <div class="index">
    <textarea class="editor" v-model="code" />

    <graph
      class="graph"
      :comparing="comparing"
      :swapping="swapping"
    />

    <settings
      class="settings"
      @run="run"
    />
  </div>
</template>

<script>
import Graph from '@/components/Graph'
import Settings from '@/components/Settings'
import { mapState, mapMutations } from 'vuex'
import { setTimeout } from 'timers';

export default {
  components: {
    Graph,
    Settings
  },
  data () {
    return {
      code: '',
      comparing: [],
      swapping: []
    }
  },
  computed: mapState(['array']),
  methods: {
    ...mapMutations(['setArray']),
    run () {
      const func = new Function('array', this.code)
      const proxy = new Proxy(this.array, {
        get: (target, index) => {
          this.comparing = [ ...this.comparing, index ]
          setTimeout(() => {
            this.comparing = this.comparing.filter(val => val !== index)
          }, 500)
        },
        set: (target, index) => {
          this.swapping = [ ...this.swapping, index ]
          setTimeout(() => {
            this.swapping = this.swapping.filter(val => val !== index)
          }, 500)
          this.setArray(target)
        }
      })
      func(this.array)
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
