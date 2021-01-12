import _ from 'lodash'

export const state = () => ({
  pending: false,
  data: []
})

export const mutations = {
  pendingMutate (state, payload) {
    state.pending = payload
  },
  allAdminMutate (state, payload) {
    state.data = payload
  }
}

export const actions = {
  async getAdminAction ({ commit, rootState, state }) {
    commit('pendingMutate', true)
    const { email, password } = rootState.currentLogin
    await this.$axios.$get('/api/eduplus-administrator/')
      .then((response) => {
        commit('allAdminMutate', response)
        if (!rootState.auth.user) {
          const result = _.find(response, { email })
          commit('userAdminMutate', { ...result, scope: ['administrator'], currentPassword: password }, { root: true })
        }
      })
      .catch((error) => {
        console.log(error)
        this.$toast.global.app_error('Failed to get admins')
      })
      .finally(() => {
        commit('pendingMutate', false)
      })
  },

  async updateAdminById ({ commit }, args) {
    commit('pendingMutate', true)
    const forms = _.pick(args, ['name', 'email', 'password'])
    await this.$axios.$post(`/api/eduplus-administrator/admin/update/${args.uuid}`, forms)
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.log(error)
        this.$toast.global.app_error(`Failed to update admin with id ${args.uuid}`)
      })
      .finally(() => {
        commit('pendingMutate', false)
      })
  }
}
