import { useQuery, useMutation } from '@tanstack/vue-query'
import { fetchIngredientsConnected } from '@/api'

export function useFetchIngredientsConnected() {
  const { data, isError, error, isPending } = useQuery({
    queryKey: ['ingredientsConnected'],
    queryFn: fetchIngredientsConnected,
    refetchInterval: 2000,
  })

  return {
    data,
    isPending,
    isError,
    error,
  }
}
