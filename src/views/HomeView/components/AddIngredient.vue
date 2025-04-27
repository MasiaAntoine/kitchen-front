<script setup lang="ts">
import { ref } from 'vue'
import { useForm, useField } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

import { useToast } from '@/components/ui/toast/use-toast'
import { IngredientDto, TypesDto, MeasuresDto } from '@/types/dto'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const { toast } = useToast()
const dialogOpen = ref(false)
const isSubmitting = ref(false)

// Données brutes pour les types d'ingrédients avec le DTO TypesDto
const types: TypesDto[] = [
  { id: 1, name: 'Placard' },
  { id: 2, name: 'Frigo' },
  { id: 3, name: 'Congélateur' },
]

// Données brutes pour les unités de mesure avec le DTO MeasuresDto
const measures: MeasuresDto[] = [
  { id: 1, name: 'Grammes', symbol: 'g' },
  { id: 2, name: 'Millilitres', symbol: 'ml' },
  { id: 3, name: 'Pièce', symbol: 'pc' },
]

// Définition de l'interface pour le formulaire (basée sur IngredientDto avec des champs supplémentaires)
interface IngredientFormDto {
  label: string
  is_connected: boolean
  type_id: number | undefined
  measure_id: number | undefined
  max_quantity: number | undefined
}

// Validation Schema
const formSchema = toTypedSchema(
  z.object({
    label: z.string().min(2, "Le nom de l'ingrédient est requis"),
    is_connected: z.boolean().default(true),
    type_id: z.number({ required_error: 'Veuillez sélectionner un type' }),
    measure_id: z.number({ required_error: 'Veuillez sélectionner une unité de mesure' }),
    max_quantity: z.coerce
      .number({ required_error: 'La quantité maximale est requise' })
      .min(1, 'La quantité doit être positive'),
  }),
)

// Utiliser useForm avec le DTO approprié
const { handleSubmit, errors, meta } = useForm<IngredientFormDto>({
  validationSchema: formSchema,
  initialValues: {
    label: '',
    is_connected: false,
    type_id: undefined,
    measure_id: undefined,
    max_quantity: undefined,
  },
})

// Utiliser useField pour chaque champ
const { value: label } = useField<string>('label')
const { value: is_connected } = useField<boolean>('is_connected')
const { value: type_id } = useField<number | undefined>('type_id')
const { value: measure_id } = useField<number | undefined>('measure_id')
const { value: max_quantity } = useField<number | undefined>('max_quantity')

const onSubmit = handleSubmit((values: IngredientFormDto) => {
  isSubmitting.value = true

  // Récupérer la mesure sélectionnée
  const selectedMeasure = measures.find((m) => m.id === values.measure_id)

  // Créer un objet IngredientDto conforme à l'interface
  const ingredientToAdd: IngredientDto = {
    label: values.label,
    quantity: 0, // Valeur par défaut pour un nouvel ingrédient
    max_quantity: values.max_quantity || 0,
    mesure: selectedMeasure?.symbol || '',
    percentage: 0, // Valeur par défaut pour un nouvel ingrédient
  }

  console.log('Ingrédient à ajouter (DTO):', ingredientToAdd)
  console.log('Valeurs brutes du formulaire:', values)

  // Simuler une soumission réussie
  setTimeout(() => {
    toast({
      title: 'Succès',
      description: 'Ingrédient ajouté avec succès',
    })

    // Réinitialiser les valeurs
    label.value = ''
    type_id.value = undefined
    measure_id.value = undefined
    max_quantity.value = undefined
    is_connected.value = false

    // Fermer la boîte de dialogue
    dialogOpen.value = false

    isSubmitting.value = false
  }, 500)
})
</script>

<template>
  <Dialog v-model:open="dialogOpen">
    <DialogTrigger as-child @click="dialogOpen = true">
      <Button variant="outline" class="w-full">Ajouter un ingrédient</Button>
    </DialogTrigger>
    <DialogContent class="max-w-md">
      <DialogHeader>
        <DialogTitle>Ajouter un ingrédient</DialogTitle>
        <DialogDescription>
          Remplissez ce formulaire pour ajouter un nouvel ingrédient à votre cuisine.
        </DialogDescription>
      </DialogHeader>

      <form @submit="onSubmit" class="space-y-4">
        <FormField name="label" v-slot="{ componentField, errorMessage }">
          <FormItem>
            <FormLabel>Nom</FormLabel>
            <FormControl>
              <Input
                v-model="label"
                placeholder="Ex: Pâtes, Riz, Tomates..."
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage>{{ errorMessage }}</FormMessage>
          </FormItem>
        </FormField>

        <FormField name="type_id" v-slot="{ componentField, errorMessage }">
          <FormItem>
            <FormLabel>Type de rangement</FormLabel>
            <Select v-model="type_id">
              <FormControl>
                <SelectTrigger v-bind="componentField">
                  <SelectValue placeholder="Sélectionnez un type de rangement" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem v-for="type in types" :key="type.id" :value="type.id">
                  {{ type.name }}
                </SelectItem>
              </SelectContent>
            </Select>
            <FormMessage>{{ errorMessage }}</FormMessage>
          </FormItem>
        </FormField>

        <FormField name="measure_id" v-slot="{ componentField, errorMessage }">
          <FormItem>
            <FormLabel>Unité de mesure</FormLabel>
            <Select v-model="measure_id">
              <FormControl>
                <SelectTrigger v-bind="componentField">
                  <SelectValue placeholder="Sélectionnez une unité de mesure" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem v-for="measure in measures" :key="measure.id" :value="measure.id">
                  {{ measure.name }} ({{ measure.symbol }})
                </SelectItem>
              </SelectContent>
            </Select>
            <FormMessage>{{ errorMessage }}</FormMessage>
          </FormItem>
        </FormField>

        <FormField name="max_quantity" v-slot="{ componentField, errorMessage }">
          <FormItem>
            <FormLabel>Quantité maximale</FormLabel>
            <FormControl>
              <Input
                v-model="max_quantity"
                type="number"
                min="1"
                placeholder="Ex: 5000"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage>{{ errorMessage }}</FormMessage>
          </FormItem>
        </FormField>

        <FormField name="is_connected" v-slot="{ componentField }">
          <FormItem class="flex flex-row items-start space-x-3 space-y-0">
            <FormControl>
              <Checkbox v-model="is_connected" v-bind="componentField" />
            </FormControl>
            <div class="space-y-1 leading-none">
              <FormLabel>Connecté</FormLabel>
              <FormDescription>
                Indiquez si cet ingrédient est connecté à un capteur.
              </FormDescription>
            </div>
          </FormItem>
        </FormField>

        <DialogFooter class="mt-6">
          <DialogClose asChild>
            <Button type="button" variant="outline" @click="dialogOpen = false">Annuler</Button>
          </DialogClose>
          <Button type="submit" :disabled="isSubmitting">
            {{ isSubmitting ? 'Ajout en cours...' : 'Ajouter' }}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>
