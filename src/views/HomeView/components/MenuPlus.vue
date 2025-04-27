<script setup lang="ts">
import type { IngredientDto } from '@/types/dto'

import AddIngredient from './AddIngredient.vue'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Plus } from 'lucide-vue-next'

const emit = defineEmits<{
  'ingredient-added': [ingredient: IngredientDto]
}>()

const handleIngredientAdded = (ingredient: IngredientDto) => {
  emit('ingredient-added', ingredient)
}
</script>

<template>
  <div class="absolute bottom-1 right-1">
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Plus class="size-10 bg-black text-white rounded-full p-2" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Ingrédients</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <AddIngredient @ingredient-added="handleIngredientAdded" />
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
</template>
