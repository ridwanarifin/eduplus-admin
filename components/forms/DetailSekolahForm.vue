<template>
  <validation-observer ref="observer">
    <form @reset.prevent="clear">
      <v-row align="center" justify="space-between">
        <!-- nama sekolah -->
        <v-col cols="12" sm="6">
          <validation-provider
            v-slot="{ errors }"
            name="nama sekolah"
          >
            <v-text-field
              v-model.lazy="forms.name"
              :error-messages="errors"
              :loading="loading"
              :disabled="loading"
              label="Nama Sekolah"
              readonly
              outlined
            />
          </validation-provider>
        </v-col>

        <!-- alamat sekolah -->
        <v-col cols="12" sm="6">
          <validation-provider
            v-slot="{ errors }"
            name="alamat sekolah"
          >
            <v-text-field
              v-model.lazy="forms.address"
              :error-messages="errors"
              :loading="loading"
              :disabled="loading"
              label="Alamat Sekolah"
              readonly
              outlined
            />
          </validation-provider>
        </v-col>
      </v-row>

      <v-row align="center" justify="space-between">
        <!-- provinsi -->
        <v-col cols="12" sm="6">
          <validation-provider
            v-slot="{ errors }"
            name="provinsi"
          >
            <v-select
              v-model.lazy="forms.province"
              :error-messages="errors"
              :loading="loading"
              :disabled="loading"
              :items="provinces"
              item-text="name"
              return-object
              label="Provinsi"
              readonly
              outlined
            />
          </validation-provider>
        </v-col>

        <!-- kabupaten / kota -->
        <v-col cols="12" sm="6">
          <validation-provider
            v-slot="{ errors }"
            name="kabupaten / kota"
          >
            <v-select
              v-model.lazy="forms.regency"
              :error-messages="errors"
              :loading="loading"
              :disabled="loading"
              :items="regences"
              item-text="name"
              return-object
              label="Kabupaten / Kota"
              readonly
              outlined
            />
          </validation-provider>
        </v-col>
      </v-row>

      <v-row align="center" justify="space-between">
        <!-- kecamatan -->
        <v-col cols="12" sm="6">
          <validation-provider
            v-slot="{ errors }"
            name="kecamatan"
          >
            <v-select
              v-model.lazy="forms.district"
              :error-messages="errors"
              :loading="loading"
              :disabled="loading"
              :items="districts"
              item-text="name"
              return-object
              label="Kecamatan"
              readonly
              outlined
            />
          </validation-provider>
        </v-col>

        <!-- kelurahan -->
        <v-col cols="12" sm="6">
          <validation-provider
            v-slot="{ errors }"
            name="kelurahan"
          >
            <v-select
              v-model.lazy="forms.village"
              :error-messages="errors"
              :loading="loading"
              :disabled="loading"
              :items="villages"
              item-text="name"
              return-object
              label="Kelurahan"
              readonly
              outlined
            />
          </validation-provider>
        </v-col>
      </v-row>

      <v-row align="center" justify="space-between">
        <!-- jenjang pendidikan -->
        <v-col cols="12" sm="6">
          <validation-provider
            v-slot="{ errors }"
            name="jenjang pendidikan"
          >
            <v-text-field
              v-model.lazy="forms.educational_stage"
              :error-messages="errors"
              :loading="loading"
              :disabled="loading"
              label="Jenjang Pendidikan"
              readonly
              outlined
            />
          </validation-provider>
        </v-col>

        <!-- status -->
        <v-col cols="12" sm="6">
          <validation-provider
            v-slot="{ errors }"
            name="status"
          >
            <v-select
              v-model.lazy="forms.status"
              :error-messages="errors"
              :loading="loading"
              :disabled="loading"
              :items="[{ id: 0, text: 'Swasta' }, { id: 1, text: 'Negeri' }]"
              item-text="text"
              item-value="id"
              label="Status"
              readonly
              outlined
            />
          </validation-provider>
        </v-col>
      </v-row>

      <v-row align="center" justify="space-between">
        <!-- akreditasi -->
        <v-col cols="12" sm="6">
          <validation-provider
            v-slot="{ errors }"
            name="akreditasi"
          >
            <v-text-field
              v-model.lazy="forms.accreditation"
              :error-messages="errors"
              :loading="loading"
              :disabled="loading"
              label="Akreditasi"
              readonly
              outlined
            />
          </validation-provider>
        </v-col>

        <!-- NPSN -->
        <v-col cols="12" sm="6">
          <validation-provider
            v-slot="{ errors }"
            name="NPSN"
          >
            <v-text-field
              v-model.lazy="forms.npsn"
              :error-messages="errors"
              :loading="loading"
              :disabled="loading"
              label="NPSN"
              readonly
              outlined
            />
          </validation-provider>
        </v-col>
      </v-row>

      <v-row align="center" justify="space-between">
        <!-- operator -->
        <v-col cols="12" sm="6">
          <validation-provider
            v-slot="{ errors }"
            name="operator"
          >
            <v-text-field
              v-model.lazy="forms.operator_name"
              :error-messages="errors"
              :loading="loading"
              :disabled="loading"
              label="Operator"
              readonly
              outlined
            />
          </validation-provider>
        </v-col>

        <!-- email -->
        <v-col cols="12" sm="6">
          <validation-provider
            v-slot="{ errors }"
            name="email"
          >
            <v-text-field
              v-model.lazy="forms.email"
              :error-messages="errors"
              label="Email"
              readonly
              outlined
            />
          </validation-provider>
        </v-col>
      </v-row>

      <v-row align="center" justify="space-between">
        <!-- telepon -->
        <v-col cols="12" sm="6">
          <validation-provider
            v-slot="{ errors }"
            name="telepon"
          >
            <v-text-field
              v-model.lazy="forms.phone_number"
              :error-messages="errors"
              :loading="loading"
              :disabled="loading"
              label="Telepon"
              readonly
              outlined
            />
          </validation-provider>
        </v-col>
      </v-row>
    </form>
  </validation-observer>
