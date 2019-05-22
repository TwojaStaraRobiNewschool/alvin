<template>
  <form @submit.prevent="submit">
    <input
      type="number"
      placeholder="Length"
      min="0"
      v-model="length"
    />

    <!-- TODO: Allow negative values -->
    <input
      type="number"
      min="0"
      placeholder="Minimum value"
      v-model="minValue"
    />

    <!-- TODO: Allow negative values -->
    <input
      type="number"
      min="0"
      placeholder="Maximum value"
      v-model="maxValue"
    />

    <button type="submit">Generate</button>
    <button
      type="button"
      @click="run"
    >
      Run
    </button>
  </form>
</template>

<script>
import { mapMutations } from 'vuex'

const MAX_LENGTH = 10000

const createArray = ({ length, maxValue, minValue }) => {
  const array = []
  array.length = length
  for (let i = 0; i < length; i++) {
    const value = Math.floor(Math.random() * (maxValue - minValue)) + minValue
    array[i] = value
  }
  return array
}

export default {
  data () {
    return {
      length: 100,
      minValue: 0,
      maxValue: 100
    }
  },
  watch: {
    length (value) {
      if (parseInt(value) > MAX_LENGTH) {
        alert(`So long array can couse performance issues! Recomended maximum length is ${MAX_LENGTH}.`)
      }
    }
  },
  methods: {
    ...mapMutations(['setArray']),
    submit () {
      const array = createArray(this.$data)
      this.setArray(array)
    },
    run () {
      // TODO: Not always submit!
      this.submit()
      this.$emit('run')
    }
  }
}
</script>
