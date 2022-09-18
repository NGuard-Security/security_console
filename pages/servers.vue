<template>
  <div class="overflow-x-hidden servers-wrap flex items-center justify-center flex-col w-full h-full min-h-screen px-10">
    <h1 class="w-fit text-3xl font-bold mx-auto mb-14">서버를 선택하세요</h1>

    <div class="relative w-full flex justify-center mb-20">
      <!-- 스피너 -->
      <transition name="spiner">
        <div v-if="connState == 0" id="loading" class="absolute mx-auto">
          <div class="text-center">
            <div class="spinner"></div>
            <h4 class="text-base pt-5" style="color: rgb(153, 153, 153)">서버 목록을 가져오고 있습니다...</h4>
          </div>
        </div>
      </transition>

      <!-- 서버 목록 -->
      <transition name="serverList">
        <div v-if="connState == 1" class="servers grid gap-8">
          <div v-for="server in serverList" class="server flex flex-col gap-1 p-3 text-white items-center rounded-xl mx-auto">
            <div class="flex justify-between w-full gap-4 mb-3">
              <img :src="'https://cdn.discordapp.com/icons/'+server.id+'/'+server.icon+'.png?size=128'" class="w-14 rounded-xl shrink-0" />

              <h3 class="w-full h-fit my-auto font-bold leading-6 overflow-hidden text-ellipsis">
                {{server.name}}
              </h3>
            </div>

            <NuxtLink :to="'/dashboard?id='+server.id" v-if="server.isInvited" class="btn-manage">관리</NuxtLink>
            <a :href="'https://nguard.xyz/bot/invite?id='+server.id" @click="openInvite" v-else>초대하기</a>
          </div>
        </div>
      </transition>

      <!-- 응답 지연 -->
      <transition name="connErr">
        <div v-if="connState == 2" id="ratelimit">
          <div class="text-center">
            <h4 class="text-xl pt-5 text-white">Rate limit이 발생했습니다.</h4>
            <h4 class="text-xl pt-5 text-white">잠시 후 다시 시도해 주세요.</h4>
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

  .spiner-enter-active,
  .spiner-leave-active,
  .serverList-enter-active,
  .serverList-leave-active,
  .connErr-enter-active,
  .connErr-leave-active {
    transition: opacity 0.5s;
  }

  .spiner-enter,
  .spiner-leave-to,
  .serverList-enter,
  .serverList-leave-to,
  .connErr-enter,
  .connErr-leave-to {
    opacity: 0;
  }

  .servers-wrap {
    @media (max-width: 767px) {
      padding-top: calc(2rem + 72px);
    }
    @media (max-width: 1028px) {
      display: block;
    }

    padding-top: calc(3rem + 72px);
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

  .spinner {
    color: $color-gray;
    display: inline-block;
    width: 50px;
    height: 50px;
    vertical-align: -0.125em;
    border: 0.25em solid;
    border-right: 0.25em solid transparent;
    border-radius: 50%;
    -webkit-animation: spinner .75s linear infinite;
    animation: spinner .75s linear infinite;
  }

  @keyframes spinner {
    to {
      transform: rotate(1turn)
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
      connState: 0 //0: 연결중, 1: 성공, 2: 응답 지연
    }
  },
  async mounted() {
    if (!localStorage.getItem('access_token')) {
        this.$router.push('/auth/login')
        return
    }

    try {
      const serverList = (await this.$axios.$get('http://127.0.0.1:4000/dashboard/servers', { // Production: API 서버 주소로 바꾸기 (eg. https://api.nguard.xyz/~~~ )
        headers: {
          'access_token': localStorage.getItem('access_token')
        }
      })).data

      this.serverList = serverList.sort((a, b) => a.isInvited ? -1 : 1);

      this.connState = 1;
    } catch (e) {
      this.connState = 2;
    }
  },
  methods: {
    openInvite(e) {
      e.preventDefault()
      window.open(
        e.target.href,
        'Invite',
        'width=562px, height=972px, top=30px, left=675px, resizable=no',
      )
    }
  }
}
</script>