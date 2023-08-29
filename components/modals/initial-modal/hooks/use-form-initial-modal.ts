import * as z from 'zod'
import axios from 'axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { useRouter } from 'next/navigation'

const formSchema = z.object({
  name: z.string().min(1, {
    message: 'O nome do servidor é obrigatório.',
  }),
  imageUrl: z.string().min(1, {
    message: 'A imagem do servidor é obrigatória.',
  }),
})

export function useFormInitialModal() {
  const router = useRouter()

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      imageUrl: '',
    },
  })

  const isLoading = form.formState.isSubmitting

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await axios.post('/api/servers', values)
      form.reset()
      router.refresh()
      window.location.reload()
    } catch (error) {
      console.log(error)
    }
  }

  return {
    form,
    isLoading,
    onSubmit,
  }
}
