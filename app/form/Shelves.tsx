'use client'

import { Product } from '@prisma/client'
import { filter } from 'lodash/fp'
import { Plus } from 'lucide-react'
import { useFieldArray, useFormContext } from 'react-hook-form'

import { Button } from '@/components/ui/button'

import { AmountSelect } from './fields/AmountSelect'

interface Props {
  products: Product[]
}

export const Shelves = ({ products }: Props) => {
  const { control, getValues } = useFormContext()
  const options = filter(
    { category: 'shelf', width: Number(getValues().width) },
    products,
  )
  const {
    fields: shelves,
    append,
    remove,
  } = useFieldArray({
    control,
    name: 'shelves',
  })

  return (
    <div className="flex rounded-lg gap-2 flex-col border-2 m-8 p-4 w-1/3 items-center">
      Półki
      {shelves.map((field, index) => {
        return (
          <AmountSelect
            key={field.id}
            field={field}
            options={options}
            remove={() => remove(index)}
          />
        )
      })}
      <Button variant="outline" size="icon" onClick={append}>
        <Plus />
      </Button>
    </div>
  )
}
