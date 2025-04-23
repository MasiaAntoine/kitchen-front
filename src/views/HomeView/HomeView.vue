<script setup lang="ts">
import AppSidebar from '@/components/AppSidebar.vue'
import ConnectedIngredients from './components/ConnectedIngredients.vue'
import SmartRecipes from './components/SmartRecipes.vue'
</script>

<template>
  <AppSidebar>
    <div class="flex gap-3 flex-col">
      <div class="flex gap-3">
        <ConnectedIngredients />
        <SmartRecipes />
      </div>

      <div class="flex gap-3">
        <!-- <ConnectedIngredients />
        <SmartRecipes /> -->
      </div>
    </div>
  </AppSidebar>
</template>
