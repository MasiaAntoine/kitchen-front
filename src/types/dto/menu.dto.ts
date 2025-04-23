import type { FunctionalComponent } from 'vue'
import type { LucideProps } from 'lucide-vue-next'

interface SubMenuDto {
  title: string
  url: string
}

export interface MenuItemDto {
  title: string
  url: string
  icon: FunctionalComponent<LucideProps, {}, any, {}>
  submenu?: SubMenuDto[]
}
