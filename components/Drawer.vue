<template>
  <v-navigation-drawer
    v-model="drawer"
    :mini-variant="miniVariant"
    :clipped="clipped"
    color="blue lighten-3"
    fixed
    dark
    app
  >
    <v-list class="my-10">
      <v-list-item :class="{'pl-2': $vuetify.breakpoint.mobile}">
        <v-list-item-avatar v-if="miniVariant">
          <v-img
            :src="require('~/assets/img/logo-white.png')"
            :lazy-src="require('~/assets/img/logo-white.png')"
            contain
            class="mx-auto"
          />
        </v-list-item-avatar>

        <v-list-item v-else>
          <v-img
            :src="require('~/assets/img/logo-white.png')"
            :lazy-src="require('~/assets/img/logo-white.png')"
            contain
            max-width="calc(20vw - 8rem)"
            class="mx-auto"
          />
        </v-list-item>
      </v-list-item>
    </v-list>

    <v-divider />

    <v-list>
      <v-list-item-group v-model="selectedItem" @change="on_change">
        <template v-for="(item, i) in items">
          <v-list-item
            :key="i"
            :to="item.to"
            :value="item.title"
            nuxt
          >
            <v-list-item-icon>
              <v-icon v-text="item.icon" />
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title v-text="item.title" />
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import items from '~/utils/drawer'

export default {
  props: {
    clipped: {
      type: Boolean,
      default: false
    },
    drawer: {
      type: Boolean,
      default: false
    },
    miniVariant: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    items,
    selectedItem: 'Administrator'
  }),
  methods: {
    on_change (e) {
      e && this.$store.commit('activeMenuMutate', e)
    }
  }
}
</script>
