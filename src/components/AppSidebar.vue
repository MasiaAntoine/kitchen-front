<script setup lang="ts">
import { ref, onMounted } from "vue";

import {
  Calendar,
  Home,
  Inbox,
  Search,
  Settings,
  ChevronDown,
} from "lucide-vue-next";

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
} from "@/components/ui/sidebar";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Inbox",
    icon: Inbox,
    submenu: [
      {
        title: "Messages",
        url: "#messages",
      },
      {
        title: "Notifications",
        url: "#notifications",
      },
    ],
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

const openMenus = ref<Record<string, boolean>>({});
const toggleMenu = (title: string) => {
  openMenus.value[title] = !openMenus.value[title];
};

onMounted(() => {
  items.forEach((item) => {
    if (item.submenu) {
      openMenus.value[item.title] = false;
    }
  });
});
</script>

<template>
  <Sidebar>
    <SidebarContent class="bg-black text-white">
      <SidebarGroup>
        <SidebarGroupLabel class="text-white">Application</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem v-for="item in items" :key="item.title">
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
                      <SidebarMenuItem
                        v-for="subItem in item.submenu"
                        :key="subItem.title"
                      >
                        <SidebarMenuButton asChild>
                          <a :href="subItem.url">
                            <span>{{ subItem.title }}</span>
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </Collapsible>
              </template>

              <template v-else>
                <SidebarMenuButton asChild>
                  <a :href="item.url">
                    <component :is="item.icon" />
                    <span>{{ item.title }}</span>
                  </a>
                </SidebarMenuButton>
              </template>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  </Sidebar>
</template>
