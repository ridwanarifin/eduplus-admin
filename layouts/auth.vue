<template>
  <v-app>
    <v-main class="align-center" :style="{background: '#F5F5FB'}">
      <nuxt />
    </v-main>

    <v-footer absolute app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {

}
</script>
