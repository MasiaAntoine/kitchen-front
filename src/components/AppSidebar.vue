<script setup lang="ts">
import type { MenuItemDto } from '@/types/dto'

import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'

import { ShoppingBasket, Home, ChevronDown } from 'lucide-vue-next'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarTrigger,
  SidebarProvider,
} from '@/components/ui/sidebar'

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'

const menuItem = ref<MenuItemDto[]>([
  {
    title: 'Accueil',
    url: '/',
    icon: Home,
  },
  {
    title: 'Liste des courses',
    url: '/shopping-list',
    icon: ShoppingBasket,
  },
  // {
  //   title: 'Inbox',
  //   icon: Inbox,
  //   submenu: [
  //     {
  //       title: 'Messages',
  //       url: '#messages',
  //     },
  //     {
  //       title: 'Notifications',
  //       url: '#notifications',
  //     },
  //   ],
  // },
])

const open = ref(false)
const openMenus = ref<Record<string, boolean>>({})
const toggleMenu = (title: string) => {
  openMenus.value[title] = !openMenus.value[title]
}
</script>

<template>
  <SidebarProvider v-model:open="open">
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem v-for="item in menuItem" :key="item.title">
                <template v-if="item.submenu">
                  <Collapsible v-model:open="openMenus[item.title]">
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton>
                        <component :is="item.icon" />
                        <span>{{ item.title }}</span>
                        <ChevronDown
                          :class="[
                            'ml-auto size-4 transition-transform',
                            openMenus[item.title] ? 'rotate-180' : '',
                          ]"
                        />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        <SidebarMenuItem v-for="subItem in item.submenu" :key="subItem.title">
                          <SidebarMenuButton asChild>
                            <RouterLink :to="subItem.url">
                              <span>{{ subItem.title }}</span>
                            </RouterLink>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </Collapsible>
                </template>

                <template v-else>
                  <SidebarMenuButton asChild>
                    <RouterLink :to="item.url">
                      <component :is="item.icon" />
                      <span>{{ item.title }}</span>
                    </RouterLink>
                  </SidebarMenuButton>
                </template>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>

    <div class="w-full">
      <div class="px-1 pb-3">
        <SidebarTrigger />
      </div>

      <div class="w-full px-2">
        <slot />
      </div>
    </div>
  </SidebarProvider>
</template>
