<script setup lang="ts">
import type { IngredientDto } from '@/types/dto'
import { useUpdateIngredientQuantity } from '@/hooks/ingredientsHooks'
import EditStockage from './EditStockage.vue'
import type { Component } from 'vue'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'

const props = defineProps<{
  title: string
  icon: Component
  ingredients: IngredientDto[]
}>()

const emit = defineEmits<{
  (e: 'update:ingredients', ingredients: IngredientDto[]): void
}>()

const { updateQuantity } = useUpdateIngredientQuantity()

const updateIngredient = (updatedIngredient: {
  id: string
  quantity: number
  percentage: number
}) => {
  const updatedIngredients = props.ingredients.map((ingredient) => {
    if (String(ingredient.id) === updatedIngredient.id) {
      return {
        ...ingredient,
        quantity: updatedIngredient.quantity,
        percentage: updatedIngredient.percentage,
      }
    }
    return ingredient
  })

  updateQuantity(
    {
      id: parseInt(updatedIngredient.id),
      data: {
        quantity: updatedIngredient.quantity,
      },
    },
    {
      onSuccess: () => {
        emit('update:ingredients', updatedIngredients)
      },
      onError: (error) => {
        console.error('Erreur lors de la mise à jour:', error)
      },
    },
  )
}
</script>

<template>
  <Card class="w-full h-[45.7dvh]">
    <CardHeader>
      <CardTitle class="capitalize flex items-center gap-2">
        <component :is="icon" size="20" />
        {{ title }}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div class="overflow-y-auto max-h-[33dvh] px-4 flex flex-col gap-4">
        <template v-for="(ingredient, index) in props.ingredients">
          <EditStockage :ingredient="ingredient" @update:ingredient="updateIngredient">
            <div class="hover:bg-gray-200 cursor-pointer py-1 px-2 rounded-md">
              <div class="flex justify-between items-center">
                <div>{{ ingredient.label }}</div>
                <div class="flex gap-1 text-xs items-center text-gray-500">
                  {{ ingredient.quantity }} {{ ingredient.mesure }}
                </div>
              </div>
              <div>
                <Progress :model-value="ingredient.percentage" />
              </div>
            </div>
          </EditStockage>
        </template>
      </div>
    </CardContent>
  </Card>
</template>
