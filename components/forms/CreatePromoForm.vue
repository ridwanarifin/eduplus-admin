<template>
  <div>
    <div v-for="(item, index) in promo1" :key="index">
      <validation-observer ref="observer" v-slot="{ handleSubmit }">
        <form
          @submit.prevent="handleSubmit(on_submit)"
          @reset.prevent="on_cancel"
        >
          <v-row align="center" justify-sm="space-between">
            <v-col cols="12" sm="6">
              <validation-provider
                v-slot="{ valid, errors }"
                name="image"
                rules="required"
              >
                <v-file-input
                  v-model="item.image"
                  :success="valid"
                  :error-messages="errors"
                  :prepend-icon="icons.image"
                  :disabled="loading"
                  :loading="loading"
                  :label="`Image Promo ${index + 1}`"
                  flat
                  filled
                  required
                  clearable
                  show-size
                />
              </validation-provider>
            </v-col>

            <v-col cols="12" sm="auto">
              <v-btn text :disabled="promo1.length === 1 && !index" color="primary" @click.prevent="delete_promo_row(item)">
                <span class="mr-3">Hapus Jumbotron</span>
                <v-icon v-text="icons.close" />
              </v-btn>
            </v-col>
          </v-row>

          <v-row align="center" justify-sm="space-between">
            <v-col cols="12" sm="6">
              <validation-provider
                v-slot="{ valid, errors }"
                name="heading"
                rules="required"
              >
                <v-text-field
                  v-model="item.name"
                  :success="valid"
                  :error-messages="errors"
                  :disabled="loading"
                  :loading="loading"
                  :label="`Heading Promo ${index + 1}`"
                  flat
                  filled
                  required
                  clearable
                />
              </validation-provider>
            </v-col>
          </v-row>

          <v-row align="center" justify-sm="space-between">
            <v-col cols="12" sm="6">
              <validation-provider
                v-slot="{ valid, errors }"
                name="description"
                rules="required"
              >
                <v-text-field
                  v-model="item.description"
                  :success="valid"
                  :error-messages="errors"
                  :disabled="loading"
                  :loading="loading"
                  :label="`Description Promo ${index + 1}`"
                  flat
                  filled
                  required
                  clearable
                />
              </validation-provider>
            </v-col>
          </v-row>
        </form>
      </validation-observer>
      <v-divider class="my-4" />
    </div>

    <v-btn text color="primary" @click.prevent="add_promo_row">
      <span class="mr-2">Tambah Promo</span>
      <v-icon v-text="icons.plus" />
    </v-btn>

    <v-row align="center" justify-sm="center">
      <v-col cols="12" sm="auto">
        <v-btn text type="reset" color="primary" @click.prevent="on_cancel">
          Cancel
        </v-btn>
      </v-col>
      <v-col cols="12" sm="auto">
        <v-btn type="submit" color="primary" @click.prevent="on_submit">
          Submit
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import _ from 'lodash'
import {
  mdiCloseCircle,
  mdiImageOutline,
  mdiPlusCircle
} from '@mdi/js'
import { mapMultiRowFields } from 'vuex-map-fields'

export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    icons: {
      image: mdiImageOutline,
      plus: mdiPlusCircle,
      close: mdiCloseCircle
    },
    isError: false
  }),
  computed: {
    ...mapMultiRowFields('form', ['promo1'])
  },
  methods: {
    on_submit () {
      _.each(this.promo1, (obj, index) => {
        this.$refs.observer[index].validate()
          .then((success) => {
            if (!success) {
              this.isError = true
              return
            }
            this.isError = false
          })
      })
      setTimeout(() => {
        if (!this.isError) {
          this.$store.dispatch('form/apiCreatePromo')
        }
      }, 3000)
    },
    on_cancel () {
      _.each(this.promo1, (obj, index) => {
        this.$refs.observer[index].reset()
      })
      this.$store.commit('form/resetPromo1')
    },
    add_promo_row () {
      this.$store.commit('form/addPromo1Row')
    },
    delete_promo_row (args) {
      this.$store.commit('form/deletePromo1Row', args)
    }
  }
}
</script>
