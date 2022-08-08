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
  $ui-color: rgb(32, 34, 41);
  $color-blue: rgb(22, 124, 241);
  $color-green: rgb(38, 189, 106);

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
    font-size: 16px;
    font-weight: 300;
    color: #999;
    margin-bottom: 8px;
  }

  form {
    border-left: 4px #999 solid;
    margin: 25px 0px;
    padding: 5px 22px;
    font-size: 20px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 18px;

    div {
      &.vert {
        flex-direction: column;
        align-items: flex-start;
      }

      width: fit-content;
      display: flex;
      align-items: center;
    }

    label {
      margin-right: 12px;
    }
  }

  input {
    &:focus {
      outline: 3px solid $color-blue !important;
    }

    &.input-s {
      width: 5rem;
    }

    &.input-m {
      width: 12rem;
    }

    &.input-l {
      width: 30rem;
    }

    height: 2.25rem;
    padding: 0px 0.8rem;
    border-radius: 0.5rem;
    outline: 0px solid transparent !important;
    background: $ui-color;
  }

  .switch {
    &.switch_on {
      &:before {
        left: 28px;
      }

      background: $color-green;
    }

    &:before {
      content: '';
      border-radius: 100px;
      position: absolute;
      top: 2px;
      left: 2px;
      width: 28px;
      height: 28px;
      background: rgb(235, 235, 235);
      transition: left 0.15s cubic-bezier(0.17, 0.84, 0.44, 1);
    }

    position: relative;
    display: inline-block;
    width: 58px;
    height: 32px;
    border-radius: 100px;
    background: $ui-color;
    transition: background 0.2s cubic-bezier(0.17, 0.84, 0.44, 1);
  }

  ul {
    $ul-length: 5;

    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    overflow-y: scroll;
    max-height: calc(
      0.8rem + calc(2.4rem * $ul-length) + calc(0.4rem * calc($ul-length - 1))
    );
    width: 100%;
    margin-top: 10px;
    padding: 0.4rem 0;
    border-radius: 0.5rem;
    background: $ui-color;

    li {
      &:hover {
        background: #fff1;
      }

      height: 2.4rem;
      margin: 0 0.4rem;
      padding-left: 1.2rem;
      display: flex;
      align-items: center;
      border-radius: 0.5rem;
      flex-shrink: 0;
      cursor: pointer;
    }
  }

  .blank {
    display: block;
    height: 40px;
  }
}
</style>

<script>
import Navbar from '~/components/Header.vue'
import Sidebar from '~/components/Sidebar.vue'
export default {
  name: 'IndexPage',
  components: { Navbar, Sidebar },
}
</script>
