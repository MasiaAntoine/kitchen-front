<script setup lang="ts">
import AppSidebar from '@/components/AppSidebar.vue'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
</script>

<template>
  <AppSidebar>
    <div class="flex gap-3">
      <Card class="w-full">
        <CardHeader>
          <CardTitle>Ingrédients</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent> Card Content </CardContent>
        <CardFooter> Card Footer </CardFooter>
      </Card>

      <Card class="w-full">
        <CardHeader>
          <CardTitle>Recette</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent> Card Content </CardContent>
        <CardFooter> Card Footer </CardFooter>
      </Card>
    </div>
  </AppSidebar>
</template>
