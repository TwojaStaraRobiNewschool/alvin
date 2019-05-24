<template>
  <v-sheet
    class="tall"
    :elevation="4"
  >
    <v-layout class="tall" column>
      <v-flex grow>
        <monaco-editor
          v-model="monacoCode"
          class="editor"
          language="javascript"
          :options="{ theme: 'vs-dark', readonly: isRunning }"
        />
      </v-flex>

      <v-flex shrink>
        <v-layout>
          <v-flex xs1>
            <v-btn
              :disabled="isRunning"
              @click="handleRun"
            >
              Run
            </v-btn>

          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-sheet>
</template>

<script>
import MonacoEditor from 'vue-monaco'
import { mapActions, mapState } from 'vuex'
import { SORT_ARRAY } from '@/store/action-types'

// TODO: Show how long code is running and maybe show progress

export default {
  components: {
    MonacoEditor
  },

  computed: {
    ...mapState(['isRunning', 'runTimer']),

    monacoCode: {
      get () {
        return this.$store.state.code
      },
      set (value) {
        this.$store.commit('setCode', { code: value })
      }
    }
  },

  methods: {
    ...mapActions([SORT_ARRAY]),

    handleRun () {
      this[SORT_ARRAY]()
    }
  }
}
</script>

<style lang="scss" scoped>
.tall {
  height: 100%;
}

.editor {
  height: 100%;
  width: 100%;
}
</style>
