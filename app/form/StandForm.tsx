'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Product } from '@prisma/client'
import { SaveIcon } from 'lucide-react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { getFormOptions } from '../utils'
import { Shelves } from './Shelves'
import { createStand } from './actions'
import { StandType, standSchema } from './formSchema'

interface Props {
  products: Product[]
}

export const StandForm = ({ products }: Props) => {
  const form = useForm<StandType>({
    resolver: zodResolver(standSchema),
    defaultValues: {
      amount: 1,
      width: '100',
      shelves: [{ amount: 1, depth: '' }],
    },
  })

  const { control, reset, handleSubmit } = form

  const onSubmit: SubmitHandler<StandType> = async (data) => {
    const response = await createStand(data)
    console.log(response.message)
    reset(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormField
          control={control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} type="number" />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="width"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Szerokość" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {getFormOptions(products).widths.map((width) => (
                    <SelectItem key={width} value={width.toString()}>
                      {width}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <Shelves products={products} />
        <Button size="icon" variant="outline" type="submit">
          <SaveIcon />
        </Button>
      </form>
    </Form>
  )
}
