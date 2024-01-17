<script setup lang="ts">
const emit = defineEmits(['close'])
const props = defineProps<{ isShow: boolean }>()

const bgEl = ref()

const onClose = () => {
  emit('close')
}

onClickOutside(bgEl, onClose)
</script>

<style lang="scss">
@import url('~/assets/styles/layouts/modal.scss');
</style>

<template>
  <div class="modal_bg" :class="{ show: props.isShow }"></div>
  <div class="modal_wrap">
    <div ref="bgEl" class="modal" v-if="props.isShow">
      <slot />
    </div>
  </div>
</template>
