<template>
  <div>
    <v-stage
      @mousemove="handleStageMouseMove"
      :config="{ width, height }"
    >
      <v-layer>
        <v-rect
          v-for="(value, index) in array"
          :key="index"
          :config="{
            x: index * rectWidth,
            y: height - height / biggestValue * value,
            height: height / biggestValue * value,
            width: rectWidth,
            fill: getRectColor(index)
          }"
          @mouseenter="() => handleRectMouseEnter(index)"
          @mouseleave="() => handleRectMouseLeave(index)"
        />
        <v-rect
          v-if="hoveredRect >= 0"
          :config="{
            ...rectInfoConfig,
            fill: 'black',
            stroke: 'white'
          }"
        />
        <v-text
          v-if="hoveredRect >= 0"
          :config="{
            ...textInfoConfig,
            text: array[hoveredRect],
            fontSize: 15,
            fill: 'white'
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
      width: 0,
      hoveredRect: -1,
      rectInfoConfig: {
        x: 0,
        y: 0,
        width: 60,
        height: 30
      },
      textInfoConfig: {
        x: 0,
        y: 0
      }
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
  props: {
    comparing: Array,
    swapping: Array
  },
  methods: {
    getRectColor (index) {
      if (this.hoveredRect === index) {
        return '#ddd'
      }

      if (index in this.comparing) {
        return 'green'
      }

      if (index in this.swapping) {
        return 'red'
      }

      return 'black'
    },
    onResize () {
      this.width = this.$el.clientWidth
      this.height = this.$el.clientHeight
    },
    handleStageMouseMove (event) {
      this.rectInfoConfig.y = event.evt.layerY + 10
      this.rectInfoConfig.x = event.evt.layerX + 10
      this.textInfoConfig.y = event.evt.layerY + 20
      this.textInfoConfig.x = event.evt.layerX + 20

      if (this.rectInfoConfig.x + this.rectInfoConfig.width > this.width) {
        this.rectInfoConfig.x -= this.rectInfoConfig.width + 20
        this.textInfoConfig.x -= this.rectInfoConfig.width + 20
      }

      if (this.rectInfoConfig.y + this.rectInfoConfig.height > this.height) {
        this.rectInfoConfig.y -= this.rectInfoConfig.height + 20
        this.textInfoConfig.y -= this.rectInfoConfig.height + 20
      }
    },
    handleRectMouseEnter (index) {
      this.hoveredRect = index
    },
    handleRectMouseLeave (index) {
      this.hoveredRect = -1
    },
    handleArrayChange (event) {
      console.log(event)
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
