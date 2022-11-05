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
      this.$router.push('/servers')
      return
    } else {
      this.$router.push('/auth/login')
      return
    }
  },
}
</script>
