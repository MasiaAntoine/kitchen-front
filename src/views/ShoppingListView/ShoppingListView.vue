<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

import AppSidebar from '@/components/AppSidebar.vue'
import type { IngredientDto } from '@/types/dto'
import { useFetchIngredientsLowStock } from '@/hooks/ingredientsHooks'

import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const { data: ingredientsResponse, isPending, isError, error } = useFetchIngredientsLowStock()

const rawResponse = computed(() => {
  return ingredientsResponse.value
})

const ingredients = computed(() => {
  if (!ingredientsResponse.value) return []

  return ingredientsResponse.value.data.data

  console.error('Structure de données non reconnue:', ingredientsResponse.value)
  return []
})

const sortedIngredients = computed(() => {
  const ingredientsArray = ingredients.value || []
  return [...ingredientsArray].sort((a, b) => a.label.localeCompare(b.label))
})

const checkedIngredients = ref<number[]>([])

function toggleIngredient(id: number) {
  const index = checkedIngredients.value.indexOf(id)
  if (index === -1) {
    checkedIngredients.value.push(id)
  } else {
    checkedIngredients.value.splice(index, 1)
  }
}

function isChecked(id: number): boolean {
  return checkedIngredients.value.includes(id)
}
</script>

<template>
  <AppSidebar>
    <Card class="w-full h-[93dvh]">
      <CardHeader>
        <CardTitle>Liste de courses</CardTitle>
        <CardDescription>
          Voici la liste des ingrédients bientôt en rupture. Cochez les éléments que vous avez déjà
          achetés pour les marquer comme complétés.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div v-if="isPending" class="text-gray-500">Chargement de votre liste de courses...</div>

        <div v-else-if="isError" class="text-red-500">
          Une erreur est survenue lors du chargement des données: {{ error?.message }}
        </div>

        <div v-else-if="sortedIngredients.length === 0" class="text-gray-500">
          <p>Aucun ingrédient à faible stock à afficher.</p>
        </div>

        <div v-else class="space-y-3 overflow-y-auto max-h-[72dvh]">
          <div
            v-for="(ingredient, index) in sortedIngredients"
            :key="ingredient.id"
            class="flex flex-col"
          >
            <div class="flex items-center space-x-3 p-2">
              <Checkbox
                :id="`ingredient-${ingredient.id}`"
                :checked="isChecked(ingredient.id)"
                @update:checked="toggleIngredient(ingredient.id)"
              />
              <label
                :for="`ingredient-${ingredient.id}`"
                class="flex-1 text-base font-medium leading-none cursor-pointer"
                :class="{ 'line-through': isChecked(ingredient.id) }"
                @click="toggleIngredient(ingredient.id)"
              >
                <div class="font-semibold">{{ ingredient.label }}</div>
                <div class="text-gray-600">
                  {{ ingredient.quantity }} / {{ ingredient.max_quantity }}
                  {{ ingredient.mesure }}
                </div>
              </label>
            </div>
            <Separator v-if="index < sortedIngredients.length - 1" class="my-2" />
          </div>
        </div>
      </CardContent>
    </Card>
  </AppSidebar>
</template>
