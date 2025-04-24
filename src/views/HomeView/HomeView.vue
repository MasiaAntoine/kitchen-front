<script setup lang="ts">
import type { IngredientDto } from '@/types/dto/ingredient.dto'

import { ref, onMounted, computed } from 'vue'

import AppSidebar from '@/components/AppSidebar.vue'
import ConnectedIngredients from './components/ConnectedIngredients.vue'
import SmartRecipes from './components/SmartRecipes.vue'
import CardStockage from '@/components/CardStockage.vue'

import { ShoppingBasket, Refrigerator, Snowflake } from 'lucide-vue-next'

// Fonction pour calculer le pourcentage automatiquement
const calculatePercentage = (quantity: number, maxQuantity: number): number => {
  if (!maxQuantity || maxQuantity <= 0) return 0
  return Math.min(Math.round((quantity / maxQuantity) * 100), 100)
}

// Fonction pour initialiser les ingrédients avec le calcul du pourcentage
const initIngredientsWithPercentage = (ingredients: IngredientDto[]): IngredientDto[] => {
  return ingredients.map((ingredient) => ({
    ...ingredient,
    percentage: calculatePercentage(ingredient.quantity, ingredient['max-quantity'] || 1000),
  }))
}

// Données brutes des ingrédients
const placardIngredientsRaw = [
  {
    id: 1,
    mesure: 'grammes',
    quantity: 1000,
    'max-quantity': 5000,
    label: 'Pâtes',
  },
  { id: 2, mesure: 'grammes', quantity: 765, 'max-quantity': 2000, label: 'Sucre' },
  {
    id: 6,
    mesure: 'grammes',
    quantity: 200,
    'max-quantity': 2000,
    label: 'Farine',
  },
  { id: 7, mesure: 'grammes', quantity: 500, 'max-quantity': 5000, label: 'Sel' },
]

const frigoIngredientsRaw = [
  {
    id: 3,
    mesure: 'millilitres',
    quantity: 340,
    'max-quantity': 5000,
    label: 'Lait',
  },
  {
    id: 4,
    mesure: 'grammes',
    quantity: 356,
    'max-quantity': 500,
    label: 'Beurre',
  },
  { id: 5, mesure: 'pièce', quantity: 10, 'max-quantity': 10, label: 'Œufs' },
]

const congelateurIngredientsRaw = [
  { id: 8, mesure: 'grammes', quantity: 1000, 'max-quantity': 2000, label: 'Poulet' },
]

// Initialiser les références avec les pourcentages calculés
const placardIngredients = ref<IngredientDto[]>(
  initIngredientsWithPercentage(placardIngredientsRaw),
)
const frigoIngredients = ref<IngredientDto[]>(initIngredientsWithPercentage(frigoIngredientsRaw))
const congelateurIngredients = ref<IngredientDto[]>(
  initIngredientsWithPercentage(congelateurIngredientsRaw),
)

// Fonctions pour mettre à jour les ingrédients
const updatePlacardIngredients = (updatedIngredients: IngredientDto[]) => {
  // Recalculer les pourcentages avant de mettre à jour
  placardIngredients.value = updatedIngredients.map((ingredient) => ({
    ...ingredient,
    percentage: calculatePercentage(ingredient.quantity, ingredient['max-quantity'] || 1000),
  }))
}

const updateFrigoIngredients = (updatedIngredients: IngredientDto[]) => {
  // Recalculer les pourcentages avant de mettre à jour
  frigoIngredients.value = updatedIngredients.map((ingredient) => ({
    ...ingredient,
    percentage: calculatePercentage(ingredient.quantity, ingredient['max-quantity'] || 1000),
  }))
}

const updateCongelateurIngredients = (updatedIngredients: IngredientDto[]) => {
  // Recalculer les pourcentages avant de mettre à jour
  congelateurIngredients.value = updatedIngredients.map((ingredient) => ({
    ...ingredient,
    percentage: calculatePercentage(ingredient.quantity, ingredient['max-quantity'] || 1000),
  }))
}

// Recalculer les pourcentages au montage du composant
onMounted(() => {
  updatePlacardIngredients(placardIngredients.value)
  updateFrigoIngredients(frigoIngredients.value)
  updateCongelateurIngredients(congelateurIngredients.value)
})
</script>

<template>
  <AppSidebar>
    <div class="flex gap-3 flex-col">
      <div class="flex gap-3">
        <ConnectedIngredients />
        <SmartRecipes />
      </div>

      <div class="flex gap-3">
        <CardStockage
          title="placard"
          :icon="ShoppingBasket"
          :ingredients="placardIngredients"
          @update:ingredients="updatePlacardIngredients"
        />
        <CardStockage
          title="frigo"
          :icon="Refrigerator"
          :ingredients="frigoIngredients"
          @update:ingredients="updateFrigoIngredients"
        />
        <CardStockage
          title="congélateur"
          :icon="Snowflake"
          :ingredients="congelateurIngredients"
          @update:ingredients="updateCongelateurIngredients"
        />
      </div>
    </div>
  </AppSidebar>
</template>
