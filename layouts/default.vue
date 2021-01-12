<template>
  <v-app>
    <drawer
      :clipped="clipped"
      :drawer="drawer"
      :mini-variant="miniVariant"
    />
    <app-bar
      :drawer="drawer"
      :clipped="clipped"
      :mini-variant="miniVariant"
      @on-drawer="on_click_drawer"
      @on-minivariant="on_click_minivariant"
      @on-clipped="on_click_clipped"
    />

    <v-main :style="{background: '#F5F5FB'}">
      <lazy-toolbar />
      <nuxt />
    </v-main>

    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>

    <accept-dialog
      :dialog="dialogAccept"
      @on-close="on_close_dialog_operator"
      @on-accept="on_accept_request_operator"
    />
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
import AppBar from '~/components/AppBar.vue'
import AcceptDialog from '~/components/dialogs/AcceptDialog.vue'
import Drawer from '~/components/Drawer.vue'
import drawerItems from '~/utils/drawer'

export default {
  components: {
    AppBar,
    Drawer,
    AcceptDialog
  },
  data () {
    return {
      drawerItems,
      clipped: false,
      drawer: false,
      fixed: false,
      miniVariant: false,
      drawerActiveName: ''
    }
  },
  computed: {
    ...mapGetters({
      dialogAccept: 'dialog/showRequestDialog'
    })
  },
  methods: {
    // drawer
    on_click_drawer (args) {
      this.drawer = args
    },
    on_click_minivariant (args) {
      this.miniVariant = args
    },
    on_click_clipped (args) {
      this.clipped = args
    },
    /**
     * dialog accept operator
     */
    on_close_dialog_operator () {
      this.$store.commit('dialog/dialogRequestMutate', false)
    },
    on_accept_request_operator () {
      this.$store.dispatch('request/operatorAcceptRequestAction')
    },
    on_decline_request_operator () {
      this.$store.dispatch('request/operatorDeclineRequestAction')
    }
  }
}
</script>
