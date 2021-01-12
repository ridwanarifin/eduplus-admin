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
                @change="on_change_prov($event)"
              />
            </validation-provider>
            {{ province_id }}
          </v-col>
        </v-row>

        <v-row align="center">
          <v-col cols="12" sm="6">
            <validation-provider
              v-slot="{ valid, errors }"
              name="kab / kota"
              rules="required"
            >
              <v-autocomplete
                v-model="regency_id"
                :items="$store.state.kab_kota"
                item-text="name"
                item-value="id"
                :success="valid"
                :error-messages="errors"
                :disabled="loading || !province_id"
                :loading="loading"
                label="Cari Kabupaten / Kota"
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
import { mapState } from 'vuex'

export default {
  async fetch () {
    await this.$store.dispatch('getProv')
  },
  data: () => ({
    icons: { image: mdiImageOutline }
  }),
  computed: {
    ...mapFields('form', [
      'kab_kota.province_id',
      'kab_kota.regency_id',
      'kab_kota.image',
      'kab_kota.image_card'
    ]),
    ...mapState({
      loading: s => s.pending
    }),
    observer () { return this.$refs.observer }
  },
  methods: {
    on_submit () {
      this.$store.dispatch('form/apiUpdateKabKota')
    },
    on_cancel () {
      this.observer.reset()
      this.$store.commit('form/resetKabKota')
    },
    on_change_prov (e) {
      if (!e) { return }
      this.$store.dispatch('getRegByProv', e)
    }
  }
}
</script>
