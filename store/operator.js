// import _ from 'lodash'

export const state = () => ({
  pending: false,
  data: []
})

export const mutations = {
  allOperatorMutate (state, payload) {
    state.data = payload
  },
  pendingMutate (state, payload) {
    state.pending = payload
  }
}

export const actions = {
  async getOperatorAction ({ commit }) {
    commit('pendingMutate', true)
    await this.$axios.$get('/api/eduplus-administrator/operator/all/asc/id/10')
      .then((response) => {
        commit('allOperatorMutate', response.data)
      })
      .catch((error) => {
        console.warn(error.response)
      })
      .finally(() => {
        commit('pendingMutate', false)
      })
  },
  async postBanOperatorAction ({ commit, dispatch }, uuid) {
    commit('pendingMutate', true)
    await this.$axios.$post(`/api/eduplus-administrator/operator/ban/${uuid}`)
      .then((response) => {
        this.$swal({
          icon: 'success',
          title: 'Successfuly Deleted',
          text: 'Operator berhasil dihapus.',
          timer: 3000
        })
      })
      .catch((error) => {
        console.warn(error)
        this.$swal({
          icon: 'error',
          title: 'Failed Delete',
          text: 'Operator gagal dihapus.',
          timer: 3000
        })
      })
      .finally(() => {
        commit('pendingMutate', false)
        dispatch('getOperatorAction')
      })
  }
}
