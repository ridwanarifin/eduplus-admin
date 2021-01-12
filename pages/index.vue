<template>
  <v-container class="mx-auto">
    <v-dialog
      v-model="dialog"
      max-width="600"
      persistent
    >
      <v-card>
        <v-card-title primary-title>
          <span class="headline">{{ headlineForm }}</span>
          <v-spacer />
          <v-btn icon type="reset" @click.prevent="close_dialog">
            <v-icon v-text="icons.close" />
          </v-btn>
        </v-card-title>
        <v-divider class="my-2" />
        <v-card-text>
          <edit-admin-form
            v-show="edited"
            :models="editedItems"
            :loading="loadingEdit"
            @on-submit="on_submit_edit"
          >
            <template #actions>
              <v-divider class="mb-5" />
              <v-card-actions class="justify-end">
                <v-btn text color="primary" type="reset" @click="close_dialog">
                  Kembali
                </v-btn>

                <v-btn color="primary" type="submit">
                  Simpan
                </v-btn>
              </v-card-actions>
            </template>
          </edit-admin-form>

          <create-admin-form
            v-show="created"
            :loading="loadingCreate"
            @on-submit="on_submit_create"
          >
            <template #actions>
              <v-divider class="mb-5" />
              <v-card-actions class="justify-end">
                <v-btn text color="primary" type="reset" @click="close_dialog">
                  Kembali
                </v-btn>

                <v-btn color="primary" type="submit">
                  Tambah
                </v-btn>
              </v-card-actions>
            </template>
          </create-admin-form>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-skeleton-loader v-if="loadAdmin" type="table" />
    <v-data-table
      v-else
      :headers="headers"
      :items="admins"
      :search="search"
      :loading="loadAdmin"
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
    </v-data-table>

    <div class="mt-7 text-sm-right">
      <v-btn color="primary" @click.prevent="on_create">
        tambah
      </v-btn>
    </div>
  </v-container>
</template>

<script>
import _ from 'lodash'
import { mapState } from 'vuex'
import {
  mdiPencil,
  mdiClose
} from '@mdi/js'
import { AdminHeaders } from '~/utils/headers'
import EditAdminForm from '~/components/forms/EditAdminForm.vue'
import CreateAdminForm from '~/components/forms/CreateAdminForm.vue'

export default {
  components: { EditAdminForm, CreateAdminForm },
  fetch ({ store }) {
    if (_.isEmpty(this.admins)) {
      store.dispatch('admin/getAdminAction')
    }
  },
  fetchOnServer: false,
  data: () => ({
    headers: AdminHeaders,
    icons: {
      edit: mdiPencil,
      close: mdiClose
    },
    headlineForm: '',
    dialog: false,
    edited: false,
    created: false,
    loadingEdit: false,
    loadingCreate: false,
    editedItems: {},
    commitedItems: {}
  }),
  computed: {
    ...mapState({
      admins: s => s.admin.data,
      search: s => s.search,
      loadAdmin: s => s.admin.pending
    })
  },
  methods: {
    // on click btn edit
    on_edit (args) {
      this.headlineForm = 'Edit Admin'
      this.edited = true
      this.editedItems = args
      this.dialog = true
    },
    // on click btn create
    on_create () {
      this.headlineForm = 'Create Admin'
      this.created = true
      this.dialog = true
    },
    // on click btn return/close dialog
    close_dialog () {
      this.headlineForm = ''
      this.editedItems = {}
      this.commitedItems = {}
      this.edited = false
      this.created = false
      this.dialog = false
    },
    // submit edit
    async on_submit_edit (args) {
      this.loadingEdit = true
      this.commitedItems = _.pick(_.omitBy(args, _.isEmpty), ['name', 'email', 'password'])
      await this.$axios.$post(`/api/eduplus-administrator/admin/update/${args.uuid}`, this.commitedItems)
        .then((response) => {
          this.$swal({
            icon: 'success',
            title: 'Successfuly Updated',
            text: `Admin with e-mail ${args.email}, successfully updated.`,
            timer: 3000
          })
        })
        .catch((error) => {
          console.warn(error)
          this.$swal({
            icon: 'error',
            title: 'Failed Update',
            text: `Admin with email ${args.email}, failed to update.`,
            timer: 3000
          })
        })
        .finally(() => {
          this.loadingEdit = false
          this.close_dialog()
          this.$store.dispatch('admin/getAdminAction')
        })
    },
    // submit create
    async on_submit_create (args) {
      this.loadingCreate = true
      this.commitedItems = _.pick(_.omitBy(args, _.isEmpty), ['name', 'email', 'password'])
      await this.$axios.$post('api/eduplus-administrator/add', this.commitedItems)
        .then((response) => {
          this.$swal({
            icon: 'success',
            title: 'Successfuly Registered',
            text: `Email activation has been sent to ${args.email}.`,
            timer: 3000
          })
        })
        .catch((error) => {
          console.warn(error)
          this.$swal({
            icon: 'error',
            title: 'Failed Register',
            text: `Failed to register Admin with email ${args.email}.`,
            timer: 3000
          })
        })
        .finally(() => {
          this.loadingCreate = false
          this.close_dialog()
          this.$store.dispatch('admin/getAdminAction')
        })
    }
  }
}
</script>
