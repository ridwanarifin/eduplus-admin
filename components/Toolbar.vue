<template>
  <v-row class="container mx-auto" align="center" justify="space-between">
    <v-col cols="12" sm="6">
      <div class="text--primary title">
        {{ $store.state.activeMenu }}
      </div>
      <div class="text--primary subtitle-1">
        {{ date }} [{{ time }}]
      </div>
    </v-col>

    <v-col cols="12" sm="6">
      <v-toolbar tag="div" color="transparent" flat>
        <v-spacer />
        <v-text-field
          v-model="search"
          flat
          clearable
          hide-details
          :loading="loading"
          :disabled="loading"
          :append-icon="icons.search"
        />
        <v-spacer />
        <div>
          <v-menu offset-y>
            <template #activator="{ on, attrs }">
              <v-btn v-bind="attrs" text v-on="on">
                Hi Superadmin
                <v-icon class="ml-2" v-text="icons.chevron" />
              </v-btn>
            </template>

            <v-list>
              <v-list-item nuxt replace to="/logout">
                <v-list-item-icon>
                  <v-icon v-text="icons.logout" />
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="'Logout'" />
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </v-toolbar>
    </v-col>
  </v-row>
</template>

<script>
import {
  mdiMagnify,
  mdiLogoutVariant,
  mdiChevronDown
} from '@mdi/js'
export default {
  props: {
    loading: { type: Boolean, default: false }
  },
  data () {
    return {
      icons: {
        search: mdiMagnify,
        logout: mdiLogoutVariant,
        chevron: mdiChevronDown
      },
      momentDate: this.$moment()
    }
  },
  computed: {
    search: {
      // eslint-disable-next-line
      get: function () {
        return this.$store.state.search
      },
      // eslint-disable-next-line
      set: function (v) {
        this.$store.commit('searchMutate', v)
      }
    },
    date () {
      return this.momentDate.format('DD MMMM YYYY')
    },
    time () {
      return this.momentDate.format('HH:mm')
    }
  },
  created () {
    this.$nextTick(() => {
      setInterval(() => this.updateCurrentTime(), 1000)
    })
  },
  methods: {
    updateCurrentTime () {
      this.momentDate = this.$moment()
    }
  }
}
</script>
