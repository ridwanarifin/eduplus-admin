<template>
  <v-container class="mx-auto">
    <detail-sekolah-dialog :dialog="detailDialog" :data="detailActive" @on-close="on_close_dialog" />

    <v-row no-gutters align="end" justify="space-between">
      <v-col cols="12" sm>
        <v-tabs v-model="tab" background-color="transparent" :centered="$vuetify.breakpoint.mobile" show-arrows>
          <v-tab href="#daftar-sekolah">
            Daftar Sekolah
          </v-tab>
          <v-tab href="#sekolah-favorit">
            Sekolah Favorit
          </v-tab>
        </v-tabs>
      </v-col>

      <v-col cols="12" sm>
        <v-row align="center" align-sm="end" justify="center" justify-sm="end">
          <v-col cols="auto">
            <div class="title d-flex flex-row">
              Total sekolah : &emsp;
              <v-skeleton-loader v-if="loading" type="chip" />
              <span v-else>{{ school.total }}</span>
            </div>
          </v-col>
          <v-col v-show="tab === 'daftar-sekolah'" cols="auto">
            <v-btn tile>
              <span>Urutkan</span>
              <v-icon v-text="icons.filter" />
            </v-btn>
          </v-col>
          <v-col v-show="tab === 'daftar-sekolah'" cols="3">
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

    <v-divider class="mb-5" />

    <v-tabs-items v-model="tab">
      <!-- Daftar Sekolah -->
      <v-tab-item value="daftar-sekolah">
        <v-skeleton-loader v-if="loading" type="table" />
        <v-data-table
          v-else
          :loading="loadPagination"
          :headers="headers"
          :items="school.data"
          :items-per-page.sync="itemsPerPage"
          :search="search"
          hide-default-footer
          @page-count="pageCount = $event"
          @pagination="pagination = $event"
        >
          <!-- eslint-disable-next-line -->
          <template v-slot:item.actions="{ item }">
            <v-btn tile text small color="primary" @click.prevent="on_click_detail(item)">
              Detail
            </v-btn>
          </template>
        </v-data-table>
      </v-tab-item>
      <!-- Sekolah Favorit -->
      <v-tab-item value="sekolah-favorit">
        <v-skeleton-loader v-if="loading" type="table" />
        <v-data-table
          v-else
          :loading="loadPagination"
          :headers="headers"
          :items="schoolsFav"
          :items-per-page="itemsPerPage"
          @page-count="pageCount = $event"
          @pagination="pagination = $event"
        >
          <!-- eslint-disable-next-line -->
          <template v-slot:item.actions="{ item }">
            <v-row no-gutters align="center" justify="center">
              <v-col cols="auto">
                <v-btn tile text small color="primary" @click.prevent="on_click_detail(item)">
                  Detail
                </v-btn>
              </v-col>
              <v-col cols="auto">
                <v-btn tile text small color="primary">
                  Delete
                </v-btn>
              </v-col>
            </v-row>
          </template>
        </v-data-table>
      </v-tab-item>
    </v-tabs-items>

    <v-row v-show="tab === 'daftar-sekolah'" align="center" justify="space-between">
      <v-col cols="12" sm>
        <div class="d-flex flex-row">
          Showing&emsp;
          <v-skeleton-loader v-if="loading || !school.data" type="chip" />
          <span v-else>{{ school.from }} - {{ school.to }} of {{ school.total }} Data</span>
        </div>
      </v-col>

      <v-col cols="12" sm>
        <v-pagination
          v-model="school.current_page"
          :length="numberOfPages"
          :total-visible="7"
          @input="on_click_input"
          @next="on_click_next"
          @previous="on_click_prev"
        />
      </v-col>
    </v-row>

    <!-- <v-row v-show="tab === 'sekolah-favorit'" align="center" justify="space-between">
      <v-col cols="12" sm>
        <div class="d-flex flex-row">
          Showing&emsp;
          <v-skeleton-loader v-if="loading || !schoolsFav" type="chip" />
          <span v-else>{{ school.from }} - {{ school.to }} of {{ school.total }} Data</span>
        </div>
      </v-col>
    </v-row> -->

    <div v-show="tab === 'sekolah-favorit'" class="mt-10 text-center">
      <v-btn large color="primary">
        <span class="mr-2">Tambah Sekolah Favorit</span>
        <v-icon v-text="icons.plus" />
      </v-btn>
    </div>
  </v-container>
</template>

<script>
import _ from 'lodash'
import { mapState } from 'vuex'
import {
  mdiFilterOutline,
  mdiPlusCircleOutline
} from '@mdi/js'
import { DaftarSekolahHeaders, RequestDetailSekolahDefault } from '~/utils/headers'
import DetailSekolahDialog from '~/components/dialogs/DetailSekolahDialog.vue'

export default {
  components: { DetailSekolahDialog },
  fetch () {
    this.$store.dispatch('listSchool/getSchoolAction', this.itemsPerPage)
  },
  data () {
    return {
      icons: {
        filter: mdiFilterOutline,
        plus: mdiPlusCircleOutline
      },
      // table
      tab: 'daftar-sekolah',
      headers: DaftarSekolahHeaders,
      pageCount: 0,
      itemsPerPage: 10,
      pagination: {},
      // detail
      detailDialog: false,
      detailActive: RequestDetailSekolahDefault
    }
  },
  computed: {
    ...mapState({
      search: s => s.search,
      loading: s => s.listSchool.pending,
      loadPagination: s => s.listSchool.paginationPending,
      school: s => s.listSchool
    }),
    schoolsFav () {
      return _.filter(this.school.data, 'hit')
    },
    numberOfPages () {
      return Math.ceil(this.school.total / this.itemsPerPage)
    }
  },
  methods: {
    on_click_input (page) {
      this.$store.dispatch('listSchool/paginationSearchAction', `${this.school.path}?page=${page}`)
    },

    on_click_next () {
      this.$store.dispatch('listSchool/paginationSearchAction', this.school.next_page_url)
    },

    on_click_prev () {
      this.$store.dispatch('listSchool/paginationSearchAction', this.school.prev_page_url)
    },
    async on_click_detail (args) {
      const { uuid } = args
      await this.getDetailSchool(uuid)
        .finally(() => {
          this.detailDialog = true
        })
    },
    on_close_dialog () {
      this.detailActive = RequestDetailSekolahDefault
      this.detailDialog = false
    },
    async getDetailSchool (args) {
      return await this.$axios.$get(`/api/schools/${args}`)
        .then((response) => {
          this.detailActive = response
        })
        .catch((error) => {
          console.warn(error)
        })
    }
  }
}
</script>
