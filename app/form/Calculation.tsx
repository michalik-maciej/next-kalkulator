'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Product } from '@prisma/client'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { CalculationMenu } from './CalculationMenu'
import { CalculationType, calculationSchema } from './formSchema'

interface Props {
  initialData: CalculationType
  products: Product[]
}

export const Calculation = ({ initialData, products }: Props) => {
  const form = useForm<CalculationType>({
    resolver: zodResolver(calculationSchema),
    defaultValues: initialData,
  })

  const { control, handleSubmit } = form

  const onSubmit: SubmitHandler<CalculationType> = (data) => {
    console.log(data)
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
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
