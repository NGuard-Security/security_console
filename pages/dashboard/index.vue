<template>
  <main>
    <h1>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path
          d="M20.822 18.096c-3.439-.794-6.64-1.49-5.09-4.418 4.72-8.912 1.251-13.678-3.732-13.678-5.082 0-8.464 4.949-3.732 13.678 1.597 2.945-1.725 3.641-5.09 4.418-3.073.71-3.188 2.236-3.178 4.904l.004 1h23.99l.004-.969c.012-2.688-.092-4.222-3.176-4.935z"
        />
      </svg>
      일반 설정
    </h1>
    <h2>봇 접두사 설정</h2>
    <p>명령어 앞에 붙는 접두사를 변경합니다. 기본값은 입니다.</p>
    <form>
      <div>
        <label>봇 접두사</label>
        <input
          class="input-s"
          :value="input.prefix"
          @input="input.prefix = $event.target.value"
          placeholder="!"
          type="text"
        />
      </div>
    </form>
    <div class="blank"></div>
    <h2>공지 수신 채널 설정</h2>
    <p>
      공지 메시지를 받을 채널을 선택합니다. 이 메시지는 여러 서버 점검 등 중요
      알림이 포함됩니다.
    </p>
    <form>
      <div>
        <label>공지 메시지 받기</label>
        <div
          @click="inputSwitch('bot_prefix')"
          :class="{ switch_on: switch_.bot_prefix }"
          class="switch"
        ></div>
      </div>

      <div class="vert" v-if="switch_.bot_prefix">
        <p>메시지를 받을 체널</p>
        <input
          class="input-l"
          :value="input.channel"
          @click="
            list.channel.show = true;
            setChannelInput($event.target.value);
            searchChannel($event.target.value.substr(2));
          "
          @input="
            setChannelInput($event.target.value);
            searchChannel($event.target.value.substr(2));
          "
          v-click-outside="onClickOutside"
          placeholder="# 채널-이름"
          type="text"
        />
        <ul class="list-l" v-if="list.channel.show">
          <li
            v-for="name in list.channel.list"
            @click="
              setChannelInput('# ' + name);
            "
          ># {{name}}</li>
        </ul>
      </div>
    </form>
    <h2>공지 수신 채널 설정</h2>
    <h2>공지 수신 채널 설정</h2>
    <h2>공지 수신 채널 설정</h2>
    <h2>공지 수신 채널 설정</h2>
    <h2>공지 수신 채널 설정</h2>
    <h2>공지 수신 채널 설정</h2>
    <h2>공지 수신 채널 설정</h2>
    <h2>공지 수신 채널 설정</h2>
    <h2>공지 수신 채널 설정</h2>
    <h2>공지 수신 채널 설정</h2>
    <h2>공지 수신 채널 설정</h2>
    <h2>공지 수신 채널 설정</h2>
    <h2>공지 수신 채널 설정</h2>
    <h2>공지 수신 채널 설정</h2><h2>공지 수신 채널 설정</h2>
    <h2>공지 수신 채널 설정</h2>
    <h2>공지 수신 채널 설정</h2>
    <h2>공지 수신 채널 설정</h2>
    <h2>공지 수신 채널 설정</h2>
    <h2>공지 수신 채널 설정</h2>
    <h2>공지 수신 채널 설정</h2>
    <h2>공지 수신 채널 설정</h2>
    <h2>공지 수신 채널 설정</h2>
    <h2>공지 수신 채널 설정</h2>
  </main>
</template>

<script>
import vClickOutside from 'v-click-outside';
var escapeRegExp = require('lodash.escaperegexp');

const exampleValue = [
  '직업선택',
  '학생',
  '회사원',
  '기타',
  '기타',
  '기타',
  '기타',
  '기타'
].sort();

// https://taegon.kim/archives/9919
function ch2pattern(ch) {
  const offset = 44032;

  if (/[가-힣]/.test(ch)) {
    const chCode = ch.charCodeAt(0) - offset;

    if (chCode % 28 > 0) {
      return ch;
    }
    const begin = Math.floor(chCode / 28) * 28 + offset;
    const end = begin + 27;
    return `[\\u${begin.toString(16)}-\\u${end.toString(16)}]`;
  }

  if (/[ㄱ-ㅎ]/.test(ch)) {
    const con2syl = {
      'ㄱ': '가'.charCodeAt(0),
      'ㄲ': '까'.charCodeAt(0),
      'ㄴ': '나'.charCodeAt(0),
      'ㄷ': '다'.charCodeAt(0),
      'ㄸ': '따'.charCodeAt(0),
      'ㄹ': '라'.charCodeAt(0),
      'ㅁ': '마'.charCodeAt(0),
      'ㅂ': '바'.charCodeAt(0),
      'ㅃ': '빠'.charCodeAt(0),
      'ㅅ': '사'.charCodeAt(0),
    };
    const begin = con2syl[ch] || ( ( ch.charCodeAt(0) - 12613 ) * 588 + con2syl['ㅅ'] );
    const end = begin + 587;
    return `[${ch}\\u${begin.toString(16)}-\\u${end.toString(16)}]`;
  }

  return escapeRegExp(ch);
}

function createFuzzyMatcher(input) {
  const pattern = input.split('').map(ch2pattern).join('.*?');
  return new RegExp(pattern);
}

export default {
  created() {
    this.list.channel.list = exampleValue;
  },
  data() {
    return {
      input: {
        prefix: '',
        channel: '',
      },
      switch_: {
        bot_prefix: false,
      },
      list: {
        channel: {
          show: false,
          list: []
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
    setChannelInput: function (value) {
      this.input.channel = '';
      this.input.channel = '# ' + value.substr(2);
    },
    searchChannel: function (value) {
      this.list.channel.list = [];

      exampleValue.forEach(name => {
        if(!createFuzzyMatcher(value).test(name)) {
          return;
        }

        this.list.channel.list.push(name);
      });
    },
    onClickOutside() {
      this.list.channel.show = false;
      if(this.input.channel == '# ') {
        this.input.channel = '';
      }
    },
  },
}
</script>
