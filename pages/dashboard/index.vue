<template>
  <main>
    <h1>
      <SvgIcon name="navBar/main" />
      <!-- 메인 대시보드 -->
      {{ $t('summary.title') }}
    </h1>

    <NuxtLayout name="spiner-provider">
      <div class="cards grid grid-cols-4 gap-3">
        <div class="card">
          <div class="card_content">
            <p>
              <!-- 전체 멤버 수 -->
              {{ $t('summary.totalMembers') }}
            </p>
            <span>
              <!-- {{ summary.user }}명 -->
              {{ $t('summary.peoplesTemplate').toLowerCase().replace('n', String(summaryData.user)) }}
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
              {{ $t('summary.peoplesTemplate').toLowerCase().replace('n', String(summaryData.bot)) }}
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
              {{ $t('summary.peoplesTemplate').toLowerCase().replace('n', String(summaryData.new_user)) }}
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
              {{ $t('summary.peoplesTemplate').toLowerCase().replace('n', String(summaryData.black_user)) }}
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
          <div v-if="alertsData.length < 1" class="alert_none">알림이 없습니다.</div>
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
            v-if="alertsData.length > 1"
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
        <DashboardInviteURLUsageChart :data="summaryData.summary" />
      </div>
    </NuxtLayout>
  </main>
</template>

<style lang="scss" scoped>
@import url('~/assets/styles/pages/dashboard/index.scss');
</style>

<script setup lang="ts">
import { ALERT, LOADING_STATE } from '#imports'

definePageMeta({
  layout: 'dashboard',
  // middleware: ['auth', 'guild-id'],
})

const initChartEvent = useEventBus('initInviteURLUsageChart')
const route = useRoute()
const { getAPISummary } = useAPI()
const { alertsData, loadPush, checkPush, onPushCheck } = useSocketAlert()

const loadingState = useState<LOADING_STATE>('loadingState', () => LOADING_STATE.Connecting)

const summaryData = useState<APISummary>('summaryData', () => {
  return { user: 0, bot: 0, new_user: 0, black_user: 0, summary: [] }
})

const alertCenterHeight = useState('alertCenterHeight', () => 'auto')
const alertInterval = useState<NodeJS.Timeout | null>('alertInterval', () => null)
const isAlertOpened = useState<boolean>('isAlertOpened', () => false)

const setAlertsIsOpened = () => {
  isAlertOpened.value = !isAlertOpened.value
  resizeAlerts()
}

const resizeAlerts = () => {
  if (!isAlertOpened.value) {
    //FIXME - Uncaught TypeError: document.querySelectorAll(...)[0] is undefined
    // alertCenterHeight.value = `${(document.querySelectorAll('.card.alert')[0] as HTMLDivElement).offsetHeight}px`
  } else {
    alertCenterHeight.value = 'auto'
  }
}

onMounted(async () => {
  try {
    summaryData.value = await getAPISummary(Number(route.query.id))

    loadPush(Number(route.query.id))

    onPushCheck(resizeAlerts)

    alertInterval.value = setInterval(() => {
      checkPush(Number(route.query.id))
    }, 5000)

    setTimeout(() => {
      initChartEvent.emit()
      resizeAlerts()
      loadingState.value = LOADING_STATE.Success
    }, 100)
  } catch (e) {}
})

onUnmounted(() => {
  if (!alertInterval.value) return

  clearInterval(alertInterval.value)
  alertInterval.value = null
})
</script>
