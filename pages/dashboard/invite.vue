<template>
  <main>
    <h1>
      <SvgIcon name="navBar/invite" />
      <!-- 초대링크 설정 -->
      {{ $t('invite.title') }}
    </h1>
    <NuxtLayout name="spiner-wrap">
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
                v-bind:key="index"
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
            :href="`https://kms0219kms.gitbook.io/nguard-docs/${$i18n.locale}/custom-domain-setup`"
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
    </NuxtLayout>
  </main>
</template>

<!-- TODO - 왜 이거만 따로 빠져 있는거야 -->
<style lang="scss">
@media (max-width: 767px) {
  .btns {
    flex-direction: column;
  }
}
</style>

<script setup lang="ts">
import moment from 'moment'

definePageMeta({
  // middleware: ['auth', 'guild-id'],
})

const { $modal } = useNuxtApp()
const API = useAPI()
const route = useRoute()
const { loadingSuccess } = useLoadingState()

const isPermission = useState('isPermission', () => false)
const isEnterprise = useState('isEnterprise', () => false)

const settingData = useState(undefined, () => {
  return { invite: false, domain: false, domainSSL: true, method: { index: 0, isActive: false }, link: '' }

  // select: {
  //   method: {
  //     index: 0,
  //     isActive: false,
  //   },
  //   link: '',
  //   domain: '',
  // },
  // switch_: {
  //   invite: false,
  //   domain: false,
  //   domain_ssl: true,
  // },
  // list: {
  //   method: {
  //     show: false,
  //     list: [
  //       this.$t('invite.category1.type.option1'),
  //       this.$t('invite.category1.type.option2'),
  //       this.$t('invite.category1.type.option3'),
  //     ],
  //   },
  // },
})

const generateRandom = () => {
  return Math.random().toString(32).substring(2, 8)
}

const inputSwitch = (name: string) => {
  // this.switch_[name] = !this.switch_[name]
}
const onClickOutside = () => {
  // this.list.method.show = false
  // this.select.method.isActive = false
}
const clickInviteLink = () => {
  if (!isPermission.value) {
    // $modal.show('permission')
  }
}
const clickCustomDomain = () => {
  if (!isEnterprise.value) {
    // $modal.show('premiere_only')
  }
}
const checkVote = () => {
  // this.connState = 0
  // location.reload()
}
const checkSaveSettings = async () => {
  // if (this.switch_.domain && this.select.domain != '') {
  //   return this.$modal.show('custom_domain')
  // } else {
  //   return await this.saveSettings()
  // }
}
const saveSettings = async () => {
  // try {
  //   await API.postInvite(Number(route.query.id), {
  //     settings: this.select.method.index + 2,
  //     status: this.switch_.invite,
  //     link: this.select.link,
  //     domain: {
  //       domain: this.switch_.domain ? this.select.domain : '',
  //       ssl: this.switch_.domain ? this.switch_.domain_ssl : null,
  //     },
  //   })
  //   this.$modal.show('success')
  //   setTimeout(() => {
  //     this.$modal.hide('success')
  //   }, 3000)
  // } catch (e) {
  //   this.$modal.show('fail')
  //   setTimeout(() => {
  //     this.$modal.hide('fail')
  //   }, 3000)
  // }
}

onMounted(async () => {
  try {
    const res = await API.getInvite(Number(route.query.id))

    isPermission.value = res.koreanbots.voted
    //TODO - 이런거 전부다 Enum 형식으로 만들어야됨, 백엔드 코드 참조 필요
    isEnterprise.value = res.payData?.type === 'ENTERPRISE' && moment().valueOf() < Number(res.payData?.expire)

    if (res.settings?.status != 0) {
      settingData.value.invite = Boolean(res.settings.status)
      settingData.value.domain = Boolean(res.domain?.domain)
      settingData.value.domainSSL = Boolean(res.domain?.ssl || true)
      settingData.value.method.index = res.settings.settings - 2
      settingData.value.link = res.settings.link ? res.settings.link : generateRandom()
    } else {
      settingData.value.link = generateRandom()
    }

    loadingSuccess()
  } catch (e) {}
})
</script>
