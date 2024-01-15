<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
})

const { loadingSuccess } = useLoadingState()
const API = useAPI()
const serverData = useState<APIServer[]>()
const { pathWithLocale } = usePathUtils()

const openInvite = (e: any) => {
  e.preventDefault()
  window.open(e.target.href, 'Invite', 'width=562px, height=972px, top=30px, left=675px, resizable=no')
}

onMounted(async () => {
  try {
    const res = await API.get.servers()
    serverData.value = res.sort((a, b) => (a.isInvited ? -1 : 1))

    loadingSuccess()
  } catch (e) {}
})
</script>

<style lang="scss" scoped>
@import url('~/assets/styles/pages/servers.scss');
</style>

<template>
  <NuxtLayout name="app-base">
    <div class="overflow-x-hidden servers-wrap flex items-center justify-center flex-col w-full h-full px-10">
      <NuxtLayout name="spiner-wrap">
        <h1 class="w-fit text-3xl font-bold mx-auto mb-14">
          <!-- 서버를 선택하세요 -->
          {{ $t('servers.selectServer') }}
        </h1>

        <div class="servers relative w-full flex justify-center mb-20 min-h-[100px]">
          <div
            v-for="(server, index) in serverData"
            v-bind:key="index"
            class="server flex flex-col gap-1 p-3 text-white items-center rounded-xl mx-auto"
          >
            <div class="flex justify-between w-full gap-4 mb-3">
              <div class="w-14 h-14 rounded-xl overflow-hidden shrink-0">
                <nuxt-img
                  v-if="server.icon"
                  :src="`${discordCDNUrl}/icons/${server.id}/${server.icon}.png?size=128`"
                  alt="server logo"
                  class="w-full h-full"
                />
                <div
                  v-else-if="server.name"
                  class="w-full h-full text-2xl flex items-center justify-center bg-[#37383d] text-white select-none"
                >
                  <span>{{ server.name[0] }}</span>
                </div>
              </div>

              <h3 class="w-full h-fit my-auto font-bold leading-6 overflow-hidden text-ellipsis">
                {{ server.name }}
              </h3>
            </div>

            <NuxtLink :to="pathWithLocale(`/dashboard?id=${server.id}`)" v-if="server.isInvited" class="btn-manage">
              <!-- 관리 -->
              {{ $t('servers.manageButton') }}
            </NuxtLink>
            <a :href="`/bot/invite?id=${server.id}`" @click="openInvite" v-else>
              <!-- 초대하기 -->
              {{ $t('servers.inviteButton') }}
            </a>
          </div>
        </div>
      </NuxtLayout>
    </div>
  </NuxtLayout>
</template>
