<template>
  <main>
    <h1>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20.822 18.096c-3.439-.794-6.64-1.49-5.09-4.418 4.72-8.912 1.251-13.678-3.732-13.678-5.082 0-8.464 4.949-3.732 13.678 1.597 2.945-1.725 3.641-5.09 4.418-3.073.71-3.188 2.236-3.178 4.904l.004 1h23.99l.004-.969c.012-2.688-.092-4.222-3.176-4.935z"/></svg>
      멤버 설정
    </h1>

    <input
      placeholder="이름, 닉네임, ID 검색"
      class="mb-4 shrink-0"
      @input="searchMember($event.target.value)"
    />
    <p class="mb-2">멤버 {{memberList.length}}명</p>
    <ul>
      <li v-for="member in memberList">
        <img src="~/assets/img/test.png" alt="user_logo" class="h-8 mr-2 rounded-lg"/>
        
        <span class="mr-1 text-lg">{{member.nickName}}</span>
        <p>{{member.userName}}</p>

        <button
          v-if="!member.isBlackList"
          class="text-sm p-1.5 rounded-lg bg-zinc-900"
          @click="setBlackList(member.id)"
        >
          블랙리스트
        </button>
        <button
          v-else
          class="text-sm text-red-500 p-1.5 rounded-lg"
          style="background: rgb(56, 23, 23);"
          @click="setBlackList(member.id)"
        >
          블랙리스트 해제
        </button>
      </li>
    </ul>
  </main>
</template>

<style lang="scss" scoped>
$color-ui: rgb(32, 34, 41);
$color-h1: #555;
$color-gray: #999;
$color-white: #fff;
$color-highlight: rgb(22, 124, 241);
$color-active: rgb(38, 189, 106);

main {
  max-width: 70rem;
  display: flex;
  flex-direction: column;
}

ul {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 100%;
  overflow-y: scroll;

  li {
    padding: 1rem 1.8rem;
    display: flex;
    align-items: center;
    border-radius: 0.5rem;
    background: $color-ui;
    box-sizing: content-box;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    flex-shrink: 0;

    button {
      margin-left: auto;
    }
  }
}
</style>

<script>
import createFuzzyMatcher from '@/plugins/ch2pattern.js';

const memberList = [
  { nickName: "라비", userName: "라비 lavi#2253", id: "3452897345567", icon: "", isBlackList: false },
  { nickName: "라비", userName: "라비 lavi#2253", id: "3452897345568", icon: "", isBlackList: true },
  { nickName: "라비", userName: "라비 lavi#2253", id: "3452897345569", icon: "", isBlackList: true },
  { nickName: "라비", userName: "라비 lavi#2253", id: "3452897345570", icon: "", isBlackList: false },
  { nickName: "라비", userName: "라비 lavi#2253", id: "3452897345571", icon: "", isBlackList: false },
  { nickName: "라비", userName: "라비 lavi#2253", id: "3452897345572", icon: "", isBlackList: false },
  { nickName: "라비", userName: "라비 lavi#2253", id: "3452897345573", icon: "", isBlackList: false },
  { nickName: "라비", userName: "라비 lavi#2253", id: "3452897345574", icon: "", isBlackList: false },
  { nickName: "라비", userName: "라비 lavi#2253", id: "3452897345575", icon: "", isBlackList: false },
  { nickName: "라비", userName: "라비 lavi#2253", id: "3452897345576", icon: "", isBlackList: false },
  { nickName: "라비", userName: "라비 lavi#2253", id: "3452897345577", icon: "", isBlackList: false },
  { nickName: "라비", userName: "라비 lavi#2253", id: "3452897345578", icon: "", isBlackList: false },
];

export default {
  data() {
    return {
      memberList,
    }
  },
  methods: {
    setBlackList: function(id) {
      //DB 처리 후
      const member = memberList.find(m => m.id === id);
      member.isBlackList = !member.isBlackList;
    },
    searchMember: function (value) {
      this.memberList = [];

      const matcher = createFuzzyMatcher(value);

      memberList.forEach(member => {
        if(
          !matcher.test(member.nickName)
          && !matcher.test(member.userName)
          && !matcher.test(member.id)
        ) {
          return;
        }
        this.memberList.push(member);
      });
    },
  },
}
</script>