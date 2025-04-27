import { useQuery, useMutation } from '@tanstack/vue-query'
import { fetchTypes } from '@/api'

export function useFetchTypes() {
  const { data, isError, error, isPending } = useQuery({
    queryKey: ['types'],
    queryFn: fetchTypes,
  })

  return {
    data,
    isPending,
    isError,
    error,
  }
}
