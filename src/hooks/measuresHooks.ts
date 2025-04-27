import { useQuery, useMutation } from '@tanstack/vue-query'
import { fetchMeasures } from '@/api'

export function useFetchMeasures() {
  const { data, isError, error, isPending } = useQuery({
    queryKey: ['measures'],
    queryFn: fetchMeasures,
  })

  return {
    data,
    isPending,
    isError,
    error,
  }
}
