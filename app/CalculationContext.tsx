'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { ReactNode } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Form } from '@/components/ui/form'

import { CalculationType, calculationSchema } from './formSchema'
import { useInitialCollection } from './utils/useInitialCollection'

interface Props {
  children: ReactNode
}

export const CalculationContext = ({ children }: Props) => {
  const { initialCollection } = useInitialCollection()

  const date = new Date()
  const initialData: CalculationType = {
    title: `Kalkulacja ${date.toLocaleString('pl')}`,
    collections: [initialCollection],
  }
  const form = useForm<CalculationType>({
    resolver: zodResolver(calculationSchema),
    defaultValues: initialData,
  })

  const onSubmit: SubmitHandler<CalculationType> = (data) => {
    console.log(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>{children}</form>
    </Form>
  )
}
