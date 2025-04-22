<script setup lang="ts">
import AppSidebar from '@/components/AppSidebar.vue'
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
  { percentage: 75, mesure: 'grammes', quantity: 1000, label: 'Pâtes', color: '#41B883' },
  { percentage: 45, mesure: 'grammes', quantity: 765, label: 'Sucre', color: '#E46651' },
  { percentage: 30, mesure: 'millilitres', quantity: 340, label: 'Lait', color: '#00D8FF' },
  { percentage: 60, mesure: 'grammes', quantity: 356, label: 'Beurre', color: '#DD1B16' },
]
</script>

<template>
  <AppSidebar>
    <div class="flex gap-3">
      <Card class="w-full">
        <CardHeader>
          <CardTitle>Ingrédients Connectées</CardTitle>
          <CardDescription>
            Voici un aperçu des ingrédients connectés et de leurs valeurs nutritionnelles.
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

      <Card class="w-full">
        <CardHeader>
          <CardTitle>Recette</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent> Card Content </CardContent>
        <CardFooter> Card Footer </CardFooter>
      </Card>
    </div>
  </AppSidebar>
</template>
