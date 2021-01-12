<template>
  <v-container class="mx-auto">
    <detail-sekolah-dialog :dialog="dialog" :data="detailActive" @on-close="on_close_dialog" />

    <v-row no-gutters align="center" justify="space-between">
      <v-col cols="auto">
        <v-tabs
          v-model="tab"
          :centered="$vuetify.breakpoint.mobile"
          show-arrows
          background-color="transparent"
        >
          <v-tab href="#operator">
            Operator
          </v-tab>
          <v-tab href="#sekolah">
            Sekolah
          </v-tab>
        </v-tabs>
      </v-col>

      <v-col cols="auto">
        <v-btn tile>
          <span>Urutkan</span>
          <v-icon v-text="icons.filter" />
        </v-btn>
      </v-col>
    </v-row>

    <v-divider class="mb-5" />

    <v-tabs-items v-model="tab">
      <!-- Request Operator -->
      <v-tab-item value="operator">
        <v-skeleton-loader v-if="loading" type="table" />
        <v-data-table
          v-else
          :items="data"
          :search="search"
          :loading="loading"
          :headers="headers[0]"
        >
          <!-- eslint-disable-next-line -->
          <template v-slot:item.actions="{ item }">
            <v-row no-gutters align="center" justify="center">
              <v-col cols="auto">
                <v-btn tile text small color="primary" @click.prevent="open_dialog_operator(item)">
                  Accept
                </v-btn>
              </v-col>
              <v-col cols="auto">
                <v-btn tile text small color="primary" @click.prevent="open_dialog_operator(item)">
                  Decline
                </v-btn>
              </v-col>
            </v-row>
          </template>
        </v-data-table>
      </v-tab-item>

      <!-- Request Sekolah -->
      <v-tab-item value="sekolah">
        <v-skeleton-loader v-if="loading" type="table" />
        <v-data-table
          v-else
          :items="data"
          :search="search"
          :loading="loading"
          :headers="headers[1]"
          loading-text="please stand by.."
        >
          <!-- eslint-disable-next-line -->
          <template v-slot:item.actions="{ item }">
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon v-text="icons.more" />
                </v-btn>
              </template>
              <v-list>
                <v-list-item @click.prevent="on_click_detail(item)">
                  <v-list-item-title>See Detail</v-list-item-title>
                </v-list-item>
                <v-list-item @click.prevent="on_accept_school(item)">
                  <v-list-item-title>Accept</v-list-item-title>
                </v-list-item>
                <v-list-item @click.prevent="on_decline_school(item)">
                  <v-list-item-title>Decline</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </template>
        </v-data-table>
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import {
  mdiDotsHorizontal,
  mdiFilterOutline
} from '@mdi/js'
import {
  RequestOperatorHeaders,
  RequestSekolahHeaders,
  RequestDetailSekolahDefault
} from '~/utils/headers'
import DetailSekolahDialog from '~/components/dialogs/DetailSekolahDialog.vue'

export default {
  components: { DetailSekolahDialog },
  data: () => ({
    // table
    headers: [RequestOperatorHeaders, RequestSekolahHeaders],
    tab: 'operator',

    dialog: false,
    detailActive: RequestDetailSekolahDefault,
    icons: {
      more: mdiDotsHorizontal,
      filter: mdiFilterOutline
    }
  }),
  computed: {
    ...mapState({
      loading: s => s.request.pending,
      data: s => s.request.data,
      search: s => s.search
    })
  },
  watch: {
    tab (newVal) {
      switch (newVal) {
        case 'operator':
          this.$store.dispatch('request/getOperatorRequestAction')
          break
        case 'sekolah':
          this.$store.dispatch('request/getSekolahRequestAction')
          break
      }
    }
  },
  methods: {
    on_close_dialog () {
      this.detailActive = RequestDetailSekolahDefault
      this.dialog = false
    },
    on_click_detail (args) {
      this.detailActive = { ...args }
      this.dialog = true
    },
    // accept / decline operator
    open_dialog_operator (args) {
      this.$store.commit('dialog/dialogRequestMutate', { show: true, data: args })
    },
    // accept school
    async on_accept_school (args) {
      this.$store.commit('request/pendingMutate', true)
      const { uuid, name } = args
      await this.$axios.$get(`/api/eduplus-administrator/school/request/acc/${uuid}`)
        .then((response) => {
          this.$swal({
            icon: 'success',
            title: 'Successfuly Accepted',
            text: `Berhasil menerima sekolah dengan nama ${name}.`,
            timer: 3000
          })
        })
        .catch((error) => {
          console.warn(error)
          this.$swal({
            icon: 'error',
            title: 'Accept Failed',
            text: `Gagal menerima sekolah dengan nama ${name}.`,
            timer: 3000
          })
        })
        .finally(() => {
          this.$store.commit('request/pendingMutate', false)
        })
    },
    // decline school
    async on_decline_school (args) {
      this.$store.commit('request/pendingMutate', true)
      const { uuid, name } = args
      await this.$axios.$post(`/api/eduplus-administrator/school/request/${uuid}`)
        .then((response) => {
          this.$swal({
            icon: 'success',
            title: 'Successfuly Refused',
            text: `Berhasil menolak sekolah dengan nama ${name}.`,
            timer: 3000
          })
        })
        .catch((error) => {
          console.warn(error)
          this.$swal({
            icon: 'error',
            title: 'Refuse Failed',
            text: `Gagal menolak sekolah dengan nama ${name}.`,
            timer: 3000
          })
        })
        .finally(() => {
          this.$store.commit('request/pendingMutate', false)
        })
    }
  }
}
</script>
