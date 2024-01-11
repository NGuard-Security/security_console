<template>
  <canvas ref="myChart"></canvas>
</template>

<script setup lang="ts">
import Chart from 'chart.js/auto'
import moment from 'moment'

const props = defineProps<{ data: number[] }>()

const initChartEvent = useEventBus('initInviteURLUsageChart')
const chartEl = ref<HTMLCanvasElement>()

initChartEvent.on(() => {
  if (!chartEl.value) return

  const ctx = chartEl.value.getContext('2d')

  if (!ctx) return

  const labels: string[] = []
  const currentMonth = moment().month()
  const monthStart = (currentMonth % 12) + 1

  for (let i = 0; i < 12; i++) {
    const month = ((monthStart - 1 + i) % 12) + 1
    const isThisYear = i > 12 - currentMonth - 1

    if (isThisYear) {
      labels.push(`${moment().format('YY')}년 ${month}월`)
    } else {
      labels.push(`${moment().subtract(1, 'years').format('YY')}년 ${month}월`)
    }
  }

  const originalData = props.data
  const chartData = originalData.splice(currentMonth).concat(originalData.slice(0, currentMonth))

  new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          data: chartData,
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
            // drawBorder: false,
          },
        },
      },
    },
  })
})
</script>
