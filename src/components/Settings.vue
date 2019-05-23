<template>
  <v-form @submit.prevent="handleSubmit">
    <v-layout row wrap>
      <v-flex xs11>
        <v-slider
          v-model="settings.length"
          label="Length"
          :min="0"
          :max="10000"
          :step="10"
        />
      </v-flex>

      <v-flex xs1>
        <v-text-field
          readonly
          type="number"
          :value="settings.length"
        />
      </v-flex>

      <v-flex xs5>
        <v-slider
          v-model="settings.minValue"
          label="Minimum value"
          :min="0"
          :max="settings.maxValue"
          :step="10"
        />
      </v-flex>

      <v-flex xs1>
        <v-text-field
          readonly
          type="number"
          :value="settings.minValue"
        />
      </v-flex>

      <v-flex xs5>
        <v-slider
          v-model="settings.maxValue"
          label="Maximum value"
          :min="settings.minValue"
          :max="10000"
          :step="10"
        />
      </v-flex>

      <v-flex xs1>
        <v-text-field
          readonly
          type="number"
          :value="settings.maxValue"
        />
      </v-flex>

      <v-flex offset-xs11 xs1>
        <v-btn
          color="info"
          type="submit"
        >
          Generate
        </v-btn>
      </v-flex>
    </v-layout>
  </v-form>
</template>

<script>
// TODO: Allow modyfing text fields

import { mapActions } from 'vuex'
import { SET_SETTINGS } from '@/store/action-types'

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

  methods: {
    ...mapActions([SET_SETTINGS]),
    handleSubmit () {
      this[SET_SETTINGS]({ settings: this.settings })
    }
  }
}
</script>
