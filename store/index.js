import _ from 'lodash'
import createPersistedState from 'vuex-persistedstate'
import SecureLS from 'secure-ls'
const ls = new SecureLS({ isCompression: false })

export const state = () => ({
  pending: false,
  currentLogin: {},
  search: '',
  provinsi: [],
  kab_kota: [],
  activeMenu: ''
})

export const mutations = {
  activeMenuMutate (state, payload) {
    state.activeMenu = payload
  },
  pendingMutate (state, payload) {
    if (!payload) {
      state.pending = !state.pending
      return
    }
    state.pending = payload
  },
  userAdminMutate (state, payload) {
    this.$auth.setUser(payload)
  },
  currentLoginMutate (state, payload) {
    state.currentLogin = _.assign(state.currentLogin, payload)
  },
  searchMutate (state, payload) {
    state.search = payload
  },
  provinsiMutate (state, payload) {
    state.provinsi = payload
  },
  kabKotaMutate (state, payload) {
    state.kab_kota = payload
  }
}

export const actions = {
  async loginAction ({ commit, dispatch }, payload) {
    this.$toast.global.app_loading()
    await await this.$auth.loginWith('local', { data: payload })
      .then(() => {
        this.$toast.clear()
        commit('currentLoginMutate', payload)
        dispatch('admin/getAdminAction')
        this.$swal({
          icon: 'success',
          title: 'Login success',
          text: 'Welcome Admin',
          showConfirmButton: false,
          timer: 1500
        })
      })
      .catch(() => {
        this.$toast.clear()
        this.$swal({
          icon: 'error',
          title: 'Login failed',
          text: 'You have entered an invalid username or password'
        })
      })
  },
  offlineChecker () {
    console.log(this.$nuxt.isOffline)
  },
  /**
   * init provinsi
   */
  async getProv ({ state, commit }) {
    commit('pendingMutate', true)
    await this.$axios.$get('/api/search/init')
      .then((response) => {
        const { province } = response
        commit('provinsiMutate', province)
      })
      .catch((error) => {
        console.warn(error)
      })
      .finally(() => {
        commit('pendingMutate', false)
      })
  },
  /**
   * init Kab / Kota
   */
  async getRegByProv ({ state, commit }, payload) {
    commit('pendingMutate', true)
    await this.$axios.$get(`/api/search/get-regency/${payload}`)
      .then((response) => {
        console.log(response)
        const { data } = response
        commit('kabKotaMutate', data)
      })
      .catch((error) => {
        console.warn(error)
      })
      .finally(() => {
        commit('pendingMutate', false)
      })
  }
}

export const plugins = [
  createPersistedState({
    storage: {
      getItem: key => ls.get(key),
      setItem: (key, value) => ls.set(key, value),
      removeItem: key => ls.remove(key)
    }
  })
]
