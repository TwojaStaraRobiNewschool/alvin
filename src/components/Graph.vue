<template>
  <div>
    <v-stage :config="{ width, height }">
      <v-layer>
        <v-rect
          v-for="(value, index) in array"
          :key="index"
          :config="{
            x: index * rectWidth,
            y: height - height / biggestValue * value,
            height: height / biggestValue * value,
            width: rectWidth,
            fill: 'black'
          }"
        />
      </v-layer>
    </v-stage>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      height: 0,
      width: 0
    }
  },
  computed: {
    ...mapState(['array']),
    rectWidth () {
      return this.width / this.array.length
    },
    biggestValue () {
      let biggest = 0
      this.array.forEach((value, index) => {
        if (value > this.array[biggest]) {
          biggest = index
        }
      })
      return this.array[biggest]
    }
  },
  methods: {
    onResize () {
      this.width = this.$el.clientWidth
      this.height = this.$el.clientHeight
    }
  },
  mounted () {
    window.addEventListener('resize', this.onResize)
    this.onResize()
  },
  destroyed () {
    window.removeEventListener('resize', this.onResize)
  }
}
</script>
