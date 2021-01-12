<template>
  <div>
    <div v-for="(item, index) in jumbotron" :key="index">
      <validation-observer ref="observer" v-slot="{ handleSubmit }">
        <form
          @submit.prevent="handleSubmit(on_submit)"
          @reset.prevent="on_cancel"
        >
          <v-row align="center" justify="space-between">
            <v-col cols="12" sm="6">
              <validation-provider
                v-slot="{ valid, errors }"
                name="background"
                rules="required"
              >
                <v-file-input
                  v-model="item.background"
                  :success="valid"
                  :error-messages="errors"
                  :prepend-icon="icons.image"
                  :disabled="loading"
                  :loading="loading"
                  :label="`Background Jumbotron ${index + 1}`"
                  flat
                  filled
                  required
                  clearable
                  show-size
                />
              </validation-provider>
            </v-col>

            <v-col cols="12" sm="auto">
              <v-btn text :disabled="jumbotron.length === 1 && !index" color="primary" @click.prevent="delete_jumbotron_row(item)">
                <span class="mr-3">Hapus Jumbotron</span>
                <v-icon v-text="icons.close" />
              </v-btn>
            </v-col>
          </v-row>

          <v-row align="center" justify="space-between">
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
                  :label="`Image Jumbotron ${index + 1}`"
                  flat
                  filled
                  required
                  clearable
                  show-size
                />
              </validation-provider>
            </v-col>
          </v-row>

          <v-row align="center" justify="space-between">
            <v-col cols="12" sm="6">
              <validation-provider
                v-slot="{ valid, errors }"
                name="heading"
                rules="required"
              >
                <v-text-field
                  v-model="item.heading"
                  :success="valid"
                  :error-messages="errors"
                  :disabled="loading"
                  :loading="loading"
                  :label="`Heading Jumbotron ${index + 1}`"
                  flat
                  filled
                  required
                  clearable
                />
              </validation-provider>
            </v-col>
          </v-row>

          <v-row align="center" justify="space-between">
            <v-col cols="12" sm="6">
              <validation-provider
                v-slot="{ valid, errors }"
                name="text"
                rules="required"
              >
                <v-textarea
                  v-model="item.text"
                  :success="valid"
                  :error-messages="errors"
                  :disabled="loading"
                  :loading="loading"
                  :label="`Text Jumbotron ${index + 1}`"
                  flat
                  filled
                  required
                  auto-grow
                  clearable
                />
              </validation-provider>
            </v-col>
          </v-row>
        </form>
      </validation-observer>
      <v-divider class="my-4" />
    </div>
    <slot>
      <v-btn text color="primary" @click.prevent="add_jumbotron_row">
        <span class="mr-2">Tambah Jumbotron</span>
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
    </slot>
  </div>
</template>

<script>
import _ from 'lodash'
import {
  mdiCloseCircle,
  mdiImageOutline,
  mdiPlusCircle
} from '@mdi/js'
import { createHelpers } from 'vuex-map-fields'

const { mapMultiRowFields } = createHelpers({
  getterType: 'form/getField',
  mutationType: 'form/updateField'
})

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
    ...mapMultiRowFields(['jumbotron'])
  },
  methods: {
    on_submit () {
      _.each(this.jumbotron, (args, index) => {
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
          this.$store.dispatch('form/apiCreateJumbotron')
        }
      }, 2000)
    },
    on_cancel () {
      _.each(this.jumbotron, (args, index) => {
        this.$refs.observer[index].reset()
      })
      this.$store.commit('form/resetJumbotron')
    },
    add_jumbotron_row () {
      this.$store.commit('form/addJumbotronRow')
    },
    delete_jumbotron_row (args) {
      this.$store.commit('form/deleteJumbotronRow', args)
    }
  }
}
</script>
