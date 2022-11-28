<template>
  <main>
    <h1>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path
          d="M6.188 8.719c.439-.439.926-.801 1.444-1.087 2.887-1.591 6.589-.745 8.445 2.069l-2.246 2.245c-.644-1.469-2.243-2.305-3.834-1.949-.599.134-1.168.433-1.633.898l-4.304 4.306c-1.307 1.307-1.307 3.433 0 4.74 1.307 1.307 3.433 1.307 4.74 0l1.327-1.327c1.207.479 2.501.67 3.779.575l-2.929 2.929c-2.511 2.511-6.582 2.511-9.093 0s-2.511-6.582 0-9.093l4.304-4.306zm6.836-6.836l-2.929 2.929c1.277-.096 2.572.096 3.779.574l1.326-1.326c1.307-1.307 3.433-1.307 4.74 0 1.307 1.307 1.307 3.433 0 4.74l-4.305 4.305c-1.311 1.311-3.44 1.3-4.74 0-.303-.303-.564-.68-.727-1.051l-2.246 2.245c.236.358.481.667.796.982.812.812 1.846 1.417 3.036 1.704 1.542.371 3.194.166 4.613-.617.518-.286 1.005-.648 1.444-1.087l4.304-4.305c2.512-2.511 2.512-6.582.001-9.093-2.511-2.51-6.581-2.51-9.092 0z"
        />
      </svg>
      <!-- 초대링크 설정 -->
      {{ $t('invite.title') }}
    </h1>
    <transition name="contents">
      <div v-if="connState == 1">
        <h2>
          <!-- 보안 초대링크 -->
          {{ $t('invite.category1.title') }}
        </h2>
        <p>
          <!-- 추가적인 보안을 적용한 초대링크를 제공합니다. -->
          {{ $t('invite.category1.description') }}
        </p>
        <form>
          <div>
            <label>
              <!-- 보안 초대링크 -->
              {{ $t('invite.category1.toggle') }}
            </label>
            <div @click="inputSwitch('invite')" :class="{ switch_on: switch_.invite }" class="switch"></div>
          </div>

          <div class="vert" v-if="switch_.invite">
            <p>
              <!-- 보안 초대 방식 -->
              {{ $t('invite.category1.type.title') }}
            </p>
            <div
              class="select select-l"
              :class="{ active: select.method.isActive }"
              @click="
                list.method.show = true
                select.method.isActive = true
              "
              v-click-outside="onClickOutside"
            >
              {{ list.method.list[select.method.index] }}
            </div>

            <ul class="list-l" v-if="list.method.show">
              <li
                v-for="(name, index) in list.method.list"
                @click="
                  select.method.index = index
                  select.method.isActive = false
                "
              >
                {{ name }}
              </li>
            </ul>
          </div>

          <div class="vert" v-if="switch_.invite">
            <p>
              <!-- 초대 링크 설정 -->
              {{ $t('invite.category1.link') }}
            </p>
            <div class="flex items-center">
              <label>https://nguard.xyz/invite/</label>
              <input
                class="input-m"
                id="inviteLink_input"
                type="text"
                :placeholder="[!isPermission ? '한디리에서 봇을 추천해주세요' : '초대 링크']"
                v-model="select.link"
                v-bind:readonly="!isPermission"
                @click="clickInviteLink()"
              />
            </div>
          </div>
        </form>

        <button class="btn-save" @click="saveSettings()">
          <!-- 저장하기 -->
          {{ $t('common.save') }}
        </button>

        <modal class="modal" name="permission" width="500">
          <h2>
            <!-- 한디리에서 봇을 추천해주세요 -->
            {{ $t('invite.permissionModal.title') }}
          </h2>
          <div class="text-gray-400 pt-5 pb-8" v-html="$t('invite.permissionModal.description')">
            <!-- 초대 링크를 커스텀하려면<br />
            한디리에서 NGuard Security 봇을 추천해 주시거나,<br />
            유료 플랜에 가입하셔야 합니다.<br /><br />
            한디리 추천은 12시간 마다 다시 추천 가능합니다. -->
          </div>
          <div class="btns flex items-center justify-around gap-2">
            <a href="https://koreanbots.dev/bots/937636597040570388/vote" target="_blank" class="btn-vote">
              <!-- 추천하기 -->
              {{ $t('invite.permissionModal.btns.goVote') }}
            </a>
            <a href="https://nguard.xyz/upgrade/detail" target="_blank">
              <!-- 유료 플랜 -->
              {{ $t('invite.permissionModal.btns.goUpgrade') }}
            </a>
            <a @click="checkVote()">
              <!-- 확인 -->
              {{ $t('common.modal.btns.confirm') }}
            </a>
          </div>
        </modal>

        <modal class="modal" name="success" width="500">
          <h2>
            <!-- 성공적으로 저장했습니다! -->
            {{ $t('common.modal.saved') }}
          </h2>
          <div class="text-gray-400 pt-5">
            <span v-if="switch_.invite">
              <!-- 초대링크가 적용되었습니다. -->
              {{ $t('invite.modal.created') }}
            </span>
            <span v-else>
              <!-- 초대링크가 삭제되었습니다. -->
              {{ $t('invite.modal.deleted') }}
            </span>

            <br /><br />

            <!-- ℹ️ 이 창은 3초 후 자동으로 닫힙니다. -->
            {{ $t('common.modal.closeInfo') }}
          </div>
          <div class="btns"></div>
        </modal>

        <modal class="modal" name="fail" width="500">
          <h2>
            <!-- 저장 중 오류가 발생했습니다. -->
            {{ $t('common.errorModal.title') }}
          </h2>
          <div class="text-gray-400 pt-5">
            <!-- ⚠️ 계속 오류가 발생하는 경우, 채널톡으로 문의 주시기 바랍니다.<br /><br />
            ℹ️ 이 창은 3초 후 자동으로 닫힙니다. -->
            {{ $t('common.errorModal.description') }}<br /><br />
            {{ $t('common.modal.closeInfo') }}
          </div>
          <div class="btns"></div>
        </modal>
      </div>
    </transition>

    <Spiner :type="2" :state="connState" />
  </main>
