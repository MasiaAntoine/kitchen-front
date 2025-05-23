import { useQuery, useMutation } from '@tanstack/vue-query'
import {
  fetchIngredientsConnected,
  fetchIngredientsByType,
  updateIngredientQuantity,
  fetchIngredientsLowStock,
  createIngredient,
  fetchIngredients,
  deleteIngredientBatch,
} from '@/api'

export function useFetchIngredientsConnected() {
  const { data, isError, error, isPending } = useQuery({
    queryKey: ['ingredientsConnected'],
    queryFn: fetchIngredientsConnected,
    refetchInterval: 60000,
  })

  return {
    data,
    isPending,
    isError,
    error,
  }
}

export function useFetchIngredientsByType() {
  const { data, isError, error, isPending } = useQuery({
    queryKey: ['ingredientsByType'],
    queryFn: fetchIngredientsByType,
  })

  return {
    data,
    isPending,
    isError,
    error,
  }
}

export function useUpdateIngredientQuantity() {
  const { mutate, isPending, isError, error, isSuccess } = useMutation({
    mutationFn: (params: { id: number; data: object }) =>
      updateIngredientQuantity(params.id, params.data),
  })

  return {
    updateQuantity: mutate,
    isPending,
    isError,
    isSuccess,
    error,
  }
}

export function useFetchIngredientsLowStock() {
  const { data, isError, error, isPending } = useQuery({
    queryKey: ['ingredientsLowStock'],
    queryFn: fetchIngredientsLowStock,
  })

  return {
    data,
    isPending,
    isError,
    error,
  }
}

export function useCreateIngredient() {
  const { mutate, isPending, isError, error, isSuccess } = useMutation({
    mutationFn: (data: object) => createIngredient(data),
  })

  return {
    createIngredient: mutate,
    isPending,
    isError,
    isSuccess,
    error,
  }
}

export function useFetchIngredients() {
  const { data, isError, error, isPending } = useQuery({
    queryKey: ['ingredients'],
    queryFn: fetchIngredients,
  })

  return {
    data,
    isPending,
    isError,
    error,
  }
}

export function useDeleteIngredientBatch() {
  const { mutate, isPending, isError, error, isSuccess } = useMutation({
    mutationFn: (ids: number[]) => deleteIngredientBatch({ ids }),
  })

  return {
    deleteIngredientBatch: mutate,
    isPending,
    isError,
    isSuccess,
    error,
  }
}
