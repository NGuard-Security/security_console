<template>
  <div class="servers-wrap flex items-center justify-center flex-col w-full h-full min-h-screen px-10">
    <h1 class="w-fit text-3xl font-bold mx-auto mb-14">서버 선택</h1>

    <div class="servers grid gap-8 mb-20">
      <div v-for="server in serverList" class="server flex flex-col gap-1 p-3 text-white items-center rounded-xl mx-auto">
        <div class="flex justify-between w-full gap-4 mb-3">
          <img src="@/assets/img/test.png" class="w-14 rounded-xl shrink-0" />

          <h3 class="w-full h-fit my-auto font-bold leading-6 overflow-hidden text-ellipsis">
            {{server.name}}
          </h3>
        </div>

        <a href="dashboard" v-if="server.isInvited" class="btn-manage">관리</a>
        <a href="dashboard" v-else>초대하기</a>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .servers-wrap {
    @media (max-width: 767px) {
      padding-top: calc(2rem + 72px);
    }
    @media (max-width: 1028px) {
      display: block;
    }

    padding-top: calc(3rem + 72px);
    padding-bottom: 3rem;
    background-color: $color-bg;

    h1 {
      color: $color-fakeWhite;
    }
  }

  .servers {
    @media (max-width: 1028px) {
      grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
      width: 100%;
      margin-bottom: 0;

      .server {
        width: 100% !important;
      }
    }

    grid-template-columns: repeat(3, minmax(260px, 1fr));

    .server {
      background: $color-navbar;
      width: 260px;

      h3 {
        @media (max-width: 660px) {
          font-size: 1.25rem !important;
        }

        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }

      a {
        @media (max-width: 660px) {
          font-size: 1.1rem !important;
        }

        background: $color-bg;
        padding: 8px 10px;
        border-radius: 6px;
        width: 100%;
        text-align: center;

        &:hover {
          background: darken($color-bg, 3%);
        }

        &.btn-manage {
          background: $color-highlight;

          &:hover {
            background: darken($color-highlight, 7%);
          }
        }
      }
    }
  }
</style>

<script>
const serverList = [
  {name: "서버1", icon: "", isInvited: true},
  {name: "NGuard Securities Management Team", icon: "", isInvited: false},
  {name: "서버3", icon: "", isInvited: false},
  {name: "서버4", icon: "", isInvited: false},
  {name: "서버5", icon: "", isInvited: true},
  {name: "서버6", icon: "", isInvited: false},
]

export default {
  data() {
    return {
      serverList : serverList.sort((a, b) => a.isInvited ? -1 : 1),
    }
  },
  methods: {
  },
}
</script>