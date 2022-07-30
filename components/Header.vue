<template>
<header class="w-full text-sm bg-black">
  <div class="flex items-center justify-between max-w-screen-xl mx-auto p-4 text-gray-200">
    <nuxt-img
      src="~/assets/img/test.png"
      alt="NGuard logo"
      quality="1"
      class="w-8"
    />

    <div class="flex items-center gap-2">
      <NuxtLink to="/" class="nav_item">홈</NuxtLink>
      <NuxtLink to="/" class="nav_item">대시보드</NuxtLink>
      <NuxtLink to="/" class="nav_item">서포트 서버</NuxtLink>
      <NuxtLink to="/" class="nav_item">엔터프라이즈 플랜</NuxtLink>
      <NuxtLink to="/" class="nav_item">고객 민원 / 문의</NuxtLink>
    </div>

    <NuxtLink to="/" class="nav_item">로그인</NuxtLink>
  </div>
</header>
</template>

<style scoped>
.nav_item {
  padding: 8px;
  border-radius: 8px;
}

.nav_item:hover {
  background-color: rgba(255, 255, 255, 0.125);
}
</style>