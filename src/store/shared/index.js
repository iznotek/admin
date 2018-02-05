import actions from './actions'
import getters from './getters'
import mutations from './mutations'

export default {
  state: {
    loading: false,
    uploads: null,
    error: null
  },
  actions,
  getters,
  mutations
}
