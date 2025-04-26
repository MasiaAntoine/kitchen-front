import { MutationCache, QueryCache, QueryClient } from '@tanstack/vue-query'
import { toast } from 'vue-sonner'
import { AxiosError } from 'axios'

const errorHandler = (thrownError: Error) => {
  if (thrownError instanceof AxiosError && thrownError.response) {
    const error = thrownError.response
    toast.error(error.data.message ?? 'An error occurred !')
  }
}

const myClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
  queryCache: new QueryCache({
    onError: errorHandler,
  }),
  mutationCache: new MutationCache({
    onError: errorHandler,
  }),
})

export const vueQueryPluginOptions = {
  queryClient: myClient,
}