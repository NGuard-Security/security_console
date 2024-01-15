export default defineNuxtRouteMiddleware((to, from) => {
  const { $i18n } = useNuxtApp()
  const router = useRouter()
  const config = useRuntimeConfig()

  if (config.public.IS_TEST) {
    return
  }

  if (!getAccessToken()) {
    router.push(`/${$i18n.locale.value}/login`)
  }
})
