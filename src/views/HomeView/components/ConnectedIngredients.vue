<script setup lang="ts">
import GaugeChart from '@/components/GaugeChart.vue'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const gaugeData = [
  { percentage: 75, mesure: 'grammes', quantity: 1000, label: 'Pâtes' },
  { percentage: 45, mesure: 'grammes', quantity: 765, label: 'Sucre' },
  { percentage: 30, mesure: 'millilitres', quantity: 340, label: 'Lait' },
  { percentage: 60, mesure: 'grammes', quantity: 356, label: 'Beurre' },
]
</script>

<template>
  <Card class="w-full">
    <CardHeader>
      <CardTitle>Ingrédients Connectées</CardTitle>
      <CardDescription>
        Voici un aperçu des ingrédients connectés et de leur stockage.
      </CardDescription>
    </CardHeader>

    <CardContent class="grid grid-cols-2 gap-y-6">
      <div class="w-full" v-for="(item, index) in gaugeData" :key="index">
        <GaugeChart
          class="h-[13dvh]"
          :percentage="item.percentage"
          :mesure="item.mesure"
          :label="item.label"
          :color="item.color"
          :quantity="item.quantity"
        />
      </div>
    </CardContent>
  </Card>
</template>
