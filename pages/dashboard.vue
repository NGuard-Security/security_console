<!--
position,
display,
width,
height,
margin,
padding,
border,
font text,
background,
-->

<template>
<div class="flex flex-col w-full h-full" style="background: #0f1016">
  <Navbar />

  <div class="flex w-full h-full">
    <Sidebar />

    <nuxt-child />
  </div>
</div>
</template>

<!--  반응형 + 앱과 연동  -->

<style lang="scss">
.page-enter-active,
.page-leave-active {
  transition: opacity 0.2s;
}
.page-enter,
.page-leave-to {
  opacity: 0;
}

main {
  color: #fff;
  padding: 2rem 6rem 0 6rem;
  width: 100%;

  h1 {
    font-weight: 600;
    font-size: 2.25rem;
    line-height: 2.5rem;
    margin-bottom: 2rem;
    display: flex;
    align-items: center;
    gap: 10px;
    color: #555;

    svg {
      width: 28px;
      height: 28px;
      fill: #555;
    }
  }

  h2 {
    font-weight: 600;
    font-size: 1.6rem;
    line-height: 2rem;
    margin-bottom: 0.5rem;
  }

  p {
    font-weight: 300;
    color: #999;
  }

  form {
    border-left: 4px #333 solid;
    margin: 25px 0px;
    padding: 5px 22px;
    font-size: 20px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 15px;

    div {
      display: flex;
      align-items: center;
    }

    label {
      margin-right: 12px;
    }
  }

  .switch {
    &.switch_on {
      &:before {
        left: 28px;
      }

      background: rgb(38, 189, 106);
      // background: #7bd3f7;
    }

    &:before {
      content: "";
      border-radius: 100px;
      position: absolute;
      top: 2px;
      left: 2px;
      width: 28px;
      height: 28px;
      background: rgb(235, 235, 235);
      transition: left 0.15s cubic-bezier(.17,.84,.44,1);
    }

    position: relative;
    display: inline-block;
    width: 58px;
    height: 32px;
    border-radius: 100px;
    background: rgb(32, 34, 41);
    transition: background 0.2s cubic-bezier(.17,.84,.44,1);
  }

  select {
    width: 450px;
    height: 40px;
    border-radius: 10px;
    background: rgb(32, 34, 41);
  }

  .blank {
    display: block;
    height: 40px;
  }
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