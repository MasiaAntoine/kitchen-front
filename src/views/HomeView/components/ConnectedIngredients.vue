<script setup lang="ts">
import type { IngredientDto } from '@/types/dto/ingredient.dto'

import { ref } from 'vue'

import GaugeChart from '@/components/GaugeChart.vue'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

const gaugeData = ref<IngredientDto[]>([
  { percentage: 75, mesure: 'grammes', quantity: 1000, label: 'Pâtes' },
  { percentage: 45, mesure: 'grammes', quantity: 765, label: 'Sucre' },
  { percentage: 30, mesure: 'millilitres', quantity: 340, label: 'Lait' },
  { percentage: 60, mesure: 'grammes', quantity: 356, label: 'Beurre' },
  { percentage: 20, mesure: 'grammes', quantity: 200, label: 'Farine' },
  { percentage: 90, mesure: 'grammes', quantity: 500, label: 'Sel' },
  { percentage: 10, mesure: 'millilitres', quantity: 100, label: 'Huile' },
])

const itemsPerSlide = 4
const slidesData: any[] = []

for (let i = 0; i < Math.ceil(gaugeData.value.length / itemsPerSlide); i++) {
  const start = i * itemsPerSlide
  const end = start + itemsPerSlide
  slidesData.push(gaugeData.value.slice(start, end))
}
</script>

<template>
  <Card class="w-full h-[45.7dvh]">
    <CardHeader>
      <CardTitle>Ingrédients Connectées</CardTitle>
      <CardDescription>
        Voici un aperçu des ingrédients connectés et de leur stockage.
      </CardDescription>
    </CardHeader>

    <CardContent>
      <Carousel class="relative w-full">
        <CarouselContent>
          <CarouselItem
            class="grid grid-cols-2 gap-y-6"
            v-for="(slideItems, slideIndex) in slidesData"
            :key="slideIndex"
          >
            <div class="w-full" v-for="(item, index) in slideItems" :key="index">
              <GaugeChart
                class="h-[10dvh]"
                :percentage="item.percentage"
                :mesure="item.mesure"
                :label="item.label"
                :color="item.color"
                :quantity="item.quantity"
              />
            </div>
          </CarouselItem>
        </CarouselContent>

        <CarouselPrevious v-if="gaugeData.length > 4" class="absolute -left-3" />
        <CarouselNext v-if="gaugeData.length > 4" class="absolute -right-3" />
      </Carousel>
    </CardContent>
  </Card>
</template>
