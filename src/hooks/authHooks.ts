import { useQuery, useMutation } from '@tanstack/vue-query'
import { fetchAuth } from '@/api'

export function useAuth() {
  const { mutate, isPending, isError, error, isSuccess } = useMutation({
    mutationFn: fetchAuth,
  })

  return {
    mutate,
    isPending,
    isError,
    error,
    isSuccess,
  }
}
