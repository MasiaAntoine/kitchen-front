<script setup lang="ts">
import type { IngredientDto } from '@/types/dto/ingredient.dto'

import { ref } from 'vue'

import AppSidebar from '@/components/AppSidebar.vue'
import ConnectedIngredients from './components/ConnectedIngredients.vue'
import SmartRecipes from './components/SmartRecipes.vue'
import CardStockage from '@/components/CardStockage.vue'

import { ShoppingBasket, Refrigerator, Snowflake } from 'lucide-vue-next'

const ingredients = ref<IngredientDto[]>([
  { id: 1, percentage: 75, mesure: 'grammes', quantity: 1000, label: 'Pâtes' },
  { id: 2, percentage: 45, mesure: 'grammes', quantity: 765, label: 'Sucre' },
  { id: 3, percentage: 30, mesure: 'millilitres', quantity: 340, label: 'Lait' },
  { id: 4, percentage: 60, mesure: 'grammes', quantity: 356, label: 'Beurre' },
  { id: 5, percentage: 100, mesure: 'pièce', quantity: 10, label: 'Œufs' },
  { id: 6, percentage: 20, mesure: 'grammes', quantity: 200, label: 'Farine' },
  { id: 7, percentage: 90, mesure: 'grammes', quantity: 500, label: 'Sel' },
  { id: 8, percentage: 10, mesure: 'millilitres', quantity: 100, label: 'Huile' },
])
</script>

<template>
  <AppSidebar>
    <div class="flex gap-3 flex-col">
      <div class="flex gap-3">
        <ConnectedIngredients />
        <SmartRecipes />
      </div>

      <div class="flex gap-3">
        <CardStockage title="placard" :icon="ShoppingBasket" :ingredients="ingredients" />
        <CardStockage title="frigo" :icon="Refrigerator" :ingredients="ingredients" />
        <CardStockage title="congélateur" :icon="Snowflake" :ingredients="ingredients" />
      </div>
    </div>
  </AppSidebar>
</template>
