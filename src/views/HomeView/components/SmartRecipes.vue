<script setup lang="ts">
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { Separator } from '@/components/ui/separator'

import { Timer } from 'lucide-vue-next'

const recipes = [
  {
    id: 1,
    name: 'Pâtes Carbonara',
    time: 10,
  },
  {
    id: 2,
    name: 'Burger',
    time: 5,
  },
  {
    id: 3,
    name: 'Poulet curry',
    time: 30,
  },
  {
    id: 4,
    name: 'Salade César',
    time: 15,
  },
  {
    id: 5,
    name: 'Tacos',
    time: 20,
  },
  {
    id: 6,
    name: "Soupe à l'oignon",
    time: 25,
  },
  {
    id: 7,
    name: 'Pizza Margherita',
    time: 12,
  },
  {
    id: 8,
    name: 'Ratatouille',
    time: 35,
  },
  {
    id: 9,
    name: 'Quiche Lorraine',
    time: 40,
  },
  {
    id: 10,
    name: 'Lasagnes',
    time: 50,
  },
  {
    id: 11,
    name: 'Paella',
    time: 45,
  },
  {
    id: 12,
    name: 'Chili con carne',
    time: 40,
  },
  {
    id: 13,
    name: 'Couscous',
    time: 60,
  },
  {
    id: 14,
    name: 'Bœuf Bourguignon',
    time: 120,
  },
  {
    id: 15,
    name: 'Risotto',
    time: 35,
  },
  {
    id: 16,
    name: 'Tarte Tatin',
    time: 50,
  },
  {
    id: 17,
    name: 'Crêpes',
    time: 20,
  },
  {
    id: 18,
    name: 'Gaufres',
    time: 25,
  },
  {
    id: 19,
    name: 'Fondue Savoyarde',
    time: 90,
  },
  {
    id: 20,
    name: 'Raclette',
    time: 60,
  },
]
</script>

<template>
  <Card class="w-full h-[45.7dvh]">
    <CardHeader>
      <CardTitle>Recettes Intelligentes</CardTitle>
      <CardDescription>
        Découvrez des recettes personnalisées basées sur vos ingrédients connectés et vos
        préférences culinaires.
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div class="overflow-y-auto max-h-[25dvh] px-4">
        <template v-for="(recipe, index) in recipes" :key="recipe.id">
          <div class="flex justify-between items-center">
            <div>{{ recipe.name }}</div>
            <div class="flex gap-1 text-xs items-center text-orange-500">
              {{ recipe.time }} min <Timer :size="18" />
            </div>
          </div>
          <Separator v-if="index < recipes.length - 1" class="my-2" />
        </template>
      </div>
    </CardContent>
  </Card>
</template>
