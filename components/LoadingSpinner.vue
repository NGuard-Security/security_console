<script setup lang="ts">
const { type } = defineProps<{ type: number }>()
if (!type) throw new Error(`LoadingSpinner component의 prop인 'type'이 누락되었습니다.`)
</script>

<template>
  <div :class="'spinner' + type"></div>
</template>

<style lang="scss" scoped>
@import url('~/assets/styles/components/loadingSpinner.scss');
</style>
