<template>
  <div
    class="overflow-x-hidden servers-wrap flex items-center justify-center flex-col w-full h-full min-h-screen px-10"
  >
    <h1 class="w-fit text-3xl font-bold mx-auto mb-14 text-white">
      <!-- 로그인 -->
      {{ $t('common.auth.login.title') }}
    </h1>

    <div class="relative w-full flex justify-center mb-20">
      <!-- 스피너 -->
      <transition name="spiner">
        <div id="loading" class="absolute mx-auto">
          <div class="text-center">
            <div class="spinner"></div>
            <h4 class="text-base pt-5" style="color: rgb(153, 153, 153)">
              <!-- 로그인 정보를 불러오는 중입니다... -->
              {{ $t('common.auth.login.loading') }}
            </h4>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s;
}

.page-enter,
.page-leave-to {
  opacity: 0;
}

.spiner-enter-active,
.spiner-leave-active {
  transition: opacity 0.5s;
}

.spiner-enter,
.spiner-leave-to {
  opacity: 0;
}

.spinner {
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

@keyframes spinner {
  to {
    transform: rotate(1turn);
  }
}
</style>

<script>
import { authEndpoint } from '@/config.json'

export default {
  async mounted() {
    if (localStorage.getItem('access_token')) {
      history.go(-1)
    } else {
      const login = `https://discord.com/api/oauth2/authorize?client_id=937636597040570388&redirect_uri=${authEndpoint}/auth/callback&response_type=code&scope=identify guilds guilds.join email&state=${this.$i18n.locale}`

      setTimeout(() => {
        location.replace(login)
      }, 1500)
    }
  },
}
</script>
