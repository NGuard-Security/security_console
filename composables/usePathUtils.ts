export default () => {
  const route = useRoute()
  const i18n = useI18n()

  const isCallbackPath = useState<boolean>('isCurrentPathCallback')
  const currentPathWithoutLocale = useState<string>('currentPathWithoutLocale')

  onMounted(() => {
    isCallbackPath.value = route.path.includes('/auth/callback')
    currentPathWithoutLocale.value = route.fullPath.replace(/^\/(ko|en|ja|vi)(?=\/|$)/, '')
  })

  const pathWithLocale = (link: string) => {
    return `/${i18n.locale.value}${link}`
  }

  return { isCallbackPath, currentPathWithoutLocale, pathWithLocale }
}
