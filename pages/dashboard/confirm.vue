<template>
  <main>
    <h1>
      <svg width="24" height="24" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m11.998 2.005c5.517 0 9.997 4.48 9.997 9.997 0 5.518-4.48 9.998-9.997 9.998-5.518 0-9.998-4.48-9.998-9.998 0-5.517 4.48-9.997 9.998-9.997zm-5.049 10.386 3.851 3.43c.142.128.321.19.499.19.202 0 .405-.081.552-.242l5.953-6.509c.131-.143.196-.323.196-.502 0-.41-.331-.747-.748-.747-.204 0-.405.082-.554.243l-5.453 5.962-3.298-2.938c-.144-.127-.321-.19-.499-.19-.415 0-.748.335-.748.746 0 .205.084.409.249.557z" fill-rule="nonzero"/></svg>
      커맨드 인증
    </h1>

    <h2>커맨드 인증 설정</h2>
    <p>추가적인 보안을 적용한 초대링크를 제공합니다.</p>
    <form>
      <div>
        <label>커맨드 인증</label>
        <div
          @click="inputSwitch('confirm')"
          :class="{ switch_on: switch_.confirm }"
          class="switch"
        ></div>
      </div>

      <div class="vert" v-if="switch_.confirm">
        <p>인증 시 지급될 역할</p>
        <input
          class="input-l"
          id="role_input"
          :value="input.role"
          @click="list.role.show = true"
          @input="searchRole($event.target.value)"
          v-click-outside="onClickOutside"
          type="text"
          placeholder="역할이름"
        />
        <ul class="list-l" v-if="list.role.show">
          <li
            v-for="name in list.role.list"
            @click="input.role = name"
          >
            {{name}}
          </li>
        </ul>
      </div>
    </form>
  </main>
</template>

<style lang="scss" scoped>
  #role_input {
    cursor: pointer;
  }
</style>

<script>
import vClickOutside from 'v-click-outside';
import createFuzzyMatcher from '@/plugins/ch2pattern.js';

const roleList = [
  "개발자",
  "서버장",
  "서버 부스터",
  "시민",
  "노예",
  "경고"
].sort()

export default {
  data() {
    return {
      input: {
        role: '',
      },
      switch_: {
        confirm: false,
      },
      list: {
        role: {
          show: false,
          list: roleList
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
      this.list.role.show = false;
    },
    searchRole: function (value) {
      this.list.role.list = [];
      roleList.forEach(name => {
        if(!createFuzzyMatcher(value).test(name)) {
          return;
        }
        this.list.role.list.push(name);
      });
    },
  },
}
</script>