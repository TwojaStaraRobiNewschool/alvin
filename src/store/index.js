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
    [actions.SORT_ARRAY]: ({ state, commit }) => {
      // TODO: Run the code using web worker
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
    }
  }
})
