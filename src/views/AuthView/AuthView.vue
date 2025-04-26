<script setup lang="ts">
import { ref } from 'vue'
import { useForm, useField } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { useAuth } from '@/hooks'
import axios from '@/lib/axios'
import router from '@/router'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useToast } from '@/components/ui/toast/use-toast'

const { toast } = useToast()

const { mutate, isPending } = useAuth()

// Validation Schema
const formSchema = toTypedSchema(
  z.object({
    username: z.string().min(2, "Le nom d'utilisateur est requis"),
    password: z.string().min(4, 'Le mot de passe doit contenir au moins 4 caractères'),
  }),
)

const { handleSubmit, errors, meta } = useForm({
  validationSchema: formSchema,
})

const { value: username } = useField('username')
const { value: password } = useField('password')

const onSubmit = handleSubmit(async (values) => {
  console.log(values)

  mutate(values, {
    onSuccess: () => {
      toast({
        title: 'Connexion réussie !',
      })
      sessionStorage.setItem('username', values.username)
      sessionStorage.setItem('password', values.password)
      router.push({ name: 'Home' })
    },
    onError: () => {
      toast({
        title: 'Connexion échoué !',
      })
    },
  })
})
</script>

<template>
  <div class="flex h-screen w-full items-center justify-center bg-gray-100">
    <div class="w-full max-w-md space-y-6 rounded-lg bg-white p-8 shadow-lg">
      <div class="text-center">
        <h1 class="text-2xl font-bold tracking-tight text-gray-900">Connexion</h1>
        <p class="mt-2 text-sm text-gray-600">Entrez vos identifiants pour vous connecter</p>
      </div>

      <form @submit="onSubmit" class="space-y-6">
        <FormField name="username" v-slot="{ componentField, errorMessage }">
          <FormItem>
            <FormLabel>Nom d'utilisateur</FormLabel>
            <FormControl>
              <Input
                v-model="username"
                placeholder="Entrez votre nom d'utilisateur"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage>{{ errorMessage }}</FormMessage>
          </FormItem>
        </FormField>

        <FormField name="password" v-slot="{ componentField, errorMessage }">
          <FormItem>
            <FormLabel>Mot de passe</FormLabel>
            <FormControl>
              <Input
                v-model="password"
                type="password"
                placeholder="••••••••"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage>{{ errorMessage }}</FormMessage>
          </FormItem>
        </FormField>

        <Button type="submit" class="w-full"> Se connecter </Button>
      </form>
    </div>
  </div>
</template>
