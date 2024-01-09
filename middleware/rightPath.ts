export default defineNuxtRouteMiddleware((to, from) => {
  const { $i18n } = useNuxtApp()
  const router = useRouter()

  if (getAccessToken()) {
    router.push(`/${$i18n.locale.value}/servers`)
  } else {
    router.push(`/${$i18n.locale.value}/auth/login`)
  }
})