</template>

<script>
import _ from 'lodash'
import { RequestDetailSekolahDefault } from '~/utils/headers'

export default {
  props: {
    forms: {
      type: Object,
      required: true,
      default: () => ({
        name: '',
        address: '',
        province_id: null,
        regency_id: null,
        district_id: null,
        village_id: null,
        educational_stage: '',
        status: 0,
        accreditation: '',
        npsn: null,
        operator_name: '',
        email: '',
        phone_number: '',
        // extra
        province: {
          id: null,
          name: '',
          image: ''
        },
        regency: {
          id: 0,
          province_id: 0,
          name: '',
          image: ''
        },
        district: {
          id: 0,
          regency_id: 0,
          name: '',
          image: ''
        },
        village: {
          id: 0,
          district_id: 0,
          name: '',
          image: ''
        }
      })
    }
  },
  data: () => ({
    provinces: [],
    regences: [],
    districts: [],
    villages: [],
    loading: false
  }),
  computed: {
    observer () { return this.$refs.observer }
  },
  watch: {
    forms (newVal) {
      // console.log('is equal: ', _.isEqual(newVal, RequestDetailSekolahDefault))
      // console.log('from watch: ', newVal)
      if (!_.isEqual(newVal, RequestDetailSekolahDefault)) {
        this.getAllAction()
      }
    }
  },
  methods: {
    async getAllAction () {
      this.loading = true
      await Promise.all([
        this.getProv(),
        this.getReg(),
        this.getDis(),
        this.getVil()
      ])
        .finally(() => {
          // this.loading = false
          // eslint-disable-next-line
          setTimeout(() => {
            this.loading = false
          }, 2000)
        })
    },
    async getProv () {
      try {
        const { province } = await this.$axios.$get('/api/search/init')
        this.provinces = province
      } catch (error) {
        console.warn(error)
      }
    },
    async getReg () {
      try {
        if (_.isEmpty(this.forms.province)) { return }
        const { data } = await this.$axios.$get(`/api/search/get-regency/${this.forms.province.id}`)
        this.regences = data
      } catch (error) {
        console.warn(error)
      }
    },
    async getDis () {
      try {
        if (_.isEmpty(this.forms.regency)) { return }
        const { data } = await this.$axios.$get(`/api/search/get-district/${this.forms.regency.id}`)
        this.districts = data
      } catch (error) {
        console.warn(error)
      }
    },
    async getVil () {
      try {
        if (_.isEmpty(this.forms.district)) { return }
        const { data } = await this.$axios.$get(`/api/search/get-village/${this.forms.district.id}`)
        this.villages = data
      } catch (error) {
        console.warn(error)
      }
    },
    clear () {
      this.$emit('on-reset')
      this.observer.reset()
    }
  }
}
</script>
