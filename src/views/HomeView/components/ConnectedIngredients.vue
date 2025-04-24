<script setup lang="ts">
import type { IngredientDto } from '@/types/dto/ingredient.dto'

import { ref, onMounted, computed } from 'vue'

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

// Fonction pour calculer le pourcentage automatiquement
const calculatePercentage = (quantity: number, maxQuantity: number): number => {
  if (!maxQuantity || maxQuantity <= 0) return 0
  return Math.min(Math.round((quantity / maxQuantity) * 100), 100)
}

// Données brutes des ingrédients
const ingredientsRaw = [
  { id: '1', mesure: 'grammes', quantity: 1500, 'max-quantity': 2000, label: 'Pâtes' },
  { id: '2', mesure: 'grammes', quantity: 765, 'max-quantity': 2000, label: 'Sucre' },
  { id: '3', mesure: 'millilitres', quantity: 340, 'max-quantity': 1000, label: 'Lait' },
  { id: '4', mesure: 'grammes', quantity: 356, 'max-quantity': 500, label: 'Beurre' },
  { id: '5', mesure: 'grammes', quantity: 200, 'max-quantity': 1000, label: 'Farine' },
  { id: '6', mesure: 'grammes', quantity: 500, 'max-quantity': 1000, label: 'Sel' },
  { id: '7', mesure: 'millilitres', quantity: 100, 'max-quantity': 1000, label: 'Huile' },
]

// Fonction pour initialiser les ingrédients avec le calcul du pourcentage
const initIngredientsWithPercentage = (ingredients: any[]): IngredientDto[] => {
  return ingredients.map((ingredient) => ({
    ...ingredient,
    percentage: calculatePercentage(ingredient.quantity, ingredient['max-quantity'] || 1000),
  }))
}

// Initialiser les données avec les pourcentages calculés
const gaugeData = ref<IngredientDto[]>(initIngredientsWithPercentage(ingredientsRaw))

// Mettre à jour les pourcentages au montage du composant
onMounted(() => {
  gaugeData.value = gaugeData.value.map((ingredient) => ({
    ...ingredient,
    percentage: calculatePercentage(ingredient.quantity, ingredient['max-quantity'] || 1000),
  }))
})

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
      <Carousel class="relative w-full">
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
