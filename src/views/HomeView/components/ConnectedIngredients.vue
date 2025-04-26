<script setup lang="ts">
import type { IngredientDto } from '@/types/dto/ingredient.dto'

import { ref, onMounted, computed, watch } from 'vue'
import { useFetchIngredientsConnected } from '@/hooks'

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

const { data, isError, error, isPending } = useFetchIngredientsConnected()

// Fonction pour calculer le pourcentage automatiquement
const calculatePercentage = (quantity: number, maxQuantity: number): number => {
  if (!maxQuantity || maxQuantity <= 0) return 0
  return Math.min(Math.round((quantity / maxQuantity) * 100), 100)
}

// Initialiser avec un tableau vide en attendant les données de l'API
const gaugeData = ref<IngredientDto[]>([])

// Fonction pour transformer les données de l'API
const formatApiData = (apiData: any[]): IngredientDto[] => {
  if (!apiData || !Array.isArray(apiData)) return []

  return apiData.map((ingredient) => ({
    id: ingredient.id.toString(),
    label: ingredient.label,
    quantity: ingredient.quantity,
    'max-quantity': ingredient.max_quantity,
    mesure: ingredient.mesure,
    percentage: calculatePercentage(ingredient.quantity, ingredient.max_quantity || 1000),
  }))
}

// Observer les changements de données de l'API
watch(
  () => data.value,
  (newData) => {
    if (newData && !isPending.value) {
      gaugeData.value = formatApiData(newData.data.data)
    }
  },
  { immediate: true },
)

const itemsPerSlide = 4
const slidesData = computed(() => {
  const result = []
  for (let i = 0; i < Math.ceil(gaugeData.value.length / itemsPerSlide); i++) {
    const start = i * itemsPerSlide
    const end = start + itemsPerSlide
    result.push(gaugeData.value.slice(start, end))
  }
  return result
})
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
      <div v-if="isPending" class="flex justify-center items-center h-[20dvh]">
        Chargement des ingrédients...
      </div>
      <div v-else-if="isError" class="flex justify-center items-center h-[20dvh]">
        Erreur lors du chargement des ingrédients
      </div>
      <Carousel v-else class="relative w-full">
        <CarouselContent>
          <CarouselItem
            class="grid grid-cols-2 gap-y-6"
            v-for="(slideItems, slideIndex) in slidesData"
            :key="slideIndex"
          >
            <div class="w-full" v-for="(item, index) in slideItems" :key="item.id">
              <GaugeChart
                class="h-[10dvh]"
                :percentage="item.percentage"
                :mesure="item.mesure"
                :label="item.label"
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
