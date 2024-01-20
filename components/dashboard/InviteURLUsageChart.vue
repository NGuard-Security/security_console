<template>
  <Line :data="chartData" :options="chartOptions" />
</template>

<script setup lang="ts">
import moment from 'moment'
import { Line } from 'vue-chartjs'

const props = defineProps<{ data: number[] }>()

const chartData = useState('chartData', () => {
  return {
    labels: [] as string[],
    datasets: [
      {
        data: [] as number[],
        borderColor: 'rgb(33, 100, 226)',
        backgroundColor: 'rgb(33, 100, 226)',
        borderWidth: 3,
      },
    ],
  }
})
const chartOptions = useState('chartOptions', () => {
  return {
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
  }
})

const currentMonth = moment().month()
const monthStart = (currentMonth % 12) + 1
const labels: string[] = []
const propsData = [...props.data]
const value = propsData.splice(currentMonth).concat(propsData.slice(0, currentMonth))

for (let i = 0; i < 12; i++) {
  const month = ((monthStart - 1 + i) % 12) + 1
  const isThisYear = i > 12 - currentMonth - 1

  if (isThisYear) {
    labels.push(`${moment().format('YY')}년 ${month}월`)
  } else {
    labels.push(`${moment().subtract(1, 'years').format('YY')}년 ${month}월`)
  }
}

chartData.value.labels = labels
chartData.value.datasets[0].data = value
</script>
