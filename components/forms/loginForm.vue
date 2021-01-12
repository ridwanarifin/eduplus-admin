<template>
  <validation-observer ref="observer" v-slot="{ handleSubmit }">
    <form @submit.prevent="handleSubmit($emit('on-submit', forms))">
      <validation-provider v-slot="{ valid, errors }" name="e-mail" rules="required|email">
        <v-text-field
          v-model="forms.email"
          class="mb-5"
          label="E-mail"
          type="email"
          :success="valid"
          :error-messages="errors"
          :disabled="loading"
          :loading="loading"
          required
        />
      </validation-provider>

      <validation-provider v-slot="{ valid, errors }" name="password" rules="required">
        <v-text-field
          v-model="forms.password"
          class="mb-5"
          label="Password"
          :type="show ? 'text' : 'password'"
          :append-icon="show ? icons.off : icons.on"
          :success="valid"
          :error-messages="errors"
          :disabled="loading"
          :loading="loading"
          @click:append.stop="show = !show"
        />
      </validation-provider>

      <slot />
    </form>
  </validation-observer>
</template>

<script>
import {
  mdiEyeOutline,
  mdiEyeOffOutline
} from '@mdi/js'

export default {
  props: {
    loading: { type: Boolean, default: false }
  },
  data: () => ({
    forms: {
      email: 'admin@admin.com',
      password: 'password'
    },
    icons: {
      on: mdiEyeOutline,
      off: mdiEyeOffOutline
    },
    show: false
  })
}
</script>
