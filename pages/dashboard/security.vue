<template>
  <main>
    <h1>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          d="M12 0c-2.995 2.995-7.486 4-11 4 0 8.583 5.068 16.097 11 20 5.932-3.903 11-11.417 11-20-3.514 0-8.005-1.005-11-4z"
        />
      </svg>
      보안 설정
    </h1>
    <h2>봇 접두사 설정</h2>
    <p>명령어 앞에 붙는 접두사를 변경합니다. 기본값은 입니다.</p>
    <form>
      <div>
        <label>봇 접두사</label>
        <input
          type="text"
          id="prefix"
          class="w-20 h-9 px-2 bg-zinc-700 rounded-lg outline-none focus:ring focus:ring-blue-500"
        />
      </div>
    </form>
  </main>
</template>
