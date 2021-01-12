import _ from 'lodash'

export const state = () => ({
  request: {
    show: false,
    data: undefined
  }
})

export const getters = {
  showRequestDialog (state) {
    return state.request.show
  }
}

export const mutations = {
  dialogRequestMutate (state, payload) {
    if (_.isObjectLike(payload)) {
      state.request = { ...payload }
      return
    }
    state.request.show = payload
    state.request.data = undefined
  }
}
