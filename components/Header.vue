<template>
  <header class="fixed w-full text-sm bg-black z-30">
    <div class="headerContent flex items-center lg:justify-between max-w-screen-xl mx-auto p-4 text-gray-200">
      <!-- 왼쪽 로고 -->
      <div style="height: 40px" class="logoImg mr-auto md:mr-0">
        <a href="https://nguard.xyz">
          <img src="~/assets/img/logo1.png" alt="NGuard logo" class="h-full" />
        </a>
      </div>

      <!-- 중앙 네비게이션 -->
      <transition appear name="nav" mode="out-in">
        <div
          v-if="showNav"
          class="headerNav absolute md:static flex flex-col md:flex-row items-center md:gap-3 top-full left-0 w-full md:w-auto m-0 md:ml-6 mr-auto lg:mr-0 py-2 md:p-0 bg-black"
        >
          <a href="https://nguard.xyz" class="nav_item">
            <!-- 홈 -->
            {{ $t('navbar.home') }}
          </a>
          <NuxtLink :to="'/' + $i18n.locale + '/servers'" class="nav_item">
            <!-- 대시보드 -->
            {{ $t('navbar.dashboard') }}
          </NuxtLink>
          <a href="https://nguard.xyz/invite/nguard" class="nav_item">
            <!-- 서포트 서버 -->
            {{ $t('navbar.support') }}
          </a>
          <a href="https://nguard.xyz/upgrade" class="nav_item">
            <!-- NGuard 유료 플랜 -->
            {{ $t('navbar.upgrade') }}
          </a>
        </div>
      </transition>

      <!-- 오른쪽 유저 요소 -->
      <!-- 로그인 버튼 -->
      <NuxtLink v-if="!this.user.id" to="/auth/login" class="nav_item"> 로그인 </NuxtLink>

      <!-- 유저 요소 -->
      <div v-else class="userBtn-wrap relative">
        <!-- 유저 버튼 -->
        <div
          @click="showMenu = true"
          :class="{ on: showMenu }"
          class="userBtn nav_item flex items-center gap-2 hover:bg-zinc-900 cursor-pointer"
        >
          <img :src="user.icon" alt="user_logo" class="h-5 rounded-full" />
          <span class="hidden lg:inline">{{ user.name }}</span>
          <svg
            class="w-5 fill-gray-500"
            clip-rule="evenodd"
            fill-rule="evenodd"
            stroke-linejoin="round"
            stroke-miterlimit="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m16.843 10.211c.108-.141.157-.3.157-.456 0-.389-.306-.755-.749-.755h-8.501c-.445 0-.75.367-.75.755 0 .157.05.316.159.457 1.203 1.554 3.252 4.199 4.258 5.498.142.184.36.29.592.29.23 0 .449-.107.591-.291 1.002-1.299 3.044-3.945 4.243-5.498z"
            />
          </svg>
        </div>

        <!-- 유저 메뉴 -->
        <transition appear name="fade" mode="out-in">
          <div
            v-if="showMenu"
            v-click-outside="(this.showMenu = false)"
            class="userMenu absolute flex flex-col left-0 mt-5 w-36 p-1.5 bg-black/[.8] rounded-lg backdrop-blur-sm z-40"
          >
            <NuxtLink :to="'/' + $i18n.locale + '/auth/logout'" class="dropdownMenu text-red-500 font-semibold">
              <!-- 로그아웃 -->
              {{ $t('navbar.logout') }}
            </NuxtLink>

            <hr class="mx-2.5 my-2 border-zinc-800" />

            <!-- 언어 선택 -->
            <NuxtLink
              :to="'/ko' + $route.fullPath.replace('/' + $i18n.locale, '')"
              class="dropdownMenu ko"
              v-if="$i18n.locale != 'ko'"
            >
              한국어
            </NuxtLink>

            <NuxtLink
              :to="'/en' + $route.fullPath.replace('/' + $i18n.locale, '')"
              class="dropdownMenu en"
              v-if="$i18n.locale != 'en'"
            >
              English
            </NuxtLink>

            <NuxtLink
              :to="'/ja' + $route.fullPath.replace('/' + $i18n.locale, '')"
              class="dropdownMenu ja"
              v-if="$i18n.locale != 'ja'"
            >
              日本語
            </NuxtLink>

            <NuxtLink
              :to="'/vi' + $route.fullPath.replace('/' + $i18n.locale, '')"
              class="dropdownMenu vi"
              v-if="$i18n.locale != 'vi'"
            >
              Tiếng Việt
            </NuxtLink>

            <!-- <hr class="mx-2.5 my-2 border-zinc-800" />
            <div class="dropdownMenu">메뉴1</div>
            <div class="dropdownMenu">메뉴2</div>
            <div class="dropdownMenu">메뉴3</div> -->
          </div>
        </transition>
      </div>

      <!-- 모바일 메뉴 버튼 -->
      <div
        @click="showNav = !showNav"
        v-click-outside="closeNav"
        class="menuBtn md:hidden w-7 h-7 p-1.5 box-content fill-white cursor-pointer"
      >
        <svg
          v-if="!showNav"
          clip-rule="evenodd"
          fill-rule="evenodd"
          stroke-linejoin="round"
          stroke-miterlimit="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="m22 16.75c0-.414-.336-.75-.75-.75h-18.5c-.414 0-.75.336-.75.75s.336.75.75.75h18.5c.414 0 .75-.336.75-.75zm0-5c0-.414-.336-.75-.75-.75h-18.5c-.414 0-.75.336-.75.75s.336.75.75.75h18.5c.414 0 .75-.336.75-.75zm0-5c0-.414-.336-.75-.75-.75h-18.5c-.414 0-.75.336-.75.75s.336.75.75.75h18.5c.414 0 .75-.336.75-.75z"
            fill-rule="nonzero"
          />
        </svg>
        <svg
          v-else
          clip-rule="evenodd"
          fill-rule="evenodd"
          stroke-linejoin="round"
          stroke-miterlimit="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z"
          />
        </svg>
      </div>
    </div>
  </header>
