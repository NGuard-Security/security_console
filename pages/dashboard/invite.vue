<template>
  <main>
    <h1>
      <SvgIcon name="navBar/invite" />
      <!-- 초대링크 설정 -->
      {{ $t('invite.title') }}
    </h1>
    <NuxtLayout name="spiner-wrap" v-if="setting">
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
            <div
              @click="setting.inviteLink.enabled = !setting.inviteLink.enabled"
              :class="{ switch_on: setting.inviteLink.enabled }"
              class="switch"
            ></div>
          </div>

          <!-- 보안 초대 방식 -->
          <CompDropdown
            :data="setting.inviteLink.settings.inviteMethod"
            :name="$t('invite.category1.type.title')"
            @menu-select="(index: number) => (setting.inviteLink.settings.inviteMethod.index = index)"
          />

          <div v-if="setting.inviteLink.enabled">
            <div class="vert">
              <p>
                <!-- 초대 링크 설정 -->
                {{ $t('invite.category1.link') }}
              </p>
              <div class="flex flex-col md:flex-row md:items-center items-start">
                <label>https://nguard.xyz/invite/</label>
                <input
                  class="input-m"
                  id="inviteLink_input"
                  type="text"
                  placeholder="초대 링크"
                  v-model="setting.inviteLink.settings.inviteURL.value"
                  v-bind:readonly="!hasPermission"
                  @click="clickInviteLink()"
                />
              </div>
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

      <button class="btn-save" @click="reconfirmSaveSettings()">
        <!-- 저장하기 -->
        {{ $t('common.save') }}
      </button>
    </NuxtLayout>

    <Modal :modalName="MODAL.permission">
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
        <a @click="modalClose(MODAL.permission)">
          <!-- 확인 -->
          {{ $t('common.modal.btns.confirm') }}
        </a>
      </div>
    </Modal>

    <Modal :modalName="MODAL.premiereOnly">
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
        <a @click="modalClose(MODAL.premiereOnly)">
          <!-- 확인 -->
          {{ $t('common.modal.btns.confirm') }}
        </a>
      </div>
    </Modal>

    <Modal :modalName="MODAL.customDomain">
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
        <a @click="modalClose(MODAL.customDomain)">
          <!-- 취소 -->
          {{ $t('common.modal.btns.cancel') }}
        </a>
        <a @click="modalClose(MODAL.customDomain)">
          <!-- 확인 -->
          {{ $t('common.modal.btns.confirm') }}
        </a>
      </div>
    </Modal>

    <Modal :modalName="MODAL.success">
      <h2>
        <!-- 성공적으로 저장했습니다! -->
        {{ $t('common.modal.saved') }}
      </h2>
      <div class="flex flex-col text-gray-400 pt-3 gap-2">
        <span v-if="setting.inviteLink.enabled">
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
    </Modal>

    <Modal :modalName="MODAL.failed">
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
    </Modal>
  </main>
</template>

<script setup lang="ts">
import { APIInviteType } from '~/utils/enums'

definePageMeta({
  middleware: ['auth', 'guild-id'],
})

const modalNames = ['permission', 'premiereOnly', 'customDomain', 'success', 'failed'] as const
const MODAL = strArrToEnumObject<typeof modalNames>(modalNames)
const { modalShow, modalClose, modalShowAndClose } = useModal<typeof modalNames>(modalNames)
const API = useAPI()
const { loadingSuccess } = useLoadingState()
const i18n = useI18n()

const generateRandom = () => {
  return Math.random().toString(32).substring(2, 8)
}

const hasPermission = useState('hasPermission', () => false)
const isEnterprise = useState('isEnterprise', () => false)

const setting = useState('inviteSetting', () => {
  return {
    inviteLink: {
      enabled: false,
      settings: {
        inviteMethod: new createDropdownComp(0, [
          i18n.t('invite.category1.type.option1'),
          i18n.t('invite.category1.type.option2'),
          i18n.t('invite.category1.type.option3'),
        ]).toObject(),
        inviteURL: new createInputComp(generateRandom()).toObject(),
      },
    },
  }
})
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

// const inputSwitch = (name: string) => {
// this.switch_[name] = !this.switch_[name]
// }

const clickInviteLink = () => {
  if (hasPermission.value) return

  modalShow(MODAL.permission)
}
const clickCustomDomain = () => {
  if (isEnterprise.value) return

  modalShow(MODAL.premiereOnly)
}
// const checkVote = () => {
// this.connState = 0
// location.reload()
// }
const reconfirmSaveSettings = async () => {
  if (setting.value.inviteLink.enabled && setting.value.inviteLink.settings.inviteURL.value != '') {
    modalShow(MODAL.customDomain)
  } else {
    saveSettings()
  }
}
const saveSettings = async () => {
  try {
    const { inviteLink } = setting.value

    // await API.post.invite({
    //   settings: (inviteLink.settings.inviteMethod.index + 2) as APIInviteType,
    //   status: inviteLink.enabled,
    //   link: inviteLink.settings.inviteURL.value,
    //   domain: {
    //     domain: this.switch_.domain ? this.select.domain : '',
    //     ssl: this.switch_.domain ? this.switch_.domain_ssl : null,
    //   },
    // })
    //FIXME - domain??

    modalShowAndClose(MODAL.success, 3000)
  } catch (e) {
    modalShowAndClose(MODAL.failed, 3000)
  }
}

onMounted(async () => {
  try {
    const res = await API.get.invite()

    hasPermission.value = res.koreanbots.voted
    isEnterprise.value = res.premiumType > APIPremiumType.FREE

    if (res.settings) {
      const { inviteLink } = setting.value
      inviteLink.enabled = true

      {
        const { inviteMethod, inviteURL } = inviteLink.settings
        inviteMethod.index = res.settings.settings - 2
        if (res.settings.link) inviteURL.value = res.settings.link
      }

      // setting.value.invite = Boolean(res.settings.status)
      // setting.value.domain = Boolean(res.domain.domain)
      // setting.value.domainSSL = res.domain.ssl
    }

    loadingSuccess()
  } catch (e) {}
})
</script>
