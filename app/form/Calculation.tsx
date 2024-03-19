'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Product } from '@prisma/client'
import { SaveIcon } from 'lucide-react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { CalculationMenu } from './CalculationMenu'
import { CalculationType, calculationSchema } from './formSchema'

interface Props {
  initialData: CalculationType
}

export const Calculation = ({ initialData }: Props) => {
  const form = useForm<CalculationType>({
    resolver: zodResolver(calculationSchema),
    defaultValues: initialData,
  })

  const { control, reset, handleSubmit } = form

  const onSubmit: SubmitHandler<CalculationType> = async (data) => {
    console.log(data)
    reset(data)
  }
  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex m-4 space-x-6 items-start justify-between">
          <FormField
            control={control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-2/5">
                <FormControl>
                  <Input {...field} type="text" />
                </FormControl>
              </FormItem>
            )}
          />
          <CalculationMenu />
        </div>
      </form>
    </Form>
  )
}
