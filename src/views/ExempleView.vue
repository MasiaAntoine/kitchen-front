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
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent> Card Content </CardContent>
      <CardFooter> Card Footer </CardFooter>
    </Card>
  </AppSidebar>
</template>
