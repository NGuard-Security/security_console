<template></template>

<style lang="scss" scoped>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s;
}

.page-enter,
.page-leave-to {
  opacity: 0;
}
</style>

<script>
export default {
  mounted() {
    if (localStorage.getItem('access_token')) {
      this.$router.push('/' + this.$i18n.locale + '/dashboard?id=' + this.$route.query.id)
      return
    } else {
      this.$router.push('/' + this.$i18n.locale + '/auth/login')
      return
    }
  },
}
</script>
