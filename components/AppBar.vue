<template>
  <v-app-bar
    :clipped-left="clipped"
    fixed
    app
  >
    <v-app-bar-nav-icon @click.stop="$emit('on-drawer', !drawer)" />

    <v-btn icon @click.stop="$emit('on-minivariant', !miniVariant)">
      <v-icon>{{ miniVariant ? icons.chevronRight : icons.chevronLeft }}</v-icon>
    </v-btn>

    <v-btn icon @click.stop="$emit('on-clipped', !clipped)">
      <v-icon>{{ icons.application }}</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
import {
  mdiChevronRight,
  mdiChevronLeft,
  mdiApplication
} from '@mdi/js'
export default {
  props: {
    clipped: {
      type: Boolean,
      default: false
    },
    drawer: {
      type: Boolean,
      default: false
    },
    miniVariant: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    icons: {
      chevronRight: mdiChevronRight,
      chevronLeft: mdiChevronLeft,
      application: mdiApplication
    }
  })
}
</script>
