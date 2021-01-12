<template>
  <v-container class="mx-auto">
    <v-tabs
      v-model="tab"
      :centered="$vuetify.breakpoint.mobile"
      show-arrows
      background-color="transparent"
    >
      <v-tab href="#jumbotron">
        Jumbotron
      </v-tab>
      <v-tab href="#promo-1">
        Promo 1
      </v-tab>
      <v-tab href="#promo-2">
        Promo 2
      </v-tab>
      <v-tab href="#provinsi">
        Provinsi
      </v-tab>
      <v-tab href="#kab-kota">
        Kabupaten / Kota
      </v-tab>
    </v-tabs>

    <v-divider />

    <v-sheet class="mt-10" color="transparent">
      <v-tabs-items v-model="tab" :style="{background: '#F5F5FB'}">
        <v-tab-item value="jumbotron">
          <create-jumbotron-form />
        </v-tab-item>

        <v-tab-item value="promo-1">
          <create-promo-form />
        </v-tab-item>

        <v-tab-item value="promo-2">
          <create-promo-second-form />
        </v-tab-item>

        <v-tab-item value="provinsi">
          <edit-provinsi-form />
        </v-tab-item>

        <v-tab-item value="kab-kota">
          <edit-kab-kota-form />
        </v-tab-item>
      </v-tabs-items>
    </v-sheet>
  </v-container>
</template>

<script>
import CreateJumbotronForm from '~/components/forms/CreateJumbotronForm.vue'
import CreatePromoForm from '~/components/forms/CreatePromoForm.vue'
import CreatePromoSecondForm from '~/components/forms/createPromoSecondForm.vue'
import EditKabKotaForm from '~/components/forms/EditKabKotaForm.vue'
import EditProvinsiForm from '~/components/forms/EditProvinsiForm.vue'

export default {
  components: {
    CreateJumbotronForm,
    CreatePromoForm,
    CreatePromoSecondForm,
    EditProvinsiForm,
    EditKabKotaForm
  },
  data: () => ({
    tab: false
  })
}
</script>
