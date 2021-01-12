<template>
  <v-container class="mx-auto">
    <v-row align="end" justify="space-around">
      <v-col cols="12" sm>
        <div class="title d-flex flex-row">
          Total Pesan : &emsp;
          <v-skeleton-loader v-if="pending" type="chip" />
          <span v-else>{{ dataLength }}</span>
        </div>
      </v-col>
      <v-col cols="12" sm="auto">
        <v-row no-gutters align="end" justify="space-around">
          <v-col cols="12" sm>
            <v-btn tile>
              <span>Urutkan</span>
              <v-icon v-text="icons.filter" />
            </v-btn>
          </v-col>

          <v-col cols="12" sm>
            <div class="subtitle-1">
              Show Data
            </div>
            <v-text-field
              :value="itemsPerPage"
              solo
              dense
              hide-details
              min="1"
              type="number"
              @input="itemsPerPage = parseInt($event, 10)"
            />
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-skeleton-loader v-if="pending" type="table" />
    <v-data-table
      v-else
      :headers="headers"
      :items="data"
      :search="search"
      :loading="pending"
      loading-text="please stand by."
    >
      <!-- eslint-disable-next-line -->
      <template v-slot:item.actions="{ item }">
        <v-btn text small color="primary" @click.prevent="on_edit(item)">
          <v-icon small class="mr-2">
            {{ icons.edit }}
          </v-icon>
          <span>Edit</span>
        </v-btn>
      </template>
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
  mdiTrashCanOutline
} from '@mdi/js'
import { InboxHeaders } from '~/utils/headers'

export default {
  async fetch () {
    await this.$store.dispatch('inbox/getInboxAction')
  },
  data () {
    return {
      headers: InboxHeaders,
      icons: {
        edit: mdiPencilOutline,
        delete: mdiTrashCanOutline,
        filter: mdiFilterOutline
      },
      itemsPerPage: 10
    }
  },
  computed: {
    ...mapState({
      search: s => s.search,
      pending: s => s.inbox.pending,
      data: s => s.inbox.data
    }),
    dataLength () { return _.size(this.data) }
  },
  methods: {
    on_edit (args) {
      console.log(args)
    },
    on_delete (args) {
      console.log(args)
    }
  }
}
</script>
