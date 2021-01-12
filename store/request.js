// import _ from 'lodash'

export const state = () => ({
  pending: false,
  data: []
})

export const mutations = {
  pendingMutate (state, payload) {
    state.pending = payload
  },
  operatorRequestMutate (state, payload) {
    state.data = payload
  },
  sekolahRequestMutate (state, payload) {
    state.data = payload
  }
}

export const actions = {
  async getOperatorRequestAction ({ commit }) {
    commit('pendingMutate', true)
    await this.$axios.$get('/api/eduplus-administrator/operator/request/asc/name/10/all/all')
      .then((response) => {
        commit('operatorRequestMutate', response.data)
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        commit('pendingMutate', false)
      })
  },

  async getSekolahRequestAction ({ commit }) {
    commit('pendingMutate', true)
    await this.$axios.$get('/api/eduplus-administrator/school/request/asc/name/10/all/all')
      .then((response) => {
        commit('sekolahRequestMutate', response.data)
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        commit('pendingMutate', false)
      })
  },
  async operatorAcceptRequestAction ({ commit, rootState }) {
    commit('pendingMutate', true)
    const { dialog: { request: { data: { uuid, name } } } } = rootState
    await this.$axios.$get(`/api/eduplus-administrator/operator/request/acc/${uuid}`)
      .then(() => {
        this.$swal({
          icon: 'success',
          title: 'Successfuly Accepted',
          text: `Berhasil menerima Operator dengan nama ${name}.`,
          timer: 3000
        })
      })
      .catch((error) => {
        console.warn(error)
        this.$swal({
          icon: 'error',
          title: 'Accept Failed',
          text: `Gagal menerima Operator dengan nama ${name}.`,
          timer: 3000
        })
      })
      .finally(() => {
        commit('pendingMutate', false)
      })
  },
  async operatorDeclineRequestAction ({ commit, rootState }) {
    commit('pendingMutate', true)
    const { dialog: { request: { data: { uuid, name } } } } = rootState
    await this.$axios.$post(`/api/eduplus-administrator/operator/remove/${uuid}`)
      .then(() => {
        this.$swal({
          icon: 'success',
          title: 'Successfuly Refused',
          text: `Berhasil menolak Operator dengan nama ${name}.`,
          timer: 3000
        })
      })
      .catch((error) => {
        console.warn(error)
        this.$swal({
          icon: 'error',
          title: 'Refuse Failed',
          text: `Gagal menolak Operator dengan nama ${name}.`,
          timer: 3000
        })
      })
      .finally(() => {
        this.$store.commit('pendingMutate', false)
      })
  }
}
