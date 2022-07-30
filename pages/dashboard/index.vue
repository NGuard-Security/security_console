<template>
  <div class="w-full h-full bg-slate-900">
    <Navbar />
    <Sidebar />
    asdasd
  </div>
</template>

<script>
import Navbar from '~/components/navbar.vue';
import Sidebar from '~/components/sidebar.vue';
export default {
    name: "IndexPage",
    components: { Navbar, Sidebar }
}
</script>