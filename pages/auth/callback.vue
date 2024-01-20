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
              <div class="spinner"></div>
              <loading-spinner :type="1" />

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
const API = useAPI()
const route = useRoute()
const router = useRouter()
const i18n = useI18n()

onMounted(async () => {
  try {
    if (typeof route.query.code !== 'string') {
      return
    }

    const res = await API.post.authCallback(
      route.query.code,
      window.location.origin == 'https://console-v2stg.nguard.dev',
    )

    setAccessToken(res.access_token)

    router.push(`/${route.query.state || i18n.locale || 'ko'}/servers`)
  } catch (e: any) {
    if (e.response.status != 400 && e.response.status != 429) {
      alert(e.response.data.message || e)
    }

    router.push(`/${route.query.state || i18n.locale || 'ko'}/login`)
  }
})
</script>
