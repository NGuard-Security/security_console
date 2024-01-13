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
          <div @click="inputSwitch('confirm')" :class="{ switch_on: switch_.confirm }" class="switch"></div>
        </div>

        <div class="vert" v-if="switch_.confirm">
          <p>
            {{ $t('verify.category1.role') }}
            <!-- 인증 시 지급될 역할 -->
          </p>
          <input
            class="input-l"
            id="role_input"
            :value="input.role?.name"
            @click="list.role.show = true"
            readonly
            v-click-outside="onClickOutside"
            type="text"
            :placeholder="$t('verify.category1.rolePlaceholder')"
          />
          <ul class="list-l" v-if="list.role.show">
            <li v-for="(role, index) in list.role.list" @click="input.role = role" v-bind:key="index">
              {{ role?.name }}
            </li>
          </ul>
        </div>
      </form>

      <button class="btn-save" @click="saveSettings()">
        {{ $t('common.save') }}
        <!-- 저장하기 -->
      </button>

      <modal class="modal" name="success" width="500">
        <h2>
          {{ $t('common.modal.saved') }}
          <!-- 성공적으로 저장했습니다! -->
        </h2>
        <div class="flex flex-col text-gray-400 pt-3 gap-2">
          <span v-if="switch_.confirm">
            <!-- 새로운 유저가 <code>/verify</code> 명령어로 인증할 수 있습니다. -->
            {{ $t('verify.modal.applied') }}
          </span>
          <span v-else>
            <!-- 새로운 유저는 더 이상 <code>/verify</code> 명령어로 인증할 수 없습니다. -->
            {{ $t('verify.modal.deleted') }}
          </span>

          <br />

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

<script setup lang="ts">
definePageMeta({
  // middleware: ['auth', 'guild-id'],
})

const { $modal } = useNuxtApp()
const API = useAPI()
const route = useRoute()
const { loadingSuccess } = useLoadingState()

const resData = useState<APIVerify | null>('resData', () => null)

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

//TODO - Switch는 범용으로 이용하게 구성했는데, 다른 방법을 고안해야함
const inputSwitch = (name: string) => {
  // this.switch_[name] = !this.switch_[name]
}
const onClickOutside = () => {
  // this.list.role.show = false
}
const saveSettings = async () => {
  try {
    // await API.post.verify(Number(route.query.id), {
    //   status: this.switch_.confirm,
    //   role: this.input.role,
    // })

    $modal.show('success')
    setTimeout(() => {
      $modal.hide('success')
    }, 3000)
  } catch (e) {
    $modal.show('fail')
    setTimeout(() => {
      $modal.hide('fail')
    }, 3000)
  }
}

onMounted(async () => {
  try {
    const res = await API.get.verify(Number(route.query.id))

    if (res.settings) {
      // this.switch_.confirm = true
      // this.list.role.list = res.guild.roles
      // this.roleList = res.guild.roles
      // this.input.role = res.settings.role ? res.settings.role : res.guild.roles[0]
    } else {
      // this.list.role.list = res.guild.roles
      // this.input.role = res.guild.roles[0]
    }

    loadingSuccess()
  } catch (e) {}
})
</script>
