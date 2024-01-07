export default () => {
  const route = useRoute()
  const router = useRouter()
  const i18n = useI18n()
  const accountStore = useAccountStore()

  const isCurrentPathCallback = useState<boolean>('isCallbackRoute')
  const currentPathWithoutLocale = useState<string>('pathWithoutLocale')

  onMounted(() => {
    isCurrentPathCallback.value = route.path.includes('/auth/callback')
    currentPathWithoutLocale.value = route.fullPath.replace(/^\/(ko|en|ja|vi)(?=\/|$)/, '')
  })

  const moveToAccuratePath = () => {
    if (accountStore.accessToken) {
      router.push(`/${i18n.locale.value}/servers`)
    } else {
      router.push(`/${i18n.locale.value}/auth/login`)
    }
  }

  const pathWithLocale = (link: string) => {
    return `/${i18n.locale.value}${link}`
  }

  return { isCurrentPathCallback, currentPathWithoutLocale, moveToAccuratePath, pathWithLocale }
}
