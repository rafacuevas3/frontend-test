import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    order: {
      id: null,
      items: [],
    },
    orders: [],
  },
  getters: {
    order: (state) => state.order,
    orders: (state) => state.orders,
  },
  mutations: {
    setOrder: (state, order) => state.order = order,
  },
  actions: {
  },
  modules: {
  }
})
