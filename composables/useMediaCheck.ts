export default () => {
  const isMobile = useState<boolean>('isMobile', () => false)

  const update = () => {
    if (window.innerWidth > 768) {
      isMobile.value = false
    } else {
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

  return { isMobile }
}
