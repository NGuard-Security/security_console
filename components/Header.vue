<template>
<header class="w-full text-sm bg-black">
  <div class="flex items-center justify-between max-w-screen-xl mx-auto p-4 text-gray-200">
    <div style="width: 122px; height: 40px;">
      <img
        src="~/assets/img/logo.png"
        alt="NGuard logo"
        class="h-10"
      />
    </div>

    <div class="flex items-center gap-3">
      <NuxtLink to="/" class="nav_item">홈</NuxtLink>
      <NuxtLink to="/" class="nav_item">대시보드</NuxtLink>
      <NuxtLink to="/" class="nav_item">서포트 서버</NuxtLink>
      <NuxtLink to="/" class="nav_item">엔터프라이즈 플랜</NuxtLink>
      <NuxtLink to="/" class="nav_item">고객 민원 / 문의</NuxtLink>
    </div>

    <div v-if="true" class="relative">
      <div
        @click="showMenu = true"
        :class="{ on : showMenu }"
        class="serverMenu nav_item flex items-center gap-1 hover:bg-zinc-900 cursor-pointer"
      >
        <img
          src="~/assets/img/test.png"
          alt="user_logo"
          class="h-5 rounded-full"
        />
        <span>라비 lavi#2253</span>
        <svg class="w-5 fill-gray-500" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m16.843 10.211c.108-.141.157-.3.157-.456 0-.389-.306-.755-.749-.755h-8.501c-.445 0-.75.367-.75.755 0 .157.05.316.159.457 1.203 1.554 3.252 4.199 4.258 5.498.142.184.36.29.592.29.23 0 .449-.107.591-.291 1.002-1.299 3.044-3.945 4.243-5.498z"/></svg>
      </div>

      <transition appear name="fade" mode="out-in">
        <div
          v-if="showMenu"
          v-click-outside="onClickOutside"
          class="absolute flex flex-col mt-5 w-full p-1.5 bg-black rounded-lg"
        >
          <div class="dropdownMenu">메뉴1</div>
          <div class="dropdownMenu">메뉴2</div>
          <div class="dropdownMenu">메뉴3</div>
          <hr class="mx-2.5 my-2 border-zinc-800" />
          <div class="dropdownMenu text-red-700">로그아웃</div>
        </div>
      </transition>
    </div>
    <NuxtLink v-else to="/" class="nav_item">로그인</NuxtLink>
  </div>
</header>
</template>

<script>
import vClickOutside from 'v-click-outside';

export default {
  transition: 'fade',

  data() {
    return {
      showMenu: false,
    }
  },
  directives: {
    clickOutside: vClickOutside.directive
  },
  methods: {
    onClickOutside () {
      if(this.showMenu === true) {
        this.showMenu = !this.showMenu
      }
    }
  }
}
</script>

<style scoped lang="scss">
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.1s cubic-bezier(.17,.84,.44,1);
}
.fade-enter, .fade-leave-to {
  opacity: 0
}

.serverMenu {
  svg {
    transition: transform 0.2s ease;
  }

  &.on svg {
    transform: rotate(180deg);
  }
}

.nav_item, .dropdownMenu {
  padding: 0.5rem;
  border-radius: 0.5rem;

  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.nav_item:hover {
  background: rgba(255, 255, 255, 0.125);
}

.dropdownMenu:hover {
  background: #fff1;
}
</style>