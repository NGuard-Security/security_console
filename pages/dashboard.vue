<template>
  <div class="flex flex-col w-full min-h-full" style="background: #0f1016">
    <Header />

    <div class="bottom_content flex w-full">
      <Navbar />

      <nuxt-child />
    </div>
  </div>
</template>

<style scoped lang="scss">
  .page-enter-active,
  .page-leave-active {
    transition: opacity 0.2s;
  }
  .page-enter,
  .page-leave-to {
    opacity: 0;
  }

  @media (max-width: 660px) {
    .bottom_content {
      flex-direction: column;
    }
  }
</style>

<style lang="scss">
main {
  @media (max-width: 1023px) {
    padding: 2rem 4rem 2rem 3rem;
  }

  @media (max-width: 767px) {
    padding: 1rem 2rem 2rem 2rem;

    h1 {
      font-size: 1.7rem !important;
      gap: 8px !important;
      margin-bottom: 1rem !important;

      svg {
        width: 22px !important;
        height: 22px !important;
      }
    }

    form {
      margin: 15px 0 !important;
      padding: 1px 0 1px 18px !important;

      div.vert {
        width: 100% !important;
      }
    }

    input {
      &.input-l {
        max-width: 100% !important;
      }
    }

    ul {
      &.list-l {
        max-width: 100% !important;
      }
    }

    .blank {
      height: 20px !important;
    }
  }

  $ui-color: rgb(32, 34, 41);
  $color-blue: rgb(22, 124, 241);
  $color-green: rgb(38, 189, 106);

  color: #fff;
  padding: 2rem 6rem 2rem 6rem;
  width: 100%;
  height: min-content;

  h1 {
    font-weight: 600;
    font-size: 1.95rem;
    line-height: 2.5rem;
    margin-bottom: 1.5rem;
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
    font-size: 1.4rem;
    line-height: 2rem;
    margin-bottom: 0.3rem;
  }

  p {
    font-size: 0.9rem;
    font-weight: 300;
    color: #999;
    margin-bottom: 5px;
    word-break: keep-all;
  }

  form {
    border-left: 3px #999 solid;
    margin: 25px 0px;
    padding: 3px 0 3px 22px;
    font-size: 1.1rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 15px;

    div {
      &.vert {
        width: 100%;
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

  .switch {
    &.switch_on {
      &:before {
        left: 26px;
      }

      background: $color-green;
    }

    &:before {
      content: '';
      border-radius: 100px;
      position: absolute;
      top: 2px;
      left: 2px;
      width: 26px;
      height: 26px;
      background: rgb(235, 235, 235);
      transition: left 0.15s cubic-bezier(0.17, 0.84, 0.44, 1);
    }

    position: relative;
    display: inline-block;
    width: 54px;
    height: 30px;
    border-radius: 100px;
    background: $ui-color;
    transition: background 0.2s cubic-bezier(0.17, 0.84, 0.44, 1);
  }

  input {
    &:focus {
      outline: 2px solid $color-blue !important;
    }

    &.input-s {
      max-width: 4.2rem;
    }

    &.input-m {
      max-width: 12rem;
    }

    &.input-l {
      max-width: 30rem;
    }

    width: 100%;
    height: 2.1rem;
    padding: 0px 0.8rem;
    border-radius: 0.5rem;
    outline: 0px solid transparent !important;
    background: $ui-color;
  }

  ul {
    $ul-length: 5;

    &.list-s {
      max-width: 4.2rem;
    }

    &.list-m {
      max-width: 12rem;
    }

    &.list-l {
      max-width: 30rem;
    }

    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    overflow-y: scroll;
    max-height: calc(
      0.8rem + calc(2.2rem * $ul-length) + calc(0.2rem * calc($ul-length - 1))
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

      height: 2.2rem;
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
    height: 32px;
  }
}
</style>

<script>
import Header from '~/components/Header.vue';
import Navbar from '~/components/Navbar.vue';
export default {
  name: 'IndexPage',
  components: { Header, Navbar },
}
</script>
