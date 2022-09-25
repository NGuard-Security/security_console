<template>
  <main>
      <h1>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path d="M2 0c-1.104 0-2 .896-2 2v15c0 1.104.896 2 2 2h20c1.104 0 2-.896 2-2v-15c0-1.104-.896-2-2-2h-20zm20 14h-20v-12h20v12zm-6.599 7c0 1.6 1.744 2.625 2.599 3h-12c.938-.333 2.599-1.317 2.599-3h6.802z" />
          </svg>
          메인 대시보드
      </h1>

      <transition name="contents">
          <div v-if="connState == 1">
              <div class="cards grid grid-cols-4 gap-3">
                  <div class="card">
                      <div class="card_content">
                          <p>전체 멤버 수</p>
                          <span>{{ summary.user }}명</span>
                      </div>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                          <path
                              d="M20.822 18.096c-3.439-.794-6.64-1.49-5.09-4.418 4.72-8.912 1.251-13.678-3.732-13.678-5.082 0-8.464 4.949-3.732 13.678 1.597 2.945-1.725 3.641-5.09 4.418-3.073.71-3.188 2.236-3.178 4.904l.004 1h23.99l.004-.969c.012-2.688-.092-4.222-3.176-4.935z"
                          />
                      </svg>
                  </div>
                  <div class="card">
                      <div class="card_content">
                          <p>전체 봇 수</p>
                          <span>{{ summary.bot }}명</span>
                      </div>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" data-name="Layer 1" viewBox="0 0 24 24">
                          <path
                              d="M9,15a1,1,0,1,0,1,1A1,1,0,0,0,9,15ZM2,14a1,1,0,0,0-1,1v2a1,1,0,0,0,2,0V15A1,1,0,0,0,2,14Zm20,0a1,1,0,0,0-1,1v2a1,1,0,0,0,2,0V15A1,1,0,0,0,22,14ZM17,7H13V5.72A2,2,0,0,0,14,4a2,2,0,0,0-4,0,2,2,0,0,0,1,1.72V7H7a3,3,0,0,0-3,3v9a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V10A3,3,0,0,0,17,7ZM13.72,9l-.5,2H10.78l-.5-2ZM18,19a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V10A1,1,0,0,1,7,9H8.22L9,12.24A1,1,0,0,0,10,13h4a1,1,0,0,0,1-.76L15.78,9H17a1,1,0,0,1,1,1Zm-3-4a1,1,0,1,0,1,1A1,1,0,0,0,15,15Z"
                          />
                      </svg>
                  </div>
                  <div class="card">
                      <div class="card_content">
                          <p>최근 새 멤버</p>
                          {{ summary.new_user }}명
                      </div>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                          <path
                              d="M19.5 15c-2.483 0-4.5 2.015-4.5 4.5s2.017 4.5 4.5 4.5 4.5-2.015 4.5-4.5-2.017-4.5-4.5-4.5zm2.5 5h-2v2h-1v-2h-2v-1h2v-2h1v2h2v1zm-7.18 4h-14.815l-.005-1.241c0-2.52.199-3.975 3.178-4.663 3.365-.777 6.688-1.473 5.09-4.418-4.733-8.729-1.35-13.678 3.732-13.678 6.751 0 7.506 7.595 3.64 13.679-1.292 2.031-2.64 3.63-2.64 5.821 0 1.747.696 3.331 1.82 4.5z"
                          />
                      </svg>
                  </div>
                  <div class="card">
                      <div class="card_content">
                          <p>전체 블랙리스트 유저 수</p>
                          <span>{{ summary.black_user }}명</span>
                      </div>
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 1792 1792" preserveAspectRatio="none">
                          <path
                              d="M1440 893q0-161-87-295l-754 753q137 89 297 89 111 0 211.5-43.5T1281 1280t116-174.5 43-212.5zm-999 299 755-754q-135-91-300-91-148 0-273 73T425 619t-73 274q0 162 89 299zm1223-299q0 157-61 300t-163.5 246-245 164-298.5 61-298.5-61-245-164T189 1193t-61-300 61-299.5T352.5 348t245-164T896 123t298.5 61 245 164T1603 593.5t61 299.5z"
                          />
                      </svg>
                  </div>
              </div>

              <div class="blank"></div>
              <div class="blank"></div>

              <h2>초대링크 이용 유저 그래프</h2>
              <div style="width: 100%; height: 400px;">
                  <canvas id="myChart"></canvas>
              </div>
          </div>
      </transition>

      <Spiner :type=2 :state=connState />
  </main>
</template>

<style lang="scss" scoped>
  .cards {
      @media (max-width: 1500px) {
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      }

      @media (max-width: 660px) {
          grid-template-columns: 1fr;

          .card .card_content {
              display: flex;
              align-items: center;
              gap: 10px;

              p {
                  margin: 0 !important;
              }

              svg {
                  width: 20px;
                  height: 20px;
              }
          }
      }
  }
</style>

<script>
  import vClickOutside from "v-click-outside";
  import Chart from "chart.js/auto";
  import Spiner from "../../components/Spiner.vue";

  export default {
    data() {
        return {
            connState: 0, //0: 연결중, 1: 성공, 2: 응답 지연, 3: 초대 필요
            guild: {},
            summary: {
                bot: 0,
                user: 0,
                new_user: 0,
                black_user: 0,
                chart_data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            },
        };
    },
    async mounted() {
        try {
            const data = (await this.$axios.$get("http://127.0.0.1:4000/dashboard/summary?id=" + this.$route.query.id, {
                // Production: API 서버 주소로 바꾸기 (eg. https://api.nguard.xyz/~~~ )
                headers: {
                    access_token: localStorage.getItem("access_token"),
                },
            })).data;
            this.summary = data;
            this.connState = 1;
        } catch (e) {
            if (e.response) {
                if (e.response.data.message == "Missing Access") {
                    window.open("https://nguard.xyz/bot/invite?id=" + this.$route.query.id, "Invite", "width=562px, height=972px, top=30px, left=675px, resizable=no");
                    this.connState = 3;
                } else {
                    this.connState = 2;
                }
            } else {
                this.connState = 2;
            }
        }
        setTimeout(() => {
            let ctx = document.getElementById("myChart");
            const myChart = new Chart(ctx, {
                type: "line",
                data: {
                    labels: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
                    datasets: [
                        {
                            data: this.summary.chart_data,
                            borderColor: "rgb(33, 100, 226)",
                            backgroundColor: "rgb(33, 100, 226)",
                            borderWidth: 3,
                        },
                    ],
                },
                options: {
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false,
                        },
                    },
                    scales: {
                        x: {
                            grid: {
                                display: false,
                            },
                        },
                        y: {
                            suggestedMin: -20,
                            suggestedMax: 20,
                            ticks: {
                                display: false,
                            },
                            grid: {
                                color: "#222",
                                drawBorder: false,
                            },
                        },
                    },
                },
            });
        }, 10);
    },
    directives: {
        clickOutside: vClickOutside.directive,
    },
    methods: {},
    components: { Spiner }
};
</script>
