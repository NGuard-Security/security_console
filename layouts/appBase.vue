<script setup lang="ts">
const i18n = useI18n()
</script>

<template>
  <div :class="`i18n i18n_${i18n.locale.value}`">
    <AppHeader />
    <div class="bottom_content flex w-full h-full">
      <slot />
    </div>
  </div>
</template>
