<script setup lang="ts">
import { Doughnut } from 'vue-chartjs'
import { computed, defineProps } from 'vue'

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

const props = defineProps({
  percentage: {
    type: Number,
    default: 0,
    required: true,
  },
  mesure: {
    type: String,
    default: '',
  },
  quantity: {
    type: Number,
    default: 0,
  },
  min: {
    type: Number,
    default: 0,
  },
  max: {
    type: Number,
    default: 100,
  },
  label: {
    type: String,
    default: '',
  },
  color: {
    type: String,
    default: '#41B883',
  },
})

const gaugeData = computed(() => {
  const percentage = Math.min(Math.max(props.percentage, props.min), props.max)
  const remaining = props.max - percentage

  return {
    labels: [props.label, ''],
    datasets: [
      {
        backgroundColor: [props.color, '#dfdfe8'],
        data: [percentage, remaining],
        borderWidth: 0,
        cutout: '85%',
        circumference: 290,
        rotation: 215,
      },
    ],
  }
})

const gaugeOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    tooltip: {
      enabled: false,
    },
    legend: {
      display: false,
    },
  },
}
</script>

<template>
  <div class="relative left-1/2 transform -translate-x-1/2 size-full mb-4">
    <Doughnut :data="gaugeData" :options="gaugeOptions" />
    <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div class="text-center">
        <div class="text-xl font-bold">{{ quantity }}</div>
        <div class="text-xs text-gray-500">{{ mesure }}</div>
      </div>
    </div>

    <div class="absolute top-[110%] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div class="text-center">
        <div class="text-sm">{{ label }}</div>
      </div>
    </div>
  </div>
</template>
