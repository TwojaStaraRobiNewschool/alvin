<template>
  <v-form
    v-model="valid"
    @submit="submit"
  >
    <v-container>
      <v-layout row>
        <v-flex xs11>
          <v-slider
            v-model="settings.length"
            label="Length"
            :min="0"
            :max="10000"
          />
        </v-flex>

        <v-flex xs1>
          <v-text-field
            v-model="settings.length"
            v-validate="'min:0|max:10000|required'"
            type='number'
            :error-messages="errors.collect('settings.length')"
          />
        </v-flex>
      </v-layout>

      <v-layout>
        <v-slider
          v-model="settings.minValue"
          label="Minimum value"
          :min="0"
          :max="settings.maxValue"
          :step="1"
        />

        <v-slider
          v-model="settings.maxValue"
          label='Maximum value'
          :min="settings.minValue"
          :max="10000"
          :step="1"
        />

        <button type="submit">Generate</button>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
import { mapActions } from 'vuex'

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
    ...mapActions(['setSettings']),
    submit () {
      this.setSettings({ settings: this.settings })
    }
  }
}
</script>
