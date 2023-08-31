import { useModal } from '@/hooks/use-modal-store'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
  name: z.string().min(1, {
    message: 'O nome do servidor é obrigatório.',
  }),
  imageUrl: z.string().min(1, {
    message: 'A imagem do servidor é obrigatória.',
  }),
})

export function useEditServerModal() {
  const {
    isOpen,
    onClose,
    type,
    data: { server },
  } = useModal()
  const router = useRouter()

  const isModalOpen = isOpen && type === 'editServer'

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      imageUrl: '',
    },
  })

  useEffect(() => {
    if (server) {
      form.setValue('name', server.name)
      form.setValue('imageUrl', server.imageUrl)
    }
  }, [server, form])

  const isLoading = form.formState.isSubmitting

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await axios.patch(`/api/servers/${server?.id}`, values)

      form.reset()
      router.refresh()
      onClose()
    } catch (error) {
      console.log(error)
    }
  }

  function handleClose() {
    form.reset()
    onClose()
  }

  return {
    form,
    isModalOpen,
    isLoading,
    onSubmit,
    handleClose,
  }
}
