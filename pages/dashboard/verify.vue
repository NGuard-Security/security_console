<template>
  <main>
    <h1>
      <SvgIcon name="navBar/verify" />
      <!-- 커맨드 인증 -->
      {{ $t('verify.title') }}
    </h1>

    <NuxtLayout name="spiner-wrap">
      <h2>
        <!-- 커맨드 인증 설정 -->
        {{ $t('verify.category1.title') }}
      </h2>
      <p>
        <!-- 서버 내에서 명령어를 이용해 인증을 진행합니다. -->
        {{ $t('verify.category1.description') }}
      </p>
      <form>
        <div>
          <label>
            <!-- 커맨드 인증 -->
            {{ $t('verify.category1.toggle') }}
          </label>
          <div @click="clickEnableSwitch" :class="{ switch_on: setting.cmdVerify.enabled }" class="switch"></div>
        </div>

        <div v-if="setting.cmdVerify.enabled">
          <!-- 인증 시 지급될 역할 -->
          <CompInputMenu
            :name="$t('verify.category1.role')"
            :data="setting.cmdVerify.settings.verifyRole"
            :readonly="false"
            :placeholder="$t('verify.category1.rolePlaceholder')"
            @menu-select="(index: string) => setInputMenuIndex(index)"
            @input="(value: string) => doinputInputMenu(value)"
          />
        </div>
      </form>

      <button class="btn-save" v-if="setting.cmdVerify.allowed" @click="saveSettings()">
        {{ $t('common.save') }}
        <!-- 저장하기 -->
      </button>
    </NuxtLayout>

    <Modal :modalName="MODAL.success">
      <h2>
        {{ $t('common.modal.saved') }}
        <!-- 성공적으로 저장했습니다! -->
      </h2>
      <div class="flex flex-col text-gray-400 pt-3 gap-2">
        <span v-if="setting.cmdVerify.enabled">
          <!-- 새로운 유저가 <code>/verify</code> 명령어로 인증할 수 있습니다. -->
          {{ $t('verify.modal.applied[0]') }}
          <code>{{ $t('verify.modal.applied[1]') }}</code>
          {{ $t('verify.modal.applied[2]') }}
        </span>
        <span v-else>
          <!-- 새로운 유저는 더 이상 <code>/verify</code> 명령어로 인증할 수 없습니다. -->
          {{ $t('verify.modal.deleted[0]') }}
          <code>{{ $t('verify.modal.applied[1]') }}</code>
          {{ $t('verify.modal.applied[2]') }}
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

    <Modal :modalName="MODAL.notAllowed">
      <h2>
        <!-- 기능을 사용할 수 없습니다. -->
        {{ $t('verify.modal.notAllowed.title') }}
      </h2>
      <div class="flex flex-col text-gray-400 pt-3 gap-2">
        <!-- 해당 기능을 사용하기 위해서는 서버에 최소 1개 이상의 역할이 존재하여야 합니다.<br /><br />
    ℹ️ 이 창은 3초 후 자동으로 닫힙니다. -->
        <span>{{ $t('verify.modal.notAllowed.description') }}</span>

        <br />

        {{ $t('common.modal.closeInfo') }}
      </div>
      <div class="btns"></div>
    </Modal>
  </main>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['auth', 'guild-id'],
})

const { modalShowAndClose, MODAL } = useModal(['success', 'failed', 'notAllowed'] as const)
const API = useAPI()
const { loadingSuccess } = useLoadingState()

const setting = useState('verifySetting', () => {
  return {
    cmdVerify: {
      enabled: false,
      allowed: false,
      settings: {
        verifyRole: new createInputMenuComp<APIRole>([]).toObject(),
      },
    },
  }
})

// return {
//   connState: 0, //0: 연결중, 1: 성공, 2: 응답 지연
//   input: {
//     role: '',
//   },
//   switch_: {
//     confirm: false,
//   },
//   list: {
//     role: {
//       show: false,
//       list: [], // Read/Write
//     },
//   },
//   roleList: [], // Read-only
// }

const clickEnableSwitch = () => {
  if (!setting.value.cmdVerify.allowed) {
    modalShowAndClose(MODAL.notAllowed, 3000)
    return
  }

  setting.value.cmdVerify.enabled = !setting.value.cmdVerify.enabled
}

const doinputInputMenu = (value: string) => {
  const Tlqkf = setting.value.cmdVerify.settings.verifyRole

  Tlqkf.inputValue = value
  Tlqkf.menuIndex = []
}

const setInputMenuIndex = (index: string) => {
  const Tlqkf = setting.value.cmdVerify.settings.verifyRole

  Tlqkf.index = index
  Tlqkf.inputValue = Tlqkf.dataMap[index].name
  Tlqkf.selectedData = Tlqkf.dataMap[index].data
}

const saveSettings = async () => {
  try {
    const { cmdVerify } = setting.value

    if (cmdVerify.settings.verifyRole.menuIndex.length > 0) {
      return
    }

    await API.post.verify({
      status: cmdVerify.enabled,
      role: cmdVerify.settings.verifyRole.selectedData,
    })

    modalShowAndClose(MODAL.success, 3000)
  } catch (e) {
    modalShowAndClose(MODAL.failed, 3000)
  }
}

onMounted(async () => {
  try {
    const res = await API.get.verify()

    {
      const { cmdVerify } = setting.value

      const tmp = res.guild.roles.map(role => {
        return { index: role.id, name: role.name, data: role }
      })

      if (tmp.length > 0) {
        cmdVerify.allowed = true

        const createVerifyRole = new createInputMenuComp<APIRole>(tmp)

        if (res.settings) {
          createVerifyRole.setIndex(res.settings.role.id)
        } else {
          createVerifyRole.setIndex(res.guild.roles[0].id)
        }

        cmdVerify.enabled = true
        cmdVerify.settings.verifyRole = createVerifyRole.toObject()
      } else {
        cmdVerify.allowed = false
        cmdVerify.enabled = false
      }
    }

    loadingSuccess()
  } catch (e) {}
})
</script>
