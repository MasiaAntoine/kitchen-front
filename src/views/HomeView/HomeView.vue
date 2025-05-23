<script setup lang="ts">
import type { IngredientDto } from '@/types/dto/ingredient.dto'

import { ref, onMounted, computed, watch } from 'vue'
import { useFetchIngredientsByType } from '@/hooks'

import AppSidebar from '@/components/AppSidebar.vue'
import ConnectedIngredients from './components/ConnectedIngredients.vue'
import MenuSetting from './components/MenuSetting.vue'
import SmartRecipes from './components/SmartRecipes.vue'
import CardStockage from '@/components/CardStockage.vue'
import { Skeleton } from '@/components/ui/skeleton'

import { ShoppingBasket, Refrigerator, Snowflake } from 'lucide-vue-next'

const newConnectedIngredient = ref<IngredientDto | null>(null)
const recentlyDeletedIngredientIds = ref<number[]>([])

const handleIngredientsDeleted = (deletedIds: number[]) => {
  recentlyDeletedIngredientIds.value = deletedIds

  placardIngredients.value = placardIngredients.value.filter(
    (ingredient) => !ingredient.id || !deletedIds.includes(ingredient.id),
  )

  frigoIngredients.value = frigoIngredients.value.filter(
    (ingredient) => !ingredient.id || !deletedIds.includes(ingredient.id),
  )

  congelateurIngredients.value = congelateurIngredients.value.filter(
    (ingredient) => !ingredient.id || !deletedIds.includes(ingredient.id),
  )

  if (
    newConnectedIngredient.value &&
    newConnectedIngredient.value.id &&
    deletedIds.includes(newConnectedIngredient.value.id)
  ) {
    newConnectedIngredient.value = null
  }
}

// Fonction pour calculer le pourcentage automatiquement
const calculatePercentage = (quantity: number, maxQuantity: number): number => {
  if (!maxQuantity || maxQuantity <= 0) return 0
  return Math.min(Math.round((quantity / maxQuantity) * 100), 100)
}

// Fonction pour initialiser les ingrédients avec le calcul du pourcentage
const initIngredientsWithPercentage = (ingredients: IngredientDto[]): IngredientDto[] => {
  return ingredients.map((ingredient) => ({
    ...ingredient,
    max_quantity: ingredient.max_quantity,
    percentage: calculatePercentage(ingredient.quantity, ingredient.max_quantity || 1000),
  }))
}

const { data: ingredientsByType, isPending, isError } = useFetchIngredientsByType()

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
    percentage: calculatePercentage(ingredient.quantity, ingredient['max_quantity'] || 1000),
  }))
}

const updateFrigoIngredients = (updatedIngredients: IngredientDto[]) => {
  // Recalculer les pourcentages avant de mettre à jour
  frigoIngredients.value = updatedIngredients.map((ingredient) => ({
    ...ingredient,
    percentage: calculatePercentage(ingredient.quantity, ingredient['max_quantity'] || 1000),
  }))
}

const updateCongelateurIngredients = (updatedIngredients: IngredientDto[]) => {
  // Recalculer les pourcentages avant de mettre à jour
  congelateurIngredients.value = updatedIngredients.map((ingredient) => ({
    ...ingredient,
    percentage: calculatePercentage(ingredient.quantity, ingredient['max_quantity'] || 1000),
  }))
}

// Fonction pour ajouter un nouvel ingrédient
const handleIngredientAdded = (newIngredient: IngredientDto) => {
  // Calculer le pourcentage pour l'ingrédient ajouté
  const ingredientWithPercentage = {
    ...newIngredient,
    percentage: calculatePercentage(newIngredient.quantity, newIngredient.max_quantity),
  }

  if (newIngredient.is_connected) {
    newConnectedIngredient.value = ingredientWithPercentage
  }

  // Directement utiliser le type fourni dans l'objet
  switch (newIngredient.type) {
    case 'Placard':
      placardIngredients.value = [...placardIngredients.value, ingredientWithPercentage]
      break
    case 'Frigo':
      frigoIngredients.value = [...frigoIngredients.value, ingredientWithPercentage]
      break
    case 'Congélateur':
      congelateurIngredients.value = [...congelateurIngredients.value, ingredientWithPercentage]
      break
    default:
      console.error("Type d'ingrédient inconnu:", newIngredient.type)
      break
  }
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
  <MenuSetting
    @ingredient-added="handleIngredientAdded"
    @ingredients-deleted="handleIngredientsDeleted"
  />
  <AppSidebar>
    <div class="flex gap-3 flex-col">
      <div class="flex gap-3">
        <ConnectedIngredients
          :new-ingredient="newConnectedIngredient || undefined"
          :deleted-ingredient-ids="recentlyDeletedIngredientIds"
        />
        <SmartRecipes />
      </div>

      <div v-if="isPending" class="flex gap-3">
        <Skeleton class="w-1/2 h-[45.7dvh]" v-for="i in 3" :key="i" />
      </div>

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
