<template>
  <main>
    <h1>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path
          d="M2 0c-1.104 0-2 .896-2 2v15c0 1.104.896 2 2 2h20c1.104 0 2-.896 2-2v-15c0-1.104-.896-2-2-2h-20zm20 14h-20v-12h20v12zm-6.599 7c0 1.6 1.744 2.625 2.599 3h-12c.938-.333 2.599-1.317 2.599-3h6.802z"
        />
      </svg>
      <!-- 메인 대시보드 -->
      {{ $t('summary.title') }}
    </h1>

    <transition name="contents">
      <div v-if="connState == 1">
        <div class="cards grid grid-cols-4 gap-3">
          <div class="card">
            <div class="card_content">
              <p>
                <!-- 전체 멤버 수 -->
                {{ $t('summary.totalMembers') }}
              </p>
              <span>
                <!-- {{ summary.user }}명 -->
                {{ $t('summary.peoplesTemplate').toLowerCase().replace('n', summary.user) }}
              </span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path
                d="M20.822 18.096c-3.439-.794-6.64-1.49-5.09-4.418 4.72-8.912 1.251-13.678-3.732-13.678-5.082 0-8.464 4.949-3.732 13.678 1.597 2.945-1.725 3.641-5.09 4.418-3.073.71-3.188 2.236-3.178 4.904l.004 1h23.99l.004-.969c.012-2.688-.092-4.222-3.176-4.935z"
              />
            </svg>
          </div>
          <div class="card">
            <div class="card_content">
              <p>
                <!-- 전체 봇 수 -->
                {{ $t('summary.totalBots') }}
              </p>
              <span>
                <!-- {{ summary.bot }}명 -->
                {{ $t('summary.peoplesTemplate').toLowerCase().replace('n', summary.bot) }}
              </span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" data-name="Layer 1" viewBox="0 0 24 24">
              <path
                d="M9,15a1,1,0,1,0,1,1A1,1,0,0,0,9,15ZM2,14a1,1,0,0,0-1,1v2a1,1,0,0,0,2,0V15A1,1,0,0,0,2,14Zm20,0a1,1,0,0,0-1,1v2a1,1,0,0,0,2,0V15A1,1,0,0,0,22,14ZM17,7H13V5.72A2,2,0,0,0,14,4a2,2,0,0,0-4,0,2,2,0,0,0,1,1.72V7H7a3,3,0,0,0-3,3v9a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V10A3,3,0,0,0,17,7ZM13.72,9l-.5,2H10.78l-.5-2ZM18,19a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V10A1,1,0,0,1,7,9H8.22L9,12.24A1,1,0,0,0,10,13h4a1,1,0,0,0,1-.76L15.78,9H17a1,1,0,0,1,1,1Zm-3-4a1,1,0,1,0,1,1A1,1,0,0,0,15,15Z"
              />
            </svg>
          </div>
          <div class="card">
            <div class="card_content">
              <p>
                <!-- 최근 새 멤버 -->
                {{ $t('summary.newMembers') }}
              </p>
              <span>
                <!-- {{ summary.new_user }}명 -->
                {{ $t('summary.peoplesTemplate').toLowerCase().replace('n', summary.new_user) }}
              </span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path
                d="M19.5 15c-2.483 0-4.5 2.015-4.5 4.5s2.017 4.5 4.5 4.5 4.5-2.015 4.5-4.5-2.017-4.5-4.5-4.5zm2.5 5h-2v2h-1v-2h-2v-1h2v-2h1v2h2v1zm-7.18 4h-14.815l-.005-1.241c0-2.52.199-3.975 3.178-4.663 3.365-.777 6.688-1.473 5.09-4.418-4.733-8.729-1.35-13.678 3.732-13.678 6.751 0 7.506 7.595 3.64 13.679-1.292 2.031-2.64 3.63-2.64 5.821 0 1.747.696 3.331 1.82 4.5z"
              />
            </svg>
          </div>
          <div class="card">
            <div class="card_content">
              <p>
                <!-- 전체 블랙리스트 유저 수 -->
                {{ $t('summary.totalBlacklists') }}
              </p>
              <span>
                <!-- {{ summary.black_user }}명 -->
                {{ $t('summary.peoplesTemplate').toLowerCase().replace('n', summary.black_user) }}
              </span>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 1792 1792"
              preserveAspectRatio="none"
            >
              <path
                d="M1440 893q0-161-87-295l-754 753q137 89 297 89 111 0 211.5-43.5T1281 1280t116-174.5 43-212.5zm-999 299 755-754q-135-91-300-91-148 0-273 73T425 619t-73 274q0 162 89 299zm1223-299q0 157-61 300t-163.5 246-245 164-298.5 61-298.5-61-245-164T189 1193t-61-300 61-299.5T352.5 348t245-164T896 123t298.5 61 245 164T1603 593.5t61 299.5z"
              />
            </svg>
          </div>
        </div>

        <div class="blank"></div>

        <div>
          <h2>
            <!-- 알림 목록 -->
            {{ $t('summary.alarms.title') }}
          </h2>
          <div class="alertCenter p-4 rounded-lg">
            <div v-if="(alerts.contents.length < 1)" class="alert_none">
              알림이 없습니다.
            </div>
            <div
              v-else
              :style="{ height: alertCenterHeight }"
              class="cards grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 overflow-hidden"
            >
              <div
                v-for="item in !alerts.isOpened ? alerts.contents.slice(0, 4) : alerts.contents"
                class="card alert"
                :class="'card_' + [item.kind]"
              >
                <div class="card_content alert_content">
                  <div class="alert_title flex items-center mb-3 text-xl" :class="'title_' + [item.kind]">
                    <svg
                      v-if="item.kind == 'alert'"
                      clip-rule="evenodd"
                      fill-rule="evenodd"
                      stroke-linejoin="round"
                      stroke-miterlimit="2"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="m12.002 2.005c5.518 0 9.998 4.48 9.998 9.997 0 5.518-4.48 9.998-9.998 9.998-5.517 0-9.997-4.48-9.997-9.998 0-5.517 4.48-9.997 9.997-9.997zm0 8c-.414 0-.75.336-.75.75v5.5c0 .414.336.75.75.75s.75-.336.75-.75v-5.5c0-.414-.336-.75-.75-.75zm-.002-3c-.552 0-1 .448-1 1s.448 1 1 1 1-.448 1-1-.448-1-1-1z"
                        fill-rule="nonzero"
                      />
                    </svg>
                    <svg
                      v-if="item.kind == 'success'"
                      clip-rule="evenodd"
                      fill-rule="evenodd"
                      stroke-linejoin="round"
                      stroke-miterlimit="2"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="m12.002 2.005c5.518 0 9.998 4.48 9.998 9.997 0 5.518-4.48 9.998-9.998 9.998-5.517 0-9.997-4.48-9.997-9.998 0-5.517 4.48-9.997 9.997-9.997zm0 8c-.414 0-.75.336-.75.75v5.5c0 .414.336.75.75.75s.75-.336.75-.75v-5.5c0-.414-.336-.75-.75-.75zm-.002-3c-.552 0-1 .448-1 1s.448 1 1 1 1-.448 1-1-.448-1-1-1z"
                        fill-rule="nonzero"
                      />
                    </svg>
                    <svg
                      v-if="item.kind == 'warning'"
                      clip-rule="evenodd"
                      fill-rule="evenodd"
                      stroke-linejoin="round"
                      stroke-miterlimit="2"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="m2.095 19.886 9.248-16.5c.133-.237.384-.384.657-.384.272 0 .524.147.656.384l9.248 16.5c.064.115.096.241.096.367 0 .385-.309.749-.752.749h-18.496c-.44 0-.752-.36-.752-.749 0-.126.031-.252.095-.367zm9.907-6.881c-.414 0-.75.336-.75.75v3.5c0 .414.336.75.75.75s.75-.336.75-.75v-3.5c0-.414-.336-.75-.75-.75zm-.002-3c-.552 0-1 .448-1 1s.448 1 1 1 1-.448 1-1-.448-1-1-1z"
                        fill-rule="nonzero"
                      />
                    </svg>
                    <svg
                      v-if="item.kind == 'danger'"
                      clip-rule="evenodd"
                      fill-rule="evenodd"
                      stroke-linejoin="round"
                      stroke-miterlimit="2"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="m2.095 19.886 9.248-16.5c.133-.237.384-.384.657-.384.272 0 .524.147.656.384l9.248 16.5c.064.115.096.241.096.367 0 .385-.309.749-.752.749h-18.496c-.44 0-.752-.36-.752-.749 0-.126.031-.252.095-.367zm9.907-6.881c-.414 0-.75.336-.75.75v3.5c0 .414.336.75.75.75s.75-.336.75-.75v-3.5c0-.414-.336-.75-.75-.75zm-.002-3c-.552 0-1 .448-1 1s.448 1 1 1 1-.448 1-1-.448-1-1-1z"
                        fill-rule="nonzero"
                      />
                    </svg>
                    <svg
                      v-if="item.kind == 'emerg'"
                      clip-rule="evenodd"
                      fill-rule="evenodd"
                      stroke-linejoin="round"
                      stroke-miterlimit="2"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="m2.095 19.886 9.248-16.5c.133-.237.384-.384.657-.384.272 0 .524.147.656.384l9.248 16.5c.064.115.096.241.096.367 0 .385-.309.749-.752.749h-18.496c-.44 0-.752-.36-.752-.749 0-.126.031-.252.095-.367zm9.907-6.881c-.414 0-.75.336-.75.75v3.5c0 .414.336.75.75.75s.75-.336.75-.75v-3.5c0-.414-.336-.75-.75-.75zm-.002-3c-.552 0-1 .448-1 1s.448 1 1 1 1-.448 1-1-.448-1-1-1z"
                        fill-rule="nonzero"
                      />
                    </svg>

                    <h4>{{ item.title }}</h4>
                  </div>
                  <span>{{ item.content }}</span>

                  <a
                    class="alert_btn"
                    :href="item.button.href"
                    target="_blank"
                    v-if="
                      item.button.href.includes('http:') ||
                      item.button.href.includes('https:') ||
                      item.button.href.includes('mailto:') ||
                      item.button.href.includes('tel:') ||
                      item.button.href.includes('sms:')
                    "
                  >
                    {{ item.button.text }}
                  </a>
                  <NuxtLink class="alert_btn" :to="item.button.href" v-else>{{ item.button.text }}</NuxtLink>
                </div>
              </div>
            </div>

            <button
              v-if="alerts.contents.length > 1"
              class="foldBtn flex items-center justify-center mt-4 py-2 w-full rounded-lg"
              @click="setAlertsIsOpened()"
            >
              <svg
                v-if="!alerts.isOpened"
                class="w-6"
                clip-rule="evenodd"
                fill-rule="evenodd"
                stroke-linejoin="round"
                stroke-miterlimit="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="m16.843 10.211c.108-.141.157-.3.157-.456 0-.389-.306-.755-.749-.755h-8.501c-.445 0-.75.367-.75.755 0 .157.05.316.159.457 1.203 1.554 3.252 4.199 4.258 5.498.142.184.36.29.592.29.23 0 .449-.107.591-.291 1.002-1.299 3.044-3.945 4.243-5.498z"
                />
              </svg>
              <svg
                v-else
                class="w-6"
                clip-rule="evenodd"
                fill-rule="evenodd"
                stroke-linejoin="round"
                stroke-miterlimit="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="m16.843 13.789c.108.141.157.3.157.456 0 .389-.306.755-.749.755h-8.501c-.445 0-.75-.367-.75-.755 0-.157.05-.316.159-.457 1.203-1.554 3.252-4.199 4.258-5.498.142-.184.36-.29.592-.29.23 0 .449.107.591.291 1.002 1.299 3.044 3.945 4.243 5.498z"
                />
              </svg>
              <!-- 더보기 -->
              {{ $t('summary.alarms.more') }}
            </button>
          </div>
        </div>

        <div class="blank"></div>

        <h2>
          <!-- 초대링크 이용 유저 그래프 -->
          {{ $t('summary.graph.title') }}
        </h2>
        <div class="userGraph w-full p-4 rounded-lg">
          <canvas ref="myChart"></canvas>
        </div>
      </div>
    </transition>

    <Spiner :type="2" :state="connState" />
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

