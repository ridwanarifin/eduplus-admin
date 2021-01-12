<template>
  <div>
    <validation-observer ref="observer" v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(on_submit)" @reset.prevent="on_cancel">
        <v-row align="center">
          <v-col cols="12" sm="6">
            <validation-provider
              v-slot="{ valid, errors }"
              name="provinsi"
              rules="required"
            >
              <v-autocomplete
                v-model="province_id"
                :items="$store.state.provinsi"
                item-text="name"
                item-value="id"
                :success="valid"
                :error-messages="errors"
                :disabled="loading"
                :loading="loading"
                label="Cari Provinsi"
                flat
                filled
                required
                clearable
              />
            </validation-provider>
          </v-col>
        </v-row>

        <v-row align="center">
          <v-col cols="12" sm="6">
            <validation-provider
              v-slot="{ valid, errors }"
              name="foto banner"
              rules="required"
            >
              <v-file-input
                v-model="image"
                :success="valid"
                :error-messages="errors"
                :prepend-icon="icons.image"
                :disabled="loading"
                :loading="loading"
                label="Foto Banner"
                flat
                filled
                required
                clearable
                show-size
              />
            </validation-provider>
          </v-col>
        </v-row>

        <v-row align="center">
          <v-col cols="12" sm="6">
            <validation-provider
              v-slot="{ valid, errors }"
              name="foto card"
              rules="required"
            >
              <v-file-input
                v-model="image_card"
                :success="valid"
                :error-messages="errors"
                :prepend-icon="icons.image"
                :disabled="loading"
                :loading="loading"
                label="Foto Card"
                flat
                filled
                required
                clearable
                show-size
              />
            </validation-provider>
          </v-col>
        </v-row>

        <v-divider class="my-4" />

        <v-row align="center" justify-sm="center">
          <v-col cols="12" sm="auto">
            <v-btn text type="reset" color="primary">
              Cancel
            </v-btn>
          </v-col>
          <v-col cols="12" sm="auto">
            <v-btn type="submit" color="primary">
              Submit
            </v-btn>
          </v-col>
        </v-row>
      </form>
    </validation-observer>
  </div>
</template>

<script>
import {
  mdiImageOutline
} from '@mdi/js'
import { mapFields } from 'vuex-map-fields'

export default {
  async fetch () {
    await this.$store.dispatch('getProv')
  },
  data: () => ({
    icons: { image: mdiImageOutline }
  }),
  computed: {
    ...mapFields('form', [
      'provinsi.province_id',
      'provinsi.image',
      'provinsi.image_card'
    ]),
    observer () { return this.$refs.observer },
    loading () { return this.$fetchState.pending }
  },
  methods: {
    on_submit () {
      this.$store.dispatch('form/apiUpdateProvinsi')
    },
    on_cancel () {
      this.observer.reset()
      this.$store.commit('form/resetProvinsi')
    }
  }
}
</script>
