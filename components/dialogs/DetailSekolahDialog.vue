<template>
  <v-dialog
    v-model="localDialog"
    scrollable
    fullscreen
    persistent
    max-width="500px"
    transition="dialog-transition"
  >
    <v-card>
      <v-card-title primary-title>
        <span class="headline">Detail Sekolah</span>
        <v-spacer />
        <v-btn icon @click.prevent="on_close_dialog">
          <v-icon v-text="icons.close" />
        </v-btn>
      </v-card-title>
      <v-divider class="mt-2 mb-5" />
      <v-card-text>
        <detail-sekolah-form :forms="data" @on-reset="on_close_dialog" />
      </v-card-text>
      <v-divider class="my-2" />
      <v-card-actions class="px-7 text-right">
        <v-spacer />
        <v-btn x-large color="primary" @click.prevent="on_close_dialog">
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mdiClose } from '@mdi/js'
import DetailSekolahForm from '~/components/forms/DetailSekolahForm.vue'

export default {
  components: { DetailSekolahForm },
  props: {
    dialog: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      localDialog: this.dialog,
      icons: { close: mdiClose }
    }
  },
  watch: {
    dialog (newVal) { this.localDialog = newVal }
  },
  methods: {
    on_close_dialog () {
      this.$emit('on-close')
    }
  }
}
</script>
