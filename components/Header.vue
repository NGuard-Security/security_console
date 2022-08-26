<template>
  <header class="fixed w-full text-sm bg-black z-30">
    <div class="headerContent flex items-center lg:justify-between max-w-screen-xl mx-auto p-4 text-gray-200">
      <div style="width: 122px; height: 40px" class="mr-auto md:mr-0">
        <img src="~/assets/img/logo1.png" alt="NGuard logo" class="h-10" />
      </div>

      <transition appear name="nav" mode="out-in">
        <div
          v-if="showNav"
          v-click-outside="closeNav"
          class="headerNav absolute md:static flex flex-col md:flex-row items-center md:gap-3 top-full left-0 w-full md:w-auto m-0 md:ml-6 mr-auto lg:mr-0 py-2 md:p-0 bg-black"
        >
        <NuxtLink to="/" class="nav_item">홈</NuxtLink>
        <NuxtLink to="/" class="nav_item">대시보드</NuxtLink>
        <NuxtLink to="/" class="nav_item">서포트 서버</NuxtLink>
        <NuxtLink to="/" class="nav_item">엔터프라이즈 플랜</NuxtLink>
        <NuxtLink to="/" class="nav_item">고객 민원 / 문의</NuxtLink>
      </div>
      </transition>

      <div v-if="true" class="flex items-center gap-3">
        <div class="relative">
          <div
            @click="showMenu = true"
            :class="{ on: showMenu }"
            class="userBtn nav_item flex items-center gap-1 hover:bg-zinc-900 cursor-pointer"
          >
            <img
              src="~/assets/img/test.png"
              alt="user_logo"
              class="h-5 rounded-full"
            />
            <span class="hidden lg:inline">라비 lavi#2253</span>
            <svg class="w-5 fill-gray-500" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m16.843 10.211c.108-.141.157-.3.157-.456 0-.389-.306-.755-.749-.755h-8.501c-.445 0-.75.367-.75.755 0 .157.05.316.159.457 1.203 1.554 3.252 4.199 4.258 5.498.142.184.36.29.592.29.23 0 .449-.107.591-.291 1.002-1.299 3.044-3.945 4.243-5.498z"/> </svg>
          </div>

          <transition appear name="fade" mode="out-in">
            <div
              v-if="showMenu"
              v-click-outside="onClickOutside"
              class="userMenu absolute flex flex-col left-0 mt-5 w-36 p-1.5 bg-black/[.8] rounded-lg backdrop-blur-sm z-40"
            >
              <div class="dropdownMenu">메뉴1</div>
              <div class="dropdownMenu">메뉴2</div>
              <div class="dropdownMenu">메뉴3</div>
              <hr class="mx-2.5 my-2 border-zinc-800" />
              <div class="dropdownMenu text-red-700">로그아웃</div>
            </div>
          </transition>
        </div>
      </div>
      <NuxtLink v-else to="/" class="nav_item">로그인</NuxtLink>
      
      <div @click="showNav = !showNav" class="md:hidden w-7 h-7 p-1.5 box-content fill-white cursor-pointer">
        <svg v-if="!showNav" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m22 16.75c0-.414-.336-.75-.75-.75h-18.5c-.414 0-.75.336-.75.75s.336.75.75.75h18.5c.414 0 .75-.336.75-.75zm0-5c0-.414-.336-.75-.75-.75h-18.5c-.414 0-.75.336-.75.75s.336.75.75.75h18.5c.414 0 .75-.336.75-.75zm0-5c0-.414-.336-.75-.75-.75h-18.5c-.414 0-.75.336-.75.75s.336.75.75.75h18.5c.414 0 .75-.336.75-.75z" fill-rule="nonzero"/></svg>
        <svg v-else clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z"/></svg>
      </div>
    </div>
  </header>
</template>

<script>
import vClickOutside from 'v-click-outside'

export default {
  transition: 'fade',

  mounted() {
    window.addEventListener('resize', this.windowResize);

    if(window.innerWidth > 768) {
      this.showNav = true;
      this.isMobile = false;
    } else {
      this.showNav = false;
      this.isMobile = true;
    }
  },
  data() {
    return {
      showMenu: false,
      showNav: false,
      isMobile: false
    }
  },
  directives: {
    clickOutside: vClickOutside.directive,
  },
  methods: {
    onClickOutside() {
      if (this.showMenu === true) {
        this.showMenu = false
      }
    },
    closeNav() {
      if (this.isMobile) {
        this.showNav = false;
      }
    },
    windowResize() {
      if(window.innerWidth > 768) {
        this.showNav = true;
        this.isMobile = false;
      } else {
        this.showNav = false;
        this.isMobile = true;
      }
    }
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

.headerContent {
  @media (max-width: 660px) {
    padding: 0.5rem 1rem;
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

.nav_item,
.dropdownMenu {
  padding: 0.5rem;
  border-radius: 0.5rem;

  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  cursor: pointer;
}

.nav_item:hover {
  background: rgba(255, 255, 255, 0.125);
}

.dropdownMenu:hover {
  background: #fff1;
}
</style>
