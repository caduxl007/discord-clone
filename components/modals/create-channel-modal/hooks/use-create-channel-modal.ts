import { useModal } from '@/hooks/use-modal-store'
import { zodResolver } from '@hookform/resolvers/zod'
import { ChannelType } from '@prisma/client'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import qs from 'query-string'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: 'O nome do canal é obrigatório.',
    })
    .refine((name) => name !== 'general', {
      message: "O nome do canal não pode ser 'general'",
    }),
  type: z.nativeEnum(ChannelType),
})

export function useCreateChannelModal() {
  const {
    isOpen,
    onClose,
    type,
    data: { channelType },
  } = useModal()

  const router = useRouter()
  const params = useParams()

  const isModalOpen = isOpen && type === 'createChannel'

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      type: channelType || ChannelType.TEXT,
    },
  })

  useEffect(() => {
    if (channelType) {
      form.setValue('type', channelType)
    } else {
      form.setValue('type', ChannelType.TEXT)
    }
  }, [channelType, form])

  const isLoading = form.formState.isSubmitting

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const url = qs.stringifyUrl({
        url: '/api/channels',
        query: {
          serverId: params?.serverId,
        },
      })
      await axios.post(url, values)

      form.reset()
      router.refresh()
      onClose()
    } catch (error) {
      console.log(error)
    }
  }

  const handleClose = () => {
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
