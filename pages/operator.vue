<template>
  <v-container class="mx-auto">
    <v-dialog
      v-model="dialog"
      max-width="600"
      transition="slide-y-transition"
      persistent
    >
      <v-alert
        class="ma-0"
        type="error"
        elevation="2"
        border="right"
        colored-border
        tile
      >
        <div class="d-flex flex-row">
          <div class="title">
            Hapus Akun dengan data berikut ?
          </div>
          <v-spacer />
          <v-btn icon @click.prevent="close_dialog">
            <v-icon v-text="icons.close" />
          </v-btn>
        </div>
        <div class="my-2">
          Operator&emsp;&emsp;:&emsp;{{ deletedItem.name }} <br>
          Jabatan &emsp;&emsp;:&emsp;{{ deletedItem.position }} <br>
          Email &nbsp;&emsp;&emsp;&emsp;:&emsp;{{ deletedItem.email }} <br>
          Telepon &nbsp;&emsp;&emsp;:&emsp;{{ deletedItem.phone_number }}
        </div>
        <v-divider />
        <div class="d-flex flex-row justify-end">
          <v-col cols="auto">
            <v-btn
              tile
              text
              color="primary"
              :loading="loadOperator"
              @click.prevent="close_dialog"
            >
              Kembali
            </v-btn>
          </v-col>

          <v-col cols="auto">
            <v-btn
              tile
              color="error"
              :loading="loadOperator"
              @click.prevent="on_submit_delete"
            >
              Ya, Hapus
            </v-btn>
          </v-col>
        </div>
      </v-alert>
    </v-dialog>

    <v-row align="center" justify="space-around">
      <v-col cols="12" sm>
        <div class="title d-flex flex-row">
          Total Operator : &emsp;
          <v-skeleton-loader v-if="loadOperator" type="chip" />
          <span v-else>{{ lengthOperator }}</span>
        </div>
      </v-col>
    </v-row>

    <v-skeleton-loader v-if="loadOperator" type="table" />
    <v-data-table
      v-else
      :headers="headers"
      :items="operators"
      :search="search"
      :loading="loadOperator"
      loading-text="please stand by."
    >
      <!-- eslint-disable-next-line -->
      <template v-slot:item.actions="{ item }">
        <v-btn text tile small color="primary" @click.prevent="on_delete(item)">
          <v-icon small class="mr-2">
            {{ icons.delete }}
          </v-icon>
          <span>Delete</span>
        </v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import _ from 'lodash'
import { mapState } from 'vuex'
import {
  mdiFilterOutline,
  mdiPencilOutline,
  mdiTrashCanOutline,
  mdiClose
} from '@mdi/js'
import { OperatorHeaders } from '~/utils/headers'

export default {
  async fetch () {
    await this.$store.dispatch('operator/getOperatorAction')
  },
  data: () => ({
    headers: OperatorHeaders,
    icons: {
      edit: mdiPencilOutline,
      delete: mdiTrashCanOutline,
      close: mdiClose,
      filter: mdiFilterOutline
    },
    dialog: false,
    deletedItem: {}
  }),
  computed: {
    ...mapState({
      loadOperator: s => s.operator.pending,
      operators: s => s.operator.data,
      search: s => s.search
    }),
    lengthOperator () { return _.size(this.operators) }
  },
  methods: {
    on_delete (args) {
      this.deletedItem = args
      this.dialog = true
    },
    async on_submit_delete () {
      if (_.isEmpty(this.deletedItem)) { return }
      await this.$store.dispatch('operator/postBanOperatorAction', this.deletedItem.uuid)
        .finally(() => {
          this.close_dialog()
        })
    },
    close_dialog () {
      this.deletedItem = {}
      this.dialog = false
    }
  }
}
</script>
