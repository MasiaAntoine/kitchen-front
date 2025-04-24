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
  ingredient: IngredientDto[]
}>()

const { toast } = useToast()
const quantity = ref(props.ingredient.quantity)
const counter = ref(null)
const counterValues = [1, 10, 20, 30, 50, 100, 200, 500, 1000]

onMounted(() => {
  if (props.ingredient.mesure === 'grammes') {
    counter.value = 100
  } else if (props.ingredient.mesure === 'millilitres') {
    counter.value = 100
  } else if (props.ingredient.mesure === 'pièce') {
    counter.value = 1
  }
})

const getButtonVariant = (value: number) => {
  return counter.value === value ? 'default' : 'outline'
}
const submit = () => {
  const updatedIngredient = {
    id: props.ingredient.id,
    quantity: quantity.value,
  }
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
        <div class="flex flex-wrap justify-center gap-2 p-4">
          <Button
            v-for="value in counterValues"
            :key="value"
            :variant="getButtonVariant(value)"
            @click="counter = value"
            class="min-w-[3rem]"
          >
            {{ value }}
          </Button>
        </div>
        <div class="p-4 pb-0">
          <div class="flex items-center justify-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              class="h-8 w-8 shrink-0 rounded-full"
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
              class="h-8 w-8 shrink-0 rounded-full"
              @click="quantity += counter"
            >
              <Plus class="h-4 w-4" />
            </Button>
          </div>
        </div>
        <DrawerFooter>
          <DrawerClose as-child>
            <Button @click="submit()">Submit</Button>
          </DrawerClose>
          <DrawerClose as-child>
            <Button variant="outline"> Cancel </Button>
          </DrawerClose>
        </DrawerFooter>
      </div>
    </DrawerContent>
  </Drawer>
</template>
