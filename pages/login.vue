<template>
  <NuxtLayout name="app-base">
    <div class="overflow-x-hidden servers-wrap flex items-center justify-center flex-col w-full h-full px-10">
      <h1 class="w-fit text-3xl font-bold mx-auto mb-14 text-white">
        <!-- 로그인 -->
        {{ $t('common.auth.login.title') }}
      </h1>

      <div class="relative w-full flex justify-center mb-20">
        <!-- 스피너 -->
        <transition name="spiner">
          <div id="loading" class="absolute mx-auto">
            <div class="text-center">
              <LoadingSpinner :type="1" />

              <h4 class="text-base pt-5 text-[#999999]">
                <!-- 로그인 정보를 불러오는 중입니다... -->
                {{ $t('common.auth.login.loading') }}
              </h4>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
const i18n = useI18n()

onMounted(() => {
  if (!getAccessToken()) {
    const discordAuthURL = `https://discord.com/api/oauth2/authorize?client_id=937636597040570388&redirect_uri=${window.location.origin}/auth/callback&response_type=code&scope=identify guilds guilds.join email&state=${i18n.locale.value}`
    const popupWidth = 450
    const popupHeight = 940
    const popupX = document.body.offsetWidth / 2 + window.screenX - popupWidth / 2
    const popupY = document.body.offsetHeight / 2 + window.screenY - popupHeight / 2

    setTimeout(() => {
      window.open(
        discordAuthURL,
        `${isMobileOrTablet() ? '_self' : '_blank'}`,
        `width = ${popupWidth}, height = ${popupHeight}, top = ${popupY}, left = ${popupX}, location = no, toolbars = no, status = no`,
      )
    }, 1500)
  } else {
    history.go(-1)
  }
})
</script>
