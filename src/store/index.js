import Vuex from 'vuex'
import * as mutations from './mutation-types'
import * as actions from './action-types'

export default new Vuex.Store({
  state: {
    array: [],

    code: '',

    isRunning: false,

    runTimer: 0,

    selected: [],

    settings: {
      maxValue: 1000,
      minValue: 0,
      length: 500
    }
  },

  mutations: {
    [mutations.SET_CODE]: (state, { code }) => {
      state.code = code
    },

    [mutations._UPDATE_RUN_TIMER]: (state, { by }) => {
      state.runTimer += by
    },

    [mutations._RESET_RUN_TIMER]: (state) => {
      state.runTimer = 0
    },

    [mutations._SET_ARRAY]: (state, { array }) => {
      state.array = array
    },

    [mutations._SET_IS_RUNNING]: (state, { isRunning }) => {
      // TODO: Make runTimer to start counting if isRunning is true
      // and to stop otherwise
      state.isRunning = isRunning
    },

    [mutations._SET_SELECTED]: (state, { selected }) => {
      state.selected = selected
    },

    [mutations._SET_SETTINGS]: (state, { settings }) => {
      state.settings = settings
    }
  },

  actions: {
    [actions.SORT_ARRAY]: async ({ state, commit, dispatch }) => {
      dispatch(actions._SET_IS_RUNNING, { isRunning: true })
      await new Promise(resolve => setTimeout(resolve, 5000))
      dispatch(actions._SET_IS_RUNNING, { isRunning: false })
    },

    [actions.SET_SETTINGS]: ({ commit, dispatch }, payload) => {
      commit(mutations._SET_SETTINGS, payload)
      dispatch(actions._GENERATE_ARRAY)
    },

    [actions._GENERATE_ARRAY]: ({ state, dispatch }) => {
      const { maxValue, minValue, length } = state.settings

      let array = []

      for (let i = 0; i < length; i++) {
        const item = Math.floor(Math.random() * (maxValue - minValue)) + minValue
        array = [...array, item]
      }

      dispatch(actions._SET_ARRAY, { array })
    },

    [actions._SET_ARRAY]: ({ commit }, { array }) => {
      const handler = {
        get: (target, key, receiver) => {
          if (key === 'less') {
            console.log('Less ')
            return (a, b) => {
              commit(mutations._SET_SELECTED, { selected: [a, b] })
              return target[a] < target[b]
            }
          }

          return Reflect.get(target, key, receiver)
        },

        set: (target, index, value, receiver) => {
          return Reflect.set(target, index, value, receiver)
        }
      }

      const proxy = new Proxy(array, handler)

      commit(mutations._SET_ARRAY, { array: proxy })
    },

    [actions._SET_IS_RUNNING]: ({ state, commit }, payload) => {
      if (payload.isRunning) {
        commit(mutations._RESET_RUN_TIMER)
        let interval = setInterval(() => {
          if (!state.isRunning) {
            clearInterval(interval)
            return
          }
          commit(mutations._UPDATE_RUN_TIMER, { by: 100 })
        }, 100)
      }
      commit(mutations._SET_IS_RUNNING, payload)
    }
  }
})
