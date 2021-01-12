<template>
  <v-dialog
    v-model="dialog"
    width="500"
    transition="slide-y-transition"
    persistent
  >
    <v-card tile flat class="pb-8">
      <v-card-title class="text-center">
        <v-spacer />
        <v-btn icon @click.prevent="$emit('on-close')">
          <v-icon v-text="icons.close" />
        </v-btn>
      </v-card-title>
      <v-card-text class="headline text--primary font-weight-medium text-center">
        Accept This Request ?
      </v-card-text>
      <v-card-actions class="text-center">
        <div class="mx-auto">
          <v-btn text color="error" @click.prevent="$emit('on-cancel')">
            Cancel
          </v-btn>
          <v-btn color="primary" @click.prevent="$emit('on-accept')">
            Accept
          </v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mdiClose } from '@mdi/js'
export default {
  props: {
    dialog: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    icons: { close: mdiClose }
  })
}
</script>
