<template></template>

<script>
export default {
  mounted() {
    if (this.$route.query.error) {
      alert('봇 초대가 취소되었습니다.')
    }

    try {
      opener.location.reload(true)
      window.close()
    } catch (e) {
      this.$router.push('/servers')
    }
  },
}
</script>
