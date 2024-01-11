<template>
  <canvas ref="myChart"></canvas>
</template>

<script setup lang="ts">
import Chart from 'chart.js/auto'

const props = defineProps<{ data: number[] }>()

const initChartEvent = useEventBus('initInviteURLUsageChart')
const chartEl = ref<HTMLCanvasElement>()

initChartEvent.on(() => {
  if (!chartEl.value) return

  let ctx = chartEl.value.getContext('2d')

  if (!ctx) return

  //TODO - 리팩토링 필요

  let labelNumber = Array(12)
    .fill(undefined)
    .map((v, i) => i + 1)
    .splice(new Date().getMonth() + 1)

  let currentMonth = Array(new Date().getMonth() + 1)
    .fill(undefined)
    .map((v, i) => i + 1)

  let labels: string[] = []

  for (let i in labelNumber) {
    labels[i] = `${(new Date().getFullYear() - 1).toString().substring(2, 4)}년 ${labelNumber[i]}월`
  }

  for (let i in currentMonth) {
    labels.push(`${new Date().getFullYear().toString().substring(2, 4)}년 ${currentMonth[i]}월`)
  }

  let originalChartData = props.data
  let chartData = originalChartData.splice(new Date().getMonth() + 1)
  chartData = chartData.concat(originalChartData.slice(0, new Date().getMonth() + 1))

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
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
