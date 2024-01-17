<script setup lang="ts">
const { isMobile } = useMediaCheck()
const { currentPathWithoutLocale, pathWithLocale, isCallbackPath } = usePathUtils()

const isShowUserMenu = useState<boolean>('isShowUserMenu', () => false)
const isShowMobileMenu = useState<boolean>('isShowMobileMenu', () => false)
const userData = useState<UserData>()

const userEl = ref()
const mobileMenuEl = ref()

const closeUserMenu = () => {
  isShowUserMenu.value = false
}

const closeMobileMenu = () => {
  isShowMobileMenu.value = false
}

onClickOutside(userEl, closeUserMenu)
onClickOutside(mobileMenuEl, closeMobileMenu)

onMounted(async () => {
  if (isCallbackPath.value || !getAccessToken()) return

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

<style scoped>
@import url('~/assets/styles/components/appHeader.scss');
</style>

<template>
  <header class="w-auto text-sm z-30 text-gray-200 p-4 shrink-0 box-content">
    <div ref="mobileMenuEl" class="absolute w-full left-0 top-0">
      <div class="headerContent flex items-center lg:justify-between max-w-screen-xl mx-auto p-4">
        <!-- 왼쪽 로고 -->
        <div class="logoImg mr-auto md:mr-0 h-[40px]">
          <a href="https://nguard.xyz">
            <img src="https://cdn.nguard.dev/assets/common/images/logo.png" alt="NGuard logo" class="h-full" />
          </a>
        </div>

        <!-- 중앙 네비게이션 -->
        <transition appear name="nav" mode="out-in">
          <div
            v-if="!isMobile"
            class="headerNav static flex flex-row items-center gap-3 top-0 left-0 w-auto m-0 mt-0 ml-6 mr-auto lg:mx-0 p-0"
          >
            <a href="https://nguard.xyz" class="nav_item">
              <!-- 홈 -->
              {{ $t('navbar.home') }}
            </a>
            <NuxtLink :to="pathWithLocale('/servers')" class="nav_item">
              <!-- 대시보드 -->
              {{ $t('navbar.dashboard') }}
            </NuxtLink>
            <a href="https://nguard.xyz/invite/nguard" class="nav_item">
              <!-- 서포트 서버 -->
              {{ $t('navbar.support') }}
            </a>
            <!-- <a href="https://nguard.xyz/upgrade" class="nav_item"> -->
            <!-- NGuard 프리미어 플랜 -->
            <!-- {{ $t('navbar.upgrade') }} -->
            <!-- </a> -->
          </div>
        </transition>

        <!-- 오른쪽 유저 요소 -->
        <!-- 로그인 버튼 -->
        <NuxtLink v-if="!userData" :to="pathWithLocale('/login')" class="nav_item">
          {{ $t('navbar.login') }}
        </NuxtLink>

        <!-- 유저 요소 v-else -->
        <div v-else ref="userEl" class="userBtn-wrap relative">
          <!-- 유저 버튼 -->
          <div
            @click="isShowUserMenu = !isShowUserMenu"
            :class="{ on: isShowUserMenu }"
            class="userBtn nav_item flex items-center gap-2 hover:bg-zinc-900 cursor-pointer"
          >
            <nuxt-img :src="userData.icon" alt="user_logo" class="h-5 rounded-full" />
            <span class="hidden lg:inline">{{
              userData.discriminator == '0' ? userData.global_name || userData.username : userData.name
            }}</span>
            <svg-icon name="arrowDown" class="w-5 fill-gray-500" />
          </div>

          <!-- 유저 메뉴 -->
          <transition appear name="fade" mode="out-in">
            <div
              v-if="isShowUserMenu"
              class="userMenu absolute flex flex-col left-0 mt-5 w-36 p-1.5 bg-black/[.8] rounded-lg backdrop-blur-sm z-40"
            >
              <NuxtLink :to="pathWithLocale('/auth/logout')" class="dropdownMenu text-red-500 font-semibold">
                <!-- 로그아웃 -->
                {{ $t('navbar.logout') }}
              </NuxtLink>

              <hr class="mx-2.5 my-2 border-zinc-800" />

              <!-- 언어 선택 -->
              <NuxtLink :to="`/ko${currentPathWithoutLocale}`" class="dropdownMenu ko" v-if="$i18n.locale != 'ko'">
                한국어
              </NuxtLink>

              <NuxtLink :to="`/en${currentPathWithoutLocale}`" class="dropdownMenu en" v-if="$i18n.locale != 'en'">
                English
              </NuxtLink>

              <NuxtLink :to="`/ja${currentPathWithoutLocale}`" class="dropdownMenu ja" v-if="$i18n.locale != 'ja'">
                日本語
              </NuxtLink>

              <NuxtLink :to="`/vi${currentPathWithoutLocale}`" class="dropdownMenu vi" v-if="$i18n.locale != 'vi'">
                Tiếng Việt
              </NuxtLink>
            </div>
          </transition>
        </div>

        <!-- 모바일 메뉴 버튼 -->
        <div
          @click="isShowMobileMenu = !isShowMobileMenu"
          class="menuBtn md:hidden w-7 h-7 p-1.5 box-content fill-white cursor-pointer"
        >
          <SvgIcon v-if="!isShowMobileMenu" name="menu" />
          <SvgIcon v-else name="close" />
        </div>
      </div>

      <transition appear name="nav" mode="out-in">
        <div
          v-if="isMobile && isShowMobileMenu"
          class="headerNav flex flex-col items-center top-0 left-0 w-full m-0 mr-auto p-2"
        >
          <a href="https://nguard.xyz" class="nav_item">
            <!-- 홈 -->
            {{ $t('navbar.home') }}
          </a>
          <NuxtLink :to="pathWithLocale('/servers')" class="nav_item">
            <!-- 대시보드 -->
            {{ $t('navbar.dashboard') }}
          </NuxtLink>
          <a href="https://nguard.xyz/invite/nguard" class="nav_item">
            <!-- 서포트 서버 -->
            {{ $t('navbar.support') }}
          </a>
          <!-- <a href="https://nguard.xyz/upgrade" class="nav_item"> -->
          <!-- NGuard 프리미어 플랜 -->
          <!-- {{ $t('navbar.upgrade') }} -->
          <!-- </a> -->
        </div>
      </transition>
    </div>
  </header>
</template>
