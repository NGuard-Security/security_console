<template>
  <div>
    <!-- 모바일 검은 배경 -->
    <transition appear name="bg" mode="out-in">
      <div
        v-if="showNav && isMobile"
        @click="closeNav"
        class="fixed top-0 left-0 w-full h-full bg-black/[0.5] z-10"
      ></div>
    </transition>

    <!-- navBar -->
    <div class="navbarWrap fixed z-20 bg-[#151720]">
      <div class="navbar flex flex-col shrink-0 w-40 lg:w-64 md:w-56 ml-0 lg:ml-36 p-4 select-none">
        <div class="navMob flex items-center justify-between mb-5 pl-2">
          <!-- 모바일 왼쪽 메뉴 버튼 -->
          <div @click="showNav = !showNav" class="menuIcon cursor-pointer shrink-0">
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
                d="m13 16.745c0-.414-.336-.75-.75-.75h-9.5c-.414 0-.75.336-.75.75s.336.75.75.75h9.5c.414 0 .75-.336.75-.75zm9-5c0-.414-.336-.75-.75-.75h-18.5c-.414 0-.75.336-.75.75s.336.75.75.75h18.5c.414 0 .75-.336.75-.75zm-4-5c0-.414-.336-.75-.75-.75h-14.5c-.414 0-.75.336-.75.75s.336.75.75.75h14.5c.414 0 .75-.336.75-.75z"
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

          <!-- 서버 선택 드롭다운 -->
          <div v-click-outside="clickServerMenu" class="serverSelect relative min-w-0 w-full" @click="closeNav">
            <!-- 서버 선택 드롭다운의 버튼 -->
            <div
              @click="showServerMenu = !showServerMenu"
              :class="{ on: showServerMenu }"
              class="serverBtn flex items-center px-2 py-2 w-full border border-slate-700/[.2] rounded-lg cursor-pointer"
            >
              <div class="w-8 h-8 mr-2 rounded-lg overflow-hidden shrink-0">
                <div v-if="!server[0].id"></div>
                <nuxt-img
                  v-else-if="server[0].icon"
                  :src="'https://cdn.discordapp.com/icons/' + server[0].id + '/' + server[0].icon + '.png?size=64'"
                  alt="server logo"
                  class="w-full h-full"
                />
                <div v-else class="w-full h-full flex items-center justify-center text-white bg-[#37383d]">
                  <span>{{ server[0].name.substr(0, 1) }}</span>
                </div>
              </div>

              <span
                class="serverBtn_name mr-auto text-sm text-gray-300 text-ellipsis whitespace-nowrap overflow-hidden"
              >
                {{ server[0].name }}
              </span>
              <svg
                class="w-6 ml-1 fill-gray-500 shrink-0"
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

            <!-- 서버 선택 드롭다운의 메뉴 -->
            <transition appear name="fade" mode="out-in">
              <div
                v-if="showServerMenu"
                class="serverMenu absolute flex flex-col mt-3 w-full p-1 rounded-lg bg-zinc-950 bg-opacity-60 text-white text-sm border border-slate-700/[.2] gap-0.5 overflow-y-scroll"
              >
                <!-- backdrop-blur-md   ->   bg-zinc-950 bg-opacity-60 -->
                <div v-for="(server, index) in server" v-bind:key="index">
                  <NuxtLink
                    :to="'/' + $i18n.locale + '/' + (server.now ? 'dashboard' : 'bridge') + '?id=' + server.id"
                    class="dropdownMenu"
                  >
                    <div class="dropdownMenu_img overflow-hidden">
                      <div v-if="!server.id"></div>
                      <nuxt-img
                        v-else-if="server.icon"
                        :src="'https://cdn.discordapp.com/icons/' + server.id + '/' + server.icon + '.png?size=64'"
                        alt="server logo"
                        class="w-full h-full"
                      />
                      <div v-else class="w-full h-full flex items-center justify-center text-white bg-[#37383d]">
                        <span>{{ server.name.substr(0, 1) }}</span>
                      </div>
                    </div>

                    <span>{{ server.name }}</span>
                  </NuxtLink>
                </div>
              </div>
            </transition>
          </div>
        </div>

        <!-- 네비게이션 메뉴 -->
        <transition appear name="nav" mode="out-in">
          <nav v-if="showNav" class="bg-[#151720] flex flex-col text-gray-400 text-sm gap-1 lg:gap-1.5">
            <NuxtLink :to="'/' + $i18n.locale + '/dashboard?id=' + this.$route.query.id" class="nav_item">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path
                  d="M2 0c-1.104 0-2 .896-2 2v15c0 1.104.896 2 2 2h20c1.104 0 2-.896 2-2v-15c0-1.104-.896-2-2-2h-20zm20 14h-20v-12h20v12zm-6.599 7c0 1.6 1.744 2.625 2.599 3h-12c.938-.333 2.599-1.317 2.599-3h6.802z"
                />
              </svg>
              <!-- 메인 -->
              {{ $t('sidebar.main') }}
            </NuxtLink>
            <NuxtLink :to="'/' + $i18n.locale + '/dashboard/members?id=' + this.$route.query.id" class="nav_item">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path
                  d="M20.822 18.096c-3.439-.794-6.64-1.49-5.09-4.418 4.72-8.912 1.251-13.678-3.732-13.678-5.082 0-8.464 4.949-3.732 13.678 1.597 2.945-1.725 3.641-5.09 4.418-3.073.71-3.188 2.236-3.178 4.904l.004 1h23.99l.004-.969c.012-2.688-.092-4.222-3.176-4.935z"
                />
              </svg>
              <!-- 멤버 설정 -->
              {{ $t('sidebar.members') }}
            </NuxtLink>
            <NuxtLink :to="'/' + $i18n.locale + '/dashboard/invite?id=' + this.$route.query.id" class="nav_item">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path
                  d="M6.188 8.719c.439-.439.926-.801 1.444-1.087 2.887-1.591 6.589-.745 8.445 2.069l-2.246 2.245c-.644-1.469-2.243-2.305-3.834-1.949-.599.134-1.168.433-1.633.898l-4.304 4.306c-1.307 1.307-1.307 3.433 0 4.74 1.307 1.307 3.433 1.307 4.74 0l1.327-1.327c1.207.479 2.501.67 3.779.575l-2.929 2.929c-2.511 2.511-6.582 2.511-9.093 0s-2.511-6.582 0-9.093l4.304-4.306zm6.836-6.836l-2.929 2.929c1.277-.096 2.572.096 3.779.574l1.326-1.326c1.307-1.307 3.433-1.307 4.74 0 1.307 1.307 1.307 3.433 0 4.74l-4.305 4.305c-1.311 1.311-3.44 1.3-4.74 0-.303-.303-.564-.68-.727-1.051l-2.246 2.245c.236.358.481.667.796.982.812.812 1.846 1.417 3.036 1.704 1.542.371 3.194.166 4.613-.617.518-.286 1.005-.648 1.444-1.087l4.304-4.305c2.512-2.511 2.512-6.582.001-9.093-2.511-2.51-6.581-2.51-9.092 0z"
                />
              </svg>
              <!-- 초대링크 설정 -->
              {{ $t('sidebar.invite') }}
            </NuxtLink>
            <NuxtLink :to="'/' + $i18n.locale + '/dashboard/verify?id=' + this.$route.query.id" class="nav_item">
              <svg
                width="24"
                height="24"
                clip-rule="evenodd"
                fill-rule="evenodd"
                stroke-linejoin="round"
                stroke-miterlimit="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="m11.998 2.005c5.517 0 9.997 4.48 9.997 9.997 0 5.518-4.48 9.998-9.997 9.998-5.518 0-9.998-4.48-9.998-9.998 0-5.517 4.48-9.997 9.998-9.997zm-5.049 10.386 3.851 3.43c.142.128.321.19.499.19.202 0 .405-.081.552-.242l5.953-6.509c.131-.143.196-.323.196-.502 0-.41-.331-.747-.748-.747-.204 0-.405.082-.554.243l-5.453 5.962-3.298-2.938c-.144-.127-.321-.19-.499-.19-.415 0-.748.335-.748.746 0 .205.084.409.249.557z"
                  fill-rule="nonzero"
                />
              </svg>
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

