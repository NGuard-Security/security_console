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
                      <input class="input-l" id="role_input" :value="input.role" @click="list.role.show = true" @input="searchRole($event.target.value)" v-click-outside="onClickOutside" type="text" placeholder="역할이름" />
                      <ul class="list-l" v-if="list.role.show">
                          <li v-for="name in list.role.list" @click="input.role = name">
                              {{name}}
                          </li>
                      </ul>
                  </div>
              </form>
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
                      <h4 class="text-xl pt-5 text-white">현재 응답이 지연되고 있습니다.</h4>
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
  import createFuzzyMatcher from "@/plugins/ch2pattern.js";

  const roleList = ["개발자", "서버장", "서버 부스터", "시민", "노예", "경고"].sort();

  export default {
      data() {
          return {
              connState: 1, //0: 연결중, 1: 성공, 2: 응답 지연, 3: 초대 필요
              input: {
                  role: "",
              },
              switch_: {
                  confirm: false,
              },
              list: {
                  role: {
                      show: false,
                      list: roleList,
                  },
              },
          };
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
              this.list.role.list = roleList;
          },
          searchRole: function (value) {
              this.input.role = value;
              this.list.role.list = [];
              roleList.forEach((name) => {
                  if (!createFuzzyMatcher(value).test(name)) {
                      return;
                  }
                  this.list.role.list.push(name);
              });
          },
      },
  };
</script>
