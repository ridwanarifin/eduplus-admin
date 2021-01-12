import _ from 'lodash'

export const state = () => ({
  pending: false,
  paginationPending: false,
  data: []
})

export const mutations = {
  allSchoolMutate (state, payload) {
    state = _.assign(state, payload)
    state.data = payload.data
  },
  pendingMutate (state, payload) {
    state.pending = payload
  },
  paginationPendingMutate (state, payload) {
    state.paginationPending = payload
  }
}

export const actions = {
  async getSchoolAction ({ commit }, itemPerPage) {
    commit('pendingMutate', true)
    await this.$axios.$get(`/api/eduplus-administrator/school/all/asc/name/${itemPerPage}/all/all`)
      .then((response) => {
        commit('allSchoolMutate', response)
      })
      .catch((error) => {
        console.warn(error)
      })
      .finally(() => {
        commit('pendingMutate', false)
      })
  },
  async paginationSearchAction ({ commit }, context) {
    commit('paginationPendingMutate', true)
    await this.$axios.$get(context)
      .then((response) => {
        commit('allSchoolMutate', response)
      })
      .catch((error) => {
        console.warn(error)
      })
      .finally(() => {
        commit('paginationPendingMutate', false)
      })
  }
}
