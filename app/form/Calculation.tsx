'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Product } from '@prisma/client'
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { CalculationMenu } from './CalculationMenu'
import { CollectionElements } from './CollectionElements'
import { CollectionView } from './CollectionView'
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

  const collections = useFieldArray({
    control: form.control,
    name: 'collections',
  })

  const onSubmit: SubmitHandler<CalculationType> = (data) => {
    console.log(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col">
          <div className="flex m-4 space-x-6 items-start justify-between">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="w-2/5">
                  <FormControl>
                    <Input {...field} type="text" />
                  </FormControl>
                </FormItem>
              )}
            />
            {/* <CalculationMenu /> */}
          </div>
          {collections.fields.map((collection, collectionIndex) => (
            <CollectionView
              key={collection.id}
              collectionIndex={collectionIndex}>
              <CollectionElements
                collectionIndex={collectionIndex}
                products={products}
              />
            </CollectionView>
          ))}
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