@media (max-width: 660px) {
  .alert_content {
    flex-direction: column;

    span {
      -webkit-line-clamp: 2 !important;
      margin-bottom: 1rem !important;
    }
  }
}

.alertCenter {
  background-color: $color-wrap;
  
  .alert_none {
    padding-top: 3.5rem;
    padding-bottom: 3.5rem;
    margin-left: auto;
    margin-right: auto;
    width: fit-content;
    color: $color-gray;
    font-size: 0.85rem;
  }

  .alert {
    padding: 15px 20px !important;
    min-width: 0px;

    &.card_emerg {
      background-color: $color-danger-bg;
    }
  }

  .alert_content {
    min-width: 0px;
    width: 100%;
    display: block !important;

    .alert_title {
      font-weight: 700;

      h4 {
        overflow: hidden;
      }

      svg {
        flex-shrink: 0;
        margin-right: 0.3rem;
      }

      &.title_alert {
        svg {
          width: 1.5rem;
          fill: $color-gray;
        }
      }

      &.title_success {
        svg {
          width: 1.5rem;
          fill: $color-success;
        }

        h4 {
          color: $color-success-text;
        }
      }

      &.title_warning {
        svg {
          width: 1.6rem;
          fill: $color-warning;
        }
        h4 {
          color: $color-warning-text;
        }
      }

      &.title_danger,
      &.title_emerg {
        svg {
          width: 1.6rem;
          fill: $color-danger;
          filter: drop-shadow(0px 0px 10px $color-danger);
        }
        h4 {
          color: $color-danger-text;
        }
      }
    }

    span {
      color: $color-gray;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
      word-wrap: break-word;
      word-break: keep-all;
      font-size: 1rem;
      line-height: 1.3em;
      margin-bottom: 2rem;
    }

    .alert_btn {
      font-size: 13px;
      padding: 10px;
      background: $color-bg;
      border-radius: 10px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;

      &:hover {
        background: darken($color-bg, 3%);
      }
    }
  }

  .foldBtn {
    transition: background 0.06s;

    color: $color-gray;
    fill: $color-gray;

    &:hover {
      background: $color-bg;
    }
  }
}