<script>
import vClickOutside from 'v-click-outside'
import catchNetworkError from '@/plugins/catchNetworkError.js'

export default {
  async mounted() {
    window.addEventListener('resize', this.windowResize)

    if (window.innerWidth > 660) {
      this.showNav = true
      this.isMobile = false
    } else {
      this.showNav = false
      this.isMobile = true
    }

    try {
      this.server = (
        await this.$axios.$get('/dashboard/servers?now=' + this.$route.query.id, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem('access_token'),
          },
        })
      ).data
    } catch (e) {
      if (e.response?.status === 429) {
        setTimeout(() => {
          window.location.reload()
        }, e.response?.data.data.retry_after * 1000)
      }

      catchNetworkError(e)
    }
  },
  destroyed() {
    window.removeEventListener('resize', this.windowResize)
  },
  data() {
    return {
      showServerMenu: false,
      server: [{ id: this.$route.query.id, name: this.$t('sidebar.loading'), icon: 'test.png' }],
      showNav: true,
      isMobile: false,
    }
  },
  directives: {
    clickOutside: vClickOutside.directive,
  },
  methods: {
    clickServerMenu() {
      this.showServerMenu = false
    },
    closeNav() {
      if (this.isMobile) {
        this.showNav = false
      }
    },
    windowResize() {
      if (window.innerWidth > 660) {
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
    padding-top: 77.6px;
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
  fill: $color-white;
}

.navbar {
  position: relative;

  @media (max-width: 1279px) and (min-width: 1024px) {
    margin-left: 4rem !important;
  }

  @media (max-width: 660px) {
    width: 100%;
    padding: 0.4rem 1rem;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    .navMob {
      width: 100%;
      margin-bottom: 0px;
    }

    .menuIcon {
      display: block;
      width: 2.5rem !important;
      height: 2.5rem !important;
    }

    .serverSelect {
      margin-bottom: 0px !important;
      min-width: 0px;
      width: fit-content;
      height: 50px;

      .serverBtn {
        padding: 6px;
        max-width: 300px;
        height: 100%;

        img {
          width: auto;
          height: 100%;
        }

        .serverBtn_name {
          font-size: 1.2rem;
        }
      }

      .serverMenu {
        position: absolute;
        width: calc(100vw - 0.625rem * 2);
        border-radius: 20px;

        max-height: calc((2.4rem + 2.4rem + 0.125rem) * 5 + 0.5rem);

        right: 0px;
        margin-top: 1.5rem;
        font-size: 1rem;

        .dropdownMenu {
          padding: 1.2rem 0 1.2rem 1.5rem !important;
          font-size: 20px;
          border-radius: 15px;

          .dropdownMenu_img {
            width: 2.4rem;
            height: 2.4rem;
          }
        }
      }
    }

    nav {
      position: absolute;
      left: 0px;
      top: 100%;
      padding: 8px;
      width: 220px;
      height: 100vh;

      a {
        padding: 14px;
      }
    }
  }

  @media (max-width: 420px) {
    .serverSelect .serverBtn {
      img {
        margin-right: 8px;
      }

      .serverBtn_name {
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
    background-color: $color-white-transparent;
  }

  svg {
    transition: transform 0.2s ease;
  }
  &.on svg {
    transform: rotate(180deg);
  }

  .serverMenu {
    background: #15172033;
    max-height: calc(5.6rem + 4rem + 0.5rem + 0.375rem);
  }

  transition: background 0.05s cubic-bezier(0.17, 0.84, 0.44, 1);
}

.dropdownMenu {
  &:hover {
    background: $color-white-transparent;
  }

  .dropdownMenu_img {
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

  display: flex;
  flex-shrink: 0;
  align-items: center;
  
  width: 100%;
  padding: 0.7rem;
  cursor: pointer;
  border-radius: 0.5rem;
}

.nuxt-link-exact-active {
  background-color: $color-white-transparent;
}

.nav_item {
  &:hover {
    svg {
      fill: $color-nav-active;
    }

    color: $color-nav-active;
  }

  &.nav_item_premium {
    &:hover {
      svg {
        fill: $color-nav-premium-active;
      }

      color: $color-nav-premium-active;
    }

    svg {
      fill: $color-nav-premium;
    }

    color: $color-nav-premium;
  }

  svg,
  img {
    display: inline-block;
    width: 18px;
    margin-right: 12px;
    fill: $color-nav;
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
