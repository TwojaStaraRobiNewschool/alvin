import Vuex from 'vuex'

export default new Vuex.Store({
  state: {
    array: [],

    settings: {
      maxValue: 1000,
      minValue: 0,
      length: 500
    }
  },

  mutations: {
    _setSettings: (state, { settings }) => {
      state.settings = settings
    },

    refreshArray: state => {
      const { maxValue, minValue, length } = state.settings

      let array = []

      for (let i = 0; i < length; i++) {
        const item = Math.floor(Math.random() * (maxValue - minValue)) + minValue
        array = [ ...array, item ]
      }

      state.array = array
    }
  },

  actions: {
    setSettings: ({ commit }, payload) => {
      commit('_setSettings', payload)
      commit('refreshArray')
    }
  }
})
