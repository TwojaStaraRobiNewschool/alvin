<template>
  <v-rect :config="config" />
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    index: {
      type: Number,
      requred: true
    },

    maxWidth: {
      type: Number,
      required: true
    },

    maxHeight: {
      type: Number,
      required: true
    }
  },

  computed: {
    ...mapState(['array', 'selected']),

    config () {
      const width = this.maxWidth / this.array.length

      return {
        width,
        x: this.index * width,
        y: this.maxHeight - this.maxHeight / this.maxValue * this.value,
        height: this.maxHeight / this.maxValue * this.value,
        fill: this.index in this.selected ? '#0f0' : '#000'
      }
    },

    maxValue () {
      let max = 0
      this.array
        .forEach((value, index) => {
          if (value > this.array[max]) {
            max = index
          }
        })
      return this.array[max]
    },

    value () {
      return this.array[this.index]
    }
  }
}
</script>
