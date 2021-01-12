import _ from 'lodash'

export const state = () => ({
  pending: false,
  data: []
})

export const mutations = {
  pendingMutate (state, payload) {
    state.pending = payload
  },
  allInboxMutate (state, payload) {
    state = _.assign(state, payload)
    state.data = payload.data
  }
}

export const actions = {
  async getInboxAction ({ commit }) {
    commit('pendingMutate', true)
    await this.$axios.$get('/api/eduplus-administrator/inbox/all/asc/id/10')
      .then((response) => {
        commit('allInboxMutate', response)
      })
      .catch((error) => {
        this.$toast.global.app_error(error.response.statusText)
      })
      .finally(() => {
        commit('pendingMutate', false)
      })
  }
}
