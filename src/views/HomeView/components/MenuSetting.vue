<script setup lang="ts">
import { ref } from 'vue'
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
import { Settings } from 'lucide-vue-next'

const emit = defineEmits<{
  'ingredient-added': [ingredient: IngredientDto]
}>()

const isOpen = ref(false)

const closeDropdown = () => {
  isOpen.value = false
}
const openDropdown = () => {
  isOpen.value = true
}

const handleIngredientAdded = (ingredient: IngredientDto) => {
  closeDropdown()
  emit('ingredient-added', ingredient)
}
</script>

<template>
  <div class="absolute bottom-1 right-1">
    <DropdownMenu v-model:open="isOpen">
      <DropdownMenuTrigger @click="openDropdown">
        <Settings class="size-10 bg-black text-white rounded-full p-2" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Ingrédients</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <AddIngredient @ingredient-added="handleIngredientAdded" />
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
</template>
