<template>
  <div class="overflow-x-hidden servers-wrap flex items-center justify-center flex-col w-full h-full min-h-screen px-10">
    <h1 v-if="connState == 0" class="w-fit text-3xl font-bold mx-auto mb-14 text-white">불러오는 중</h1>

    <div class="relative w-full flex justify-center mb-20">
      <!-- 스피너 -->
      <transition name="spiner">
        <div v-if="connState == 0" id="loading" class="absolute mx-auto">
          <div class="text-center">
            <div class="spinner"></div>
          </div>
        </div>
      </transition>

      <!-- 응답 지연 -->
      <transition name="connErr">
        <div v-if="connState == 1" id="ratelimit">
          <div class="text-center">
            <h4 class="text-xl pt-5 text-white">현재 응답이 지연되고 있습니다.</h4>
            <h4 class="text-xl pt-5 text-white">잠시 후 다시 시도해 주세요.</h4>
          </div>
        </div>
      </transition>

      <!-- 초대 필요 -->
      <transition name="inviteErr">
        <div v-if="connState == 2" id="invite">
          <div class="text-center">
            <h4 class="text-xl pt-5 text-white">봇 초대 화면이 팝업으로 오픈되었습니다.</h4>
            <h4 class="text-xl pt-5 text-white">팝업이 열리지 않는다면, 팝업 차단을 해제해 주세요.</h4>
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
  .spiner-leave-active {
    transition: opacity 0.5s;
  }

  .spiner-enter,
  .spiner-leave-to {
    opacity: 0;
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
export default {
  data() {
    return {
      connState: 0, //0: 연결중, 1: 응답 지연, 2: 초대 필요
    };
  },
  async mounted() {
    try {
      const bridgeData = (await this.$axios.$get('http://127.0.0.1:4000/dashboard/bridge?id='+this.$route.query.id, { // Production: API 서버 주소로 바꾸기 (eg. https://api.nguard.xyz/~~~ )
        headers: {
          'access_token': localStorage.getItem('access_token')
        }
      })).data

      if (bridgeData.isInvited) {
        this.$router.push('/dashboard?id='+this.$route.query.id)
      } else {
        window.open(
          'https://nguard.xyz/bot/invite?id='+this.$route.query.id,
          'Invite',
          'width=562px, height=972px, top=30px, left=675px, resizable=no',
        )
        this.connState = 2;
      }
    } catch (e) {
      this.connState = 1;
    }
  },
}
</script>