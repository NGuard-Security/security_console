<script setup lang="ts">
const i18n = useI18n()
</script>

<template>
  <div :class="'i18n_' + i18n.locale.value">
    <AppHeader />
    <slot />
  </div>
</template>
