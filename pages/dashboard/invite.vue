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
      <div v-if="connState === 1">
        <div class="mb-6">
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

              <div class="flex-col w-full" v-click-outside="onClickOutside">
                <div
                  class="select select-l"
                  :class="{ active: select.method.isActive }"
                  @click="
                    list.method.show = true
                    select.method.isActive = true
                  "
                >
                  {{ list.method.list[select.method.index] }}
                </div>

                <ul class="list-l" v-if="list.method.show">
                  <li
                    v-for="(name, index) in list.method.list"
                    v-bind:key="index"
                    @click="
                      select.method.index = index
                      select.method.isActive = false
                      list.method.show = false
                    "
                  >
                    {{ name }}
                  </li>
                </ul>
              </div>
            </div>

            <div class="vert" v-if="switch_.invite">
              <p>
                <!-- 초대 링크 설정 -->
                {{ $t('invite.category1.link') }}
              </p>
              <div class="flex flex-col md:flex-row items-center">
                <label>https://nguard.xyz/invite/</label>
                <input
                  class="input-m"
                  id="inviteLink_input"
                  type="text"
                  placeholder="초대 링크"
                  v-model="select.link"
                  v-bind:readonly="!isPermission"
                  @click="clickInviteLink()"
                />
              </div>
            </div>
          </form>
        </div>

        <!-- <div class="mb-6"> -->
        <!-- <h2> -->
        <!-- 커스텀 초대링크 -->
        <!-- {{ $t('invite.category2.title') }} -->
        <!-- </h2> -->
        <!-- <p> -->
        <!-- 소유하고 계신 도메인에 NGuard 초대링크를 설정할 수 있습니다. -->
        <!-- {{ $t('invite.category2.description') }} -->
        <!-- </p> -->
        <!-- <form> -->
        <!-- <div> -->
        <!-- <label> -->
        <!-- 커스텀 초대링크 -->
        <!-- {{ $t('invite.category2.toggle') }} -->
        <!-- </label> -->
        <!-- <div @click="inputSwitch('domain')" :class="{ switch_on: switch_.domain }" class="switch"></div> -->
        <!-- </div> -->

        <!-- <div class="vert" v-if="switch_.domain"> -->
        <!-- <p> -->
        <!-- 도메인 설정 -->
        <!-- {{ $t('invite.category2.link') }} -->
        <!-- </p> -->
        <!-- <div class="flex items-center"> -->
        <!-- <input -->
        <!-- class="input-m" -->
        <!-- id="inviteDomain_input" -->
        <!-- type="text" -->
        <!-- placeholder="도메인 입력" -->
        <!-- v-model="select.domain" -->
        <!-- v-bind:readonly="!isEnterprise" -->
        <!-- @click="clickCustomDomain()" -->
        <!-- /> -->
        <!-- </div> -->
        <!-- </div> -->

        <!-- <div class="flex" v-if="switch_.domain"> -->
        <!-- <label> -->
        <!-- SSL 설정 -->
        <!-- {{ $t('invite.category2.ssl') }} -->
        <!-- </label> -->
        <!-- <div @click="inputSwitch('domain_ssl')" :class="{ switch_on: switch_.domain_ssl }" class="switch"></div> -->
        <!-- </div> -->
        <!-- </form> -->
        <!-- </div> -->

        <button class="btn-save" @click="checkSaveSettings()">
          <!-- 저장하기 -->
          {{ $t('common.save') }}
        </button>

        <modal class="modal" name="permission" width="620">
          <h2>
            <!-- 한디리에서 봇을 추천해주세요 -->
            {{ $t('invite.permissionModal.title') }}
          </h2>
          <!-- 초대 링크를 커스텀하려면<br />
          한디리에서 NGuard Security 봇을 추천해 주시거나,<br />
          유료 플랜에 가입하셔야 합니다.<br /><br />
          한디리 추천은 12시간 마다 다시 추천 가능합니다. -->
          <div class="text-gray-400 pt-5 pb-8" v-html="$t('invite.permissionModal.description')"></div>
          <div class="btns flex items-center justify-around gap-2">
            <a href="https://koreanbots.dev/bots/937636597040570388/vote" target="_blank" class="btn-highlight">
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

        <modal class="modal" name="premiere_only" width="620">
          <h2>
            <!-- 프리미어 플랜에서만 이용하실 수 있습니다. -->
            {{ $t('invite.premiereOnlyModal.title') }}
          </h2>
          <!-- 이 기능은 프리미어 플랜에서 제공되는 기능입니다. -->
          <div class="text-gray-400 pt-5 pb-8" v-html="$t('invite.premiereOnlyModal.description')"></div>
          <div class="btns flex items-center justify-around gap-2">
            <a href="https://nguard.xyz/upgrade/detail" target="_blank" class="btn-highlight">
              <!-- 유료 플랜 -->
              {{ $t('invite.premiereOnlyModal.btns.goUpgrade') }}
            </a>
            <a @click="$modal.hide('premiere_only')">
              <!-- 확인 -->
              {{ $t('common.modal.btns.confirm') }}
            </a>
          </div>
        </modal>

        <modal class="modal" name="custom_domain" width="620">
          <h2>
            <!-- DNS 설정을 완료하셨나요? -->
            {{ $t('invite.customDomainModal.title') }}
          </h2>
          <!-- "저장' 버튼을 누르시기 전, 아래 링크를 참고하여 DNS 설정을 완료해 주세요.<br />
          DNS 설정을 완료하지 않고 저장하시면 사이트가 정상적으로 작동하지 않을 수 있습니다." -->
          <div class="text-gray-400 pt-5 pb-8" v-html="$t('invite.customDomainModal.description')"></div>
          <div class="btns flex items-center justify-around gap-2">
            <a
              :href="`https://kms0219kms.gitbook.io/nguard-docs/${this.$i18n.locale}/custom-domain-setup`"
              target="_blank"
              class="btn-highlight"
            >
              <!-- 설정방법 확인 -->
              {{ $t('invite.customDomainModal.btns.goDocs') }}
            </a>
            <a @click="$modal.hide('custom_domain')">
              <!-- 취소 -->
              {{ $t('common.modal.btns.cancel') }}
            </a>
            <a
              @click="
                $modal.hide('custom_domain')
                saveSettings()
              "
            >
              <!-- 확인 -->
              {{ $t('common.modal.btns.confirm') }}
            </a>
          </div>
        </modal>

        <modal class="modal" name="success" width="620">
          <h2>
            <!-- 성공적으로 저장했습니다! -->
            {{ $t('common.modal.saved') }}
          </h2>
          <div class="flex flex-col text-gray-400 pt-3 gap-2">
            <span v-if="switch_.invite">
              <!-- 초대링크가 적용되었습니다. -->
              {{ $t('invite.modal.created') }}
            </span>
            <span v-else>
              <!-- 초대링크가 삭제되었습니다. -->
              {{ $t('invite.modal.deleted') }}
            </span>

            <br />

            <!-- ℹ️ 이 창은 3초 후 자동으로 닫힙니다. -->
            {{ $t('common.modal.closeInfo') }}
          </div>
          <div class="btns"></div>
        </modal>

        <modal class="modal" name="fail" width="620">
          <h2>
            <!-- 저장 중 오류가 발생했습니다. -->
            {{ $t('common.errorModal.title') }}
          </h2>
          <div class="flex flex-col text-gray-400 pt-3 gap-2">
            <!-- ⚠️ 계속 오류가 발생하는 경우, 채널톡으로 문의 주시기 바랍니다.<br /><br />
            ℹ️ 이 창은 3초 후 자동으로 닫힙니다. -->
            <span>{{ $t('common.errorModal.description') }}</span>

            <br />

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

      &.btn-highlight {
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
      isEnterprise: false,
      select: {
        method: {
          index: 0,
          isActive: false,
        },
        link: '',
        domain: '',
      },
      switch_: {
        invite: false,
        domain: false,
        domain_ssl: true,
      },
      list: {
        method: {
          show: false,
          list: [
            this.$t('invite.category1.type.option1'),
            this.$t('invite.category1.type.option2'),
            this.$t('invite.category1.type.option3'),
          ],
        },
      },
    }
  },
  async mounted() {
    try {
      const settings = (
        await this.$axios.$get('/dashboard/invite?id=' + this.$route.query.id, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('access_token'),
          },
        })
      ).data

      this.isPermission = settings.koreanbots.voted
      this.isEnterprise = settings.payData?.type === 'ENTERPRISE' && new Date().getTime() < settings.payData?.expire

      if (settings.settings) {
        if (settings.settings.status != 0) {
          this.switch_.invite = Boolean(settings.settings.status)
          this.switch_.domain = Boolean(settings.domain?.domain)
          this.switch_.domain_ssl = Boolean(settings.domain?.ssl || true)
          this.select.method.index = settings.settings.settings - 2
          this.select.link = settings.settings.link ? settings.settings.link : this.generateRandom()
        } else {
          this.switch_.invite = false
          this.switch_.domain = false
          this.switch_.domain_ssl = true
          this.select.method.index = 0
          this.select.link = this.generateRandom()
        }
      } else {
        this.switch_.invite = false
        this.switch_.domain = false
        this.switch_.domain_ssl = true
        this.select.method.index = 0
        this.select.link = this.generateRandom()
      }

      this.connState = 1
    } catch (e) {
      if (e.response) {
        if (e.response.status === 401) {
          window.localStorage.removeItem('access_token')
          this.$router.push(`/${this.$i18n.locale}/auth/login`)
        } else if (e.response.status === 404) {
          this.$router.push(`/${this.$i18n.locale}/servers`)
        }
      }

      catchNetworkError(e)
      this.connState = 2
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
    clickCustomDomain() {
      if (!this.isEnterprise) {
        this.$modal.show('premiere_only')
      }
    },
    checkVote() {
      this.connState = 0
      location.reload()
    },
    async checkSaveSettings() {
      if (this.switch_.domain && this.select.domain != '') {
        return this.$modal.show('custom_domain')
      } else {
        return await this.saveSettings()
      }
    },
    async saveSettings() {
      try {
        await this.$axios.$post(
          '/dashboard/invite?id=' + this.$route.query.id,
          {
            settings: this.select.method.index + 2,
            status: this.switch_.invite,
            link: this.select.link,
            domain: {
              domain: this.switch_.domain ? this.select.domain : '',
              ssl: this.switch_.domain ? this.switch_.domain_ssl : null,
            },
          },
          {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('access_token'),
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
