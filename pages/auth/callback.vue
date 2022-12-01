<template>
  <div
    class="overflow-x-hidden servers-wrap flex items-center justify-center flex-col w-full h-full min-h-screen px-10"
  >
    <h1 class="w-fit text-3xl font-bold mx-auto mb-14 text-white">
      <!-- 로그인 -->
      {{ $t('common.auth.login.title') }}
    </h1>

    <div class="relative w-full flex justify-center mb-20">
      <!-- 스피너 -->
      <transition name="spiner">
        <div id="loading" class="absolute mx-auto">
          <div class="text-center">
            <div class="spinner"></div>
            <h4 class="text-base pt-5" style="color: rgb(153, 153, 153)">
              <!-- 로그인 정보를 불러오는 중입니다... -->
              {{ $t('common.auth.login.loading') }}
            </h4>
          </div>
        </div>
      </transition>
    </div>
  </div>
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
    if (!['ko', 'en', 'ja', 'vi'].includes(location.pathname.split('/')[1])) {
      this.$router.push(`/${this.$route.query.state}/auth/callback?code=${this.$route.query.code}`)
      return
    } else {
      try {
        const login = await this.$axios.$post('/auth/callback', {
          code: this.$route.query.code,
        })

        localStorage.setItem('access_token', login.access_token)

        setTimeout(() => {
          location.replace(`/${this.$i18n.locale}/servers`)
        }, 1000)
      } catch (e) {
        if (e.response.status == 400) {
          this.$router.push(`/${this.$i18n.locale}/auth/login`)
        } else {
          alert(e.response.data.error.error_description || e)
          this.$router.push(`/${this.$i18n.locale}/auth/login`)
        }
      }
    }
  },
}
</script>
    } else {
      try {
        const login = await this.$axios.$post('/auth/callback', {
          code: this.$route.query.code,
        })

        localStorage.setItem('access_token', login.access_token)

        setTimeout(() => {
          location.replace(`/${this.$i18n.locale}/servers`)
        }, 1000)
      } catch (e) {
        if (e.response.status == 400) {
          this.$router.push(`/${this.$i18n.locale}/auth/login`)
        } else {
          alert(e.response.data.error.error_description || e)
          this.$router.push(`/${this.$i18n.locale}/auth/login`)
        }
>>>>>>> a40a01bf68b2618231bb2f84f1f2f11abee60839
      }
    }
  },
}
</script>
