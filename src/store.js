import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    array: []
  },
  mutations: {
    setArray: (state, array) => {
      state.array = array
    }
  },
  actions: {

  }
})
