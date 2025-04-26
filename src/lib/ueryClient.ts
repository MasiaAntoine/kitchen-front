import { MutationCache, QueryCache, QueryClient } from '@tanstack/vue-query'
import { useToast } from '@/components/ui/toast/use-toast'
import { AxiosError } from 'axios'

const { toast } = useToast()

const errorHandler = (thrownError: Error) => {
  if (thrownError instanceof AxiosError && thrownError.response) {
    const error = thrownError.response
    toast({
      title: 'An error occurred !',
      description: `${error.status} ${error.statusText}`,
    })
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
