export default () => {
  const route = useRoute()
  const router = useRouter()
  const i18n = useI18n()
  const accountStore = useAccountStore()

  const isCallbackRoute = useState<boolean>('isCallbackRoute')

  onMounted(() => {
    isCallbackRoute.value = route.path.includes('/auth/callback')

    console.log(route.path)
  })

  const moveToAccuratePath = () => {
    if (accountStore.accessToken) {
      router.push(`/${i18n.locale.value}/servers`)
    } else {
      router.push(`/${i18n.locale.value}/auth/login`)
    }
  }

  return { isCallbackRoute, moveToAccuratePath }
}
