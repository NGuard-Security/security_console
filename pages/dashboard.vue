<script setup lang="ts">
const i18n = useI18n()
</script>

<template>
  <NuxtLayout>
    <div :class="`i18n_${i18n.locale.value}`">
      <AppHeader />
      <div class="dashboard-wrap bottom_content flex w-full min-h-screen">
        <AppNavBar />

        <NuxtPage />
      </div>
    </div>
  </NuxtLayout>
</template>

<style lang="scss">
@import url('~/assets/styles/layouts/dashboard.scss');
</style>
