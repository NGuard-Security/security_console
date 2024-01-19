<template>
  <main>
    <h1>
      <SvgIcon name="navBar/member" />
      <!-- 멤버 설정 -->
      {{ $t('members.title') }}
    </h1>
    <NuxtLayout name="spiner-wrap">
      <input
        :placeholder="$t('members.searchPlaceholder')"
        class="mb-4 shrink-0"
        @input="searchMember(($event.target as HTMLInputElement).value)"
      />
      <p class="mb-2" v-if="memberList">
        <!-- 멤버 {{ memberList.length }}명 -->
        {{ $t('members.peoplesTemplate').toLowerCase().replace('n', String(memberList.length)) }}
      </p>
      <ul class="flex flex-col gap-4 h-full overflow-y-scroll">
        <li
          v-for="(member, index) in memberList"
          v-bind:key="index"
          class="flex items-center shrink-0 rounded-lg px-3 py-3 text-ellipsis whitespace-nowrap overflow-hidden box-content"
        >
          <!-- <nuxt-img src="img/test.png" alt="user_logo" class="h-8 mr-2 rounded-lg" /> -->
          <nuxt-img
            :src="memberMap[member].icon + '?size=128'"
            alt="user_logo"
            class="w-8 h-8 mr-2 rounded-lg overflow-hidden"
          />

          <span class="mr-1 text-lg min-w-0 overflow-hidden text-ellipsis">{{ memberMap[member].nickName }}</span>
          <p class="min-w-0 mr-4 overflow-hidden text-ellipsis text-gray-400">
            {{ memberMap[member].userName }}
          </p>

          <button
            v-if="!memberMap[member].isBlackList"
            class="text-sm p-1.5 rounded-lg bg-zinc-900 ml-auto"
            @click="reconfirmAddBlackList(member)"
          >
            <!-- 블랙리스트 등록 -->
            {{ $t('members.registerBlacklist') }}
          </button>
          <button
            v-else
            class="text-sm text-red-500 p-1.5 rounded-lg ml-auto bg-[#381717]"
            @click="reconfirmRemoveBlackList(member)"
          >
            <!-- 블랙리스트 해제 -->
            {{ $t('members.unregisterBlacklist') }}
          </button>
        </li>
      </ul>
    </NuxtLayout>

    <Modal :modalName="MODAL.reconfirmBlackList">
      <h2 v-if="tempBlockUserId">
        <!-- {{ processBlackList.nickName }}님을 블랙리스트에 등록하시겠어요? -->
        {{ $t('members.modal1.title').replace('{Place}', memberMap[tempBlockUserId].nickName) }}
      </h2>
      <!-- ⚠️ 블랙리스트 등록 후 일정 기간 동안은 등록을 취소 할 수 있으나,<br />
      일정 기간이 지나면 등록을 취소 할 수 없습니다.<br /> -->
      <div class="text-gray-400 pt-5 pb-8" v-html="$t('members.modal1.description')"></div>
      <div class="btns flex items-center justify-around gap-2">
        <a @click="setBlackList()" class="btn-highlight">
          <!-- 확인 -->
          {{ $t('common.modal.btns.confirm') }}
        </a>
        <!-- $modal.hide('sureBlackList') -->
        <a @click="">
          <!-- 취소 -->
          {{ $t('common.modal.btns.cancel') }}
        </a>
      </div>
    </Modal>

    <Modal :modalName="MODAL.reconfirmRemoveBlackList">
      <h2 v-if="tempBlockUserId">
        <!-- {{ processBlackList.nickName }}님을 블랙리스트에서 삭제하시겠어요? -->
        {{ $t('members.modal2.title').replace('{Place}', memberMap[tempBlockUserId].nickName) }}
      </h2>
      <div class="text-gray-400 pt-5 pb-8">
        <!-- ⚠️ 블랙리스트 해제 즉시 해당 유저는 모든 기능을 이용할 수 있습니다. -->
        {{ $t('members.modal2.description') }}
      </div>
      <div class="btns flex items-center justify-around gap-2">
        <a @click="setBlackList()" class="btn-highlight">
          <!-- 확인 -->
          {{ $t('common.modal.btns.confirm') }}
        </a>
        <!-- $modal.hide('sureRemoveBlackList') -->
        <a @click="">
          <!-- 취소 -->
          {{ $t('common.modal.btns.cancel') }}
        </a>
      </div>
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

<style lang="scss" scoped>
li {
  background: $color-ui;
}
</style>

<script setup lang="ts">
definePageMeta({
  middleware: ['auth', 'guild-id'],
})

const modalNames = ['reconfirmBlackList', 'reconfirmRemoveBlackList', 'failed'] as const
const MODAL = strArrToEnumObject<typeof modalNames>(modalNames)
const { modalShow, modalClose, modalShowAndClose } = useModal<typeof modalNames>(modalNames)
const API = useAPI()
const { loadingSuccess } = useLoadingState()

const memberList = useState<string[]>()
const tempBlockUserId = useState<string | null>()

const memberMap = useState<Record<string, APIMemberBase>>('memberMap', () => {
  return {}
})

const reconfirmAddBlackList = (id: string) => {
  tempBlockUserId.value = id

  modalShow(MODAL.reconfirmBlackList)
}

const reconfirmRemoveBlackList = (id: string) => {
  tempBlockUserId.value = id

  modalShow(MODAL.reconfirmRemoveBlackList)
}

const setBlackList = async () => {
  const targetId = tempBlockUserId.value
  if (!targetId) return

  tempBlockUserId.value = null

  modalClose(MODAL.reconfirmBlackList)
  modalClose(MODAL.reconfirmRemoveBlackList)

  try {
    await API.post.members(targetId)

    const member = memberMap.value[targetId]
    member.isBlackList = !member.isBlackList
  } catch (e) {
    await modalShowAndClose(MODAL.failed, 3000)
    // await wait(1000)

    // location.reload()
    // TODO - 요청 다시하는걸로 해야하려나
  }
}

const searchMember = (id: string) => {
  //TODO - 페이지 형식 적용?

  memberList.value = []
  const matcher = createFuzzyMatcher(id)

  Object.entries(memberMap.value).forEach(([key, value]) => {
    if (!matcher.test(value.nickName) && !matcher.test(value.userName) && !matcher.test(key)) {
      return
    }

    memberList.value.push(key)
  })
}

onMounted(async () => {
  try {
    const res = await API.get.members()

    const tmpMap: Record<string, APIMemberBase> = {}
    const tmpList: string[] = []

    res.forEach(({ id, ...data }) => {
      tmpMap[id] = data
      tmpList.push(id)
    })

    memberMap.value = tmpMap
    memberList.value = tmpList

    loadingSuccess()
  } catch (e) {}
})

onUnmounted(() => {
  memberMap.value = {}
  memberList.value = []
  tempBlockUserId.value = null
})
</script>
