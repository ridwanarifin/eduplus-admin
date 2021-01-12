<template>
  <validation-observer
    ref="observer"
    v-slot="{ handleSubmit }"
  >
    <form
      @submit.prevent="handleSubmit(on_submit)"
      @reset.prevent="clear"
    >
      <v-row align="center" justify="space-between">
        <v-col cols="12" sm="6">
          <validation-provider
            v-slot="{ errors }"
            name="id"
          >
            <v-text-field
              v-model="forms.uuid"
              :error-messages="errors"
              :loading="loading"
              :disabled="loading"
              readonly
              outlined
              required
              persistent-hint
              label="ID"
              hint="*auto generate"
            />
          </validation-provider>
        </v-col>

        <v-col cols="12" sm="6">
          <validation-provider
            v-slot="{ errors }"
            name="nama"
            rules="required"
          >
            <v-text-field
              v-model="forms.name"
              :error-messages="errors"
              :loading="loading"
              :disabled="loading"
              outlined
              clearable
              required
              label="Nama"
            />
          </validation-provider>
        </v-col>
      </v-row>

      <v-row align="center" justify="space-between">
        <v-col cols="12" sm="6">
          <validation-provider
            v-slot="{ errors }"
            name="e-mail"
            rules="required|email"
          >
            <v-text-field
              v-model="forms.email"
              :error-messages="errors"
              :loading="loading"
              :disabled="loading"
              outlined
              clearable
              required
              label="E-mail"
            />
          </validation-provider>
        </v-col>

        <!-- <v-col cols="12" sm="6">
          <validation-provider
            v-slot="{ valid, errors }"
            name="role"
            rules="required"
          >
            <v-select
              v-model="forms.role"
              :items="roles"
              :success="valid"
              :error-messages="errors"
              :loading="loading"
              :disabled="loading"
              outlined
              clearable
              required
              label="Role"
            />
          </validation-provider>
        </v-col> -->
      </v-row>

      <v-row align="center" justify="space-between">
        <v-col cols="12" sm="6">
          <validation-provider
            v-slot="{  errors }"
            name="password"
            rules="required"
            vid="forms.password"
          >
            <v-text-field
              v-model="forms.password"
              :error-messages="errors"
              :loading="loading"
              :disabled="loading"
              :append-icon="show1 ? icons.on : icons.off"
              :type="show1 ? 'text' : 'password'"
              outlined
              clearable
              required
              label="Password untuk Operator"
              @click:append.stop="show1 = !show1"
            />
          </validation-provider>
        </v-col>

        <v-col cols="12" sm="6">
          <validation-provider
            v-slot="{ errors }"
            name="retype password"
            rules="required|confirmed:forms.password"
          >
            <v-text-field
              v-model="confirmed"
              :error-messages="errors"
              :loading="loading"
              :disabled="loading"
              :append-icon="show2 ? icons.on : icons.off"
              :type="show2 ? 'text' : 'password'"
              outlined
              clearable
              required
              label="Tulis Ulang Password"
              @click:append.stop="show2 = !show2"
            />
          </validation-provider>
        </v-col>
      </v-row>

      <slot name="actions" :data="{ forms }" />
    </form>
  </validation-observer>
</template>

<script>
import _ from 'lodash'
import {
  mdiEyeOutline,
  mdiEyeOffOutline
} from '@mdi/js'

export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    models: {
      type: Object,
      default: () => ({
        uuid: '',
        name: '',
        email: '',
        // role: '',
        password: ''
      })
    }
  },
  data () {
    return {
      forms: this.models,
      confirmed: '',
      roles: [
        'Admin',
        'Operator'
      ],
      icons: {
        on: mdiEyeOutline,
        off: mdiEyeOffOutline
      },
      show1: false,
      show2: false
    }
  },
  computed: {
    observer () { return this.$refs.observer }
  },
  watch: {
    // eslint-disable-next-line
    models: function (newVal) {
      this.forms = _.assign(this.forms, newVal)
    }
  },
  methods: {
    on_submit () {
      this.$emit('on-submit', this.forms)
      this.clear()
    },
    clear () {
      this.observer.reset()
      this.forms = {
        uuid: '',
        name: '',
        email: '',
        // role: '',
        password: ''
      }
      this.confirmed = ''
    }
  }
}
</script>
