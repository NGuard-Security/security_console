<script setup lang="ts">
const modalsIsShow = useState<Record<string, boolean>>('useModal')
const { modalName } = defineProps<{ modalName: string }>()

const bgEl = ref()
const onClose = () => {
  if (!modalsIsShow.value[modalName]) return

  modalsIsShow.value[modalName] = false
}
onClickOutside(bgEl, onClose)
</script>

<style lang="scss">
@import url('~/assets/styles/layouts/modal.scss');
</style>

<template>
  <div class="modal_bg" :class="{ show: modalsIsShow[modalName] || false }"></div>
  <div class="modal_wrap">
    <div ref="bgEl" class="modal" v-if="modalsIsShow[modalName] || false">
      <slot />
    </div>
  </div>
</template>
