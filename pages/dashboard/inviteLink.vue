<template>
  <main>
    <h1>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M6.188 8.719c.439-.439.926-.801 1.444-1.087 2.887-1.591 6.589-.745 8.445 2.069l-2.246 2.245c-.644-1.469-2.243-2.305-3.834-1.949-.599.134-1.168.433-1.633.898l-4.304 4.306c-1.307 1.307-1.307 3.433 0 4.74 1.307 1.307 3.433 1.307 4.74 0l1.327-1.327c1.207.479 2.501.67 3.779.575l-2.929 2.929c-2.511 2.511-6.582 2.511-9.093 0s-2.511-6.582 0-9.093l4.304-4.306zm6.836-6.836l-2.929 2.929c1.277-.096 2.572.096 3.779.574l1.326-1.326c1.307-1.307 3.433-1.307 4.74 0 1.307 1.307 1.307 3.433 0 4.74l-4.305 4.305c-1.311 1.311-3.44 1.3-4.74 0-.303-.303-.564-.68-.727-1.051l-2.246 2.245c.236.358.481.667.796.982.812.812 1.846 1.417 3.036 1.704 1.542.371 3.194.166 4.613-.617.518-.286 1.005-.648 1.444-1.087l4.304-4.305c2.512-2.511 2.512-6.582.001-9.093-2.511-2.51-6.581-2.51-9.092 0z"/></svg>
      초대링크 설정
    </h1>

    <h2>보안 초대링크</h2>
    <p>추가적인 보안을 적용한 초대링크를 제공합니다.</p>
    <form>
      <div>
        <label>보안 초대링크</label>
        <div
          @click="inputSwitch('invite')"
          :class="{ switch_on: switch_.invite }"
          class="switch"
        ></div>
      </div>

      <div class="vert" v-if="switch_.invite">
        <p>보안 초대 방식</p>
        <input
          class="input-l"
          id="method_input"
          :value="list.method.list[input.method]"
          @click="list.method.show = true"
          v-click-outside="onClickOutside"
          type="text"
          readonly
        />
        <ul class="list-l" v-if="list.method.show">
          <li
            v-for="(name, index) in list.method.list"
            @click="input.method = index"
          >
            {{name}}
          </li>
        </ul>
      </div>

      <div class="vert" v-if="switch_.invite">
        <p>초대 링크 설정</p>
        <div>
          <label>https://nguard.xyz/invite/</label>
          <input
            class="input-m"
            id="inviteLink_input"
            type="text"

            :placeholder="[!isPermission ? '한디리에서 봇을 추천해주세요' : '']"
            v-bind:readonly="!isPermission"

            @click="clickInviteLink()"
          />
        </div>
      </div>
    </form>

    <modal
      class="modal"
      name="permission"
      width="500"
    >
      <h2>Exterprise 플랜에 가입해주세요</h2>
      <div class="text-gray-400 pb-6">
        초대 링크를 커스텀하려면<br/>
        Exterprise 플랜에 가입하시거나,<br/>
        한디리에서 NGuard Security 봇을 추천해 주셔야 합니다.<br/>
        <br/>
        12시간 마다 다시 추천 가능합니다.
      </div>
      <div class="flex items-center justify-around gap-2">
        <a href="https://nguard.xyz/upgrade/detail" target="_blank" class="btn-plan">플랜</a>
        <a href="https://koreanbots.dev/bots/937636597040570388/vote" target="_blank">추천하기</a>
        <a @click="$modal.hide('permission')">취소</a>
      </div>
    </modal>
  </main>
</template>

<style lang="scss">
  #inviteLink_input,
  #method_input {
    cursor: pointer;
  }

  .modal .vm--modal {
    background-color: $color-bg;
    box-shadow: 0 10px 60px -2px rgba(14, 18, 36, 0.4);
    display: flex;
    flex-direction: column;
    // width: 500px !important;
    height: fit-content !important;
    padding: 30px;
    line-height: 2rem;
    border-radius: 12px;

    a {
      padding: 10px;
      background: $color-navbar;
      border-radius: 10px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;

      &:hover {
        background: darken($color-navbar, 3%);
      }

      &.btn-plan {
        background: $color-highlight;

        &:hover {
          background: darken($color-highlight, 7%);
        }
      }
    }
  }
</style>

<script>
import vClickOutside from 'v-click-outside';

//한디리 추천 or 엔터프라이즈 클랜
const isPermission = false;

export default {
  data() {
    return {
      isPermission,
      input: {
        method: 0
      },
      switch_: {
        invite: false,
      },
      list: {
        method: {
          show: false,
          list: [
            'ReCaptcha (권장)',
            'ReCaptcha + 다중 인증 (보안 최상)'
          ]
        }
      }
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
      this.list.method.show = false;
    },
    clickInviteLink() {
      if(!isPermission) {
        this.$modal.show('permission');
      }
    }
  },
}
</script>