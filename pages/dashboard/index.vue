<template>
  <main>
    <h1>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20.822 18.096c-3.439-.794-6.64-1.49-5.09-4.418 4.72-8.912 1.251-13.678-3.732-13.678-5.082 0-8.464 4.949-3.732 13.678 1.597 2.945-1.725 3.641-5.09 4.418-3.073.71-3.188 2.236-3.178 4.904l.004 1h23.99l.004-.969c.012-2.688-.092-4.222-3.176-4.935z"/></svg>
      일반 설정
    </h1>
    <h2>봇 접두사 설정</h2>
    <p>명령어 앞에 붙는 접두사를 변경합니다. 기본값은 입니다.</p>
    <form>
      <div>
        <label>봇 접두사</label>
        <input type="text" id="prefix" class="w-20 h-9 px-2 bg-zinc-700 rounded-lg outline-none focus:ring focus:ring-blue-500" />
      </div>
    </form>
    <div class="blank"></div>
    <h2>공지 수신 채널 설정</h2>
    <p>공지 메시지를 받을 채널을 선택합니다. 이 메시지는 여러 서버 점검 등 중요 알림이 포함됩니다.</p>
    <form>
      <div>
        <label>공지 메시지 받기</label>
        <div
          @click="inputSwitch('bot_prefix')"
          :class="{ switch_on : switchs.bot_prefix }"
          class="switch"
        ></div>
      </div>

      <div>
        <select>
          <option value="">직업선택</option>
          <option value="학생">학생</option>
          <option value="회사원">회사원</option>
          <option value="기타">기타</option>
        </select>
      </div>
    </form>
  </main>
</template>


<script>
export default {
  data() {
    return {
      switchs: {
        bot_prefix: false,
      },
    }
  },
  methods: {
    inputSwitch: function (name) {
      this.switchs[name] = !this.switchs[name];
    }
  }
}
</script>