<template>
  <!--
    state: 로딩중: 0, 응답지연: 2, 초대 필요: 3
  -->

  <div v-if="state != 1" class="items-center w-full flex justify-center">
    <transition name="spiner">
      <div v-if="state == 0" class="state_wrap">
        <div class="state">
          <div class="spinner1"></div>
          <p class="text-base pt-5 text-[#999999]">
            <!-- 서버 목록을 가져오고 있습니다... -->
            {{ $t('servers.loadingServer') }}
          </p>
        </div>
      </div>
    </transition>

    <transition name="connErr">
      <div v-if="state == 2" class="state_wrap">
        <div class="state">
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
  </div>
</template>

<style lang="scss" scoped>
.spiner-enter-active,
.spiner-leave-active,
.connErr-enter-active,
.connErr-leave-active {
  transition: opacity 0.3s;
}

.spiner-enter,
.spiner-leave-to,
.connErr-enter,
.connErr-leave-to {
  opacity: 0;
}

.spinner1 {
  color: $color-gray;
  display: inline-block;
  width: 50px;
  height: 50px;
  vertical-align: -0.125em;
  border: 0.25em solid;
  border-right: 0.25em solid transparent;
  border-radius: 50%;
  -webkit-animation: spinner 0.75s linear infinite;
  animation: spinner 0.75s linear infinite;
}

.spinner2 {
  color: $color-white;
  display: inline-block;
  width: 2rem;
  height: 2rem;
  vertical-align: -0.125em;
  border: 0.25em solid;
  border-right: 0.25em solid transparent;
  border-radius: 50%;
  -webkit-animation: spinner 0.75s linear infinite;
  animation: spinner 0.75s linear infinite;
}

@keyframes spinner {
  to {
    transform: rotate(1turn);
  }
}

.state_wrap {
  position: absolute;
  width: 100%;
}

.state {
  width: 100%;
  height: 100px;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

h4 {
  font-size: 1.1rem;
  line-height: 1.75rem;
  padding-top: 1.25rem;
  color: $color-white;
}
</style>

<script>
export default {
  props: {
    type: {
      type: Number,
      default: true,
    },
    state: {
      type: Number,
      default: true,
    },
  },
}
</script>
