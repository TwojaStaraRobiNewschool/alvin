<template>
  <form @submit.prevent="submit">
    <input
      type="number"
      placeholder="Length"
      v-model="length"
      @change="checkLength"
    />

    <button type="submit">
      Generate
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
  methods: {
    ...mapMutations(['setArray']),
    submit () {
      const array = createArray(this.$data)
      this.setArray(array)
    },
    checkLength () {
      if (length > MAX_LENGTH) {
        alert('So long array can couse performance issues!')
      }
    }
  }
}
</script>
