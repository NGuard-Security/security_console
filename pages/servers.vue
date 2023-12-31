<template>
  <div
    class="overflow-x-hidden servers-wrap flex items-center justify-center flex-col w-full h-full min-h-screen px-10"
  >
    <h1 class="w-fit text-3xl font-bold mx-auto mb-14">
      <!-- 서버를 선택하세요 -->
      {{ $t('servers.selectServer') }}
    </h1>

    <div class="relative w-full flex justify-center mb-20 min-h-[100px]">
      <SpinerList :type="1" :state="connState" />

      <transition name="serverList">
        <div v-if="connState === 1" class="servers grid gap-8">
          <div
            v-for="(server, index) in serverList"
            v-bind:key="index"
            class="server flex flex-col gap-1 p-3 text-white items-center rounded-xl mx-auto"
          >
            <div class="flex justify-between w-full gap-4 mb-3">
              <!-- <nuxt-img
                :src="'https://cdn.discordapp.com/icons/' + server.id + '/' + server.icon + '.png?size=128'"
                class="w-14 rounded-xl shrink-0"
              /> -->

              <div class="w-14 h-14 rounded-xl overflow-hidden shrink-0">
                <div v-if="!server.id"></div>
                <nuxt-img
                  v-else-if="server.icon"
                  :src="'https://cdn.discordapp.com/icons/' + server.id + '/' + server.icon + '.png?size=128'"
                  alt="server logo"
                  class="w-full h-full"
                />
                <div
                  v-else
                  class="w-full h-full text-2xl flex items-center justify-center bg-[#37383d] text-white select-none"
                >
                  <span>{{ server.name.substring(0, 1) }}</span>
                </div>
              </div>

              <h3 class="w-full h-fit my-auto font-bold leading-6 overflow-hidden text-ellipsis">
                {{ server.name }}
              </h3>
            </div>

            <NuxtLink
              :to="'/' + $i18n.locale + '/dashboard?id=' + server.id"
              v-if="server.isInvited"
              class="btn-manage"
            >
              <!-- 관리 -->
              {{ $t('servers.manageButton') }}
            </NuxtLink>
            <a :href="'/bot/invite?id=' + server.id" @click="openInvite" v-else>
              <!-- 초대하기 -->
              {{ $t('servers.inviteButton') }}
            </a>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s;
}

.page-enter,
.page-leave-to {
  opacity: 0;
}

.serverList-enter-active,
.serverList-leave-active {
  transition: opacity 0.3s;
}

.serverList-enter,
.serverList-leave-to {
  opacity: 0;
}

.servers-wrap {
  @media (max-width: 767px) {
    padding-top: calc(2rem + 100px);
  }
  @media (max-width: 1028px) {
    display: block;
  }

  padding-top: calc(3rem + 100px);
  padding-bottom: 3rem;

  h1 {
    color: $color-fakeWhite;
  }
}

.servers {
  @media (max-width: 1028px) {
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    width: 100%;
    margin-bottom: 0;

    .server {
      width: 100% !important;
    }
  }

  position: relative;

  grid-template-columns: repeat(3, minmax(260px, 1fr));

  .server {
    background: $color-navbar;
    width: 260px;

    h3 {
      @media (max-width: 660px) {
        font-size: 1.25rem !important;
      }

      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }

    a {
      @media (max-width: 660px) {
        font-size: 1.1rem !important;
      }

      background: $color-bg;
      padding: 8px 10px;
      border-radius: 6px;
      width: 100%;
      text-align: center;

      &:hover {
        background: darken($color-bg, 3%);
      }

      &.btn-manage {
        background: $color-highlight;

        &:hover {
          background: darken($color-highlight, 7%);
        }
      }
    }
  }
}
</style>

<script>
// const serverList = [
//   {name: "서버1", icon: "", isInvited: true},
//   {name: "NGuard Securities Management Team", icon: "", isInvited: false},
//   {name: "서버3", icon: "", isInvited: false},
//   {name: "서버4", icon: "", isInvited: false},
//   {name: "서버5", icon: "", isInvited: true},
//   {name: "서버6", icon: "", isInvited: false},
// ]

export default {
  data() {
    return {
      serverList: [],
      connState: 0, //0: 연결중, 1: 성공, 2: 응답 지연
    }
  },
  async mounted() {
    if (localStorage.getItem('access_token')) {
      try {
        const serverList = (
          await this.$axios.$get('/dashboard/servers', {
            headers: {
              access_token: localStorage.getItem('access_token'),
            },
          })
        ).data
        this.serverList = serverList.sort((a, b) => (a.isInvited ? -1 : 1))
        this.connState = 1
      } catch (e) {
        console.log(e.response)
        if (e.response?.status === 429) {
          setTimeout(() => {
            window.location.reload()
          }, e.response?.data.error.retry_after * 1000)
        } else if (e.response?.status === 401) {
          window.localStorage.removeItem('access_token')
          this.$router.push(`/${this.$i18n.locale}/auth/login`)
        } else {
          this.connState = 2
        }
      }

      return
    } else {
      this.$router.push(`/${this.$i18n.locale}/auth/login`)
      return
    }
  },
  methods: {
    openInvite(e) {
      e.preventDefault()
      window.open(e.target.href, 'Invite', 'width=562px, height=972px, top=30px, left=675px, resizable=no')
    },
  },
}
</script>
