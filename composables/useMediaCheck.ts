export default () => {
  const isShowNav = useState<boolean>('isShowNav', () => true)
  const isMobile = useState<boolean>('isMobile', () => false)

  const update = () => {
    if (window.innerWidth > 768) {
      isShowNav.value = true
      isMobile.value = false
    } else {
      isShowNav.value = false
      isMobile.value = true
    }
  }

  onMounted(() => {
    update()
    window.addEventListener('resize', update)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', update)
  })

  return { isShowNav, isMobile }
}
