<script setup lang="ts">
import type { IngredientDto } from '@/types/dto/ingredient.dto'

import { ref, onMounted, computed, watch } from 'vue'
import { useFetchIngredientsByType } from '@/hooks'

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
    'max-quantity': ingredient.max_quantity,
    percentage: calculatePercentage(ingredient.quantity, ingredient.max_quantity || 1000),
  }))
}

const { data: ingredientsByType, isLoading, isError } = useFetchIngredientsByType()

// Références réactives pour les ingrédients par type de stockage
const placardIngredients = ref<IngredientDto[]>([])
const frigoIngredients = ref<IngredientDto[]>([])
const congelateurIngredients = ref<IngredientDto[]>([])

// Observer les changements de data et mettre à jour les références

const updateIngredientsFromData = () => {
  if (ingredientsByType.value) {
    const data = ingredientsByType.value.data
    if (data) {
      // Récupérer les ingrédients par type depuis la réponse de l'API
      placardIngredients.value = initIngredientsWithPercentage(data.Placard?.items || [])
      frigoIngredients.value = initIngredientsWithPercentage(data.Frigo?.items || [])
      congelateurIngredients.value = initIngredientsWithPercentage(data.Congélateur?.items || [])
    }
  }
}

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

// Surveiller les changements de données
watch(
  () => ingredientsByType.value,
  () => updateIngredientsFromData(),
  { immediate: true },
)

// Recalculer les pourcentages au montage du composant
onMounted(() => {
  updateIngredientsFromData()
})
</script>

<template>
  <AppSidebar>
    <div class="flex gap-3 flex-col">
      <div class="flex gap-3">
        <ConnectedIngredients />
        <SmartRecipes />
      </div>

      <div v-if="isLoading" class="text-center p-4">Chargement des ingrédients...</div>

      <div v-else-if="isError" class="text-center p-4 text-red-500">
        Erreur lors du chargement des ingrédients
      </div>

      <div v-else class="flex gap-3">
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
