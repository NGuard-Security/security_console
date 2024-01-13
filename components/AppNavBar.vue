<script setup lang="ts">
const { isMobile, isShowNav } = useMediaCheck()
const { pathWithLocale } = usePathUtils()
const API = useAPI()
const route = useRoute()

const isShowServerMenu = useState<boolean>('isShowServerMenu', () => false)
const serverData = useState<APIServer[] | null>('serverData', () => null)
const currentServerData = useState<APIServer | null>('serverData', () => null)

const serverSelectEl = ref()

const clickServerMenu = () => {
  isShowServerMenu.value = false
}
const closeNav = () => {
  if (isMobile.value) {
    isShowNav.value = false
  }
}

const getNavPath = (path: string) => {
  return pathWithLocale(`/dashboard${path}?id=${route.query.id}`)
}

onClickOutside(serverSelectEl, clickServerMenu)

onMounted(async () => {
  try {
    serverData.value = await API.get.servers(false)
    currentServerData.value = serverData.value[0]
  } catch (e) {}
})
</script>

<style lang="scss">
@import url('~/assets/styles/components/appNavBar.scss');
</style>

<template>
  <div>
    <!-- 모바일 검은 배경 -->
    <transition appear name="bg" mode="out-in">
      <div
        v-if="isShowNav && isMobile"
        @click="closeNav"
        class="fixed top-0 left-0 w-full h-full bg-black/[0.5] z-10"
      ></div>
    </transition>

    <!-- navBar -->
    <div class="navbarWrap fixed z-20 bg-[#151720]">
      <div class="navbar flex flex-col shrink-0 w-40 lg:w-64 md:w-56 ml-0 lg:ml-36 p-4 select-none">
        <div class="navMob flex items-center justify-between mb-5 pl-2">
          <!-- 모바일 왼쪽 메뉴 버튼 -->
          <div @click="isShowNav = !isShowNav" class="menuIcon cursor-pointer shrink-0">
            <SvgIcon v-if="!isShowNav" name="sidemenu" />
            <SvgIcon v-else name="close" />
          </div>

          <!-- 서버 선택 드롭다운 -->
          <div ref="serverSelectEl" class="serverSelect relative min-w-0 w-full" @click="closeNav">
            <!-- 서버 선택 드롭다운의 버튼 -->
            <div
              @click="isShowServerMenu = !isShowServerMenu"
              :class="{ on: isShowServerMenu }"
              class="serverBtn flex items-center px-2 py-2 w-full border border-slate-700/[.2] rounded-lg cursor-pointer"
            >
              <div class="w-8 h-8 mr-2 rounded-lg overflow-hidden shrink-0">
                <div v-if="!currentServerData"></div>
                <nuxt-img
                  v-else-if="currentServerData.icon"
                  :src="`https://cdn.discordapp.com/icons/${currentServerData.id}/${currentServerData.icon}.png?size=64`"
                  alt="server logo"
                  class="w-full h-full"
                />
                <div v-else class="w-full h-full flex items-center justify-center text-white bg-[#37383d]">
                  <span>{{ currentServerData.name.substring(0, 1) }}</span>
                </div>
              </div>

              <span
                class="serverBtn_name mr-auto text-sm text-gray-300 text-ellipsis whitespace-nowrap overflow-hidden"
              >
                {{ currentServerData?.name || '' }}
              </span>
              <SvgIcon name="arrowDown" />
            </div>

            <!-- 서버 선택 드롭다운의 메뉴 -->
            <transition appear name="fade" mode="out-in">
              <div
                v-if="isShowServerMenu"
                class="serverMenu absolute flex flex-col mt-3 w-full p-1 rounded-lg bg-zinc-950 bg-opacity-60 text-white text-sm border border-slate-700/[.2] gap-0.5 overflow-y-scroll"
              >
                <!-- backdrop-blur-md   ->   bg-zinc-950 bg-opacity-60 -->
                <div v-for="(data, index) in serverData" v-bind:key="index">
                  <NuxtLink
                    :to="pathWithLocale(`/${data.now ? 'dashboard' : 'bridge'}?id=${data.id}`)"
                    class="dropdownMenu"
                  >
                    <div class="dropdownMenu_img overflow-hidden">
                      <div v-if="!data.id"></div>
                      <nuxt-img
                        v-else-if="data.icon"
                        :src="`https://cdn.discordapp.com/icons/${data.id}/${data.icon}.png?size=64`"
                        alt="server logo"
                        class="w-full h-full"
                      />
                      <div v-else class="w-full h-full flex items-center justify-center text-white bg-[#37383d]">
                        <span>{{ data.name.substr(0, 1) }}</span>
                      </div>
                    </div>

                    <span>{{ data.name }}</span>
                  </NuxtLink>
                </div>
              </div>
            </transition>
          </div>
        </div>

        <!-- 네비게이션 메뉴 -->
        <transition appear name="nav" mode="out-in">
          <nav v-if="isShowNav" class="bg-[#151720] flex flex-col text-gray-400 text-sm gap-1 lg:gap-1.5">
            <NuxtLink :to="getNavPath('')" class="nav_item">
              <SvgIcon name="navbar/main" />
              <!-- 메인 -->
              {{ $t('sidebar.main') }}
            </NuxtLink>
            <NuxtLink :to="getNavPath('/members')" class="nav_item">
              <SvgIcon name="navbar/member" />
              <!-- 멤버 설정 -->
              {{ $t('sidebar.members') }}
            </NuxtLink>
            <NuxtLink :to="getNavPath('/invite')" class="nav_item">
              <SvgIcon name="navbar/invite" />
              <!-- 초대링크 설정 -->
              {{ $t('sidebar.invite') }}
            </NuxtLink>
            <NuxtLink :to="getNavPath('/verify')" class="nav_item">
              <SvgIcon name="navbar/verify" />
              <!-- 커맨드 인증 -->
              {{ $t('sidebar.verify') }}
            </NuxtLink>
            <hr class="mx-2.5 my-2 border-zinc-700" />
            <!-- <a href="https://nguard.xyz/upgrade" target="_blank" class="nav_item nav_item_premium"> -->
            <!-- <img src="https://cdn.nguard.dev/assets/dashboard/images/gold_logo.webp" alt="NGuard logo" /> -->
            <!-- <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-2.995 2.995-7.486 4-11 4 0 8.583 5.068 16.097 11 20 5.932-3.903 11-11.417 11-20-3.514 0-8.005-1.005-11-4z"/></svg> -->
            <!-- NGuard 유료 플랜 -->
            <!-- {{ $t('navbar.upgrade') }} -->
            <!-- navbar 소스 재활용 -->
            <!-- </a> -->
          </nav>
        </transition>
      </div>
    </div>
  </div>
</template>
