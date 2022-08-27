<template>
  <div class="w-full min-h-full" style="background: #0f1016">
    <Header />

    <div class="bottom_content flex w-full min-h-screen">
      <Navbar />
      
      <nuxt-child />
    </div>
  </div>
</template>

<style scoped lang="scss">
  .page-enter-active,
  .page-leave-active {
    transition: opacity 0.1s;
  }
  .page-enter,
  .page-leave-to {
    opacity: 0;
  }

  @media (max-width: 660px) {
    .bottom_content {
      display: block;
    }
  }
</style>

<style lang="scss">
main {
  @media (max-width: 1023px) {
    padding: calc(2rem + 72px) 4rem 2rem 3rem;
    margin: 0;
  }

  @media (max-width: 660px) {
    padding: calc(1rem + 72px + 46px) 2rem 2rem 2rem !important;
  
    .card {
      padding: 10px 20px !important;
    }
  }

  @media (max-width: 767px) {
    padding: calc(1rem + 72px) 2rem 2rem 2rem;

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

      div {
        display: flex;
        flex-direction: column;
        align-items: flex-start !important;
        gap: 5px;
      }
    }

    input {
      max-width: 100% !important;
    }

    ul {
      &.list-l {
        max-width: 100% !important;
      }
    }

    .modal .vm--modal {
      width: 100% !important;
      left: 0 !important;
      border-radius: 0px !important;
    }

    .blank {
      height: 20px !important;
    }
  }

  //컬러 변수들은 @/assets/styles/_variables.scss에 있음.

  color: $color-white;
  padding: calc(2rem + 72px) 10vw 2rem 6rem;
  width: 100%;
  height: 100vh;
  overflow-y: scroll;

  h1 {
    font-weight: 600;
    font-size: 1.95rem;
    line-height: 2.5rem;
    margin-bottom: 1.5rem;
    display: flex;
    align-items: center;
    gap: 10px;
    color: $color-h1;

    svg {
      width: 28px;
      height: 28px;
      fill: $color-h1;
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
    color: $color-gray;
    word-break: keep-all;
  }

  form {
    border-left: 3px $color-gray solid;
    margin: 25px 0px;
    padding: 3px 0 3px 22px;
    font-size: 1.1rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 15px;

    p {
      margin-bottom: 5px;
    }

    div {
      &.vert {
        width: 100%;
        flex-direction: column;
        align-items: flex-start;
      }

      width: inherit;
      display: flex;
      align-items: center;
    }

    label {
      margin-right: 12px;
      flex-shrink: 0;
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
        max-width: 32rem;
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
      background: $color-ui;

      li {
        &:hover {
          background: $color-white-transparent;
        }

        height: 2.2rem;
        margin: 0 0.4rem;
        padding-left: 1.2rem;
        display: flex;
        align-items: center;
        border-radius: 0.5rem;
        flex-shrink: 0;
        cursor: pointer;

        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }

  .switch {
    &.switch_on {
      &:before {
        left: 26px;
      }

      background: $color-switch-active;
    }

    &:before {
      content: '';
      border-radius: 100px;
      position: absolute;
      top: 2px;
      left: 2px;
      width: 26px;
      height: 26px;
      background: $color-fakeWhite;
      transition: left 0.15s cubic-bezier(0.17, 0.84, 0.44, 1);
    }

    position: relative;
    display: inline-block;
    cursor: pointer;
    width: 54px;
    height: 30px;
    border-radius: 100px;
    background: $color-ui;
    transition: background 0.2s cubic-bezier(0.17, 0.84, 0.44, 1);
  }

  input {
    &:focus {
      outline: 2px solid $color-highlight !important;
    }

    &.input-s {
      max-width: 4.2rem;
    }
    &.input-m {
      max-width: 24rem;
    }
    &.input-l {
      max-width: 32rem;
    }

    flex-shrink: 1;
    width: 100%;
    height: 2.1rem;
    padding: 0px 0.8rem;
    border-radius: 0.5rem;
    outline: 0px solid transparent !important;
    background: $color-ui;
    cursor: pointer;
  }

  .select {
    &.active {
      outline: 2px solid $color-highlight !important;

      &:after {
        transform: rotate(180deg);
      }
    }

    &:after {
      content: url("data:image/svg+xml,%3Csvg fill='%236b7280' clip-rule='evenodd' fill-rule='evenodd' stroke-linejoin='round' stroke-miterlimit='2' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='m16.843 10.211c.108-.141.157-.3.157-.456 0-.389-.306-.755-.749-.755h-8.501c-.445 0-.75.367-.75.755 0 .157.05.316.159.457 1.203 1.554 3.252 4.199 4.258 5.498.142.184.36.29.592.29.23 0 .449-.107.591-.291 1.002-1.299 3.044-3.945 4.243-5.498z'/%3E%3C/svg%3E%0A");
      
      position: absolute;
      top: 7px;
      right: 7px;

      width: 20px;
      height: 20px;
      transition: transform 0.2s ease;
    }

    &.select-s {
      max-width: 4.2rem;
    }
    &.select-m {
      max-width: 24rem;
    }
    &.select-l {
      max-width: 32rem;
    }

    position: relative;
    flex-direction: row !important;
    display: flex;
    align-items: center !important;
    justify-content: flex-start;
    overflow-x: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    flex-shrink: 1;
    width: 100%;
    height: 2.1rem;
    padding: 0px 0.8rem;
    border-radius: 0.5rem;
    outline: 0px solid transparent !important;
    background: $color-ui;
    cursor: pointer;
  }

  .card {
    background: $color-ui;
    border-radius: 0.5rem;
    width: 100%;
    padding: 15px 20px;
    font-size: 22px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    svg {
      fill: $color-gray;
    }
  }

  .modal .vm--modal {
    background-color: $color-navbar;
    box-shadow: 0 10px 60px -2px rgba(14, 18, 36, 0.4);
    height: fit-content !important;
    border-radius: 12px;
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
