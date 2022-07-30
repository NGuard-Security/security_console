<!-- tailwind 양식 -
display,
width,
height,
margin,
padding,
border,
font text,
background,
...) -->

<template>
<div class="flex flex-col w-full h-full bg-zinc-900">
  <Navbar />

  <div class="flex w-full h-full">
    <Sidebar />

    <main class="px-32 py-24 text-white">
      <h1>일반 설정</h1>
      <h2>봇 접두사 설정</h2>
      <p>명령어 앞에 붙는 접두사를 변경합니다. 기본값은 입니다.</p>
      <div class="flex items-center py-6">
        봇 접두사:
        <input class="w-20 h-8 ml-4 px-2 bg-zinc-700 rounded-lg" type="text" />
      </div>
    </main>
  </div>
</div>
</template>

<style scoped>
h1 {
  font-weight: 600;
  font-size: 2.25rem;
  line-height: 2.5rem;
  margin-bottom: 1.5rem;
}

h2 {
  font-weight: 500;
  font-size: 1.5rem;
  line-height: 2rem;
  margin-bottom: 0.5rem;
}
</style>

<script>
import Navbar from '~/components/Header.vue';
import Sidebar from '~/components/Sidebar.vue';
export default {
    name: "IndexPage",
    components: { Navbar, Sidebar }
}
</script>