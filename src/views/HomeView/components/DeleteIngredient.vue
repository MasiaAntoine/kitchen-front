<script setup lang="ts">
import { ref, computed, h } from 'vue'
import { useToast } from '@/components/ui/toast/use-toast'
import {
  getCoreRowModel,
  useVueTable,
  type ColumnDef,
  getFilteredRowModel,
  getPaginationRowModel,
  type RowSelectionState,
  FlexRender,
} from '@tanstack/vue-table'
import { valueUpdater } from '@/lib/utils'
import { ArrowUpDown, Search } from 'lucide-vue-next'

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
import { Checkbox } from '@/components/ui/checkbox'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Input } from '@/components/ui/input'

import { useFetchIngredients } from '@/hooks'

interface Ingredient {
  id: number
  label: string
  quantity: number
  max_quantity: number
  mesure: string
}

const dialogOpen = ref(false)
const { toast } = useToast()
const searchQuery = ref('')

const { data: ingredientsResponse, isPending } = useFetchIngredients()

const ingredients = computed(() => {
  return ingredientsResponse.value?.data.data || []
})

const rowSelection = ref<RowSelectionState>({})

const selectedIngredients = computed(() => {
  if (!ingredients.value) return []

  return Object.keys(rowSelection.value)
    .filter((key) => rowSelection.value[key])
    .map((key) => ingredients.value[parseInt(key)].id)
})

const columns: ColumnDef<Ingredient>[] = [
  {
    id: 'select',
    header: ({ table }) =>
      h(Checkbox, {
        modelValue:
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate'),
        'onUpdate:modelValue': (value: boolean) => table.toggleAllPageRowsSelected(!!value),
        ariaLabel: 'Sélectionner tout',
        class: 'ml-2',
      }),
    cell: ({ row }) =>
      h(Checkbox, {
        modelValue: row.getIsSelected(),
        'onUpdate:modelValue': (value: boolean) => row.toggleSelected(!!value),
        ariaLabel: 'Sélectionner ligne',
        class: 'ml-2',
      }),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'label',
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: 'ghost',
          onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
        },
        () => ['Nom', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })],
      )
    },
    cell: ({ row }) => h('div', {}, row.getValue('label')),
  },
  {
    accessorKey: 'quantity',
    header: 'Quantité',
    cell: ({ row }) => h('div', {}, row.getValue('quantity')),
  },
  {
    accessorKey: 'max_quantity',
    header: 'Maximum',
    cell: ({ row }) => h('div', {}, row.getValue('max_quantity')),
  },
  {
    accessorKey: 'mesure',
    header: 'Mesure',
    cell: ({ row }) => h('div', {}, row.getValue('mesure')),
  },
]

const table = useVueTable({
  get data() {
    return ingredients.value
  },
  columns,
  getCoreRowModel: getCoreRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  onRowSelectionChange: (updaterOrValue) => valueUpdater(updaterOrValue, rowSelection),
  initialState: {
    pagination: {
      pageSize: 5,
      pageIndex: 0,
    },
  },
  state: {
    get rowSelection() {
      return rowSelection.value
    },
  },
  meta: {
    onRowSelectionChange: (rowIndex: number) => {
      // Mettre à jour rowSelection de manière transparente
      rowSelection.value = { ...rowSelection.value, [rowIndex]: !rowSelection.value[rowIndex] }
    },
  },
})

const handleSearch = (event: Event) => {
  const value = (event.target as HTMLInputElement).value
  table.getColumn('label')?.setFilterValue(value)
}

const handleDelete = () => {
  const ids = selectedIngredients.value
  console.log('Ingrédients à supprimer :', ids)

  toast({
    title: 'Suppression',
    description: `${ids.length} ingrédient(s) sélectionné(s) pour suppression`,
  })
  // Ici vous implémenteriez la logique réelle de suppression
  // rowSelection.value = {} // Réinitialiser après suppression
}

const closeDialog = () => {
  dialogOpen.value = false
  rowSelection.value = {}
}
</script>

<template>
  <Dialog v-model:open="dialogOpen">
    <DialogTrigger as-child @click="dialogOpen = true">
      <Button variant="outline" class="w-full">Supprimer des ingrédients</Button>
    </DialogTrigger>
    <DialogContent class="max-w-4xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Gérer les ingrédients</DialogTitle>
        <DialogDescription>
          Sélectionnez les ingrédients à supprimer de votre cuisine.
        </DialogDescription>
      </DialogHeader>

      <div v-if="isPending" class="flex justify-center py-8">
        <div
          class="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"
        ></div>
        <span class="sr-only">Chargement...</span>
      </div>

      <div v-else class="space-y-4">
        <div class="flex items-center py-4">
          <div class="relative w-full">
            <Search
              class="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            />
            <Input placeholder="Rechercher par nom..." class="pl-8" @input="handleSearch" />
          </div>
        </div>

        <div class="rounded-md border min-h-[245px]">
          <Table>
            <TableHeader>
              <TableRow v-for="headerGroup in table.getHeaderGroups()" :key="headerGroup.id">
                <TableHead v-for="header in headerGroup.headers" :key="header.id">
                  <FlexRender
                    v-if="!header.isPlaceholder"
                    :render="header.column.columnDef.header"
                    :props="header.getContext()"
                  />
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <template v-if="table.getRowModel().rows?.length">
                <TableRow
                  v-for="row in table.getRowModel().rows"
                  :key="row.id"
                  :data-state="row.getIsSelected() && 'selected'"
                >
                  <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
                    <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
                  </TableCell>
                </TableRow>
              </template>

              <TableRow v-else>
                <TableCell :colspan="columns.length" class="h-24 text-center">
                  Aucun ingrédient trouvé
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <div class="flex items-center justify-end space-x-2 py-4">
          <div class="flex-1 text-sm text-muted-foreground">
            {{ table.getFilteredSelectedRowModel().rows.length }} sur
            {{ table.getFilteredRowModel().rows.length }} ingrédient(s) sélectionné(s)
          </div>
          <div class="space-x-2">
            <Button
              variant="outline"
              size="sm"
              :disabled="!table.getCanPreviousPage()"
              @click="table.previousPage()"
            >
              Précédent
            </Button>
            <Button
              variant="outline"
              size="sm"
              :disabled="!table.getCanNextPage()"
              @click="table.nextPage()"
            >
              Suivant
            </Button>
          </div>
        </div>
      </div>

      <DialogFooter class="mt-6">
        <div class="flex items-center justify-between w-full">
          <div class="flex space-x-2">
            <DialogClose asChild>
              <Button type="button" variant="outline" @click="closeDialog">Annuler</Button>
            </DialogClose>
            <Button
              variant="destructive"
              @click="handleDelete"
              :disabled="selectedIngredients.length === 0"
            >
              Supprimer sélection
            </Button>
          </div>
        </div>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
