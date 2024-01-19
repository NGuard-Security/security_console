<template>
  <main>
    <h1>
      <SvgIcon name="navBar/main" />
      <!-- 메인 대시보드 -->
      {{ $t('summary.title') }}
    </h1>

    <NuxtLayout name="spiner-wrap">
      <div class="cards grid gap-3">
        <div class="card">
          <div class="card_content">
            <p>
              <!-- 전체 멤버 수 -->
              {{ $t('summary.totalMembers') }}
            </p>
            <span>
              <!-- {{ summary.user }}명 -->
              {{
                $t('summary.peoplesTemplate')
                  .toLowerCase()
                  .replace('n', String(summaryData?.user || '0'))
              }}
            </span>
          </div>
          <SvgIcon name="navBar/member" />
        </div>
        <div class="card">
          <div class="card_content">
            <p>
              <!-- 전체 봇 수 -->
              {{ $t('summary.totalBots') }}
            </p>
            <span>
              <!-- {{ summary.bot }}명 -->
              {{
                $t('summary.peoplesTemplate')
                  .toLowerCase()
                  .replace('n', String(summaryData?.bot || '0'))
              }}
            </span>
          </div>
          <SvgIcon name="robot" />
        </div>
        <div class="card">
          <div class="card_content">
            <p>
              <!-- 최근 새 멤버 -->
              {{ $t('summary.newMembers') }}
            </p>
            <span>
              <!-- {{ summary.new_user }}명 -->
              {{
                $t('summary.peoplesTemplate')
                  .toLowerCase()
                  .replace('n', String(summaryData?.newUser || '0'))
              }}
            </span>
          </div>
          <SvgIcon name="userAdd" />
        </div>
        <div class="card">
          <div class="card_content">
            <p>
              <!-- 전체 블랙리스트 유저 수 -->
              {{ $t('summary.totalBlacklists') }}
            </p>
            <span>
              <!-- {{ summary.black_user }}명 -->
              {{
                $t('summary.peoplesTemplate')
                  .toLowerCase()
                  .replace('n', String(summaryData?.blackUser || '0'))
              }}
            </span>
          </div>
          <SvgIcon name="noSign" />
        </div>
      </div>

      <div class="blank"></div>

      <div>
        <h2>
          <!-- 알림 목록 -->
          {{ $t('summary.alarms.title') }}
        </h2>
        <div class="alertCenter p-4 rounded-lg">
          <div v-if="!alertsData || alertsData.length < 1" class="alert_none">알림이 없습니다.</div>
          <div
            v-else
            :style="{ height: alertCenterHeight }"
            class="cards grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 overflow-hidden"
          >
            <div
              v-for="(item, index) in !isAlertOpened ? alertsData.slice(0, 4) : alertsData"
              v-bind:key="index"
              class="card alert"
              :class="'card_' + [item.kind]"
            >
              <div class="card_content alert_content">
                <div class="alert_title flex items-center mb-3 text-xl" :class="'title_' + [item.kind]">
                  <SvgIcon v-if="item.kind === ALERT.Alert" name="alert/kind/alert" />
                  <SvgIcon v-if="item.kind === ALERT.Success" name="alert/kind/alert" />
                  <SvgIcon v-if="item.kind === ALERT.Warning" name="alert/kind/warning" />
                  <SvgIcon v-if="item.kind === ALERT.Danger" name="alert/kind/warning" />
                  <SvgIcon v-if="item.kind === ALERT.Emerg" name="alert/kind/warning" />

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
            v-if="alertsData && alertsData.length > 1"
            class="foldBtn flex items-center justify-center mt-4 py-2 w-full rounded-lg"
            @click="setAlertsIsOpened()"
          >
            <svgIcon v-if="!isAlertOpened" name="arrowDown" />
            <svgIcon v-else name="arrowUp" />
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
        <DashboardInviteURLUsageChart v-if="summaryData" :data="summaryData.chartData" />
      </div>
    </NuxtLayout>
  </main>
</template>

<style lang="scss" scoped>
@import url('~/assets/styles/pages/dashboard/index.scss');
</style>

<script setup lang="ts">
definePageMeta({
  middleware: ['auth', 'guild-id'],
})

const route = useRoute()
const API = useAPI()
const { alertsData, loadPush, checkPush, onPushCheck } = useSocketAlert()

const { loadingSuccess } = useLoadingState()

const alertCenterHeight = useState('alertCenterHeight', () => 'auto')
const alertInterval = useState<NodeJS.Timeout | null>('alertInterval', () => null)
const isAlertOpened = useState<boolean>('isAlertOpened', () => false)

const summaryData = useState<APISummary | null>('summaryData', () => null)

const setAlertsIsOpened = () => {
  isAlertOpened.value = !isAlertOpened.value
  resizeAlerts()
}

const resizeAlerts = () => {
  if (!process.client) return

  if (!isAlertOpened.value) {
    const el = document.querySelectorAll('.card.alert')[0] as HTMLDivElement
    if (!el) return

    alertCenterHeight.value = `${el.offsetHeight}px`
  } else {
    alertCenterHeight.value = 'auto'
  }
}

onMounted(async () => {
  try {
    summaryData.value = await API.get.summary()

    loadPush(Number(route.query.id))

    onPushCheck(resizeAlerts)

    alertInterval.value = setInterval(() => {
      checkPush(Number(route.query.id))
    }, 5000)

    await wait(200)

    resizeAlerts()
    loadingSuccess()
  } catch (e) {}
})

onUnmounted(() => {
  if (!alertInterval.value) return

  clearInterval(alertInterval.value)
  alertInterval.value = null
  alertsData.value = []
})
</script>
