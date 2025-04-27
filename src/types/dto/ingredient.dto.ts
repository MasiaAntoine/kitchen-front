export interface IngredientDto {
  id?: number
  label: string
  quantity: number
  max_quantity: number
  mesure: string
  percentage?: number
  type?: string
  type_id?: number
  is_connected?: boolean
}