</template>

<style lang="scss">
@media (max-width: 767px) {
  .btns {
    flex-direction: column;
  }
}

.btn-save {
  @media (max-width: 660px) {
    font-size: 18px !important;
  }

  margin-top: 20px;
  padding: 10px;
  background: $color-highlight;
  border-radius: 10px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    background: darken($color-highlight, 7%);
  }
}

.modal {
  .vm--overlay {
    background: rgba(0, 0, 0, 0.7) !important;
  }

  .vm--modal {
    display: flex;
    flex-direction: column;
    padding: 30px;
    line-height: 2rem;

    .btns a {
      @media (max-width: 660px) {
        font-size: 18px !important;
      }

      padding: 10px;
      background: $color-bg;
      border-radius: 10px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;

      &:hover {
        background: darken($color-bg, 3%);
      }

      &.btn-vote {
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
import vClickOutside from 'v-click-outside'
import catchNetworkError from '@/plugins/catchNetworkError'

export default {
  data() {
    return {
      connState: 0, //0: 연결중, 1: 성공, 2: 응답 지연
      isPermission: false,
      select: {
        method: {
          index: 0,
          isActive: false,
        },
        link: '',
      },
      switch_: {
        invite: false,
      },
      list: {
        method: {
          show: false,
          list: [this.$t('invite.category1.type.option1'), this.$t('invite.category1.type.option2')],
        },
      },
    }
  },
  async mounted() {
    try {
      const settings = (
        await this.$axios.$get('http://25.34.66.22:4000/dashboard/invite?id=' + this.$route.query.id, {
          // Production: API 서버 주소로 바꾸기 (eg. https://api.nguard.xyz/~~~ )
          headers: {
            access_token: localStorage.getItem('access_token'),
          },
        })
      ).data

      this.isPermission = settings.koreanbots.data.voted

      if (settings.settings) {
        if (settings.settings.status != 0) {
          this.switch_.invite = Boolean(settings.settings.status)
          this.select.method.index = settings.settings.settings - 2
          this.select.link = settings.settings.link ? settings.settings.link : this.generateRandom()
        } else {
          this.switch_.invite = false
          this.select.method.index = 0
          this.select.link = this.generateRandom()
        }
      } else {
        this.switch_.invite = false
        this.select.method.index = 0
        this.select.link = this.generateRandom()
      }

      this.connState = 1
    } catch (e) {
      if (e.response) {
        if (e.response.data.message == 'Missing Access') {
          this.$router.push(`/${this.$i18n.locale}/servers`)
        }
      }

      catchNetworkError(e);
      this.connState = 2;
    }
  },
  directives: {
    clickOutside: vClickOutside.directive,
  },
  methods: {
    generateRandom() {
      return Math.random().toString(32).substr(2, 8)
    },
    inputSwitch: function (name) {
      this.switch_[name] = !this.switch_[name]
    },
    onClickOutside() {
      this.list.method.show = false
      this.select.method.isActive = false
    },
    clickInviteLink() {
      if (!this.isPermission) {
        this.$modal.show('permission')
      }
    },
    checkVote() {
      this.connState = 0
      location.reload()
    },
    async saveSettings() {
      try {
        await this.$axios.$post(
          'http://25.34.66.22:4000/dashboard/invite?id=' + this.$route.query.id,
          {
            settings: this.select.method.index + 2,
            status: this.switch_.invite,
            link: this.select.link,
          },
          {
            // Production: API 서버 주소로 바꾸기 (eg. https://api.nguard.xyz/~~~ )
            headers: {
              access_token: localStorage.getItem('access_token'),
            },
          },
        )

        this.$modal.show('success')
        setTimeout(() => {
          this.$modal.hide('success')
        }, 3000)
      } catch (e) {
        this.$modal.show('fail')
        setTimeout(() => {
          this.$modal.hide('fail')
        }, 3000)
      }
    },
  },
}
</script>
