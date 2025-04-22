<script setup lang="ts">
import { RouterView } from "vue-router";
import AppSidebar from "@/components/AppSidebar.vue";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ref } from "vue";

const open = ref(false);
</script>

<template>
  <SidebarProvider v-model:open="open">
    <AppSidebar />
    <main>
      <SidebarTrigger />
      <RouterView />
    </main>
  </SidebarProvider>
</template>
