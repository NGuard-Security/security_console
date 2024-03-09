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
const { discordPopup } = useDiscordPopup()

onMounted(() => {
  if (!getAccessToken()) {
    const discordAuthURL = `https://discord.com/api/oauth2/authorize?client_id=937636597040570388&redirect_uri=${window.location.origin}/auth/callback&response_type=code&scope=identify guilds guilds.join email&state=${i18n.locale.value}`

    setTimeout(() => {
      discordPopup(discordAuthURL)
    }, 1500)
  } else {
    history.go(-1)
  }
})
</script>