</template>

<script>
import vClickOutside from 'v-click-outside'
import catchNetworkError from '@/plugins/catchNetworkError.js'

export default {
  transition: 'fade',

  async mounted() {
    window.addEventListener('resize', this.windowResize)

    if (window.innerWidth > 768) {
      this.showNav = true
      this.isMobile = false
    } else {
      this.showNav = false
      this.isMobile = true
    }

    if (this.$route.path.includes('auth/callback')) {
      try {
        if (localStorage.getItem('access_token')) {
          this.user = await this.$axios.$get('https://discord.com/api/v10/users/@me', {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('access_token'),
            },
          })

          this.user.icon = this.user.avatar
            ? `https://cdn.discordapp.com/avatars/${this.user.id}/${this.user.avatar}.png`
            : `https://cdn.discordapp.com/embed/avatars/${this.user.discriminator % 5}.png`
          this.user.name = this.user.username + '#' + this.user.discriminator
        }
      } catch (e) {
        if (e.response) {
          if (e.response.status == 429) {
            location.reload()
            return
          }
        }

        catchNetworkError(e)
        alert('통신 중 오류가 발생하였습니다. 채널톡으로 문의해 주세요.')
      }
    }
  },
  data() {
    return {
      showMenu: false,
      showNav: false,
      isMobile: false,
      // user: {
      //   name: '라비 lavi#2253',
      //   icon: '~/assets/img/test.png'
      // },
      user: {},
    }
  },
  directives: {
    clickOutside: vClickOutside.directive,
  },
  methods: {
    closeNav() {
      if (this.isMobile) {
        this.showNav = false
      }
    },
    windowResize() {
      if (window.innerWidth > 768) {
        this.showNav = true
        this.isMobile = false
      } else {
        this.showNav = false
        this.isMobile = true
      }
    },
  },
}
</script>

<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s cubic-bezier(0.17, 0.84, 0.44, 1);
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.nav-enter-active,
.nav-leave-active {
  transition: opacity 0.1s cubic-bezier(0.17, 0.84, 0.44, 1);
}
.nav-enter,
.nav-leave-to {
  opacity: 0;
}

@media (max-width: 660px) {
  .headerContent {
    padding: 0.8rem 1.2rem 0.8rem 2rem;
  }

  .logoImg {
    height: 36px !important;
  }

  .menuBtn {
    width: 2.5rem !important;
    height: 2.5rem !important;
  }

  .userBtn-wrap {
    margin-right: 0.4rem !important;

    .userBtn img {
      height: 1.8rem !important;
    }
  }
}

.userBtn {
  svg {
    transition: transform 0.2s ease;
  }

  &.on svg {
    transform: rotate(180deg);
  }
}

@media (max-width: 660px) {
  .userBtn-wrap {
    position: static;
  }

  .userMenu {
    width: calc(100vw - 20px);
    left: 10px !important;
  }
}

.userMenu {
  @media (max-width: 1024px) {
    left: calc(-100% - 20px);
  }
}

.headerNav .nav_item {
  @media (max-width: 768px) {
    width: 100%;
    height: 100%;
    padding: 0.9rem 0 0.9rem 4rem !important;
  }
}

@media (max-width: 660px) {
  //<모바일시> '헤더'와 '유저'의 (메뉴)의 패딩 통일
  .headerNav .nav_item {
    padding: 1.5rem 0 1.5rem 4rem !important;
  }

  .userMenu .dropdownMenu {
    padding: 1.2rem 0 1.2rem 1.5rem !important;
  }
}

.nav_item,
.dropdownMenu {
  //'헤더'와 '유저 드롭다운'의 (메뉴 아이템)의 호버시 배경 모양을 같게
  @media (max-width: 660px) {
    //<모바일시> '헤더'와 '유저 드롭다운'의 (메뉴 아이템)의 폰트 크기 같게
    font-size: 18px;
  }

  &:hover {
    background: $color-white-transparent;
  }

  padding: 0.5rem;
  border-radius: 0.5rem;

  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  cursor: pointer;
}
</style>
