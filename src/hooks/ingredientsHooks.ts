import { useQuery, useMutation } from '@tanstack/vue-query'
import { fetchIngredientsConnected, fetchIngredientsByType } from '@/api'

export function useFetchIngredientsConnected() {
  const { data, isError, error, isPending } = useQuery({
    queryKey: ['ingredientsConnected'],
    queryFn: fetchIngredientsConnected,
    refetchInterval: 10000,
  })

  return {
    data,
    isPending,
    isError,
    error,
  }
}
