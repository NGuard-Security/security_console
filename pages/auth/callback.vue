<template>
  <main>
    <div
      class="overflow-x-hidden servers-wrap flex items-center justify-center flex-col w-full h-full min-h-screen px-10"
    >
      <h1 class="w-fit text-3xl font-bold mx-auto mb-14 text-white">
        로그인
      </h1>

      <div class="relative w-full flex justify-center mb-20">
        <!-- 스피너 -->
        <transition name="spiner">
          <div id="loading" class="absolute mx-auto">
            <div class="text-center">
              <div class="spinner"></div>
              <h4
                class="text-base pt-5"
                style="color: rgb(153, 153, 153)"
              >
                로그인 정보를 불러오는 중입니다...
              </h4>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.spinner {
  color: $color-gray;
  display: inline-block;
  width: 50px;
  height: 50px;
  vertical-align: -0.125em;
  border: 0.25em solid;
  border-right: 0.25em solid transparent;
  border-radius: 50%;
  -webkit-animation: spinner 0.75s linear infinite;
  animation: spinner 0.75s linear infinite;
}

@keyframes spinner {
  to {
    transform: rotate(1turn);
  }
}
</style>

<script>
export default {
  async mounted() {
    try {
      const login = await this.$axios.$post(
        'http://192.168.1.9:4000/auth/callback',
        {
          // Production: API 서버 주소로 바꾸기 (eg. https://api.nguard.xyz/~~~ )
          code: this.$route.query.code,
        },
      )

      localStorage.setItem('access_token', login.access_token)

      setTimeout(() => {
        location.href = '/servers'
      }, 1000)
    } catch (e) {
      if (e.response.status == 400) {
        this.$router.push('/auth/login')
      } else {
        alert(e.response.data.error.error_description || e)
        this.$router.push('/auth/login')
      }
    }
  },
}
</script>
