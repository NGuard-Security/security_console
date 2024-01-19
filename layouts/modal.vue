<script setup lang="ts">
const modalsIsShow = useState<Record<string, boolean>>('useModal')
const { modalName } = defineProps<{ modalName: string }>()

const bgEl = ref()
const onClose = () => {
  modalsIsShow.value[modalName] = false
}
onClickOutside(bgEl, onClose)

if (!modalsIsShow.value[modalName]) throw new Error(`모달의 name인 ${modalName} 이/가 잘못 입력되었습니다.`)
</script>

<style lang="scss">
@import url('~/assets/styles/layouts/modal.scss');
</style>

<template>
  <div class="modal_bg" :class="{ show: modalsIsShow[modalName] }"></div>
  <div class="modal_wrap">
    <div ref="bgEl" class="modal" v-if="modalsIsShow[modalName]">
      <slot />
    </div>
  </div>
</template>