.userGraph {
  height: 400px;
  background-color: $color-wrap;
}
</style>

<script>
import vClickOutside from 'v-click-outside'
import Chart from 'chart.js/auto'
import catchNetworkError from '@/plugins/catchNetworkError'
import { io } from 'socket.io-client'

export default {
  data() {
    return {
      connState: 0, //0: 연결중, 1: 성공, 2: 응답 지연
      guild: {},
      summary: {
        bot: 0,
        user: 0,
        new_user: 0,
        black_user: 0,
        chart_data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      },
      alerts: {
        isOpened: false,
        contents: [],
        interval: null,
      },
      alertCenterHeight: 'auto',
      socket: null,
    }
  },
  async mounted() {
    window.addEventListener('resize', this.resizeAlerts)

    const socket = io('http://127.0.0.1:4000/')

    socket.on('push:load', pushs => {
      this.alerts.contents = pushs
    })

    socket.on('push:check', pushs => {
      let alerts = [].concat(this.alerts.contents, pushs)

      for (let i = 0; i < alerts.length; i++) {
        if (Number(alerts[i].due) < new Date().getTime()) {
          alerts.splice(i, 1)
          i--
        }
      }

      this.alerts.contents = alerts.sort(a => {
        if (a.kind == 'emerg') return -1
        if (a.kind == 'danger') return 0
        if (a.kind == 'warning') return 1
        if (a.kind == 'success') return 2
        if (a.kind == 'alert') return 3
      })

      this.resizeAlerts()
    })

    socket.on('push:error', e => {
      console.log(e)
      alert('통신 중 오류가 발생하였습니다. 채널톡으로 문의해 주세요.')
    })

    socket.emit('push:load', {
      guild: this.$route.query.id,
      access_token: localStorage.getItem('access_token'),
    })

    this.alerts.interval = setInterval(() => {
      socket.emit('push:check', {
        guild: this.$route.query.id,
        access_token: localStorage.getItem('access_token'),
        already: this.alerts.contents.map(alert => alert.id),
      })

      new Audio('/audio/alarm.mp3').play()
    }, 5000)

    try {
      this.summary = (
        await this.$axios.$get('/dashboard/summary?id=' + this.$route.query.id, {
          headers: {
            access_token: localStorage.getItem('access_token'),
          },
        })
      ).data

      setTimeout(() => {
        this.initChart()
        this.resizeAlerts()
      }, 100)

      this.connState = 1
    } catch (e) {
      if (e.response) {
        if (e.response.data.message == 'Missing Access') {
          this.$router.push(`/${this.$i18n.locale}/servers`)
        }
      }

      catchNetworkError(e)
      this.connState = 2
    }
  },
  destroyed() {
    window.removeEventListener('resize', this.resizeAlerts)

    clearInterval(this.alerts.interval)
    this.alerts.interval = null
  },
  directives: {
    clickOutside: vClickOutside.directive,
  },
  methods: {
    isMobile() {
      return window.innerWidth <= 660
    },
    resizeAlerts() {
      try {
        if (!this.alerts.isOpened) {
          this.alertCenterHeight = document.querySelectorAll('.card.alert')[0].offsetHeight + 'px'
        } else {
          this.alertCenterHeight = 'auto'
        }
      } catch (e) {}
    },
    setAlertsIsOpened() {
      this.alerts.isOpened = !this.alerts.isOpened
      this.resizeAlerts()
    },
    initChart() {
      // let ctx = document.getElementById('myChart').getContext('2d')
      let ctx = this.$refs.myChart.getContext('2d')

      new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
          datasets: [
            {
              data: this.summary.chart_data,
              borderColor: 'rgb(33, 100, 226)',
              backgroundColor: 'rgb(33, 100, 226)',
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
                color: '#222',
                drawBorder: false,
              },
            },
          },
        },
      })
    },
  },
}
</script>
