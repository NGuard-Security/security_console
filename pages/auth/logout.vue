<template>
  <NuxtLayout name="app-base">
    <div class="overflow-x-hidden servers-wrap flex items-center justify-center flex-col w-full h-full px-10">
      <h1 class="w-fit text-3xl font-bold mx-auto mb-14 text-white">
        <!-- 로그아웃 -->
        {{ $t('common.auth.logout.title') }}
      </h1>

      <div class="relative w-full flex justify-center mb-20">
        <!-- 스피너 -->
        <transition name="spiner">
          <div id="loading" class="absolute mx-auto">
            <div class="text-center">
              <div class="spinner"></div>
              <loading-spinner :type="1" />

              <h4 class="text-base pt-5 text-[#999999]">
                <!-- 로그아웃 중입니다... -->
                {{ $t('common.auth.logout.loading') }}
              </h4>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
const router = useRouter()
const i18n = useI18n()
const { pathWithLocale } = usePathUtils()

onMounted(() => {
  if (!getAccessToken()) {
    router.push(pathWithLocale('/auth/login'))
    return
  }

  removeAccessToken()

  // @ts-ignore
  if (window.ReactNativeWebView) {
    // @ts-ignore
    window.ReactNativeWebView.postMessage(
      JSON.stringify({
        type: 'alert',
        title: i18n.t('common.alert'),
        message: i18n.t('common.auth.logout.success'),
        action: 'quitApp',
      }),
    )

    router.push(pathWithLocale('/auth/login'))
  } else {
    alert(i18n.t('common.auth.logout.success'))
    location.replace('https://nguard.xyz/')
  }
})
</script>
