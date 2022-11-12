<template>
  <main class="max-w-6xl flex flex-col">
    <h1>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path
          d="M20.822 18.096c-3.439-.794-6.64-1.49-5.09-4.418 4.72-8.912 1.251-13.678-3.732-13.678-5.082 0-8.464 4.949-3.732 13.678 1.597 2.945-1.725 3.641-5.09 4.418-3.073.71-3.188 2.236-3.178 4.904l.004 1h23.99l.004-.969c.012-2.688-.092-4.222-3.176-4.935z"
        />
      </svg>
      <!-- 멤버 설정 -->
      {{ $t('members.title') }}
    </h1>
    <transition name="contents">
      <div v-if="connState == 1">
        <input
          :placeholder="$t('members.searchPlaceholder')"
          class="mb-4 shrink-0"
          @input="searchMember($event.target.value)"
        />
        <p class="mb-2">
          <!-- 멤버 {{ memberList.length }}명 -->
          {{ $t('members.peoplesTemplate').toLowerCase().replace('n', memberList.length) }}
        </p>
        <ul class="flex flex-col gap-4 h-full overflow-y-scroll">
          <li
            v-for="member in memberList"
            class="flex items-center shrink-0 rounded-lg px-3 py-3 text-ellipsis whitespace-nowrap overflow-hidden box-content"
          >
            <!-- <img src="~/assets/img/test.png" alt="user_logo" class="h-8 mr-2 rounded-lg" /> -->
            <img :src="member.icon + '?size=128'" alt="user_logo" class="h-8 mr-2 rounded-lg" />

            <span class="mr-1 text-lg min-w-0 overflow-hidden text-ellipsis">{{ member.nickName }}</span>
            <p class="min-w-0 mr-4 overflow-hidden text-ellipsis text-gray-400">
              {{ member.userName }}
            </p>

            <button
              v-if="!member.isBlackList"
              class="text-sm p-1.5 rounded-lg bg-zinc-900 ml-auto"
              @click="sureBlackList(member.id, member.nickName)"
            >
              <!-- 블랙리스트 등록 -->
              {{ $t('members.registerBlacklist') }}
            </button>
            <button
              v-else
              class="text-sm text-red-500 p-1.5 rounded-lg ml-auto"
              style="background: rgb(56, 23, 23)"
              @click="sureRemoveBlackList(member.id, member.nickName)"
            >
              <!-- 블랙리스트 해제 -->
              {{ $t('members.unregisterBlacklist') }}
            </button>
          </li>
        </ul>
      </div>
    </transition>

    <Spiner :type="2" :state="connState" />

    <modal class="modal sureBlackList" name="sureBlackList" width="500">
      <h2>
        <!-- {{ processBlackList.nickName }}님을 블랙리스트에 등록하시겠어요? -->
        {{ $t('members.modal1.title').replace('{Place}', processBlackList.nickName) }}
      </h2>
      <div class="text-gray-400 pt-5 pb-8" v-html="$t('members.modal1.description')">
        <!-- ⚠️ 블랙리스트 등록 후 일정 기간 동안은 등록을 취소 할 수 있으나,<br />
        일정 기간이 지나면 등록을 취소 할 수 없습니다.<br /> -->
      </div>
      <div class="btns flex items-center justify-around gap-2">
        <a @click="setBlackList()" class="btn-vote">
          <!-- 확인 -->
          {{ $t('common.modal.btns.confirm') }}
        </a>
        <a @click="$modal.hide('sureBlackList')">
          <!-- 취소 -->
          {{ $t('common.modal.btns.cancel') }}
        </a>
      </div>
    </modal>

    <modal class="modal sureRemoveBlackList" name="sureRemoveBlackList" width="500">
      <h2>
        <!-- {{ processBlackList.nickName }}님을 블랙리스트에서 삭제하시겠어요? -->
        {{ $t('members.modal2.title').replace('{Place}', processBlackList.nickName) }}
      </h2>
      <div class="text-gray-400 pt-5 pb-8">
        <!-- ⚠️ 블랙리스트 해제 즉시 해당 유저는 모든 기능을 이용할 수 있습니다. -->
        {{ $t('members.modal2.description') }}
      </div>
      <div class="btns flex items-center justify-around gap-2">
        <a @click="setBlackList()" class="btn-vote">
          <!-- 확인 -->
          {{ $t('common.modal.btns.confirm') }}
        </a>
        <a @click="$modal.hide('sureRemoveBlackList')">
          <!-- 취소 -->
          {{ $t('common.modal.btns.cancel') }}
        </a>
      </div>
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
  </main>
</template>

<style lang="scss" scoped>
li {
  background: $color-ui;
}

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

    a {
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
import createFuzzyMatcher from '@/plugins/ch2pattern.js'

export default {
  data() {
    return {
      connState: 0, //0: 연결중, 1: 성공, 2: 응답 지연

      members: [], // Read-only
      memberList: [], // Read/Write

      processBlackList: {}, // 블랙리스트 모달 props
    }
  },
  async mounted() {
    try {
      const memberList = (
        await this.$axios.$get('http://192.168.1.9:4000/dashboard/members?id=' + this.$route.query.id, {
          // Production: API 서버 주소로 바꾸기 (eg. https://api.nguard.xyz/~~~ )
          headers: {
            access_token: localStorage.getItem('access_token'),
          },
        })
      ).data

      this.members = memberList
      this.memberList = memberList

      this.connState = 1
    } catch (e) {
      if (e.response) {
        if (e.response.data.message == 'Missing Access') {
          this.$router.push(`/${this.$i18n.locale}/servers`)
        } else {
          this.connState = 2
        }
      } else {
        this.connState = 2
      }
    }
  },
  methods: {
    sureBlackList: function (id, nickName) {
      this.processBlackList = { id: id, nickName: nickName }
      this.$modal.show('sureBlackList')
    },
    sureRemoveBlackList: function (id, nickName) {
      this.processBlackList = { id: id, nickName: nickName }
      this.$modal.show('sureRemoveBlackList')
    },
    setBlackList: async function () {
      const id = this.processBlackList.id
      this.processBlackList = {}

      this.$modal.hide('sureBlackList')
      this.$modal.hide('sureRemoveBlackList')

      try {
        this.connState = 0

        await this.$axios.$post(
          'http://192.168.1.9:4000/dashboard/members?id=' + this.$route.query.id,
          {
            member: String(id),
          },
          {
            // Production: API 서버 주소로 바꾸기 (eg. https://api.nguard.xyz/~~~ )
            headers: {
              access_token: localStorage.getItem('access_token'),
            },
          },
        )

        this.connState = 1

        const member = this.memberList.find(m => m.id === id)
        member.isBlackList = !member.isBlackList
      } catch (e) {
        this.$modal.show('fail')
        setTimeout(() => {
          this.$modal.hide('fail')
        }, 3000)
      }
    },
    searchMember: function (value) {
      this.memberList = []
      const matcher = createFuzzyMatcher(value)
      this.members.forEach(member => {
        if (!matcher.test(member.nickName) && !matcher.test(member.userName) && !matcher.test(member.id)) {
          return
        }
        this.memberList.push(member)
      })
    },
  },
}
</script>
