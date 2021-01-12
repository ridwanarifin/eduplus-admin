import _ from 'lodash'
import { getField, updateField } from 'vuex-map-fields'

export const state = () => ({
  jumbotron: [{
    id: Math.random().toString(36).substr(2, 9),
    background: null,
    image: null,
    heading: null,
    text: null
  }],
  promo1: [{
    id: Math.random().toString(36).substr(2, 9),
    name: null,
    image: null,
    description: null
  }],
  promo2: [{
    id: Math.random().toString(36).substr(2, 9),
    name: null,
    image: null,
    description: null
  }],
  provinsi: {
    province_id: null,
    image: null,
    image_card: null
  },
  kab_kota: {
    province_id: null,
    regency_id: null,
    image: null,
    image_card: null
  }
})

export const getters = {
  getField
}

export const mutations = {
  updateField,
  /**
   * Jumbotron
   */
  addJumbotronRow (state) {
    state.jumbotron.push({
      id: Math.random().toString(36).substr(2, 9),
      background: null,
      image: null,
      heading: null,
      text: null
    })
  },
  deleteJumbotronRow (state, payload) {
    const newVal = _.filter(state.jumbotron, function (obj) {
      // eslint-disable-next-line
      return obj.id !== payload.id
    })
    state.jumbotron = newVal
  },
  resetJumbotron (state) {
    _.each(state.jumbotron, (args, index) => {
      args.background = null
      args.image = null
      args.heading = null
      args.text = null
    })
  },
  /**
   * End Jumbotron
   */

  /**
   * Promo1
   */
  addPromo1Row (state) {
    state.promo1.push({
      id: Math.random().toString(36).substr(2, 9),
      name: null,
      image: null,
      description: null
    })
  },
  deletePromo1Row (state, payload) {
    const newVal = _.filter(state.promo1, function (obj) {
      return obj.id !== payload.id
    })
    state.promo1 = newVal
  },
  resetPromo1 (state) {
    _.each(state.promo1, (obj) => {
      obj.name = null
      obj.image = null
      obj.description = null
    })
  },
  /**
   * End Promo1
   */

  /**
   * Promo2
   */
  addPromo2Row (state) {
    state.promo2.push({
      id: Math.random().toString(36).substr(2, 9),
      name: null,
      image: null,
      description: null
    })
  },
  deletePromo2Row (state, payload) {
    const newVal = _.filter(state.promo2, function (obj) {
      return obj.id !== payload.id
    })
    state.promo2 = newVal
  },
  resetPromo2 (state) {
    _.each(state.promo2, (obj) => {
      obj.name = null
      obj.image = null
      obj.description = null
    })
  },
  /**
   * End Promo2
   */

  /**
  * Provinsi
  */
  resetProvinsi (state) {
    state.provinsi = {
      province_id: null,
      image: null,
      image_card: null
    }
  },
  /**
  * End Province
  */

  /**
   * Kab / Kota
   */
  resetKabKota (state) {
    state.kab_kota = {
      province_id: null,
      regency_id: null,
      image: null,
      image_card: null
    }
  }
  /**
  * End Kab / Kota
  */
}

export const actions = {
  apiCreateJumbotron ({ state }) {
    _.each(state.jumbotron, (args) => {
      if (_.every(args, obj => !_.isNil(obj))) {
        const FormObj = _.pick(args, [
          'background',
          'image',
          'heading',
          'text'
        ])
        this.$axios.$post('/api/eduplus-administrator/jumbotron', FormObj)
      }
    })
  },

  apiCreatePromo ({ state }, context = 'first') {
    if (context === 'second') {
      _.each(state.promo2, (args) => {
        if (_.every(args, obj => !_.isNil(obj))) {
          console.log('apiCreatePromo2', args)
        }
      })
      return
    }
    _.each(state.promo1, (args) => {
      if (_.every(args, obj => !_.isNil(obj))) {
        console.log('apiCreatePromo1', args)
      }
    })
  },

  apiUpdateProvinsi ({ state }) {
    console.log(state.provinsi)
  },

  apiUpdateKabKota ({ state }) {
    console.log(state.kab_kota)
  }
}
