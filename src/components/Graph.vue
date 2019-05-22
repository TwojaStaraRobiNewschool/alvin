<template>
  <div>
    <v-stage :config="{ width, height }">
      <v-layer>
        <graph-rect
          v-for="(value, index) in array"
          :key="index"
          :index="index"
          :maxHeight="height"
          :maxWidth="width"
        />
      </v-layer>
    </v-stage>
  </div>
</template>

<script>
import GraphRect from './GraphRect'
import { mapState } from 'vuex'

export default {
  components: {
    GraphRect
  },

  data () {
    return {
      height: 0,
      width: 0
    }
  },

  computed: mapState(['array']),

  mounted () {
    window.addEventListener('resize', this.handleWindowResize)
    this.handleWindowResize()
  },

  destroyed () {
    window.removeEventListener('resize', this.handleWindowResize)
  },

  methods: {
    handleWindowResize () {
      this.width = this.$el.clientWidth
      this.height = this.$el.clientHeight
    }
  }
}
</script>
