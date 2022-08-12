<template>
  <div>
    <transition appear name="bg" mode="out-in">
      <div class="fixed top-0 left-0 w-full h-full bg-black/[0.5] z-10" v-if="showNav && isMobile">a</div>
    </transition>

    <div style="background: #151720" class="navbarWrap fixed z-20">
      <div class="navbar flex flex-col shrink-0 w-40 lg:w-64 md:w-56 ml-0 lg:ml-36 p-4 select-none">
        <div class="navMob flex justify-between mb-5">
          <div @click="showNav = !showNav" class="menuIcon cursor-pointer">
            <svg v-if="!showNav" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m13 16.745c0-.414-.336-.75-.75-.75h-9.5c-.414 0-.75.336-.75.75s.336.75.75.75h9.5c.414 0 .75-.336.75-.75zm9-5c0-.414-.336-.75-.75-.75h-18.5c-.414 0-.75.336-.75.75s.336.75.75.75h18.5c.414 0 .75-.336.75-.75zm-4-5c0-.414-.336-.75-.75-.75h-14.5c-.414 0-.75.336-.75.75s.336.75.75.75h14.5c.414 0 .75-.336.75-.75z" fill-rule="nonzero"/></svg>
            <svg v-else clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z"/></svg>
          </div>
          <div class="serverSelect relative min-w-0">
            <div
              @click="showMenu = true"
              :class="{ on: showMenu }"
              class="serverBtn flex items-center px-2 py-2 border border-slate-700/[.2] rounded-lg cursor-pointer"
            >
              <img
                :src='require(`@/assets/img/${server[0].icon}`)'
                alt="server logo"
                class="w-10 mr-3 rounded-lg"
              />
              <span class="mr-auto text-sm text-gray-300 text-ellipsis whitespace-nowrap overflow-hidden">
                {{server[0].name}}
              </span>
              <svg class="w-6 ml-1 fill-gray-500" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m16.843 10.211c.108-.141.157-.3.157-.456 0-.389-.306-.755-.749-.755h-8.501c-.445 0-.75.367-.75.755 0 .157.05.316.159.457 1.203 1.554 3.252 4.199 4.258 5.498.142.184.36.29.592.29.23 0 .449-.107.591-.291 1.002-1.299 3.044-3.945 4.243-5.498z"/></svg>
            </div>

            <transition appear name="fade" mode="out-in">
              <div
                v-if="showMenu"
                v-click-outside="closeMenu"
                style="background: #15172033; max-height: calc(5.6rem + 4rem + 0.5rem + 0.375rem)"
                class="serverMenu absolute flex flex-col mt-3 w-full p-1 rounded-lg backdrop-blur-md text-white text-sm border border-slate-700/[.2] gap-0.5 overflow-y-scroll"
              >
                <div
                  v-for="server in server"
                  @click="closeMenu"
                  class="dropdownMenu"
                >
                  <img :src="require(`@/assets/img/${server.icon}`)" alt="server logo" />
                  <span>{{server.name}}</span>
                </div>
              </div>
            </transition>
          </div>
        </div>

        <transition appear name="nav" mode="out-in">
          <nav
            v-if="showNav"
            v-click-outside="closeNav"
            style="background: #151720"
            class="flex flex-col text-gray-400 text-sm gap-1 lg:gap-1.5"
          >
            <NuxtLink to="/dashboard" class="nav_item">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  d="M20.822 18.096c-3.439-.794-6.64-1.49-5.09-4.418 4.72-8.912 1.251-13.678-3.732-13.678-5.082 0-8.464 4.949-3.732 13.678 1.597 2.945-1.725 3.641-5.09 4.418-3.073.71-3.188 2.236-3.178 4.904l.004 1h23.99l.004-.969c.012-2.688-.092-4.222-3.176-4.935z"
                />
              </svg>
              일반
            </NuxtLink>
            <NuxtLink to="/dashboard/security" class="nav_item">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 0c-2.995 2.995-7.486 4-11 4 0 8.583 5.068 16.097 11 20 5.932-3.903 11-11.417 11-20-3.514 0-8.005-1.005-11-4z"
                />
              </svg>
              보안
            </NuxtLink>
            <NuxtLink to="/dashboard/welcome" class="nav_item">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  d="M20.822 18.096c-3.439-.794-6.64-1.49-5.09-4.418 4.72-8.912 1.251-13.678-3.732-13.678-5.082 0-8.464 4.949-3.732 13.678 1.597 2.945-1.725 3.641-5.09 4.418-3.073.71-3.188 2.236-3.178 4.904l.004 1h23.99l.004-.969c.012-2.688-.092-4.222-3.176-4.935z"
                />
              </svg>
              환영 메시지
            </NuxtLink>
            <NuxtLink to="/dashboard/member" class="nav_item">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 0c-2.995 2.995-7.486 4-11 4 0 8.583 5.068 16.097 11 20 5.932-3.903 11-11.417 11-20-3.514 0-8.005-1.005-11-4z"
                />
              </svg>
              멤버 관리
            </NuxtLink>
            <NuxtLink to="/dashboard/warning" class="nav_item">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 0c-2.995 2.995-7.486 4-11 4 0 8.583 5.068 16.097 11 20 5.932-3.903 11-11.417 11-20-3.514 0-8.005-1.005-11-4z"
                />
              </svg>
              경고 관리
            </NuxtLink>
            <NuxtLink to="/dashboard/leveling" class="nav_item">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 0c-2.995 2.995-7.486 4-11 4 0 8.583 5.068 16.097 11 20 5.932-3.903 11-11.417 11-20-3.514 0-8.005-1.005-11-4z"
                />
              </svg>
              레벨링 설정
            </NuxtLink>
            <NuxtLink to="/dashboard/logging" class="nav_item">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 0c-2.995 2.995-7.486 4-11 4 0 8.583 5.068 16.097 11 20 5.932-3.903 11-11.417 11-20-3.514 0-8.005-1.005-11-4z"
                />
              </svg>
              로깅 설정
            </NuxtLink>
            <NuxtLink to="/dashboard/automatic" class="nav_item">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 0c-2.995 2.995-7.486 4-11 4 0 8.583 5.068 16.097 11 20 5.932-3.903 11-11.417 11-20-3.514 0-8.005-1.005-11-4z"
                />
              </svg>
              자동 작업
            </NuxtLink>
            <NuxtLink to="/dashboard/stats" class="nav_item">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 0c-2.995 2.995-7.486 4-11 4 0 8.583 5.068 16.097 11 20 5.932-3.903 11-11.417 11-20-3.514 0-8.005-1.005-11-4z"
                />
              </svg>
              통게
            </NuxtLink>
            <NuxtLink to="/dashboard/ticket" class="nav_item">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 0c-2.995 2.995-7.486 4-11 4 0 8.583 5.068 16.097 11 20 5.932-3.903 11-11.417 11-20-3.514 0-8.005-1.005-11-4z"
                />
              </svg>
              티켓 설정
            </NuxtLink>
            <hr class="mx-2.5 my-2 border-zinc-700" />
            <NuxtLink to="/dashboard/ticket" class="nav_item nav_item_premium">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 0c-2.995 2.995-7.486 4-11 4 0 8.583 5.068 16.097 11 20 5.932-3.903 11-11.417 11-20-3.514 0-8.005-1.005-11-4z"
                />
              </svg>
              티켓 설정
            </NuxtLink>
            <NuxtLink to="/dashboard/ticket" class="nav_item nav_item_premium">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 0c-2.995 2.995-7.486 4-11 4 0 8.583 5.068 16.097 11 20 5.932-3.903 11-11.417 11-20-3.514 0-8.005-1.005-11-4z"
                />
              </svg>
              티켓 설정
            </NuxtLink>
          </nav>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import vClickOutside from 'v-click-outside';

