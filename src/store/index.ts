import Vue from 'vue'
import Vuex, { ActionTree, MutationTree } from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'
import state from './state'

Vue.use(Vuex)

export default new Vuex.Store({
  state,
  actions,
  getters,
  mutations
})
