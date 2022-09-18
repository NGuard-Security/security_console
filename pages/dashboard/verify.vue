<template>
  <main>
      <h1>
          <svg width="24" height="24" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path
                  d="m11.998 2.005c5.517 0 9.997 4.48 9.997 9.997 0 5.518-4.48 9.998-9.997 9.998-5.518 0-9.998-4.48-9.998-9.998 0-5.517 4.48-9.997 9.998-9.997zm-5.049 10.386 3.851 3.43c.142.128.321.19.499.19.202 0 .405-.081.552-.242l5.953-6.509c.131-.143.196-.323.196-.502 0-.41-.331-.747-.748-.747-.204 0-.405.082-.554.243l-5.453 5.962-3.298-2.938c-.144-.127-.321-.19-.499-.19-.415 0-.748.335-.748.746 0 .205.084.409.249.557z"
                  fill-rule="nonzero"
              />
          </svg>
          커맨드 인증
      </h1>

      <transition name="contents">
          <div v-if="connState == 1">
              <h2>커맨드 인증 설정</h2>
              <p>서버 내에서 명령어를 이용해 인증을 진행합니다.</p>
              <form>
                  <div>
                      <label>커맨드 인증</label>
                      <div @click="inputSwitch('confirm')" :class="{ switch_on: switch_.confirm }" class="switch"></div>
                  </div>

                  <div class="vert" v-if="switch_.confirm">
                      <p>인증 시 지급될 역할</p>
                      <input class="input-l" id="role_input" :value="input.role.name" @click="list.role.show = true" readonly v-click-outside="onClickOutside" type="text" placeholder="역할이름" />
                      <ul class="list-l" v-if="list.role.show">
                          <li v-for="(role, index) in list.role.list" @click="input.role = role">
                              {{ role.name }}
                          </li>
                      </ul>
                  </div>
              </form>

              <button class="btn-save" @click="saveSettings()">
                저장하기
              </button>

              <modal class="modal" name="success" width="500">
                <h2>성공적으로 저장했습니다!</h2>
                <div class="text-gray-400 pt-5">
                    <span v-if="switch_.confirm">
                        새로운 유저가 <code>/verify</code> 명령어로 인증하면,<br />
                        <code>{{ input.role.name }}</code> 역할이 지급됩니다.
                    </span>
                    <span v-else>
                        새로운 유저는 더 이상 <code>/verify</code> 명령어로 인증할 수 없습니다. 
                    </span>

                    <br /><br />

                    ⚠️ 새로고침하여 제대로 저장되었는지 확인해 주시기 바랍니다.<br />
                    혹여나 저장되지 않은 경우 하단 채널톡으로 문의 주시기 바랍니다.<br /><br />
                    ℹ️ 이 창은 3초 후 자동으로 닫힙니다.
                </div>
                <div class="btns"></div>
              </modal>
          </div>
      </transition>

      <div v-if="connState != 1" class="absolute left-0 top-0 items-center h-screen w-full flex justify-center">
          <!-- 스피너 -->
          <transition name="spiner">
              <div v-if="connState == 0" style="height: 500px;" class="flex items-center justify-center flex-col absolute container mx-auto sm:px-4">
                  <h3 class="pb-8 text-2xl font-semibold">불러오는 중</h3>
                  <div class="spinner"></div>
              </div>
          </transition>

          <!-- 응답 지연 -->
          <transition name="connErr">
              <div v-if="connState == 2" id="ratelimit">
                  <div class="text-center">
                      <h4 class="text-xl pt-5 text-white">Rate limit이 발생했습니다.</h4>
                      <h4 class="text-xl pt-5 text-white">잠시 후 다시 시도해 주세요.</h4>
                  </div>
              </div>
          </transition>

          <!-- 초대 필요 -->
          <transition name="inviteErr">
            <div v-if="connState == 3" id="invite">
                <div class="text-center">
                <h4 class="text-xl pt-5 text-white">봇 초대 화면이 팝업으로 오픈되었습니다.</h4>
                <h4 class="text-xl pt-5 text-white">팝업이 열리지 않는다면, 팝업 차단을 해제해 주세요.</h4>
                </div>
            </div>
          </transition>
      </div>
  </main>
</template>

<script>
  import vClickOutside from "v-click-outside";

  export default {
      data() {
          return {
              connState: 0, //0: 연결중, 1: 성공, 2: 응답 지연, 3: 초대 필요
              input: {
                  role: "",
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
          };
      },
      async mounted() {
        try {
            const settings = (
                await this.$axios.$get("http://127.0.0.1:4000/dashboard/verify?id=" + this.$route.query.id, {
                    // Production: API 서버 주소로 바꾸기 (eg. https://api.nguard.xyz/~~~ )
                    headers: {
                        access_token: localStorage.getItem("access_token"),
                    },
                })
            ).data;

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

            this.connState = 1;
        } catch (e) {
            console.log(e)
            this.connState = 2;
        }
      },
      directives: {
          clickOutside: vClickOutside.directive,
      },
      methods: {
          inputSwitch: function (name) {
              this.switch_[name] = !this.switch_[name];
          },
          onClickOutside() {
              this.list.role.show = false;
          },
          async saveSettings() {
            try {
                await this.$axios.$post("http://127.0.0.1:4000/dashboard/verify?id=" + this.$route.query.id, {
                    status: this.switch_.confirm,
                    role: this.input.role,
                }, {
                    // Production: API 서버 주소로 바꾸기 (eg. https://api.nguard.xyz/~~~ )
                    headers: {
                        access_token: localStorage.getItem("access_token"),
                    },
                })

                this.$modal.show("success");
                setTimeout(() => {
                    this.$modal.hide("success");
                }, 3000);
            } catch (e) {
                this.connState = 2;
            }
          }
      },
  };
</script>