let exampleValue = [
  {name: '메뉴2', icon: 'test.png'},
  {name: '메뉴3', icon: 'test.png'},
  {name: '메뉴4', icon: 'test.png'},
  {name: '메뉴5', icon: 'test.png'},
]

// exampleValue.sort((a, b) => a.type.toLowerCase() < b.type.toLowerCase() ? -1 : 1);

//언제나 현재 서버는 리스트의 첫번째에 들어가야 합니다.
exampleValue.unshift({name: '메뉴동해물과백두산이마르고닳도록', icon: 'test.png'});

export default {
  created() {
    this.server = exampleValue;
  },
  mounted() {
    window.addEventListener('resize', this.windowResize);

    if(window.innerWidth > 660) {
      this.showNav = true;
      this.isMobile = false;
    } else {
      this.showNav = false;
      this.isMobile = true;
    }
	},
  destroyed() {
    window.removeEventListener("resize", this.windowResize);
  },
  data() {
    return {
      showMenu: false,
      server: [],
      showNav: true,
      isMobile: false
    }
  },
  directives: {
    clickOutside: vClickOutside.directive,
  },
  methods: {
    closeMenu() {
      this.showMenu = false;
    },
    closeNav() {
      if(this.isMobile) {
        this.showNav = false;
      }
    },
    windowResize() {
      if(window.innerWidth > 660) {
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

.bg-enter-active,
.bg-leave-active {
  transition: opacity 0.25s ease;
}
.bg-enter,
.bg-leave-to {
  opacity: 0;
}

.nav-enter-active,
.nav-leave-active {
  transition: transform 0.25s ease;
}
.nav-enter,
.nav-leave-to {
  transform: translateX(-100%);
}

.navbarWrap {
  padding-top: 72px;
  height: 100%;
  position: static;

  @media (max-width: 660px) {
    width: 100%;
    padding-top: 56px;
    height: auto;
    position: fixed;
  }
}

.menuIcon {
  display: none;
  box-sizing: content-box;
  width: 30px;
  height: 30px;
  padding: 8px;
  fill: #fff;
}

.navbar {
  position: relative;

  @media (max-width: 1279px) and (min-width: 1024px) {
    margin-left: 4rem !important;
  }

  @media (max-width: 660px) {
    width: 100%;
    padding: 0.25rem 1rem;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    .navMob {
      width: 100%;
      margin-bottom: 0px;
    }

    .menuIcon {
      display: block;
    }

    .serverSelect {
      margin-bottom: 0px !important;
      min-width: 0px;

      .serverBtn {
        padding: 6px;
        max-width: 200px;

        img {
          width: 30px;
          height: 30px;
        }

        span {
          font-size: 1rem;
        }
      }

      .serverMenu {
        position: absolute;
        width: calc(100vw - 0.625rem * 2);
        right: 0px;
        margin-top: 1.5rem;
        font-size: 1rem;
      }
    }

    nav {
      position: absolute;
      left: 0px;
      top: 100%;
      padding: 8px;
      width: 200px;
      height: 100vh;
    }
  }

  @media (max-width: 420px) {
    .serverSelect .serverBtn {
      img {
        margin-right: 8px;
      }

      span {
        display: none;
      }

      svg {
        margin: 0px;
      }
    }
  }
}

.serverBtn {
  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
  }

  svg {
    transition: transform 0.2s ease;
  }
  &.on svg {
    transform: rotate(180deg);
  }

  transition: background 0.05s cubic-bezier(0.17, 0.84, 0.44, 1);
}

.dropdownMenu {
  &:hover {
    background: #fff1;
  }

  img {
    width: 1.4rem;
    height: 1.4rem;
    margin-right: 10px;
    border-radius: 100px;
  }

  span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  padding: 0.5rem;
  border-radius: 0.5rem;
  display: flex;
  flex-shrink: 0;
  cursor: pointer;
}

.nuxt-link-exact-active {
  background-color: rgba(255, 255, 255, 0.05);
}

.nav_item {
  &:hover {
    svg {
      fill: rgb(188, 193, 202);
    }

    color: rgb(188, 193, 202);
  }

  &.nav_item_premium {
    &:hover {
      svg {
        fill: rgb(207, 168, 37);
      }

      color: rgb(207, 168, 37);
    }

    svg {
      fill: rgb(180, 149, 46);
    }

    color: rgb(180, 149, 46);
  }

  svg {
    display: inline-block;
    width: 18px;
    margin-right: 12px;
    fill: rgb(156, 163, 175);
  }

  @media (max-width: 1024px) {
    padding: 7px 10px;
  }

  // @media (max-width: 768px) {
  //   padding: 2rem 2rem 0 2rem;

  //   h2 {
  //   }
  // }

  padding: 7px 10px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  transition: color 0.08s ease;
}
</style>
