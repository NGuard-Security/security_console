<template>
  <main>
    <h1>
      <svg
        width="24"
        height="24"
        clip-rule="evenodd"
        fill-rule="evenodd"
        stroke-linejoin="round"
        stroke-miterlimit="2"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="m11.998 2.005c5.517 0 9.997 4.48 9.997 9.997 0 5.518-4.48 9.998-9.997 9.998-5.518 0-9.998-4.48-9.998-9.998 0-5.517 4.48-9.997 9.998-9.997zm-5.049 10.386 3.851 3.43c.142.128.321.19.499.19.202 0 .405-.081.552-.242l5.953-6.509c.131-.143.196-.323.196-.502 0-.41-.331-.747-.748-.747-.204 0-.405.082-.554.243l-5.453 5.962-3.298-2.938c-.144-.127-.321-.19-.499-.19-.415 0-.748.335-.748.746 0 .205.084.409.249.557z"
          fill-rule="nonzero"
        />
      </svg>
      <!-- 커맨드 인증 -->
      {{ $t('verify.title') }}
    </h1>

    <transition name="contents">
      <div v-if="connState == 1">
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
              <li v-for="(role, index) in list.role.list" @click="input.role = role">
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
          <div class="text-gray-400 pt-5">
            <span v-if="switch_.confirm" v-html="$t('verify.modal.applied')">
              <!-- 새로운 유저가 <code>/verify</code> 명령어로 인증할 수 있습니다. -->
            </span>
            <span v-else v-html="$t('verify.modal.deleted')">
              <!-- 새로운 유저는 더 이상 <code>/verify</code> 명령어로 인증할 수 없습니다. -->
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

<script>
import vClickOutside from 'v-click-outside'
import catchNetworkError from '@/plugins/catchNetworkError.js'

export default {
  data() {
    return {
      connState: 0, //0: 연결중, 1: 성공, 2: 응답 지연
      input: {
        role: '',
      },
      switch_: {
        confirm: false,
      },
      list: {
        role: {
          show: false,
          list: [], // Read/Write
        },
      },
      roleList: [], // Read-only
    }
  },
  async mounted() {
    try {
      const settings = (
        await this.$axios.$get('/dashboard/verify?id=' + this.$route.query.id, {
          headers: {
            access_token: localStorage.getItem('access_token'),
          },
        })
      ).data

      if (settings.settings) {
        this.switch_.confirm = true
        this.list.role.list = settings.guild.roles
        this.roleList = settings.guild.roles
        this.input.role = settings.settings.role ? settings.settings.role : settings.guild.roles[0]
      } else {
        this.switch_.confirm = false
        this.list.role.list = settings.guild.roles
        this.input.role = settings.guild.roles[0]
      }

      this.connState = 1
    } catch (e) {
      if (e.response) {
        if (e.response.data.message == 'Missing Access') {
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
    inputSwitch: function (name) {
      this.switch_[name] = !this.switch_[name]
    },
    onClickOutside() {
      this.list.role.show = false
    },
    async saveSettings() {
      try {
        await this.$axios.$post(
          'http://25.34.66.22:4000/dashboard/verify?id=' + this.$route.query.id,
          {
            status: this.switch_.confirm,
            role: this.input.role,
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
