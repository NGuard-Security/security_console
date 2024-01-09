export default defineNuxtRouteMiddleware((to, from) => {
  const { $i18n } = useNuxtApp()
  const router = useRouter()

  if (isNaN(Number(to.query.id))) {
    router.push(`/${$i18n.locale.value}/servers`)
  }
})
