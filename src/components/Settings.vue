<template>
  <form @submit.prevent="submit">
    <div>
      <input
        v-model.number="settings.length"
        placeholder="Length"
        type="number"
        min="0"
      />
      <p v-if="settings.length > 10000">
        So long array can couse performance issues.
      </p>
    </div>

    <input
      v-model.number="settings.minValue"
      placeholder="Minimum value"
      type="number"
    />

    <input
      v-model.number="settings.maxValue"
      placeholder="Maximum value"
      type="number"
    />

    <button type="submit">Generate</button>
  </form>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  data () {
    return {
      settings: {
        length: this.$store.state.settings.length,
        minValue: this.$store.state.settings.minValue,
        maxValue: this.$store.state.settings.maxValue
      }
    }
  },

  // Should be removed
  computed: mapState({
    initialSettings: 'settings'
  }),

  methods: {
    ...mapActions(['setSettings']),
    submit () {
      this.setSettings({ settings: this.settings })
    }
  }
}
</script>
