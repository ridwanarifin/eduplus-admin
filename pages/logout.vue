<!-- eslint-disable -->
<template>
</template>
<script>
export default {
  mounted () {
    this.$nextTick(async () => {
      await this.$auth.logout()
        .finally(() => {
          window.localStorage.clear()
        })
    })
  }
}
</script>
