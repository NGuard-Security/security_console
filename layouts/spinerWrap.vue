<script setup lang="ts">
const { loadingState } = useLoadingState()
</script>

<style lang="scss">
@import url('~/assets/styles/layouts/spinerProvider.scss');
</style>

<template>
  <transition name="contents">
    <div v-if="loadingState === LOADING_STATE.Success">
      <slot />
    </div>

    <div v-else-if="loadingState === LOADING_STATE.Connecting" class="state_wrap">
      <div class="state h-[500px]">
        <h3 class="pb-8 text-2xl">
          <!-- 불러오는 중 -->
          {{ $t('common.loading') }}
        </h3>

        <LoadingSpinner :type="2" />
      </div>
    </div>

    <div v-else-if="loadingState === LOADING_STATE.Failed" class="state_wrap">
      <div class="state h-[500px]">
        <h4>
          <!-- 현재 응답이 지연되고 있습니다. -->
          {{ $t('common.ratelimit') }}
        </h4>
        <h4>
          <!-- 잠시 후 다시 시도해 주세요. -->
          {{ $t('common.tryagain') }}
        </h4>
      </div>
    </div>
  </transition>
</template>
