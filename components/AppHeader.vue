<script setup lang="ts">
const { isMobile, isShowNav } = useMediaCheck()
const routeUtils = useRouteUtils()
const accountStore = useAccountStore()
const userData = useState<UserData>('userData')

onMounted(async () => {
  if (routeUtils.isCallbackRoute || !accountStore.accessToken) return

  try {
    userData.value = await getDiscordAPIUserData()
  } catch (e: any) {
    if (e.response?.status === 429) {
      location.reload()
      return
    }

    catchNetworkErr(e, true)
  }
})
</script>

<template>
  <div></div>
</template>
