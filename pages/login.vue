<template>
  <v-card class="mx-auto pa-10" max-width="500" rounded>
    <v-img
      class="mx-auto mb-10"
      :src="require('~/static/icon.png?webp')"
      :lazy-src="require('~/static/icon.png?webp')"
      max-width="190"
    >
      <template #placeholder>
        <v-row
          class="fill-height ma-0"
          align="center"
          justify="center"
        >
          <v-progress-circular indeterminate color="grey lighten-5" />
        </v-row>
      </template>
    </v-img>

    <lazy-login-form @on-submit="on_submit">
      <div class="text-center pt-8">
        <v-btn width="160" color="primary" type="submit">
          Masuk
        </v-btn>
      </div>
    </lazy-login-form>
  </v-card>
</template>

<script>
export default {
  layout: 'auth',
  methods: {
    on_submit (args) {
      this.$store.dispatch('loginAction', args)
    }
  }
}
</script>
