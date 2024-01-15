export default defineNuxtRouteMiddleware((to, from) => {
  const { $i18n } = useNuxtApp()
  const router = useRouter()
  const config = useRuntimeConfig()

  if (config.public.IS_TEST) {
    router.push(`/${$i18n.locale.value}/servers`)
    return
  }

  if (getAccessToken()) {
    router.push(`/${$i18n.locale.value}/servers`)
  } else {
    router.push(`/${$i18n.locale.value}/login`)
  }
})
