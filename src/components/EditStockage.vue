<script setup lang="ts">
import type { IngredientDto } from '@/types/dto'

import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/toast/use-toast'

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'

import { Minus, Plus } from 'lucide-vue-next'
import { onMounted, ref } from 'vue'

const props = defineProps<{
  ingredient: IngredientDto
}>()

const emit = defineEmits<{
  (
    e: 'update:ingredient',
    updatedIngredient: { id: string; quantity: number; percentage: number },
  ): void
}>()

const { toast } = useToast()
const quantity = ref(props.ingredient.quantity)
const counter = ref<number>(1)
const counterValues = [1, 10, 20, 30, 50, 100, 200, 500, 1000]

onMounted(() => {
  if (props.ingredient.mesure === 'Grammes') {
    counter.value = 100
  } else if (props.ingredient.mesure === 'Millilitres') {
    counter.value = 100
  } else if (props.ingredient.mesure === 'Pièce') {
    counter.value = 1
  }
})

const getButtonVariant = (value: number) => {
  return counter.value === value ? 'default' : 'outline'
}

// Fonction pour calculer le pourcentage en fonction de la quantité
const calculatePercentage = (quantity: number) => {
  // Vous pouvez ajuster cette logique selon votre cas d'utilisation
  // Par exemple, si vous avez une quantité maximale dans votre DTO
  const maxQuantity = props.ingredient['max_quantity'] || 1000 // Valeur par défaut
  return Math.min(Math.round((quantity / maxQuantity) * 100), 100)
}

const submit = () => {
  if (quantity.value === props.ingredient.quantity) return

  const percentage = calculatePercentage(quantity.value)
  const updatedIngredient = {
    id: String(props.ingredient.id), // Conversion en string
    quantity: quantity.value,
    percentage: percentage,
  }

  // Émission de l'événement pour mettre à jour l'ingrédient
  emit('update:ingredient', updatedIngredient)

  console.log('Updated ingredient:', updatedIngredient)

  toast({
    title: 'Stockage mis à jour',
    description: `La quantité de ${props.ingredient.label} a été mise à jour à ${quantity.value} ${props.ingredient.mesure}.`,
  })
}
</script>

<template>
  <Drawer>
    <DrawerTrigger as-child>
      <slot />
    </DrawerTrigger>
    <DrawerContent>
      <div class="mx-auto w-full max-w-sm">
        <DrawerHeader>
          <DrawerTitle>{{ props.ingredient.label }}</DrawerTitle>
          <DrawerDescription
            >Mettez à jour la quantité en {{ props.ingredient.mesure }}.</DrawerDescription
          >
        </DrawerHeader>
        <div class="flex flex-wrap justify-center gap-4">
          <Button
            v-for="value in counterValues"
            :key="value"
            :variant="getButtonVariant(value)"
            @click="counter = value"
            class="min-w-[3rem] text-3xl py-6"
          >
            {{ value }}
          </Button>
        </div>
        <div class="p-4 pb-0">
          <div class="flex items-center justify-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              class="size-16 shrink-0 rounded-full"
              :disabled="quantity <= 0"
              @click="quantity -= counter"
            >
              <Minus class="h-4 w-4" />
            </Button>
            <div class="flex-1 text-center">
              <div class="text-7xl font-bold tracking-tighter">
                {{ quantity }}
              </div>
              <div class="text-[0.70rem] uppercase text-muted-foreground">
                {{ props.ingredient.mesure }}
              </div>
            </div>
            <Button
              variant="outline"
              size="icon"
              class="size-16 shrink-0 rounded-full"
              @click="quantity += counter"
            >
              <Plus class="h-4 w-4" />
            </Button>
          </div>
        </div>
        <DrawerFooter>
          <DrawerClose as-child>
            <Button @click="submit()" :disabled="quantity === props.ingredient.quantity"
              >Mettre à jour</Button
            >
          </DrawerClose>
          <DrawerClose as-child>
            <Button variant="outline"> Annuler </Button>
          </DrawerClose>
        </DrawerFooter>
      </div>
    </DrawerContent>
  </Drawer>
</template>
